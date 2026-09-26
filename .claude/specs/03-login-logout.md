# Spec: Login and Logout

## Overview

This feature wires up sign-in and sign-out for Spendly. Registration (Step 02) already
lets a visitor create an account and lands them in a session — but there is no way to
sign back in once that session ends, and no way to sign out on purpose. This step
implements `POST /login` (check email + password against the `users` table, start a
session on success) and `GET /logout` (clear the session), plus a session-aware nav
link so a logged-in visitor has a visible way to sign out. It is the third step in the
guided Spendly build, immediately after registration.

## Depends on

- Step 01 — Database setup (`database/db.py`: `get_db()`, `users` table).
- Step 02 — Registration (`users.password_hash`, the `session["user_id"]` pattern).

Both already complete.

## Routes

- `GET /login` — render the sign-in form — public (already exists, unchanged)
- `POST /login` — validate credentials, start a session, redirect — public
- `GET /logout` — clear the session, redirect — safe to call whether or not a session
  is active

## Database changes

No database changes. Reuses `users.email` and `users.password_hash` from the existing
schema.

## Templates

- Create: none
- Modify:
  - `templates/login.html` — no structural changes; it already posts to `/login` and
    has the `{% if error %}` block.
  - `templates/base.html` — nav block becomes session-aware: show a "Sign out" link
    when `session.user_id` is set, otherwise show the existing "Sign in" / "Get
    started" links.

## Files to change

- `app.py` — replace the placeholder `login()` view with a `GET`/`POST` handler, and
  replace the placeholder `logout()` view with one that clears the session.
- `templates/base.html` — session-aware nav.

## Files to create

None.

## New dependencies

No new dependencies. `werkzeug.security.check_password_hash` is already available
(pairs with `generate_password_hash`, already used by `database/db.py` and `app.py`).

## Rules for implementation

- No SQLAlchemy or ORMs — use `sqlite3` via `get_db()` only.
- Parameterized queries only — never build SQL with string formatting/f-strings.
- Check passwords with `werkzeug.security.check_password_hash`; never compare
  plaintext.
- Use existing CSS variables / classes from `static/css/style.css` — never hardcode new
  hex values or invent new classes for the nav link.
- Templates keep extending `base.html`.
- Validate on the server:
  - `email` and `password` must both be non-empty after `.strip()` on email.
  - Invalid credentials (unknown email OR wrong password) must show the **same**
    generic error — do not reveal whether the email exists.
- Every `get_db()` connection must be closed on every code path before returning.
- On success, store the user's id in `session["user_id"]`; on logout, clear the
  session entirely.

## Definition of done

- [ ] Submitting the login form with a valid email/password redirects away from
      `/login` and sets `session["user_id"]`.
- [ ] Submitting a valid email with the wrong password shows a generic "Invalid email
      or password." error (401), not a stack trace.
- [ ] Submitting an email that doesn't exist shows the exact same generic error (401).
- [ ] Submitting an empty email or password shows a "required" validation error (400).
- [ ] Visiting `/logout` while logged in clears the session and redirects to `/`.
- [ ] Visiting `/logout` while logged out does not error — it just redirects to `/`.
- [ ] The nav shows "Sign out" when logged in, and "Sign in" / "Get started" when
      logged out.
- [ ] `app.py` still starts cleanly with `python app.py` and existing routes
      (`/`, `/register`, `/terms`, `/privacy`) are unaffected.
