# DzeToPishe — Gdje to piše

Diplomski rad — Zlatko Pračić

Chatbot temeljen na velikim jezičnim modelima (LLM) i RAG arhitekturi koji odgovara na pitanja iz hrvatskih vojnih propisa.

---

## Opis projekta

**DzeToPishe** (Gdje to piše) je chatbot izrađen u tri verzije. Sve tri verzije koriste model **EuroLLM**. Prvi koristi čisti LLM i nazvan je Vanilla, drugi FAISS RAG, a treći uz pomoć grafovske baze podataka Neo4j GraphRAG. Projekt je razvijen u Google Colabu i evaluiran automatskim metrikama (ROUGE-L, BERTScore, cosine similarity), ocjenama ljudskih eksperata i ocjenama LLM-ova (LLM-as-a-Judge).

---

## Struktura repozitorija

```
DzeToPishe/
├── data/
│ ├── pitanja_odgovori.json
│ └── raw/
│ ├── 01_Ustav/
│ │ └── Ustav Republike Hrvatske 2018.docx
│ ├── 02_Zakoni/
│ │ ├── Zakon_o_obrani_2025.docx
│ │ └── Zakon_o_sluzbi_u_Oruzanim_snagama_Republike_Hrvatske_2025.docx
│ └── 03_Pravilnici/
│ └── Pravilnik o temeljnom vojnom osposobljavanju.pdf
├── notebooks/
│ ├── diplomskiRad_01_Vanilla.ipynb
│ ├── diplomskiRad_02_RAG.ipynb
│ ├── diplomskiRad_03_GraphRAG.ipynb
│ ├── diplomskiRad_04_evaluacija.ipynb
│ ├── Pospremanje_LLM.ipynb
│ ├── python_colab_evaluacija.py # čisti Colab dokument kako bi bio vidljiv na GitHub
│ └── python_colab_rad.py # čisti Colab dokument kako bi bio vidljiv na GitHub
├── pdf_rad/
│ └── Rad.pdf # Pisani diplomski rad
├── statistika/
│ ├── agregirano_eksperti.csv
│ ├── boxplot_eksperti.png
│ ├── boxplot_latencija.png
│ ├── claude_vs_gemini.csv
│ ├── deskriptivna_auto_metrike.csv
│ ├── deskriptivna_ljudske_ocjene.csv
│ ├── diplomski_evaluacija_automatske_LLM.xlsx
│ ├── diplomski_evaluacija_eksperti.xlsx
│ ├── friedman_auto_metrike.csv
│ ├── friedman_ljudske_ocjene.csv
│ ├── graf_heatmap_metrike_R.png
│ ├── graf_metrike_po_kategorijama_R.png
│ ├── graf_usporedba_pristupa_R.png
│ ├── heatmap_spearman_metrike.png
│ ├── iaa_rezultati.csv
│ ├── latencija_statistika.csv
│ ├── llm_vs_eksperti.png
│ ├── llm_vs_human_kor.csv
│ ├── metrike_po_kategorijama.csv
│ ├── podaci_kompletni.csv
│ ├── posthoc_auto_metrike.csv
│ ├── posthoc_ljudske_ocjene.csv
│ ├── skripta_1_eksperti.R
│ ├── skripta_2_metrike_llm.R
│ ├── spearman_metrike_vs_ocjene.csv
│ └── usporedba_pristupa_ukupno.csv
└── LICENSE
```

---

## Dokumenti u korpusu

| Kategorija | Dokument |
|---|---|
| Ustav | Ustav Republike Hrvatske (2018) |
| Zakoni | Zakon o obrani (2025) |
| Zakoni | Zakon o službi u Oružanim snagama RH (2025) |
| Pravilnici | Pravilnik o temeljnom vojnom osposobljavanju |

---

## Skup pitanja i odgovora

JSON datoteka sadrži pitanja u tri kategorije:

- **jednostavna_pitanja** — pitanja koja se odnose na jedan kratki odlomak
- **kompleksna_pitanja_jedan_dokument** — pitanja koja zahtijevaju razumijevanje više odlomaka jednog dokumenta
- **kompleksna_pitanja_vise_dokumenata** — pitanja koja zahtijevaju spajanje informacija iz više dokumenata

---

## Tehnički stack

- **Model:** [EuroLLM-22B-Instruct-2512](https://huggingface.co/utter-project/EuroLLM-22B-Instruct-2512) (Hugging Face)
- **Kvantizacija:** bitsandbytes (4-bit)
- **RAG:** sentence-transformers + FAISS
- **Neo4j**
- **Ekstrakcija teksta:** python-docx, pdfplumber
- **Evaluacija:** ROUGE-L (rouge-score), BERTScore, cosine similarity, LLM as Judge, 4 eksperta iz oružanih snaga (jedan pravnik i tri brigadira)
- **Okruženje:** Google Colab + Google Drive
