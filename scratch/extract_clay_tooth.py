import os
from PIL import Image, ImageFilter

src_path = "/Users/goga/.gemini/antigravity/brain/07fb9d45-45ba-465e-a5e5-76178540896a/media__1783307779464.jpg"
dst_path = "/Users/goga/Downloads/სმაილ აგენს/public/images/logo.webp"

img = Image.open(src_path).convert("RGBA")
width, height = img.size

# Flood fill from the corners to identify the background
visited = [[False for _ in range(height)] for _ in range(width)]
queue = []

# Add the 4 corners
corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
for cx, cy in corners:
    queue.append((cx, cy))
    visited[cx][cy] = True

# Also add border pixels to be safe
for x in range(width):
    if not visited[x][0]:
        queue.append((x, 0))
        visited[x][0] = True
    if not visited[x][height-1]:
        queue.append((x, height-1))
        visited[x][height-1] = True
for y in range(height):
    if not visited[0][y]:
        queue.append((0, y))
        visited[0][y] = True
    if not visited[width-1][y]:
        queue.append((width-1, y))
        visited[width-1][y] = True

# BFS to find the white background
while queue:
    x, y = queue.pop(0)
    
    # Check neighbors
    for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        nx, ny = x + dx, y + dy
        if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
            r, g, b, a = img.getpixel((nx, ny))
            # If the pixel is very close to white/light-gray (background or soft shadow edges)
            # We use a threshold of 230 to cleanly segment the white background
            if r > 230 and g > 230 and b > 230:
                visited[nx][ny] = True
                queue.append((nx, ny))

# Create the transparent image
new_img = Image.new("RGBA", (width, height))

for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        if visited[x][y]:
            # It's background: calculate transparency based on how close to white it is
            # This creates a soft, smooth fade for any shadow or edges
            brightness = (r + g + b) // 3
            if brightness > 250:
                alpha = 0
            else:
                # Smooth transition
                alpha = int((250 - brightness) / 20 * 255)
                alpha = max(0, min(255, alpha))
            
            # Put transparent pixel (but keep color for smooth anti-aliased borders)
            new_img.putpixel((x, y), (r, g, b, alpha))
        else:
            # It's the tooth! Keep it fully opaque
            new_img.putpixel((x, y), (r, g, b, 255))

# Crop the image tightly around the tooth
bbox = new_img.getbbox()
if bbox:
    # Add a tiny padding to prevent clipping of smooth edges
    left, top, right, bottom = bbox
    padding = 10
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(width, right + padding)
    bottom = min(height, bottom + padding)
    new_img = new_img.crop((left, top, right, bottom))

# Save the logo directly in WebP format with high quality
new_img.save(dst_path, "WEBP", quality=95)
print(f"Successfully processed, isolated, and saved clay tooth logo to {dst_path}. Size: {new_img.size}")
