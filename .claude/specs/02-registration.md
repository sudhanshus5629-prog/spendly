# Spec: Registration

## Overview

This feature wires up the existing `/register` page so new users can actually create an
account. Right now `templates/register.html` posts to `/register`, but the Flask route only
renders the form on GET — there is no handler for the POST submission, no validation, no
password hashing, and no session creation. This step implements that handler using the
`users` table and `get_db()` helper that Step 1 (database setup) already put in place, so a
visitor can sign up and land on a logged-in page. It is the second step in the guided
Spendly build, immediately after the database foundation.

## Depends on

- Step 01 — Database setup (`database/db.py`: `get_db()`, `init_db()`, `users` table).
  Already complete.

## Routes

- `GET /register` — render the registration form — public (already exists, unchanged)
- `POST /register` — validate input, create the user, start a session, redirect —
  public

## Database changes

No database changes. The existing `users` table (id, name, email, password_hash,
created_at) from `database/db.py` already has every column this feature needs.

## Templates

- Create: none
- Modify: `templates/register.html` — no structural changes required; it already has
  the `name` / `email` / `password` fields and the `{% if error %}` block. Keep the
  markup as-is so the new `error` values it already expects render correctly.

## Files to change

- `app.py` — replace the placeholder `register()` view with a `GET`/`POST` handler:
  validate the submitted fields, check for an existing email, hash the password, insert
  the new user, store `user_id` in the Flask session, and redirect to `/` (or `/profile`
  once Step 4 exists — until then, redirect to `/`).

## Files to create

None.

## New dependencies

No new dependencies. `werkzeug.security.generate_password_hash` is already available
(used by `database/db.py`).

## Rules for implementation

- No SQLAlchemy or ORMs — use `sqlite3` via `get_db()` only.
- Parameterized queries only — never build SQL with string formatting/f-strings.
- Hash passwords with `werkzeug.security.generate_password_hash`; never store plaintext.
- Use existing CSS variables from `static/css/style.css` — never hardcode new hex colors.
- The template must keep `{% extends "base.html" %}` (already does — do not change this).
- Validate on the server even though the form has `required`/`type=email` attributes:
  - `name`, `email`, `password` must all be non-empty after `.strip()`.
  - `password` must be at least 8 characters.
  - `email` must not already exist in `users` — show `error="An account with this email already exists."` and re-render `register.html` with a 400 status.
- On any validation failure, re-render `templates/register.html` with an `error` string
  (matches the `{% if error %}` block already in the template) instead of a stack trace.
- On success, store the new user's id in `session["user_id"]` so later steps (profile,
  logout) can rely on it.

## Definition of done

- [ ] Submitting the register form with a new name/email/password creates a row in
      `users` with a hashed (not plaintext) password.
- [ ] After successful registration, the browser is redirected away from `/register`
      (no re-submission on refresh).
- [ ] Submitting the same email twice shows the "already exists" error on the register
      page instead of crashing.
- [ ] Submitting a password shorter than 8 characters shows a validation error and does
      not create a user.
- [ ] Submitting an empty name, email, or password shows a validation error and does not
      create a user.
- [ ] After registering, `session["user_id"]` is set (verify via a temporary debug route
      or the Flask session cookie).
- [ ] `app.py` still starts cleanly with `python app.py` and existing routes
      (`/`, `/login`, `/terms`, `/privacy`) are unaffected.
