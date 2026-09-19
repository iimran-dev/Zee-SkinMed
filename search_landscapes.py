import json

with open('C:/Users/uwais/.gemini/antigravity-ide/brain/8b0a322d-6cec-48c5-999b-342df0b599ca/scratch/landscapes.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Total landscape items: {len(items)}")
keywords = ['clinic', 'reception', 'spa', 'treatment', 'room', 'interior', 'office', 'lounge', 'desk', 'bed', 'medical', 'hospital', 'consult', 'laser', 'facial', 'skin']

matches = []
for it in items:
    text = (it.get('cat', '') + ' ' + it.get('desc', '')).lower()
    if any(k in text for k in keywords):
        matches.append(it)

print(f"Matching items: {len(matches)}")
for m in matches:
    print(f"[{m.get('cat')}] {m.get('aspect')}x : {m.get('desc')} --> {m.get('url')}")
