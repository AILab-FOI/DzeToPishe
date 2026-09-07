# ==========================================================
#  SKRIPTA 2: Automatske metrike, LLM-as-a-Judge, Latencija
#  Izvor: https://docs.google.com/spreadsheets/d/1ckN8UW5PFVjH-FRuw2UuxJO-YOel49hN
#  Preduvjet: pokrenuti Skriptu 1 koja generira agregirano_eksperti.csv
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
if (!requireNamespace("ggplot2",      quietly = TRUE))
  install.packages("ggplot2")
if (!requireNamespace("corrplot",     quietly = TRUE))
  install.packages("corrplot")

library(googlesheets4)
library(dplyr)
library(tidyr)
library(rstatix)
library(ggplot2)
library(corrplot)

# ----------------------------------------------------------
#  1. Učitavanje podataka
# ----------------------------------------------------------
gs4_auth()

EVAL_URL <- "https://docs.google.com/spreadsheets/d/1qQNeuq3wffSMv1GOx-8QAf5bTFXcPw9jfApdEhLzeao/edit?usp=drive_link"

# List "rezultati_evaluacija" — preskačemo prva 2 zaglavlja
raw_eval <- read_sheet(EVAL_URL, sheet = "rezultati_evaluacija", skip = 2)

cat("Dimenzije eval tablice:", nrow(raw_eval), "x", ncol(raw_eval), "\n")

# Imenovanje stupaca prema poznatoj strukturi tablice
colnames(raw_eval) <- c(
  "rbr", "kategorija", "pitanje", "ocekivani_odgovor",
  "vanilla_odgovor",  "vanilla_vrijeme",
  "rag_odgovor",      "rag_vrijeme",
  "graphrag_odgovor", "graphrag_vrijeme",
  # Automatske metrike (Vanilla, RAG, GraphRAG)
  "van_rouge", "van_cosine", "van_bertscore",
  "rag_rouge", "rag_cosine", "rag_bertscore",
  "grag_rouge","grag_cosine","grag_bertscore",
  # Claude LLM-as-a-Judge
  "claude_van_t", "claude_van_k", "claude_van_h",
  "claude_rag_t", "claude_rag_k", "claude_rag_h",
  "claude_grag_t","claude_grag_k","claude_grag_h",
  # Gemini LLM-as-a-Judge
  "gemini_van_t", "gemini_van_k", "gemini_van_h",
  "gemini_rag_t", "gemini_rag_k", "gemini_rag_h",
  "gemini_grag_t","gemini_grag_k","gemini_grag_h",
  # Ekspert 1 (Bešenić) — samo za referencu, ne koristimo za IAA
  "bes_van_t", "bes_van_k", "bes_van_h",
  "bes_rag_t", "bes_rag_k", "bes_rag_h",
  "bes_grag_t","bes_grag_k","bes_grag_h",
  # Ekspert 2 (Sitarić-Knezić) — samo za referencu
  "sit_van_t", "sit_van_k", "sit_van_h",
  "sit_rag_t", "sit_rag_k", "sit_rag_h",
  "sit_grag_t","sit_grag_k","sit_grag_h"
)

# Numerički tipovi
numericke <- c(
  "vanilla_vrijeme", "rag_vrijeme", "graphrag_vrijeme",
  "van_rouge",  "van_cosine",  "van_bertscore",
  "rag_rouge",  "rag_cosine",  "rag_bertscore",
  "grag_rouge", "grag_cosine", "grag_bertscore",
  grep("^(claude|gemini|bes|sit)_", names(raw_eval), value = TRUE)
)
raw_eval <- raw_eval %>%
  mutate(across(all_of(intersect(numericke, names(raw_eval))),
                as.numeric))

# ----------------------------------------------------------
#  2. Učitavanje agregiranih ocjena eksperata (iz Skripte 1)
# ----------------------------------------------------------
if (!file.exists("agregirano_eksperti.csv")) {
  stop("Datoteka 'agregirano_eksperti.csv' nije pronađena.\n",
       "Najprije pokrenite Skriptu 1 (skripta_1_eksperti.R).")
}

agregirano_eksp <- read.csv("agregirano_eksperti.csv",
                            encoding = "UTF-8")
cat("Učitano agregirano_eksperti.csv:",
    nrow(agregirano_eksp), "redaka\n\n")

dimenzije  <- c("tocnost", "korisnost", "halucinacije")
automatske <- c("rouge", "cosine", "bertscore")

# ----------------------------------------------------------
#  3. Priprema long formata metrika i latencije
# ----------------------------------------------------------

# Automatske metrike u long formatu
metrike_long <- raw_eval %>%
  select(rbr,
         Vanilla_rouge  = van_rouge,  Vanilla_cosine  = van_cosine,
         Vanilla_bertscore = van_bertscore,
         RAG_rouge      = rag_rouge,  RAG_cosine      = rag_cosine,
         RAG_bertscore  = rag_bertscore,
         GraphRAG_rouge = grag_rouge, GraphRAG_cosine = grag_cosine,
         GraphRAG_bertscore = grag_bertscore) %>%
  pivot_longer(-rbr,
               names_to  = c("konfiguracija", "metrika"),
               names_sep = "_",
               values_to = "vrijednost"
  ) %>%
  pivot_wider(names_from = metrika, values_from = vrijednost)

# Latencija u long formatu
latencija_long <- raw_eval %>%
  select(rbr,
         Vanilla  = vanilla_vrijeme,
         RAG      = rag_vrijeme,
         GraphRAG = graphrag_vrijeme) %>%
  pivot_longer(-rbr,
               names_to  = "konfiguracija",
               values_to = "sekunde"
  )

# Spajanje s agregiranim ocjenama eksperata
# agregirano_eksp$pitanje odgovara raw_eval$rbr
podaci <- agregirano_eksp %>%
  rename(rbr = pitanje) %>%
  left_join(metrike_long, by = c("rbr", "konfiguracija")) %>%
  left_join(latencija_long, by = c("rbr", "konfiguracija"))

cat("Spojeni podaci:", nrow(podaci), "redaka\n\n")

# ----------------------------------------------------------
#  4. Deskriptivna statistika automatskih metrika
# ----------------------------------------------------------

desc_auto <- podaci %>%
  group_by(konfiguracija) %>%
  summarise(across(all_of(automatske), list(
    mean   = ~round(mean(.,   na.rm = TRUE), 3),
    median = ~round(median(., na.rm = TRUE), 3),
    sd     = ~round(sd(.,     na.rm = TRUE), 3)
  ), .names = "{.col}_{.fn}"), .groups = "drop")
print(desc_auto, width = Inf)

write.csv(desc_auto, "deskriptivna_auto_metrike.csv", row.names = FALSE, fileEncoding = "UTF-8")
cat("Deskriptivna statistika spremljena: deskriptivna_auto_metrike.csv\n")

# ----------------------------------------------------------
#  5. Friedmanov test + post-hoc uparen Wilcoxon (auto. metrike)
# ----------------------------------------------------------
#     Isto pitanje ocjenjuje se pod sve tri konfiguracije (upareni
#     dizajn), pa se koristi Friedmanov test uz upareni Wilcoxonov
#     post-hoc s Bonferroni korekcijom.

parovi <- list(c("Vanilla", "RAG"), c("Vanilla", "GraphRAG"), c("RAG", "GraphRAG"))

friedman_auto <- data.frame()
posthoc_auto  <- data.frame()

for (m in automatske) {
  cat("\n---", toupper(m), "---\n")
  
  w <- podaci %>%
    select(rbr, konfiguracija, vrijednost = all_of(m)) %>%
    pivot_wider(id_cols = rbr, names_from = konfiguracija, values_from = vrijednost)
  
  fr <- friedman.test(as.matrix(w[, -1]))
  N  <- nrow(w)
  k  <- ncol(w) - 1
  kendall_w <- round(as.numeric(fr$statistic) / (N * (k - 1)), 3)
  cat(sprintf("Friedman: chi2(%d) = %.3f, p = %.4f, Kendall W = %.3f %s\n",
              fr$parameter, fr$statistic, fr$p.value, kendall_w,
              ifelse(fr$p.value < 0.05, "(*)", "")))
  
  friedman_auto <- bind_rows(friedman_auto, data.frame(
    metrika = m, chi2 = round(fr$statistic, 3), df = fr$parameter,
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
      
      posthoc_auto <- bind_rows(posthoc_auto, data.frame(
        metrika = m, par1 = par[1], par2 = par[2],
        V = round(wt$statistic, 1), p = round(pvals[i], 4),
        p_bonf = round(padj[i], 4), r = r
      ))
    }
  }
}

write.csv(friedman_auto, "friedman_auto_metrike.csv", row.names = FALSE, fileEncoding = "UTF-8")
write.csv(posthoc_auto,  "posthoc_auto_metrike.csv",  row.names = FALSE, fileEncoding = "UTF-8")
cat("\nFriedman rezultati spremljeni: friedman_auto_metrike.csv\n")
cat("Post-hoc rezultati spremljeni: posthoc_auto_metrike.csv\n")

# ----------------------------------------------------------
#  6. Spearmanova korelacija: automatske metrike vs. ljudske ocjene
# ----------------------------------------------------------

kor_mat <- matrix(NA,
                  nrow = length(dimenzije),
                  ncol = length(automatske),
                  dimnames = list(dimenzije, automatske)
)

for (d in dimenzije) {
  for (m in automatske) {
    test <- cor.test(podaci[[d]], podaci[[m]],
                     method = "spearman", exact = FALSE)
    kor_mat[d, m] <- round(test$estimate, 3)
    zvjezdice <- ifelse(test$p.value < 0.01, "**",
                        ifelse(test$p.value < 0.05, "*", ""))
    cat(sprintf("%-14s ~ %-10s : rho = %6.3f %s (p = %.4f)\n",
                d, m, test$estimate, zvjezdice, test$p.value))
  }
}

cat("\nKorelacijska matrica:\n")
print(kor_mat)

write.csv(as.data.frame(kor_mat), "spearman_metrike_vs_ocjene.csv",
          row.names = TRUE, fileEncoding = "UTF-8")
cat("Korelacijska matrica spremljena: spearman_metrike_vs_ocjene.csv\n")

# Heatmapa
png("heatmap_spearman_metrike.png", width = 1600, height = 1200, res = 200)
corrplot(kor_mat,
         method      = "color",
         addCoef.col = "black",
         tl.col      = "black",
         col.lim      = c(-1, 1),
         title       = "Spearmanova korelacija: metrike vs. ocjene eksperata",
         mar         = c(0, 0, 2, 0)
)
dev.off()
cat("Heatmapa spremljena: heatmap_spearman_metrike.png\n")

# ----------------------------------------------------------
#  7. LLM-as-a-Judge: Claude i Gemini
# ----------------------------------------------------------
# Priprema LLM ocjena u long formatu
llm_long <- raw_eval %>%
  select(rbr,
         claude_van_t, claude_van_k, claude_van_h,
         claude_rag_t, claude_rag_k, claude_rag_h,
         claude_grag_t, claude_grag_k, claude_grag_h,
         gemini_van_t, gemini_van_k, gemini_van_h,
         gemini_rag_t, gemini_rag_k, gemini_rag_h,
         gemini_grag_t, gemini_grag_k, gemini_grag_h
  ) %>%
  pivot_longer(-rbr,
               names_to  = c("model", "konf", "dim"),
               names_pattern = "(claude|gemini)_(van|rag|grag)_(t|k|h)"
  ) %>%
  mutate(
    konfiguracija = case_when(
      konf == "van"  ~ "Vanilla",
      konf == "rag"  ~ "RAG",
      konf == "grag" ~ "GraphRAG"
    ),
    dimenzija = case_when(
      dim == "t" ~ "tocnost",
      dim == "k" ~ "korisnost",
      dim == "h" ~ "halucinacije"
    ),
    value = as.numeric(value)
  ) %>%
  select(rbr, model, konfiguracija, dimenzija, llm_ocjena = value)

# Spajanje s ljudskim ocjenama
podaci_long_eksp <- agregirano_eksp %>%
  rename(rbr = pitanje) %>%
  pivot_longer(cols = all_of(dimenzije),
               names_to = "dimenzija", values_to = "ljudska_ocjena")

usporedba <- llm_long %>%
  left_join(podaci_long_eksp %>%
              select(rbr, konfiguracija, dimenzija, ljudska_ocjena),
            by = c("rbr", "konfiguracija", "dimenzija"))

# --- 7a. Svaki LLM vs. ljudska evaluacija ---
cat("\n--- 7a. LLM vs. Ljudska evaluacija (Spearmanova korelacija) ---\n")

llm_vs_human <- data.frame()

for (mod in c("claude", "gemini")) {
  cat("\n", toupper(mod), ":\n", sep = "")
  for (d in dimenzije) {
    sub  <- usporedba %>% filter(model == mod, dimenzija == d)
    test <- cor.test(sub$llm_ocjena, sub$ljudska_ocjena,
                     method = "spearman", exact = FALSE)
    zvj  <- ifelse(test$p.value < 0.01, "**",
                   ifelse(test$p.value < 0.05, "*", ""))
    cat(sprintf("  %-14s : rho = %6.3f %s (p = %.4f)\n",
                d, test$estimate, zvj, test$p.value))
    
    llm_vs_human <- bind_rows(llm_vs_human, data.frame(
      model       = mod,
      dimenzija   = d,
      rho         = round(test$estimate, 3),
      p_vrijednost = round(test$p.value, 4)
    ))
  }
}

cat("\nSažetak LLM vs. ljudska:\n")
print(llm_vs_human)

# --- 7b. Claude vs. Gemini međusobno ---
cat("\n--- 7b. Claude vs. Gemini (međusobna usporedba) ---\n")

claude_vs_gemini <- usporedba %>%
  pivot_wider(names_from = model, values_from = llm_ocjena)

cg_rezultati <- data.frame()

for (d in dimenzije) {
  sub <- claude_vs_gemini %>% filter(dimenzija == d)
  
  kor <- cor.test(sub$claude, sub$gemini,
                  method = "spearman", exact = FALSE)
  wt  <- wilcox.test(sub$claude, sub$gemini,
                     paired = TRUE, exact = FALSE)
  
  cat(sprintf("%-14s : rho = %.3f (p = %.4f) | Wilcoxon W = %.1f (p = %.4f)\n",
              d, kor$estimate, kor$p.value, wt$statistic, wt$p.value))
  
  cg_rezultati <- bind_rows(cg_rezultati, data.frame(
    dimenzija      = d,
    spearman_rho   = round(kor$estimate, 3),
    p_korelacija   = round(kor$p.value, 4),
    wilcoxon_W     = round(wt$statistic, 1),
    p_wilcoxon     = round(wt$p.value, 4)
  ))
}

print(cg_rezultati)

# --- 7c. Vizualizacija: LLM vs. ljudska ocjena ---
usporedba %>%
  mutate(model = toupper(model),
         dimenzija = factor(dimenzija,
                            levels = c("tocnost", "korisnost", "halucinacije"),
                            labels = c("Točnost", "Korisnost", "Halucinacije"))) %>%
  ggplot(aes(x = ljudska_ocjena, y = llm_ocjena, colour = model)) +
  geom_jitter(width = 0.1, height = 0.1, alpha = 0.6) +
  geom_smooth(method = "lm", se = FALSE) +
  facet_grid(dimenzija ~ konfiguracija) +
  scale_colour_manual(values = c(CLAUDE = "#D4A800", GEMINI = "#1A73E8")) +
  labs(title = "LLM ocjenjivači vs. ocjene eksperata",
       x = "Ljudska ocjena (medijan)", y = "LLM ocjena",
       colour = "Model") +
  theme_minimal(base_size = 12)

ggsave("llm_vs_eksperti.png", width = 12, height = 8, dpi = 300)
cat("\nScatter plot spremljen: llm_vs_eksperti.png\n")

# ----------------------------------------------------------
#  8. Latencija
# ----------------------------------------------------------

# Deskriptivna statistika
lat_desc <- latencija_long %>%
  group_by(konfiguracija) %>%
  summarise(
    mean   = round(mean(sekunde,              na.rm = TRUE), 2),
    median = round(median(sekunde,            na.rm = TRUE), 2),
    p95    = round(quantile(sekunde, 0.95,    na.rm = TRUE), 2),
    sd     = round(sd(sekunde,                na.rm = TRUE), 2),
    min    = round(min(sekunde,               na.rm = TRUE), 2),
    max    = round(max(sekunde,               na.rm = TRUE), 2),
    .groups = "drop"
  )

print(lat_desc)

# Friedmanov test (ponovljena mjerenja) — isto pitanje mjereno pod
# sve tri konfiguracije, pa se koristi upareni test, ne Kruskal-Wallis.
w_lat <- latencija_long %>%
  pivot_wider(id_cols = rbr, names_from = konfiguracija, values_from = sekunde)
fr_lat <- friedman.test(as.matrix(w_lat[, -1]))
N_lat <- nrow(w_lat)
k_lat <- ncol(w_lat) - 1
kendall_w_lat <- round(as.numeric(fr_lat$statistic) / (N_lat * (k_lat - 1)), 3)
cat(sprintf("\nFriedman latencija: chi2(%d) = %.3f, p = %.4f, Kendall W = %.3f %s\n",
            fr_lat$parameter, fr_lat$statistic, fr_lat$p.value, kendall_w_lat,
            ifelse(fr_lat$p.value < 0.05, "(*)", "")))

if (fr_lat$p.value < 0.05) {
  parovi_lat <- list(c("Vanilla", "RAG"), c("Vanilla", "GraphRAG"), c("RAG", "GraphRAG"))
  pvals_lat  <- sapply(parovi_lat, function(par)
    wilcox.test(w_lat[[par[1]]], w_lat[[par[2]]], paired = TRUE, exact = FALSE)$p.value)
  padj_lat   <- p.adjust(pvals_lat, method = "bonferroni")
  for (i in seq_along(parovi_lat)) {
    par <- parovi_lat[[i]]
    wt  <- wilcox.test(w_lat[[par[1]]], w_lat[[par[2]]], paired = TRUE, exact = FALSE)
    cat(sprintf("  %s vs %s: V = %.1f, p = %.4f, p.adj = %.4f\n",
                par[1], par[2], wt$statistic, pvals_lat[i], padj_lat[i]))
  }
} else {
  cat("→ Nije značajno — post-hoc se ne provodi.\n")
}

# ----------------------------------------------------------
#  9. Agregacija po kategorijama i vizualizacije
# ----------------------------------------------------------
#     (R-replika dijela 5-6 iz diplomskiRad_04_evaluacija.ipynb)
#
#  Napomena: sâm izračun ROUGE-L/BERTScore/Cosine iz sirovog teksta
#  (dio 3-4 bilježnice) ovdje se NE ponavlja jer zahtijeva
#  transformer modele (bert-base-multilingual-cased,
#  multilingual-e5-large) za koje R nema zreo ekvivalent bez
#  oslanjanja na Python (npr. preko reticulate) — a rezultat je
#  već izračunat i dostupan u raw_eval (iz diplomski.xlsx / Google
#  Sheeta), pa nema potrebe da se ponovno računa. Ovaj odjeljak
#  radi isključivo agregaciju i vizualizaciju već izračunatih
#  metrika, što ne zahtijeva nikakav model.

naziv_kategorije <- function(k) {
  k <- tolower(k)
  if (grepl("vise|više", k)) return("Kompleksna (više dok.)")
  if (grepl("jedan", k))     return("Kompleksna (jedan dok.)")
  "Jednostavna"
}

pristupi <- c(Vanilla = "van", RAG = "rag", GraphRAG = "grag")
metrike_baze <- c(rouge = "rouge", bertscore = "bertscore", cosine = "cosine")
metrike_nazivi <- c(rouge = "ROUGE-L", bertscore = "BERTScore", cosine = "Cosine Sim.")

metrike_long_kat <- raw_eval %>%
  mutate(kategorija_kratko = vapply(kategorija, naziv_kategorije, character(1))) %>%
  select(rbr, kategorija_kratko,
         Vanilla_rouge  = van_rouge,  Vanilla_bertscore  = van_bertscore,  Vanilla_cosine  = van_cosine,
         RAG_rouge      = rag_rouge,  RAG_bertscore      = rag_bertscore,  RAG_cosine      = rag_cosine,
         GraphRAG_rouge = grag_rouge, GraphRAG_bertscore = grag_bertscore, GraphRAG_cosine = grag_cosine) %>%
  pivot_longer(-c(rbr, kategorija_kratko),
               names_to = c("pristup", "metrika"), names_sep = "_",
               values_to = "vrijednost") %>%
  mutate(pristup = factor(pristup, levels = c("Vanilla", "RAG", "GraphRAG")),
         metrika = factor(recode(metrika, !!!metrike_nazivi), levels = unname(metrike_nazivi)))

# --- 9a. Prosječne metrike po kategorijama (tekstualni ispis) ---
agr_kat <- metrike_long_kat %>%
  group_by(kategorija_kratko, pristup, metrika) %>%
  summarise(mean = round(mean(vrijednost), 4), sd = round(sd(vrijednost), 4),
            n = n(), .groups = "drop")
print(as.data.frame(agr_kat))
write.csv(agr_kat, "metrike_po_kategorijama.csv", row.names = FALSE, fileEncoding = "UTF-8")

# --- 9b. Tablica usporedbe pristupa (ukupni prosjek + delta vs. Vanilla) ---
agr_ukupno <- metrike_long_kat %>%
  group_by(pristup, metrika) %>%
  summarise(mean = mean(vrijednost), .groups = "drop") %>%
  pivot_wider(names_from = pristup, values_from = mean) %>%
  mutate(across(c(RAG, GraphRAG), ~round(. - Vanilla, 4), .names = "delta_{.col}_vs_Vanilla")) %>%
  mutate(across(c(Vanilla, RAG, GraphRAG), ~round(., 4)))
cat("\nTablica usporedbe pristupa (ukupni prosjek):\n")
print(as.data.frame(agr_ukupno))
write.csv(agr_ukupno, "usporedba_pristupa_ukupno.csv", row.names = FALSE, fileEncoding = "UTF-8")

boje_pristup <- c(Vanilla = "#5B9BD5", RAG = "#70AD47", GraphRAG = "#ED7D31")

# --- 9c. Bar chart: usporedba pristupa po metrikama (ukupni prosjek) ---
metrike_long_kat %>%
  group_by(pristup, metrika) %>%
  summarise(mean = mean(vrijednost), .groups = "drop") %>%
  ggplot(aes(x = metrika, y = mean, fill = pristup)) +
  geom_col(position = position_dodge(width = 0.7), width = 0.65) +
  geom_text(aes(label = sprintf("%.3f", mean)),
            position = position_dodge(width = 0.7), vjust = -0.4, size = 3) +
  scale_fill_manual(values = boje_pristup) +
  coord_cartesian(ylim = c(0, 1.05)) +
  labs(title = "Usporedba Vanilla, RAG i GraphRAG pristupa po metrikama",
       x = NULL, y = "Prosječna vrijednost", fill = NULL) +
  theme_minimal(base_size = 12)

ggsave("graf_usporedba_pristupa_R.png", width = 10, height = 6, dpi = 150)
cat("\nGraf spremljen: graf_usporedba_pristupa_R.png\n")

# --- 9d. Grouped bar chart: metrike po kategorijama pitanja ---
metrike_long_kat %>%
  group_by(kategorija_kratko, pristup, metrika) %>%
  summarise(mean = mean(vrijednost), .groups = "drop") %>%
  ggplot(aes(x = kategorija_kratko, y = mean, fill = pristup)) +
  geom_col(position = position_dodge(width = 0.7), width = 0.65) +
  geom_text(aes(label = ifelse(mean > 0.02, sprintf("%.3f", mean), "")),
            position = position_dodge(width = 0.7), vjust = -0.4, size = 2.5) +
  facet_wrap(~metrika) +
  scale_fill_manual(values = boje_pristup) +
  coord_cartesian(ylim = c(0, 1.05)) +
  labs(title = "Metrike po kategorijama pitanja", x = NULL, y = "Prosječna vrijednost", fill = NULL) +
  theme_minimal(base_size = 11) +
  theme(axis.text.x = element_text(angle = 15, hjust = 1))

ggsave("graf_metrike_po_kategorijama_R.png", width = 14, height = 6, dpi = 150)
cat("Graf spremljen: graf_metrike_po_kategorijama_R.png\n")

# --- 9e. Heatmap: matrica svih metrika po pitanjima ---
oznaka_redoslijed <- as.vector(outer(c("V", "R", "G"), levels(metrike_long_kat$metrika), paste, sep = "-"))
heatmap_df <- metrike_long_kat %>%
  mutate(oznaka = factor(paste0(substr(pristup, 1, 1), "-", metrika), levels = oznaka_redoslijed),
         pitanje_lbl = factor(paste0("P", rbr), levels = paste0("P", sort(unique(rbr))))) %>%
  select(pitanje_lbl, oznaka, vrijednost, kategorija_kratko)

boja_kat <- c("Jednostavna" = "#27AE60", "Kompleksna (jedan dok.)" = "#F39C12",
              "Kompleksna (više dok.)" = "#E74C3C")
kat_po_pitanju <- metrike_long_kat %>% distinct(rbr, kategorija_kratko) %>%
  arrange(rbr) %>% mutate(pitanje_lbl = paste0("P", rbr))
y_boje <- boja_kat[kat_po_pitanju$kategorija_kratko[match(levels(heatmap_df$pitanje_lbl),
                                                          kat_po_pitanju$pitanje_lbl)]]

ggplot(heatmap_df, aes(x = oznaka, y = pitanje_lbl, fill = vrijednost)) +
  geom_tile(color = "white") +
  geom_text(aes(label = sprintf("%.2f", vrijednost)), size = 2.2) +
  scale_fill_gradientn(colours = c("#E74C3C", "#F4D03F", "#27AE60"), limits = c(0, 1)) +
  labs(title = sprintf("Matrica metrika po pitanjima (%d pitanja x %d metrika)",
                       length(unique(heatmap_df$pitanje_lbl)), length(unique(heatmap_df$oznaka))),
       x = "Metrika [V=Vanilla, R=RAG, G=GraphRAG]", y = "Pitanje", fill = NULL) +
  theme_minimal(base_size = 10) +
  theme(axis.text.y = element_text(color = y_boje, size = 7),
        axis.text.x = element_text(angle = 45, hjust = 1))

ggsave("graf_heatmap_metrike_R.png",
       width = length(unique(heatmap_df$oznaka)) * 0.9,
       height = max(10, length(unique(heatmap_df$pitanje_lbl)) * 0.35), dpi = 150, limitsize = FALSE)
cat("Graf spremljen: graf_heatmap_metrike_R.png\n")

# Boxplot latencije
ggplot(latencija_long,
       aes(x = konfiguracija, y = sekunde, fill = konfiguracija)) +
  geom_boxplot() +
  geom_jitter(width = 0.15, alpha = 0.4, size = 1.5) +
  scale_fill_manual(values = c(
    Vanilla = "#E8A0A0", RAG = "#A0C8E8", GraphRAG = "#A0E8B0"
  )) +
  labs(title = "Latencija odgovora po konfiguraciji",
       x = NULL, y = "Sekunde") +
  theme_minimal(base_size = 13) +
  theme(legend.position = "none")

ggsave("boxplot_latencija.png", width = 8, height = 5, dpi = 300)
cat("\nBoxplot latencije spremljen: boxplot_latencija.png\n")

# ----------------------------------------------------------
#  10. Izvoz svih rezultata u CSV
# ----------------------------------------------------------
write.csv(podaci,        "podaci_kompletni.csv",   row.names = FALSE,
          fileEncoding = "UTF-8")
write.csv(llm_vs_human, "llm_vs_human_kor.csv",   row.names = FALSE,
          fileEncoding = "UTF-8")
write.csv(cg_rezultati, "claude_vs_gemini.csv",    row.names = FALSE,
          fileEncoding = "UTF-8")
write.csv(lat_desc,     "latencija_statistika.csv",row.names = FALSE,
          fileEncoding = "UTF-8")

cat("\nSvi CSV rezultati spremljeni.\n")
cat("Pokrenite Skriptu 1 ako još niste — ona generira agregirano_eksperti.csv\n")
