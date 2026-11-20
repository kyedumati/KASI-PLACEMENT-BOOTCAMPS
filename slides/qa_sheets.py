"""Render a deck PDF into contact sheets for visual checking.
Usage: python qa_sheets.py qa/d2.pdf d2   -> qa/d2-sheet-01.jpg ...
"""
import glob, os, subprocess, sys
from PIL import Image, ImageDraw
pdf, prefix = sys.argv[1], sys.argv[2]
out = os.path.dirname(pdf)
for f in glob.glob(f"{out}/{prefix}-p-*.jpg") + glob.glob(f"{out}/{prefix}-sheet-*.jpg"):
    os.remove(f)
subprocess.run(["pdftoppm", "-jpeg", "-r", "60", pdf, f"{out}/{prefix}-p"], check=True)
pages = sorted(glob.glob(f"{out}/{prefix}-p-*.jpg"))
cols, rows = 3, 3
for n in range(0, len(pages), cols * rows):
    batch = pages[n:n + cols * rows]
    w, h = Image.open(batch[0]).size
    sheet = Image.new("RGB", (cols * (w + 8) + 8, rows * (h + 30) + 8), "#888888")
    d = ImageDraw.Draw(sheet)
    for i, p in enumerate(batch):
        x, y = 8 + (i % cols) * (w + 8), 8 + (i // cols) * (h + 30)
        sheet.paste(Image.open(p), (x, y + 22))
        d.text((x + 4, y + 4), f"slide {n + i + 1}", fill="white")
    name = f"{out}/{prefix}-sheet-{n // (cols * rows) + 1:02d}.jpg"
    sheet.save(name, quality=80)
    print(name)
