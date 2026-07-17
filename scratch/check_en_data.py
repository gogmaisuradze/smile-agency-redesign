import json

path = "/Users/goga/.gemini/antigravity/brain/07fb9d45-45ba-465e-a5e5-76178540896a/scratch/site_content.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data:
    keys = list(item.keys())
    print("Top level keys in object:", keys)
    if "en_data" in item:
        print("en_data keys:", list(item["en_data"].keys()))
        # Let's print some of it
        print(json.dumps(item["en_data"], indent=2, ensure_ascii=False)[:1000])
        break
