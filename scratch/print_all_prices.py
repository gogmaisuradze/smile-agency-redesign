import urllib.request

url = "https://www.smileagency.ge/assets/index-I5CP7G9R.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    content = response.read().decode('utf-8')
    
    # Search for "Straumann"
    idx = content.find("Straumann")
    if idx != -1:
        # Let's search backwards for "pricePage" or the beginning of the categories array
        # Let's grab a larger chunk: 8000 chars before and 1000 chars after
        start = max(0, idx - 5000)
        end = min(len(content), idx + 1500)
        chunk = content[start:end]
        
        # Write this chunk to a file so we can view it cleanly
        with open("scratch/price_chunk.txt", "w", encoding="utf-8") as f:
            f.write(chunk)
            
        print("Wrote price chunk around Straumann to scratch/price_chunk.txt")
