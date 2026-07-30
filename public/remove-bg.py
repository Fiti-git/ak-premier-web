"""Remove white background from logo.png -> logo-transparent.png"""
from PIL import Image
import os

SRC = os.path.join(os.path.dirname(__file__), 'logo.png')
DST_TRANSPARENT = os.path.join(os.path.dirname(__file__), 'logo-transparent.png')
DST_WHITE = os.path.join(os.path.dirname(__file__), 'logo-white.png')

# Load and ensure RGBA
img = Image.open(SRC).convert('RGBA')
w, h = img.size
pixels = img.load()

# --- Pass 1: transparent version (white -> alpha) ---
# Threshold: pixels that are "near white" become transparent.
# Feather: pixels in a range fade partially so edges stay smooth.
THRESHOLD = 240   # >= this brightness = fully transparent
FEATHER = 40      # softness range below threshold

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        # Distance from pure white
        min_channel = min(r, g, b)
        max_channel = max(r, g, b)
        # Only remove if it's near-neutral (not colored)
        is_neutral = (max_channel - min_channel) < 20
        if is_neutral:
            if min_channel >= THRESHOLD:
                pixels[x, y] = (255, 255, 255, 0)
            elif min_channel >= THRESHOLD - FEATHER:
                # Soft edge
                ratio = (min_channel - (THRESHOLD - FEATHER)) / FEATHER
                new_alpha = int(a * (1 - ratio))
                pixels[x, y] = (r, g, b, new_alpha)

img.save(DST_TRANSPARENT, 'PNG', optimize=True)
print(f"Wrote {DST_TRANSPARENT}")

# --- Pass 2: white version for dark backgrounds ---
# Take the transparent version and convert all colored artwork to white
img2 = Image.open(DST_TRANSPARENT).convert('RGBA')
w2, h2 = img2.size
px2 = img2.load()
for y in range(h2):
    for x in range(w2):
        r, g, b, a = px2[x, y]
        if a > 0:
            px2[x, y] = (255, 255, 255, a)
img2.save(DST_WHITE, 'PNG', optimize=True)
print(f"Wrote {DST_WHITE}")
