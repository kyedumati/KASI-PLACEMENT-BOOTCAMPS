# Placement Bootcamps

MkDocs Material site for short placement-readiness bootcamps and crash courses.

## Layout

| Path | What it holds |
|---|---|
| `docs/modules/` | Reusable session pages (one page = one 60-minute session). Written once, reused by every bootcamp. |
| `docs/bootcamps/<name>/` | One folder per engagement: the schedule and day pages. They link into `modules/` and hold no lesson content. |
| `docs/assets/` | Starter code and data files students download. |
| `tests/check_code_blocks.py` | Runs every Python block in `docs/modules/` and checks the solutions. |

## Commands

```bash
python3 -m venv .venv && .venv/bin/pip install -r requirements.txt
```

```bash
.venv/bin/mkdocs serve
```

```bash
.venv/bin/python tests/check_code_blocks.py
```

Build a copy that opens from a pen drive with no server and no internet:

```bash
OFFLINE=true .venv/bin/mkdocs build
```

Then open `site/index.html`.

## Adding a new bootcamp

1. Copy `docs/bootcamps/mtech-placement-25h/` to a new folder.
2. Edit the schedule tables so each slot links to a page in `docs/modules/`.
3. Add the folder to `nav` in `mkdocs.yml`.

Write a new module page only when the new bootcamp needs a session that does not exist yet.

## Not in this repo

Diagnostic tests, post-assessments and quiz answer keys stay out of this public site.

## Slide decks

`slides/dist/` holds one PowerPoint deck per day. They carry the diagrams and step-by-step walkthroughs; code is typed live, and problem statements stay on the site.

| Deck | Slides | Covers |
|---|---|---|
| `Day-1-Programming-Foundations.pptx` | 64 | Opening, Python (3 sessions), Linux and Git |
| `Day-2-DSA-I.pptx` | 125 | Five DSA sessions |
| `Day-3-DSA-II.pptx` | 69 | Two DSA sessions (morning) |

The decks are generated, so edit the scripts and rebuild instead of editing the `.pptx` by hand:

```bash
cd slides && npm install && node build.js
```

`node build.js 2` rebuilds one day. `slides/lib.js` holds the shared design and diagram helpers, and `day1.js`, `day2.js`, `day3.js` hold the content. Walkthrough slides are produced by running the algorithm in the script, so the values on each step are computed, not typed.

`slides/qa.sh 2` (macOS with Keynote) exports a deck to PDF and builds contact sheets in `slides/qa/` for a visual check.
