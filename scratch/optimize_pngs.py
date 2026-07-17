import os
from PIL import Image

image_dir = "/Users/goga/Downloads/სმაილ აგენს/public/images"
png_files = ["dr_david_makharadze.png", "glass_tooth_render.png", "hero_dentist_office.png", "implant_3d_render.png"]

for filename in png_files:
    path = os.path.join(image_dir, filename)
    if os.path.exists(path):
        orig_size = os.path.getsize(path)
        img = Image.open(path)
        
        # Optimize PNG: save with optimization and higher compression level
        # If it doesn't need alpha channel, convert to RGB to save space
        if img.mode == 'RGBA':
            # Check if image actually has transparent pixels
            alpha = img.split()[-1]
            # If all pixels are fully opaque, convert to RGB
            if alpha.getextrema() == (255, 255):
                img = img.convert('RGB')
                
        img.save(path, "PNG", optimize=True, compress_level=9)
        new_size = os.path.getsize(path)
        reduction = (orig_size - new_size) / orig_size * 100
        print(f"Optimized {filename}: {orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")
