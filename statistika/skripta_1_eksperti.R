# ==========================================================
#  SKRIPTA 1: Ocjene eksperata (Google Forms tablica)
#  Izvor: https://docs.google.com/spreadsheets/d/1PT7DRE3hpONYUuT2XwZSlwkTlr-5rEHQ-9260O45S8k
#  Sadržaj: filtriranje blago ocjenjujućih ocjenjivača, IAA
#           (Fleissov kappa, Krippendorffov alpha), deskriptivna
#           statistika, Friedmanov test + upareni Wilcoxonov post-hoc
# ==========================================================

# ----------------------------------------------------------
#  0. Paketi
# ----------------------------------------------------------
if (!requireNamespace("googlesheets4", quietly = TRUE))
  install.packages("googlesheets4")
if (!requireNamespace("dplyr",        quietly = TRUE))
  install.packages("dplyr")
if (!requireNamespace("tidyr",        quietly = TRUE))
  install.packages("tidyr")
if (!requireNamespace("rstatix",      quietly = TRUE))
  install.packages("rstatix")
if (!requireNamespace("irr",          quietly = TRUE))
  install.packages("irr")
if (!requireNamespace("ggplot2",      quietly = TRUE))
  install.packages("ggplot2")
# Napomena: paket 'krippendorff' nije dostupan za sve verzije R-a
# kripp.alpha() koristimo iz paketa 'irr'

library(googlesheets4)
library(dplyr)
library(tidyr)
library(rstatix)
library(irr)
library(ggplot2)

# ----------------------------------------------------------
#  1. Učitavanje podataka
# ----------------------------------------------------------
gs4_auth(scopes = "https://www.googleapis.com/auth/spreadsheets.readonly")

FORMS_URL <- "https://docs.google.com/spreadsheets/d/1PT7DRE3hpONYUuT2XwZSlwkTlr-5rEHQ-9260O45S8k"

raw_forms <- read_sheet(FORMS_URL)

cat("Dimenzije tablice:", nrow(raw_forms), "redaka x",
    ncol(raw_forms), "stupaca\n")
cat("Broj eksperata (redaka s ocjenama):", nrow(raw_forms), "\n\n")

# ----------------------------------------------------------
#  2. Transformacija: wide -> long format
# ----------------------------------------------------------
#     Stupci oblika: "Ocjena za Vanilla (Pitanje X) [Y. Dimenzija]"
raw_forms$ocjenjivac_id <- paste0("E", sprintf("%02d", seq_len(nrow(raw_forms))))

ocjene_cols <- grep("^Ocjena za", names(raw_forms), value = TRUE)

long <- raw_forms %>%
  select(ocjenjivac_id, all_of(ocjene_cols)) %>%
  pivot_longer(
    cols      = all_of(ocjene_cols),
    names_to  = "stupac",
    values_to = "ocjena"
  ) %>%
  mutate(
    konfiguracija = case_when(
      grepl("GraphRAG", stupac) ~ "GraphRAG",
      grepl("Vanilla",  stupac) ~ "Vanilla",
      grepl("RAG",      stupac) ~ "RAG"
    ),
    pitanje = as.integer(gsub(".*Pitanje (\\d+).*", "\\1", stupac)),
    dimenzija = case_when(
      grepl("1\\.",  stupac) ~ "tocnost",
      grepl("2\\.",  stupac) ~ "korisnost",
      grepl("3\\.",  stupac) ~ "halucinacije"
    ),
    ocjena = as.integer(ocjena)
  ) %>%
  filter(!is.na(dimenzija), !is.na(ocjena))

podaci_eksperti <- long %>%
  pivot_wider(
    id_cols     = c(ocjenjivac_id, pitanje, konfiguracija),
    names_from  = dimenzija,
    values_from = ocjena,
    values_fn   = first
  )

cat("Redaka nakon pivota:", nrow(podaci_eksperti),
    "(očekivano:", nrow(raw_forms), "x 31 x 3 =",
    nrow(raw_forms) * 31 * 3, ")\n")
cat("NA u tocnost:",      sum(is.na(podaci_eksperti$tocnost)),      "\n")
cat("NA u korisnost:",    sum(is.na(podaci_eksperti$korisnost)),    "\n")
cat("NA u halucinacije:", sum(is.na(podaci_eksperti$halucinacije)), "\n\n")

dimenzije <- c("tocnost", "korisnost", "halucinacije")

# ----------------------------------------------------------
#  3. Filtriranje blago ocjenjujućih ocjenjivača (leniency bias)
# ----------------------------------------------------------
#     Kriterij: udio najviših (3) ocjena, preko sve tri dimenzije,
#     >= 85 % -> ocjenjivač se izuzima jer njegove ocjene ne
#     razlikuju uspoređivane konfiguracije (cheng2017leniency).
#     Lista se računa programski, nad trenutno učitanim podacima,
#     kako ne bi zastarjela ako se broj ocjenjivača promijeni.
LENIENCY_PRAG <- 85

distribucija_po_ocjenjivacu <- podaci_eksperti %>%
  pivot_longer(cols = all_of(dimenzije), names_to = "dimenzija", values_to = "ocjena") %>%
  group_by(ocjenjivac_id) %>%
  summarise(
    ukupno_ocjena = n(),
    pct_trojki    = round(100 * mean(ocjena == 3, na.rm = TRUE), 1),
    .groups = "drop"
  )

print(as.data.frame(distribucija_po_ocjenjivacu))

blagi_ocjenjivaci <- distribucija_po_ocjenjivacu %>%
  filter(pct_trojki >= LENIENCY_PRAG) %>%
  pull(ocjenjivac_id)

pravi_ocjenjivaci <- setdiff(unique(podaci_eksperti$ocjenjivac_id), blagi_ocjenjivaci)

cat(sprintf("\nIzuzeti ocjenjivači (>= %d%% trojki preko sve tri dimenzije): %s\n",
            LENIENCY_PRAG, paste(blagi_ocjenjivaci, collapse = ", ")))
cat(sprintf("Uključeno u konačnu analizu: %d od %d ocjenjivača (%s)\n\n",
            length(pravi_ocjenjivaci), nrow(raw_forms),
            paste(pravi_ocjenjivaci, collapse = ", ")))

podaci_cisti <- podaci_eksperti %>% filter(ocjenjivac_id %in% pravi_ocjenjivaci)

# ----------------------------------------------------------
#  4. Agregirane ocjene: medijan po pitanju x konfiguraciji
#     (nad OČIŠĆENIM skupom ocjenjivača)
# ----------------------------------------------------------
agregirano <- podaci_cisti %>%
  group_by(pitanje, konfiguracija) %>%
  summarise(
    tocnost      = median(tocnost,      na.rm = TRUE),
    korisnost    = median(korisnost,    na.rm = TRUE),
    halucinacije = median(halucinacije, na.rm = TRUE),
    .groups = "drop"
  )

# ----------------------------------------------------------
#  5. Deskriptivna statistika
# ----------------------------------------------------------

desc <- agregirano %>%
  group_by(konfiguracija) %>%
  summarise(across(all_of(dimenzije), list(
    mean   = ~round(mean(.,   na.rm = TRUE), 2),
    median = ~median(.,       na.rm = TRUE),
    sd     = ~round(sd(.,     na.rm = TRUE), 2)
  ), .names = "{.col}_{.fn}"), .groups = "drop")

print(desc, width = Inf)

write.csv(desc, "deskriptivna_ljudske_ocjene.csv", row.names = FALSE, fileEncoding = "UTF-8")
cat("Deskriptivna statistika spremljena: deskriptivna_ljudske_ocjene.csv\n")

# Boxplot
podaci_cisti %>%
  group_by(pitanje, konfiguracija) %>%
  summarise(across(all_of(dimenzije), ~median(., na.rm = TRUE)),
            .groups = "drop") %>%
  pivot_longer(cols = all_of(dimenzije),
               names_to = "dimenzija", values_to = "ocjena") %>%
  ggplot(aes(x = konfiguracija, y = ocjena, fill = konfiguracija)) +
  geom_boxplot() +
  facet_wrap(~dimenzija, labeller = as_labeller(c(
    tocnost      = "Točnost",
    korisnost    = "Korisnost",
    halucinacije = "Halucinacije"
  ))) +
  scale_fill_manual(values = c(
    Vanilla = "#E8A0A0", RAG = "#A0C8E8", GraphRAG = "#A0E8B0"
  )) +
  labs(title = "Distribucija ocjena eksperata po konfiguraciji",
       x = NULL, y = "Ocjena (1–3)") +
  theme_minimal(base_size = 13) +
  theme(legend.position = "none")

ggsave("boxplot_eksperti.png", width = 10, height = 5, dpi = 300)
cat("\nBoxplot spremljen: boxplot_eksperti.png\n")

# ----------------------------------------------------------
#  6. Friedmanov test + upareni Wilcoxonov post-hoc
# ----------------------------------------------------------
#     Friedmanov test (ponovljena mjerenja) uz upareni Wilcoxonov
#     test predznačenih rangova s Bonferroni korekcijom (post-hoc).
#     ANALIZA OSJETLJIVOSTI: test se provodi i na punom skupu
#     ocjenjivača (prije filtriranja blago ocjenjujućih) i na
#     očišćenom skupu, istim principom koji se već koristi za IAA
#     u odjeljku 7 — kako bi se provjerilo mijenja li isključivanje
#     ocjenjivača kvalitativni zaključak. Za izvoz u Skriptu 2
#     (agregirano_eksperti.csv, odjeljak 8) i dalje se koristi
#     isključivo očišćeni skup.

agregirano_svi <- podaci_eksperti %>%
  group_by(pitanje, konfiguracija) %>%
  summarise(
    tocnost      = median(tocnost,      na.rm = TRUE),
    korisnost    = median(korisnost,    na.rm = TRUE),
    halucinacije = median(halucinacije, na.rm = TRUE),
    .groups = "drop"
  )

parovi <- list(c("Vanilla", "RAG"), c("Vanilla", "GraphRAG"), c("RAG", "GraphRAG"))

friedman_posthoc_analiza <- function(agregirano_df, oznaka) {
  friedman_rez <- data.frame()
  posthoc_rez  <- data.frame()
  
  for (d in dimenzije) {
    cat(sprintf("\n--- %s (%s) ---\n", toupper(d), oznaka))
    
    w <- agregirano_df %>%
      select(pitanje, konfiguracija, vrijednost = all_of(d)) %>%
      pivot_wider(id_cols = pitanje, names_from = konfiguracija, values_from = vrijednost)
    
    fr <- friedman.test(as.matrix(w[, -1]))
    # Kendallov W = chi2 / (N(k-1)) — veličina efekta omnibus Friedmanovog
    # testa (analogon eta^2 za ponovljena mjerenja), 0 = nema slaganja u
    # rangiranju, 1 = savršeno dosljedno rangiranje kroz sva pitanja.
    N  <- nrow(w)
    k  <- ncol(w) - 1
    kendall_w <- round(as.numeric(fr$statistic) / (N * (k - 1)), 3)
    cat(sprintf("Friedman: chi2(%d) = %.3f, p = %.4f, Kendall W = %.3f %s\n",
                fr$parameter, fr$statistic, fr$p.value, kendall_w,
                ifelse(fr$p.value < 0.05, "(*)", "")))
    
    friedman_rez <- bind_rows(friedman_rez, data.frame(
      skup = oznaka, dimenzija = d, chi2 = round(fr$statistic, 3), df = fr$parameter,
      p = round(fr$p.value, 4), kendall_w = kendall_w
    ))
    
    if (fr$p.value < 0.05) {
      pvals <- c()
      for (par in parovi) {
        wt <- wilcox.test(w[[par[1]]], w[[par[2]]], paired = TRUE, exact = FALSE)
        pvals <- c(pvals, wt$p.value)
      }
      padj <- p.adjust(pvals, method = "bonferroni")
      
      for (i in seq_along(parovi)) {
        par   <- parovi[[i]]
        wt    <- wilcox.test(w[[par[1]]], w[[par[2]]], paired = TRUE, exact = FALSE)
        diffs <- w[[par[1]]] - w[[par[2]]]
        diffs <- diffs[diffs != 0]
        n     <- length(diffs)
        # Upareni rank-biserijalni koeficijent |r| = |4V/(n(n+1)) - 1|.
        r     <- round(abs(4 * wt$statistic / (n * (n + 1)) - 1), 3)
        cat(sprintf("  %s vs %s: V = %.1f, p = %.4f, p.adj = %.4f, r = %.3f\n",
                    par[1], par[2], wt$statistic, pvals[i], padj[i], r))
        
        posthoc_rez <- bind_rows(posthoc_rez, data.frame(
          skup = oznaka, dimenzija = d, par1 = par[1], par2 = par[2],
          V = round(wt$statistic, 1), p = round(pvals[i], 4),
          p_bonf = round(padj[i], 4), r = r
        ))
      }
    } else {
      cat("→ Nije značajno — post-hoc se ne provodi.\n")
    }
  }
  list(friedman = friedman_rez, posthoc = posthoc_rez)
}

cat(sprintf("\n[Skup: svi ocjenjivači, n = %d]\n", length(unique(podaci_eksperti$ocjenjivac_id))))
rez_svi   <- friedman_posthoc_analiza(agregirano_svi, "svi")
cat(sprintf("\n[Skup: očišćeni ocjenjivači, n = %d]\n", length(unique(podaci_cisti$ocjenjivac_id))))
rez_cisti <- friedman_posthoc_analiza(agregirano, "očišćeni")

friedman_rezultati <- bind_rows(rez_svi$friedman, rez_cisti$friedman)
posthoc_rezultati  <- bind_rows(rez_svi$posthoc,  rez_cisti$posthoc)

write.csv(friedman_rezultati, "friedman_ljudske_ocjene.csv", row.names = FALSE, fileEncoding = "UTF-8")
write.csv(posthoc_rezultati,  "posthoc_ljudske_ocjene.csv",  row.names = FALSE, fileEncoding = "UTF-8")
cat("\nFriedman rezultati (oba skupa) spremljeni: friedman_ljudske_ocjene.csv\n")
cat("Post-hoc rezultati (oba skupa) spremljeni: posthoc_ljudske_ocjene.csv\n")

# ----------------------------------------------------------
#  7. Međuocjenjivačka pouzdanost (IAA)
# ----------------------------------------------------------
#     Fleissov kappa i Krippendorffov alpha po dimenziji
#     Matrica: redovi = ocjenjivači, stupci = pitanje x konfiguracija
#     Računa se i na punom i na očišćenom skupu radi usporedbe (broj
#     ocjenjivača u svakom skupu ispisuje se dinamički niže, ne ovisi
#     o ručno upisanom broju koji zastarijeva ako se skup promijeni).

interpret_kappa <- function(v) {
  if      (is.na(v))  "N/A"
  else if (v < 0.20)  "slabo"
  else if (v < 0.40)  "prihvatljivo"
  else if (v < 0.60)  "umjereno"
  else if (v < 0.80)  "dobro"
  else                "izvrsno"
}

izracunaj_iaa <- function(data, oznaka) {
  cat(sprintf("\n--- IAA na %s (n_ocjenjivaca = %d) ---\n",
              oznaka, length(unique(data$ocjenjivac_id))))
  rezultati <- data.frame()
  for (d in dimenzije) {
    mat <- data %>%
      arrange(ocjenjivac_id, pitanje, konfiguracija) %>%
      mutate(kljuc = paste0("P", pitanje, "_", konfiguracija)) %>%
      select(ocjenjivac_id, kljuc, all_of(d)) %>%
      pivot_wider(
        id_cols     = ocjenjivac_id,
        names_from  = kljuc,
        values_from = all_of(d),
        values_fn   = first
      ) %>%
      select(-ocjenjivac_id) %>%
      as.matrix()
    
    fk_val <- tryCatch(kappam.fleiss(t(mat), exact = FALSE)$value,
                       error = function(e) NA_real_)
    ka_val <- tryCatch(irr::kripp.alpha(mat, method = "ordinal")$value,
                       error = function(e) NA_real_)
    
    cat(sprintf("%-14s | Fleissov kappa = %6.3f (%s) | Krippendorffov alpha = %6.3f (%s)\n",
                d, round(fk_val, 3), interpret_kappa(fk_val),
                round(ka_val, 3), interpret_kappa(ka_val)))
    
    rezultati <- bind_rows(rezultati, data.frame(
      skup           = oznaka,
      dimenzija      = d,
      fleiss_kappa   = round(fk_val, 3),
      interpretacija = interpret_kappa(fk_val),
      kripp_alpha    = round(ka_val, 3)
    ))
  }
  rezultati
}

iaa_svi    <- izracunaj_iaa(podaci_eksperti, "svih ocjenjivača (bez filtriranja)")
iaa_cisti  <- izracunaj_iaa(podaci_cisti,    "očišćenom skupu (bez blago ocjenjujućih)")
iaa_rezultati <- bind_rows(iaa_svi, iaa_cisti)

cat("\nSažetak IAA (oba skupa):\n")
print(iaa_rezultati)

# ----------------------------------------------------------
#  8. Izvoz agregiranih ocjena (OČIŠĆENI skup) za Skriptu 2
# ----------------------------------------------------------
write.csv(agregirano, "agregirano_eksperti.csv",
          row.names = FALSE, fileEncoding = "UTF-8")
write.csv(iaa_rezultati, "iaa_rezultati.csv",
          row.names = FALSE, fileEncoding = "UTF-8")
cat("\nAgregirane ocjene (očišćeni skup) spremljene: agregirano_eksperti.csv\n")
cat("IAA rezultati spremljeni: iaa_rezultati.csv\n")
cat("(Učitaj agregirano_eksperti.csv u Skriptu 2 za spajanje s metrikama)\n")

