import json

# Učitaj notebook
with open('diplomskiRad_01_Vanilla_EuroLLM.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_01_Vanilla_EuroLLM.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz Vanilla")

# Učitaj notebook
with open('diplomskiRad_02_RAG_EuroLLM.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_02_RAG_EuroLLM.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz RAG")

# Učitaj notebook
with open('diplomskiRad_03_GraphRAG_EuroLLM.ipynb', 'r', encoding='utf-8') as f:
    nb = json.load(f)

# Ukloni widgets metadata
if 'widgets' in nb['metadata']:
    del nb['metadata']['widgets']

# Spremi
with open('diplomskiRad_03_GraphRAG_EuroLLM.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2, ensure_ascii=False)

print("✓ Widgets metadata uklonjeni iz RAG")


