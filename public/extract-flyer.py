"""Extract clean images from the A&K flyer for use on the website."""
from PIL import Image
import os

FLYER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'assets', 'flyer.png'))
OUT = os.path.dirname(__file__)

im = Image.open(FLYER).convert('RGB')
W, H = im.size
print(f"Source: {W}x{H}")

# Tighter, better-aligned coordinates for 1024x1536 flyer.
crops = [
    # 4 service photos across middle band (row is ~525..790).
    # Each rounded-corner card is ~230 wide with ~15px gaps.
    ('service-valet-trash.jpg',    47, 530,  273, 760),
    ('service-recycling.jpg',     289, 530,  515, 760),
    ('service-bulk.jpg',          531, 530,  757, 760),
    ('service-power-wash.jpg',    773, 530,  999, 760),
    # Bottom-left truck: skip the "HOAs." caption at the top.
    ('truck.jpg',                  15, 1260,  348, 1445),
    # Bottom-right apartment/community building: skip "communities." caption + left blue edge.
    ('community.jpg',             702, 1258, 1005, 1445),
]

for name, l, t, r, b in crops:
    crop = im.crop((l, t, r, b))
    # 2× upscale to Retina-friendly size (source is only ~230px)
    target_w = min(600, crop.size[0] * 2)
    ratio = target_w / crop.size[0]
    crop = crop.resize((target_w, int(crop.size[1] * ratio)), Image.LANCZOS)
    out = os.path.join(OUT, name)
    crop.save(out, 'JPEG', quality=90, optimize=True, progressive=True)
    print(f"  -> {name}  {crop.size[0]}x{crop.size[1]}  ({os.path.getsize(out)//1024} KB)")

print("Done.")
