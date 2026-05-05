import json

# Učitaj notebook
with open('2026 04 27 diplomskiRad_euroLLM.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('2026 04 27 diplomskiRad_euroLLM.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjen")
