import urllib.request, urllib.parse, re

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}
queries = [
    'site:unsplash.com/photos modern clinic interior',
    'site:unsplash.com/photos medical spa interior',
    'site:unsplash.com/photos clinic reception waiting room',
    'site:unsplash.com/photos doctor office consultation',
    'site:unsplash.com/photos facial skincare salon room'
]

found_urls = []
for q in queries:
    url = 'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract links
            raw_links = re.findall(r'uddg=([^&"\']+)', html)
            for l in raw_links:
                dec = urllib.parse.unquote(l)
                if 'unsplash.com/photos/' in dec:
                    found_urls.append(dec)
    except Exception as e:
        print('Err:', e)

print('Found Unsplash URLs:', len(found_urls))
for u in list(dict.fromkeys(found_urls)):
    print(u)
