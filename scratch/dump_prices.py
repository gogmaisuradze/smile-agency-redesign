import json

path = "/Users/goga/.gemini/antigravity/brain/07fb9d45-45ba-465e-a5e5-76178540896a/scratch/site_content.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Find the object that has "ka_data"
for item in data:
    if "ka_data" in item:
        price_page = item["ka_data"].get("pricePage", {})
        categories = price_page.get("categories", [])
        print(json.dumps(categories, indent=2, ensure_ascii=False))
        break
