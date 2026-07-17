import json

path = "/Users/goga/.gemini/antigravity/brain/07fb9d45-45ba-465e-a5e5-76178540896a/scratch/site_content.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data:
    if "ka_data" in item:
        ka = item["ka_data"]
        en = item["en_data"]
        
        # Let's save a clean representation in a javascript file
        js_content = f"""// Auto-generated translations dictionary from official website scraping data

export const TRANSLATIONS = {{
  ka: {json.dumps(ka, indent=2, ensure_ascii=False)},
  en: {json.dumps(en, indent=2, ensure_ascii=False)}
}};
"""
        with open("src/translations.js", "w", encoding="utf-8") as out:
            out.write(js_content)
        print("Successfully wrote src/translations.js!")
        break
