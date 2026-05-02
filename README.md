# DzeToPishe — Gdje to piše

Diplomski rad — Zlatko Pračić

Chatbot temeljen na velikim jezičnim modelima (LLM) i RAG arhitekturi koji odgovara na pitanja iz hrvatskih vojnih propisa.

---

## Opis projekta

**DzeToPishe** (Gdje to piše) je chatbot koji koristi model **EuroLLM** i tehniku **Retrieval-Augmented Generation (RAG)** za pronalaženje relevantnih odlomaka iz korpusa vojnih dokumenata i generiranje odgovora na postavljeno pitanje. Projekt je razvijen u Google Colabu i evaluiran automatskim metrikama (BLEU, ROUGE-L, BERTScore, cosine similarity).

---

## Struktura repozitorija

```
DzeToPishe/
├── data/
│   ├── raw/
│   │   ├── 01_Ustav/
│   │   │   └── Ustav Republike Hrvatske 2018.docx
│   │   ├── 02_Zakoni/
│   │   │   ├── Zakon_o_obrani_2025.docx
│   │   │   └── Zakon_o_sluzbi_u_Oruzanim_snagama_Republike_Hrvatske_2025.docx
│   │   └── 03_Pravilnici/
│   │       ├── Pravilnik o službi u Oružanim snagama Republike Hrvatske.pdf
│   │       ├── Pravilnik o službi u Oružanim snagama Republike Hrvatske.html
│   │       ├── Pravilnik o temeljnom vojnom osposobljavanju.pdf
│   │       └── Pravilnik o temeljnom vojnom osposobljavanju.html
│   ├── pitanja_odgovori.docx    # Skup pitanja i referentnih odgovora
│   └── pitanja_odgovori.json   # Isti skup u JSON formatu (3 kategorije)
├── notebooks/
│   ├── 2026 04 27 diplomskiRad_euroLLM.ipynb           # Glavni notebook — RAG chatbot
│   └── 2026 04 27 diplomskiRad_euroLLM_evaluacija.ipynb # Evaluacija odgovora
├── pdf_rad/
│   └── Rad.pdf                  # Pisani diplomski rad
├── rezultati/
│   ├── 2026 04 27 rezultati.csv                        # Odgovori chatbota
│   ├── 2026 04 27 rezultati_euroLLM_evaluacija.csv     # Rezultati automatske evaluacije
│   └── ukupna_evaluacija_chatbota.xlsx                 # Zbirna evaluacija
├── .gitignore
├── LICENSE
└── README.md
```

---

## Dokumenti u korpusu

| Kategorija | Dokument |
|---|---|
| Ustav | Ustav Republike Hrvatske (2018) |
| Zakoni | Zakon o obrani (2025) |
| Zakoni | Zakon o službi u Oružanim snagama RH (2025) |
| Pravilnici | Pravilnik o službi u Oružanim snagama RH |
| Pravilnici | Pravilnik o temeljnom vojnom osposobljavanju |

---

## Skup pitanja i odgovora

JSON datoteka sadrži pitanja u tri kategorije:

- **jednostavna_pitanja** — pitanja koja se odnose na jedan kratki odlomak
- **kompleksna_pitanja_jedan_dokument** — pitanja koja zahtijevaju razumijevanje više odlomaka jednog dokumenta
- **kompleksna_pitanja_vise_dokumenata** — pitanja koja zahtijevaju spajanje informacija iz više dokumenata

---

## Tehnički stack

- **Model:** [EuroLLM](https://huggingface.co/utter-project/EuroLLM-9B-Instruct) (Hugging Face)
- **Kvantizacija:** bitsandbytes (4-bit)
- **RAG:** sentence-transformers + FAISS
- **Ekstrakcija teksta:** python-docx, pdfplumber
- **Evaluacija:** BLEU (nltk), ROUGE-L (rouge-score), BERTScore, cosine similarity
- **Okruženje:** Google Colab + Google Drive

---

## Pokretanje

Notebooci su namijenjeni pokretanju u **Google Colabu**. Potrebno je:

1. Pohraniti repozitorij na Google Drive
2. Otvoriti `diplomskiRad_euroLLM.ipynb` u Colabu
3. Pokrenuti ćelije redom — notebook će instalirati ovisnosti, montirati Drive i autentificirati se s Hugging Face
4. Za evaluaciju pokrenuti `diplomskiRad_euroLLM_evaluacija.ipynb` nakon što postoje rezultati u `rezultati/`
