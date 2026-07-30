"""Optimize AI-generated photos: convert PNG -> JPG, resize, compress, save to public/."""
from PIL import Image
import os

SRC = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'assets'))
DST = os.path.dirname(__file__)

# name in assets  ->  name in public/  (with optional max width for landscape/portrait)
JOBS = [
    ('hero-community.png',        'hero-community.jpg',       1200),
    ('service-valet-trash.png',   'service-valet-trash.jpg',   800),
    ('service-recycling.png',     'service-recycling.jpg',     800),
    ('service-bulk.png',          'service-bulk.jpg',          800),
    ('service-power-wash.png',    'service-power-wash.jpg',    800),
    ('step-1-doorstep.png',       'step-1-doorstep.jpg',       800),
    ('step-2-collection.png',     'step-2-collection.jpg',     800),
    ('step-3-transport.png',      'step-3-transport.jpg',      800),
    ('step-4-clean.png',          'step-4-clean.jpg',          800),
    ('why-truck.png',             'truck.jpg',                1000),
    ('property-garden.png',       'property-garden.jpg',       800),
    ('property-midrise.png',      'property-midrise.jpg',      800),
    ('property-highrise.png',     'property-highrise.jpg',     800),
]

for src_name, dst_name, max_w in JOBS:
    src = os.path.join(SRC, src_name)
    if not os.path.exists(src):
        print(f"  MISSING: {src_name}")
        continue
    im = Image.open(src).convert('RGB')
    w, h = im.size
    if w > max_w:
        ratio = max_w / w
        im = im.resize((max_w, int(h * ratio)), Image.LANCZOS)
    dst = os.path.join(DST, dst_name)
    im.save(dst, 'JPEG', quality=85, optimize=True, progressive=True)
    print(f"  {src_name}  ->  {dst_name}  {im.size[0]}x{im.size[1]}  ({os.path.getsize(dst)//1024} KB)")

print("Done.")
