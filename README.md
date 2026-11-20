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
