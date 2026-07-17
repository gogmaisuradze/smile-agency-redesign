import os
from PIL import Image

image_dir = "/Users/goga/Downloads/სმაილ აგენს/public/images"
png_files = ["dr_david_makharadze.png", "glass_tooth_render.png", "hero_dentist_office.png", "implant_3d_render.png", "logo.png"]

for filename in png_files:
    png_path = os.path.join(image_dir, filename)
    if os.path.exists(png_path):
        webp_filename = filename.replace(".png", ".webp")
        webp_path = os.path.join(image_dir, webp_filename)
        
        orig_size = os.path.getsize(png_path)
        img = Image.open(png_path)
        
        # Save as WebP at 85% quality
        img.save(webp_path, "WEBP", quality=85)
        
        new_size = os.path.getsize(webp_path)
        reduction = (orig_size - new_size) / orig_size * 100
        print(f"Converted {filename} to WebP: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
