import urllib.request, urllib.parse, re, json
from PIL import Image
import os

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

# Let's search on Bing using JSON or HTML
queries = [
    'site:unsplash.com "medical spa" interior landscape',
    'site:unsplash.com "aesthetic clinic" landscape',
    'site:unsplash.com "dermatology" clinic interior landscape',
    'site:unsplash.com "treatment room" spa landscape',
    'site:unsplash.com "beauty salon" interior landscape',
    'site:unsplash.com "doctor" "consultation" desk landscape'
]

# We can also check Unsplash search via their public graphql or open search if possible
# Or query Bing
found_ids = set()
for q in queries:
    url = f"https://www.bing.com/search?q={urllib.parse.quote(q)}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=5) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            # Look for photo- or premium_photo-
            p1 = re.findall(r'photo-[0-9a-zA-Z\-_]{10,}', content)
            p2 = re.findall(r'premium_photo-[0-9a-zA-Z\-_]{10,}', content)
            for x in p1 + p2:
                found_ids.add(x)
    except Exception as e:
        print('Bing error:', e)

print('Found IDs from Bing:', len(found_ids))
os.makedirs('scratch_bing', exist_ok=True)
for pid in found_ids:
    domain = 'plus.unsplash.com' if 'premium' in pid else 'images.unsplash.com'
    url = f"https://{domain}/{pid}?auto=format&fit=crop&w=600&q=80"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            data = resp.read()
            filepath = f'scratch_bing/{pid}.jpg'
            with open(filepath, 'wb') as f:
                f.write(data)
            im = Image.open(filepath)
            ratio = round(im.size[0] / im.size[1], 2)
            if ratio >= 1.3:
                print(f"LANDSCAPE {pid}: size={im.size} ratio={ratio}")
    except Exception as e:
        pass
