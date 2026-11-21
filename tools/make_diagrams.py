"""Generate the diagrams used on the session pages.

Usage:  python tools/make_diagrams.py

Writes docs/assets/diagrams/<name>-light.svg and <name>-dark.svg. A page shows
the right one for the current colour scheme with Material's image suffixes:

    ![Alt text](../../assets/diagrams/git-areas-light.svg#only-light){ .ksr-diagram }
    ![Alt text](../../assets/diagrams/git-areas-dark.svg#only-dark){ .ksr-diagram }

Edit a diagram function below and run the script again. Do not edit the SVG
files by hand.
"""
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path(__file__).resolve().parent.parent / "docs" / "assets" / "diagrams"

SANS = "Inter, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
MONO = "'JetBrains Mono', Menlo, Consolas, 'Courier New', monospace"

THEMES = {
    "light": dict(
        ink="#0F172A", muted="#64748B", line="#CBD5E1", panel="#F8FAFC", card="#FFFFFF",
        blue="#2447D4", blue_soft="#E8EDFB", green="#2F8A68", green_soft="#E3F3EC",
        amber="#B45309", amber_soft="#FDF1DC", red="#B4372F", red_soft="#FBE7E5",
        violet="#6D3FC4", violet_soft="#EFE8FB", on_fill="#FFFFFF",
    ),
    "dark": dict(
        ink="#E2E8F0", muted="#94A3B8", line="#3B4863", panel="#131B2E", card="#1A2338",
        blue="#8FA8FF", blue_soft="#1E2A55", green="#6CC7A3", green_soft="#173B30",
        amber="#F2B55C", amber_soft="#43310F", red="#F08B84", red_soft="#4A1F1C",
        violet="#B9A0F5", violet_soft="#2E2350", on_fill="#0B1020",
    ),
}


class Svg:
    """A small SVG builder. Colours are theme keys such as "blue" or "ink"."""

    def __init__(self, width, height, theme):
        self.w, self.h, self.t, self.parts = width, height, THEMES[theme], []

    def c(self, key):
        return self.t.get(key, key)

    def rect(self, x, y, w, h, fill="card", stroke="line", r=10, sw=1.5, dash=None):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        self.parts.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{self.c(fill)}" '
            f'stroke="{self.c(stroke)}" stroke-width="{sw}"{d}/>')

    def circle(self, x, y, r, fill="card", stroke="line", sw=2):
        self.parts.append(
            f'<circle cx="{x}" cy="{y}" r="{r}" fill="{self.c(fill)}" stroke="{self.c(stroke)}" stroke-width="{sw}"/>')

    def text(self, x, y, s, size=16, fill="ink", weight=400, anchor="middle", mono=False):
        self.parts.append(
            f'<text x="{x}" y="{y}" font-family="{MONO if mono else SANS}" font-size="{size}" '
            f'font-weight="{weight}" fill="{self.c(fill)}" text-anchor="{anchor}">{escape(s)}</text>')

    def line(self, x1, y1, x2, y2, stroke="line", sw=2, dash=None, arrow=False):
        d = f' stroke-dasharray="{dash}"' if dash else ""
        m = f' marker-end="url(#a-{stroke})"' if arrow else ""
        self.parts.append(
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{self.c(stroke)}" stroke-width="{sw}"{d}{m}/>')

    def path(self, d, stroke="line", sw=2, arrow=False, dash=None):
        ds = f' stroke-dasharray="{dash}"' if dash else ""
        m = f' marker-end="url(#a-{stroke})"' if arrow else ""
        self.parts.append(
            f'<path d="{d}" fill="none" stroke="{self.c(stroke)}" stroke-width="{sw}"{ds}{m}/>')

    def fat_arrow(self, x1, x2, y, label, fill, h=40, size=15):
        """A block arrow from x1 to x2 (either direction) with the label inside."""
        head = 22 if x2 > x1 else -22
        half, wing = h / 2, h / 2 + 10
        pts = [(x1, y - half), (x2 - head, y - half), (x2 - head, y - wing), (x2, y),
               (x2 - head, y + wing), (x2 - head, y + half), (x1, y + half)]
        self.parts.append(
            f'<polygon points="{" ".join(f"{px},{py}" for px, py in pts)}" fill="{self.c(fill)}"/>')
        self.text((x1 + x2 - head) / 2, y + size * 0.35, label, size=size, fill="on_fill", weight=600, mono=True)

    def box(self, x, y, w, h, title, sub=None, fill="card", stroke="line", size=16, mono=False, ink="ink"):
        self.rect(x, y, w, h, fill=fill, stroke=stroke)
        if sub:
            self.text(x + w / 2, y + h / 2 - 3, title, size=size, weight=600, mono=mono, fill=ink)
            self.text(x + w / 2, y + h / 2 + 17, sub, size=13, fill="muted")
        else:
            self.text(x + w / 2, y + h / 2 + size * 0.35, title, size=size, weight=600, mono=mono, fill=ink)

    def render(self):
        markers = "".join(
            f'<marker id="a-{k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" '
            f'orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="{v}"/></marker>'
            for k, v in self.t.items())
        return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {self.w} {self.h}" '
                f'width="{self.w}" height="{self.h}" role="img"><defs>{markers}</defs>'
                + "".join(self.parts) + "</svg>\n")


# ------------------------------------------------------------------ diagrams

def git_areas(theme):
    s = Svg(900, 380, theme)
    xs = [110, 330, 550, 790]
    # The two groups: your laptop, and online
    s.rect(14, 14, 650, 352, fill="panel", stroke="line", dash="6 5")
    s.rect(684, 14, 202, 352, fill="panel", stroke="line", dash="6 5")
    s.text(339, 44, "Your laptop", size=18, weight=700)
    s.text(785, 44, "Online", size=18, weight=700)
    boxes = [("Working directory", "files you edit", "amber_soft", "amber"),
             ("Staging area", "what the next commit takes", "green_soft", "green"),
             ("Local repository", "history on your laptop", "blue_soft", "blue"),
             ("GitHub", "history online", "violet_soft", "violet")]
    for x, (title, sub, fill, stroke) in zip(xs, boxes):
        s.line(x, 124, x, 350, stroke="line", sw=2)
        s.box(x - 92, 62, 184, 62, title, sub, fill=fill, stroke=stroke, size=15)
    s.fat_arrow(xs[0], xs[1], 178, "git add", "amber")
    s.fat_arrow(xs[1], xs[2], 178, "git commit", "green")
    s.fat_arrow(xs[2], xs[3], 178, "git push", "blue")
    s.fat_arrow(xs[3], xs[0], 290, "git pull", "violet")
    s.text(450, 240, "Your work travels to the right, one step at a time.", size=14, fill="muted")
    s.text(450, 350, "A teammate's work comes back in one step.", size=14, fill="muted")
    return s


def branch_merge(theme):
    s = Svg(900, 320, theme)
    y_main, y_branch = 210, 90
    s.text(40, y_main + 5, "main", size=15, weight=700, anchor="start", mono=True, fill="blue")
    s.text(40, y_branch + 5, "improve-readme", size=15, weight=700, anchor="start", mono=True, fill="green")
    s.line(230, y_main, 700, y_main, stroke="blue", sw=3, dash="2 7")
    s.line(230, y_main, 300, y_main, stroke="blue", sw=3)
    s.path(f"M300 {y_main} C 360 {y_main}, 380 {y_branch}, 450 {y_branch}", stroke="green", sw=3)
    s.path(f"M450 {y_branch} C 560 {y_branch}, 600 {y_main}, 692 {y_main}", stroke="green", sw=3, dash="7 6", arrow=True)
    s.circle(300, y_main, 16, fill="blue_soft", stroke="blue", sw=3)
    s.circle(450, y_branch, 16, fill="green_soft", stroke="green", sw=3)
    s.circle(710, y_main, 16, fill="blue_soft", stroke="blue", sw=3)
    s.text(300, y_main + 46, "Add Day 1 programs", size=13, fill="muted")
    s.text(450, y_branch - 30, "Add author line to README", size=13, fill="muted")
    s.text(710, y_main + 46, "main now has both commits", size=13, fill="muted")
    s.text(352, 150, "git switch -c", size=13, mono=True, weight=600, anchor="end", fill="green")
    s.text(640, 140, "git merge", size=13, mono=True, weight=600, anchor="start", fill="green")
    s.text(450, 300, "A branch is a side road. Merging brings its commits back into main.", size=14, fill="muted")
    return s


def chmod_bits(theme):
    s = Svg(900, 300, theme)
    groups = [("-", "file type", "muted", "panel", "- file,  d folder", None),
              ("rwx", "owner", "blue", "blue_soft", "read, write, execute", "4 + 2 + 1 = 7"),
              ("r-x", "group", "green", "green_soft", "read, execute", "4 + 0 + 1 = 5"),
              ("r--", "others", "amber", "amber_soft", "read", "4 + 0 + 0 = 4")]
    xs, widths = [70, 190, 430, 670], [80, 200, 200, 200]
    for (bits, who, colour, soft, means, total), x, w in zip(groups, xs, widths):
        s.rect(x, 40, w, 76, fill=soft, stroke=colour, sw=2)
        s.text(x + w / 2, 92, bits, size=40, weight=700, mono=True, fill=colour)
        s.text(x + w / 2, 150, who, size=17, weight=700, fill=colour)
        s.text(x + w / 2, 176, means, size=14, fill="muted")
        if total:
            s.text(x + w / 2, 208, total, size=16, weight=600, mono=True)
    s.rect(300, 236, 300, 46, fill="card", stroke="line")
    s.text(450, 266, "chmod 754 run.sh", size=18, weight=700, mono=True)
    return s


def call_stack(theme):
    s = Svg(900, 400, theme)
    calls = ["factorial(4)", "factorial(3)", "factorial(2)", "factorial(1)"]
    waits = ["waits for 4 × factorial(3)", "waits for 3 × factorial(2)", "waits for 2 × factorial(1)", "base case: answers directly"]
    returns = ["returns 24", "returns 6", "returns 2", "returns 1"]
    x, w, h, gap = 310, 280, 62, 30
    for i, (call, wait) in enumerate(zip(calls, waits)):
        y = 30 + i * (h + gap)
        last = i == len(calls) - 1
        s.box(x, y, w, h, call, wait, fill="green_soft" if last else "blue_soft",
              stroke="green" if last else "blue", mono=True, size=17)
        if not last:
            s.line(x + 60, y + h + 2, x + 60, y + h + gap - 3, stroke="blue", sw=2.5, arrow=True)
            s.line(x + w - 60, y + h + gap - 2, x + w - 60, y + h + 3, stroke="green", sw=2.5, arrow=True)
            s.text(x + w + 16, y + h + gap / 2 + 5, returns[i + 1], size=14, weight=600, mono=True, anchor="start", fill="green")
    s.text(x + w + 16, 30 + h / 2 + 5, returns[0], size=15, weight=700, mono=True, anchor="start", fill="green")
    s.text(150, 150, "Calls go down", size=16, weight=700, fill="blue")
    s.text(150, 174, "each one waits", size=13, fill="muted")
    s.text(775, 150, "Answers come back up", size=16, weight=700, fill="green")
    s.text(775, 174, "last call finishes first", size=13, fill="muted")
    return s


def tree_edges(s, pos, edges, stroke="line", r=0):
    for a, b in edges:
        (x1, y1), (x2, y2) = pos[a], pos[b]
        s.line(x1, y1, x2, y2, stroke=stroke, sw=2)


def subsets_tree(theme):
    s = Svg(900, 400, theme)
    pos = {"[ ]": (450, 50), "[1]": (220, 150), "[2]": (520, 150), "[3]": (740, 150),
           "[1, 2]": (130, 250), "[1, 3]": (320, 250), "[2, 3]": (520, 250), "[1, 2, 3]": (130, 350)}
    edges = [("[ ]", "[1]"), ("[ ]", "[2]"), ("[ ]", "[3]"), ("[1]", "[1, 2]"), ("[1]", "[1, 3]"),
             ("[2]", "[2, 3]"), ("[1, 2]", "[1, 2, 3]")]
    tree_edges(s, pos, edges)
    for label, (x, y) in pos.items():
        w = 34 + 11 * len(label)
        s.rect(x - w / 2, y - 21, w, 42, fill="blue_soft", stroke="blue", sw=2)
        s.text(x, y + 6, label, size=16, weight=600, mono=True)
    for (x, y, label) in [(318, 92, "add 1"), (500, 96, "add 2"), (616, 92, "add 3"),
                          (150, 204, "add 2"), (296, 204, "add 3"), (546, 204, "add 3"), (156, 304, "add 3")]:
        s.text(x, y, label, size=12, fill="muted")
    s.text(700, 290, "8 boxes = the 8 subsets", size=16, weight=700, fill="blue")
    s.text(700, 314, "of [1, 2, 3]", size=14, fill="muted")
    return s


def binary_tree(theme):
    s = Svg(900, 320, theme)
    pos = {4: (450, 60), 2: (300, 160), 6: (600, 160), 1: (220, 260), 3: (380, 260), 7: (680, 260)}
    tree_edges(s, pos, [(4, 2), (4, 6), (2, 1), (2, 3), (6, 7)])
    for val, (x, y) in pos.items():
        leaf = val in (1, 3, 7)
        s.circle(x, y, 28, fill="green_soft" if leaf else "blue_soft", stroke="green" if leaf else "blue", sw=2.5)
        s.text(x, y + 7, str(val), size=20, weight=700, mono=True)
    for i, y in enumerate((60, 160, 260)):
        s.text(60, y + 5, f"Level {i}", size=14, fill="muted", anchor="start")
    s.text(520, 50, "root", size=14, weight=600, fill="blue", anchor="start")
    s.text(760, 265, "leaves: no children", size=14, weight=600, fill="green", anchor="start")
    s.text(340, 104, "left", size=12, fill="muted")
    s.text(560, 104, "right", size=12, fill="muted")
    return s


def graph(theme):
    s = Svg(900, 300, theme)
    pos = {"A": (250, 80), "B": (450, 80), "D": (650, 80), "C": (250, 220), "E": (450, 220)}
    tree_edges(s, pos, [("A", "B"), ("B", "D"), ("A", "C"), ("B", "E"), ("C", "E")], stroke="muted")
    for name, (x, y) in pos.items():
        s.circle(x, y, 30, fill="blue_soft", stroke="blue", sw=2.5)
        s.text(x, y + 7, name, size=20, weight=700, mono=True)
    s.text(740, 180, "5 nodes, 5 edges", size=16, weight=700, fill="blue")
    s.text(740, 204, "B has three neighbours:", size=13, fill="muted")
    s.text(740, 224, "A, D and E", size=13, fill="muted")
    return s


def islands(theme):
    s = Svg(900, 330, theme)
    grid = ["11000", "11000", "00100", "00011"]
    island = {(0, 0): 0, (0, 1): 0, (1, 0): 0, (1, 1): 0, (2, 2): 1, (3, 3): 2, (3, 4): 2}
    colours = [("blue_soft", "blue"), ("green_soft", "green"), ("amber_soft", "amber")]
    size, x0, y0 = 64, 150, 36
    for r, row in enumerate(grid):
        for c, cell in enumerate(row):
            fill, stroke = colours[island[(r, c)]] if cell == "1" else ("panel", "line")
            s.rect(x0 + c * size, y0 + r * size, size - 6, size - 6, fill=fill, stroke=stroke, sw=2 if cell == "1" else 1.5, r=8)
            s.text(x0 + c * size + (size - 6) / 2, y0 + r * size + 37, cell, size=20, weight=700, mono=True,
                   fill=stroke if cell == "1" else "muted")
    for i, (label, (soft, colour)) in enumerate(zip(["Island 1: four cells", "Island 2: one cell", "Island 3: two cells"], colours)):
        y = 90 + i * 44
        s.rect(540, y - 16, 22, 22, fill=soft, stroke=colour, sw=2, r=5)
        s.text(574, y + 1, label, size=15, anchor="start")
    s.text(540, 240, "Answer: 3", size=20, weight=700, anchor="start", fill="blue")
    s.text(540, 264, "Diagonal cells do not connect.", size=13, anchor="start", fill="muted")
    return s


def linked_list(theme):
    s = Svg(900, 200, theme)
    s.text(70, 106, "head", size=16, weight=700, mono=True, fill="blue")
    s.line(100, 100, 148, 100, stroke="blue", sw=2.5, arrow=True)
    for i, val in enumerate((1, 2, 3)):
        x = 150 + i * 200
        s.rect(x, 66, 130, 68, fill="blue_soft", stroke="blue", sw=2)
        s.line(x + 78, 66, x + 78, 134, stroke="blue", sw=2)
        s.text(x + 39, 108, str(val), size=24, weight=700, mono=True)
        s.circle(x + 104, 100, 5, fill="blue", stroke="blue")
        s.line(x + 104, 100, x + 198, 100, stroke="blue", sw=2.5, arrow=True)
        s.text(x + 39, 158, "val", size=13, fill="muted", mono=True)
        s.text(x + 104, 158, "next", size=13, fill="muted", mono=True)
    s.rect(750, 76, 96, 48, fill="panel", stroke="line", dash="5 4")
    s.text(798, 106, "None", size=17, weight=600, mono=True, fill="muted")
    s.text(450, 36, "Each node knows only the node after it.", size=14, fill="muted")
    return s


def stack_queue(theme):
    s = Svg(900, 340, theme)
    # Stack, on the left
    s.text(210, 36, "Stack: last in, first out", size=17, weight=700, fill="blue")
    for i, label in enumerate(["C", "B", "A"]):
        y = 110 + i * 58
        s.rect(140, y, 140, 50, fill="blue_soft", stroke="blue", sw=2)
        s.text(210, y + 32, label, size=20, weight=700, mono=True)
    s.path("M70 70 C 70 110, 100 132, 134 134", stroke="blue", sw=2.5, arrow=True)
    s.path("M286 134 C 320 132, 350 110, 350 70", stroke="red", sw=2.5, arrow=True)
    s.text(70, 60, "push", size=14, weight=600, mono=True, fill="blue")
    s.text(350, 60, "pop", size=14, weight=600, mono=True, fill="red")
    s.text(210, 310, "Both happen at the top", size=13, fill="muted")
    s.line(450, 30, 450, 316, stroke="line", sw=1.5, dash="5 5")
    # Queue, on the right
    s.text(675, 36, "Queue: first in, first out", size=17, weight=700, fill="green")
    for i, label in enumerate(["A", "B", "C"]):
        x = 570 + i * 72
        s.rect(x, 150, 64, 64, fill="green_soft", stroke="green", sw=2)
        s.text(x + 32, 190, label, size=20, weight=700, mono=True)
    s.line(564, 182, 496, 182, stroke="red", sw=2.5, arrow=True)
    s.line(858, 182, 790, 182, stroke="green", sw=2.5, arrow=True)
    s.text(530, 140, "dequeue", size=14, weight=600, mono=True, fill="red")
    s.text(828, 140, "enqueue", size=14, weight=600, mono=True, fill="green")
    s.text(602, 240, "front", size=13, fill="muted")
    s.text(746, 240, "back", size=13, fill="muted")
    s.text(675, 310, "Join at the back, leave from the front", size=13, fill="muted")
    return s


def binary_search(theme):
    s = Svg(900, 330, theme)
    nums = [-1, 0, 3, 5, 9, 12]
    steps = [(0, 5, 2, "Step 1:  3 is less than 9, so throw away the left half"),
             (3, 5, 4, "Step 2:  found 9 at index 4")]
    x0, cw = 240, 76
    s.text(450, 30, "Looking for 9 in a sorted list", size=16, weight=700)
    for row, (low, high, mid, note) in enumerate(steps):
        y = 78 + row * 130
        for i, val in enumerate(nums):
            active = low <= i <= high
            is_mid = i == mid
            fill, stroke = ("green_soft", "green") if is_mid and row == 1 else ("blue_soft", "blue") if is_mid else ("card", "line") if active else ("panel", "line")
            s.rect(x0 + i * cw, y, cw - 8, 48, fill=fill, stroke=stroke, sw=2.5 if is_mid else 1.5, r=8)
            s.text(x0 + i * cw + (cw - 8) / 2, y + 31, str(val), size=18, weight=700, mono=True,
                   fill="ink" if active else "line")
            tags = [t for t, at in (("low", low), ("mid", mid), ("high", high)) if at == i]
            if tags:
                s.text(x0 + i * cw + (cw - 8) / 2, y - 10, " = ".join(tags), size=12, weight=600, mono=True,
                       fill="blue" if is_mid else "muted")
        s.text(450, y + 76, note, size=14, fill="muted")
    return s


def array_index(theme):
    s = Svg(900, 240, theme)
    prices = [40, 10, 30]
    x0, cw = 285, 110
    s.text(450, 36, "prices = [40, 10, 30]", size=17, weight=700, mono=True)
    s.text(264, 113, "value", size=14, fill="muted", anchor="end")
    s.text(264, 171, "index", size=14, fill="muted", anchor="end")
    for i, val in enumerate(prices):
        x = x0 + i * cw
        s.rect(x, 64, cw - 8, 76, fill="blue_soft", stroke="blue", sw=2)
        s.text(x + (cw - 8) / 2, 113, str(val), size=26, weight=700, mono=True)
        s.text(x + (cw - 8) / 2, 171, str(i), size=18, weight=700, mono=True, fill="blue")
    s.text(450, 216, "Indexes start at 0, so the last index is len(prices) - 1, which is 2.", size=14, fill="muted")
    return s


def prefix_sum(theme):
    s = Svg(900, 330, theme)
    nums, prefix = [2, 4, 1, 7, 3], [0, 2, 6, 7, 14, 17]
    x0, cw, bw = 250, 90, 82
    s.text(232, 91, "nums", size=15, weight=700, mono=True, anchor="end")
    s.text(232, 203, "prefix", size=15, weight=700, mono=True, anchor="end")
    for i, val in enumerate(nums):
        x = x0 + cw / 2 + i * cw
        inside = 1 <= i <= 3
        s.text(x + bw / 2, 46, str(i), size=12, fill="muted", mono=True)
        s.rect(x, 58, bw, 52, fill="green_soft" if inside else "card", stroke="green" if inside else "line", sw=2 if inside else 1.5)
        s.text(x + bw / 2, 91, str(val), size=20, weight=700, mono=True)
    s.text(x0 + cw / 2 + 2 * cw + bw / 2, 136, "4 + 1 + 7 = 12", size=15, weight=700, mono=True, fill="green")
    for i, val in enumerate(prefix):
        x = x0 + i * cw
        fill, stroke = ("blue_soft", "blue") if i == 4 else ("amber_soft", "amber") if i == 1 else ("card", "line")
        s.rect(x, 170, bw, 52, fill=fill, stroke=stroke, sw=2 if i in (1, 4) else 1.5)
        s.text(x + bw / 2, 203, str(val), size=20, weight=700, mono=True)
        s.text(x + bw / 2, 242, str(i), size=12, fill="muted", mono=True)
    s.text(476, 284, "prefix[4] - prefix[1] = 14 - 2 = 12", size=17, weight=700, mono=True)
    s.text(476, 310, "Everything before index 4, minus everything before index 1.", size=14, fill="muted")
    return s


def two_sum_lookup(theme):
    s = Svg(900, 366, theme)
    rows = [(1, "9 - 1 = 8", "{ }", "8 not seen. Store 1."),
            (5, "9 - 5 = 4", "{1: 0}", "4 not seen. Store 5."),
            (3, "9 - 3 = 6", "{1: 0, 5: 1}", "6 not seen. Store 3."),
            (8, "9 - 8 = 1", "{1: 0, 5: 1, 3: 2}", "1 is at index 0. Answer [0, 3]")]
    s.text(450, 32, "nums = [1, 5, 3, 8]    target = 9", size=16, weight=700, mono=True)
    for x, label in [(130, "Number"), (290, "Partner needed"), (510, "Seen so far (value: index)"), (760, "What happens")]:
        s.text(x, 68, label, size=13, fill="muted")
    for i, (num, need, seen, note) in enumerate(rows):
        y = 84 + i * 64
        found = i == len(rows) - 1
        soft, colour = ("green_soft", "green") if found else ("blue_soft", "blue")
        s.text(52, y + 31, f"index {i}", size=12, fill="muted")
        s.rect(95, y, 70, 52, fill=soft, stroke=colour, sw=2)
        s.text(130, y + 34, str(num), size=22, weight=700, mono=True)
        s.text(290, y + 32, need, size=16, weight=600, mono=True)
        s.rect(400, y, 220, 52, fill="green_soft" if found else "panel", stroke="green" if found else "line", sw=2 if found else 1.5)
        s.text(510, y + 32, seen, size=15, weight=600, mono=True)
        s.text(642, y + 31, note, size=14, anchor="start", weight=700 if found else 400, fill="green" if found else "ink")
    s.text(450, 352, "One pass. Each number is checked against the dictionary first, then stored.", size=14, fill="muted")
    return s


def two_pointers(theme):
    s = Svg(900, 296, theme)
    word = "racecar"
    x0, cw, bw = 170, 80, 72
    pair_colours = [("blue_soft", "blue"), ("green_soft", "green"), ("amber_soft", "amber")]
    centre = lambda i: x0 + i * cw + bw / 2
    for step, (i, j) in enumerate([(0, 6), (1, 5), (2, 4)]):
        control = 20 + step * 30
        s.path(f"M{centre(i)} 108 C {centre(i)} {control}, {centre(j)} {control}, {centre(j)} 108",
               stroke=pair_colours[step][1], sw=2.5)
        s.text(centre(3), 34 + step * 23, f"step {step + 1}", size=12, weight=600, fill=pair_colours[step][1])
    for i, ch in enumerate(word):
        soft, colour = pair_colours[min(i, 6 - i)] if i != 3 else ("violet_soft", "violet")
        s.rect(x0 + i * cw, 110, bw, 64, fill=soft, stroke=colour, sw=2)
        s.text(centre(i), 152, ch, size=26, weight=700, mono=True)
        s.text(centre(i), 196, str(i), size=12, fill="muted", mono=True)
    s.text(228, 233, "left", size=15, weight=700, mono=True, fill="blue", anchor="end")
    s.line(238, 228, 330, 228, stroke="blue", sw=2.5, arrow=True)
    s.text(664, 233, "right", size=15, weight=700, mono=True, fill="blue", anchor="start")
    s.line(654, 228, 562, 228, stroke="blue", sw=2.5, arrow=True)
    s.text(centre(3), 232, "they meet here", size=12, fill="muted")
    s.text(450, 274, "Compare the two ends. If they match, move both pointers one step inward.", size=14, fill="muted")
    return s


def sliding_window(theme):
    s = Svg(900, 366, theme)
    nums = [2, 1, 5, 1, 3, 2]
    sums = ["2 + 1 + 5 = 8", "8 + 1 - 2 = 7", "7 + 3 - 1 = 9", "9 + 2 - 5 = 6"]
    x0, cw, bw = 250, 60, 52
    s.text(450, 30, "A window of size 3 sliding over [2, 1, 5, 1, 3, 2]", size=16, weight=700)
    for row, note in enumerate(sums):
        y = 56 + row * 70
        best = row == 2
        soft, colour = ("green_soft", "green") if best else ("blue_soft", "blue")
        s.text(228, y + 28, f"window {row + 1}", size=13, fill="muted", anchor="end")
        for i, val in enumerate(nums):
            inside = row <= i < row + 3
            s.rect(x0 + i * cw, y, bw, 46, fill=soft if inside else "panel", stroke=colour if inside else "line",
                   sw=2 if inside else 1.5, r=8)
            s.text(x0 + i * cw + bw / 2, y + 30, str(val), size=18, weight=700, mono=True,
                   fill="ink" if inside else "muted")
        s.text(640, y + 29, note, size=16, weight=700 if best else 600, mono=True, anchor="start",
               fill="green" if best else "ink")
        if best:
            s.text(790, y + 29, "best", size=14, weight=700, anchor="start", fill="green")
    s.text(450, 346, "Each slide adds the number that enters and subtracts the number that leaves.", size=14, fill="muted")
    return s


def dp_table(theme):
    s = Svg(900, 304, theme)
    dp = [0, 1, 1, 2, 3, 5, 8]
    x0, cw, bw = 135, 90, 82
    centre = lambda i: x0 + i * cw + bw / 2
    s.text(450, 32, "Filling the table for fib_table(6)", size=16, weight=700)
    s.path(f"M{centre(4)} 116 C {centre(4)} 50, {centre(6) + 18} 50, {centre(6) + 18} 113", stroke="blue", sw=2.5, arrow=True)
    s.path(f"M{centre(5)} 116 C {centre(5)} 82, {centre(6) - 20} 82, {centre(6) - 20} 113", stroke="blue", sw=2.5, arrow=True)
    for i, val in enumerate(dp):
        fill, stroke = (("amber_soft", "amber") if i < 2 else ("blue_soft", "blue") if i in (4, 5)
                        else ("green_soft", "green") if i == 6 else ("card", "line"))
        s.rect(x0 + i * cw, 120, bw, 60, fill=fill, stroke=stroke, sw=1.5 if stroke == "line" else 2)
        s.text(centre(i), 159, str(val), size=22, weight=700, mono=True)
        s.text(centre(i), 204, f"dp[{i}]", size=13, fill="muted", mono=True)
    s.text((centre(0) + centre(1)) / 2, 228, "base cases", size=13, weight=600, fill="amber")
    s.text(450, 262, "dp[6] = dp[5] + dp[4] = 5 + 3 = 8", size=17, weight=700, mono=True)
    s.text(450, 288, "Each cell is the sum of the two cells before it, filled from left to right.", size=14, fill="muted")
    return s


DIAGRAMS = {
    "array-index": array_index,
    "prefix-sum": prefix_sum,
    "two-sum-lookup": two_sum_lookup,
    "two-pointers": two_pointers,
    "sliding-window": sliding_window,
    "dp-table": dp_table,
    "git-areas": git_areas,
    "git-branch-merge": branch_merge,
    "chmod-bits": chmod_bits,
    "call-stack": call_stack,
    "subsets-tree": subsets_tree,
    "binary-tree": binary_tree,
    "graph": graph,
    "islands-grid": islands,
    "linked-list": linked_list,
    "stack-queue": stack_queue,
    "binary-search": binary_search,
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, build in DIAGRAMS.items():
        for theme in THEMES:
            (OUT / f"{name}-{theme}.svg").write_text(build(theme).render())
    print(f"{len(DIAGRAMS) * len(THEMES)} files written to {OUT}")


if __name__ == "__main__":
    main()
