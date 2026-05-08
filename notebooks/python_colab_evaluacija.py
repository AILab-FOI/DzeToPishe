import json

# Učitaj notebook
with open('diplomskiRad_euroLLM_evaluacija.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_euroLLM_evaluacija.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjen")
