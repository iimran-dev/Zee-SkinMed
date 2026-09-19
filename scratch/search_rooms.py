import json

with open(r'C:/Users/uwais/.gemini/antigravity-ide/brain/8b0a322d-6cec-48c5-999b-342df0b599ca/scratch/landscapes.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

keywords = ['treatment', 'spa', 'clinic', 'office', 'room', 'interior', 'bed', 'medical', 'chair', 'salon', 'cabinet', 'table', 'white', 'dermatolog', 'hospital', 'laser']

matches = []
for x in items:
    desc = x.get('desc', '').lower()
    cat = x.get('cat', '').lower()
    if any(w in desc or w in cat for w in keywords):
        matches.append(x)

print(f"Total matching items: {len(matches)}")
for m in matches:
    print(f"[{m['cat']}] ({m.get('aspect')}x) {m.get('desc')} -> {m['url']}")
