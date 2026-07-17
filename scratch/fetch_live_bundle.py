import urllib.request
import re

url = "https://www.smileagency.ge/assets/index-I5CP7G9R.js"
print(f"Fetching bundle: {url}")

try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        content = response.read().decode('utf-8')
        print(f"Successfully fetched bundle. Size: {len(content)/1024:.1f} KB")
        
        # Let's search for the "MIS (ისრაელი)" or "Guttafusion" or pricing array strings
        # We look for a pattern like "Straumann" or "Guttafusion" in the javascript
        matches = re.findall(r'(\{[^\{\}]*?"n"[^\{\}]*?"p"[^\{\}]*?\})', content)
        print(f"Found {len(matches)} potential price items.")
        
        # Let's save matches to verify
        with open("scratch/bundle_matches.txt", "w", encoding="utf-8") as out:
            for m in matches:
                out.write(m + "\n")
                
except Exception as e:
    print(f"Error: {e}")
