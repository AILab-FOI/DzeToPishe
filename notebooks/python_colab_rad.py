import json

# Učitaj notebook
with open('diplomskiRad_01_Vanilla.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_01_Vanilla.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz Vanilla")

# Učitaj notebook
with open('diplomskiRad_02_RAG.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_02_RAG.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz RAG")

# Učitaj notebook
with open('diplomskiRad_03_GraphRAG.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_03_GraphRAG.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz GraphRAG")


