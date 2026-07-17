import urllib.request

url = "https://www.smileagency.ge/assets/index-I5CP7G9R.js"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    content = response.read().decode('utf-8')
    
    # Search for "Straumann"
    idx = content.find("Straumann")
    if idx != -1:
        print("Found Straumann at index", idx)
        # Print surrounding characters
        start = max(0, idx - 1000)
        end = min(len(content), idx + 2000)
        print(content[start:end])
    else:
        print("Straumann not found in bundle.")
