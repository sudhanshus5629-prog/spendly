# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Spendly** is a Flask-based personal expense tracker, built as a guided student learning project (not production software). Server-rendered pages via Jinja2, plain CSS/JS, SQLite planned for storage — no frontend framework, no ORM.

## Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Run the dev server (http://127.0.0.1:5001)
python app.py

# Run tests
pytest
```

There is no build step, linter, or bundler configured — templates and static assets are served directly by Flask.

## Architecture

- **`app.py`** — single entry point; all routes are defined here as flat `@app.route` functions returning `render_template(...)`. There is no blueprint structure — new routes are added directly to this file.
- **`database/db.py`** — intended to hold `get_db()`, `init_db()`, and `seed_db()` for a raw-SQLite connection (row_factory + foreign keys enabled, `CREATE TABLE IF NOT EXISTS` schema, dev seed data). Currently unimplemented (comment-only placeholder) — expense data is not yet persisted anywhere.
- **`templates/base.html`** — the shared layout every page extends via `{% extends "base.html" %}`. Defines the navbar, footer, font/CSS links, and three Jinja blocks pages fill in: `title`, `content`, `scripts` (plus `head` for extra `<head>` tags). Footer links (Terms, Privacy) live here, not on individual pages.
- **`static/css/style.css`** — the entire design system in one file, structured as commented sections (Variables, Navbar, Hero, Buttons, Features, Auth pages, Legal pages, Modal, Footer, Responsive). All colors/fonts/spacing are driven by CSS custom properties defined in `:root` (`--ink`, `--paper`, `--accent`, `--font-display`, `--radius-*`, etc.) — always reuse these variables rather than hardcoding new colors, so new pages stay visually consistent with the rest of the site.
- **`static/js/main.js`** — vanilla JS only, no framework/bundler. Features are wrapped in IIFEs keyed off `getElementById` lookups with an early-return guard if the expected elements aren't on the current page (see the "how it works" modal for the pattern).

### Route status

Several routes in `app.py` are intentionally unimplemented placeholders returning a plain string (e.g. `/logout`, `/profile`, `/expenses/add`, `/expenses/<id>/edit`, `/expenses/<id>/delete`) — these are marked as future steps in a guided build (Step 3/4/7/8/9) and have no real logic, templates, or auth/session handling yet. `/`, `/register`, `/login`, `/terms`, and `/privacy` are fully wired to templates.

### Adding a new static page (pattern used for `/terms`, `/privacy`)

1. Add a route in `app.py`: `@app.route("/path")` → `return render_template("name.html")`.
2. Create `templates/name.html` with `{% extends "base.html" %}` and fill the `content` block. For simple text/legal-style pages, reuse the existing `.legal` / `.legal-inner` / `.legal-title` CSS classes rather than inventing new ones.
3. Wire up any links to it via `{{ url_for('endpoint_name') }}`, never a hardcoded path.

### Auth forms

`login.html` and `register.html` both POST to their own route (`/login`, `/register`) and render an `{% if error %}` block via `.auth-error` — the routes handling these submissions (validation, session creation) are not yet implemented in `app.py`.
