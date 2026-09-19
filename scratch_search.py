import urllib.request
import urllib.parse
import re
import os
from PIL import Image

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

queries = [
    'images.unsplash.com "clinic" "interior" -dental -hospital',
    'images.unsplash.com "aesthetic clinic" "reception"',
    'images.unsplash.com "medical spa" "interior"',
    'images.unsplash.com "skin clinic" "treatment"',
    'images.unsplash.com "doctor" "consultation" "office" -cartoon',
    'images.unsplash.com "reception" "spa" OR "clinic" landscape'
]

found = set()
for q in queries:
    url = f"https://search.yahoo.com/search?p={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            m = re.findall(r'photo-[0-9a-zA-Z\-_]{10,}', html)
            found.update(m)
            p = re.findall(r'premium_photo-[0-9a-zA-Z\-_]{10,}', html)
            found.update(p)
    except Exception as e:
        print(f"Error {q}: {e}")

print("Total found:", len(found))
os.makedirs("candidate_preview", exist_ok=True)

valid_landscape = []
for pid in list(found)[:40]:
    url = f"https://images.unsplash.com/{pid}?auto=format&fit=crop&w=600&q=80"
    if "premium" in pid:
        url = f"https://plus.unsplash.com/{pid}?auto=format&fit=crop&w=600&q=80"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            filepath = f"candidate_preview/{pid}.jpg"
            with open(filepath, "wb") as f:
                f.write(data)
            im = Image.open(filepath)
            ratio = round(im.size[0] / im.size[1], 2)
            if ratio >= 1.3:  # true landscape
                print(f"VALID LANDSCAPE: {pid} size={im.size} ratio={ratio}")
                valid_landscape.append(pid)
    except Exception as e:
        pass

print("Valid landscape count:", len(valid_landscape))
