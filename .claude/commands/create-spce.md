---
desciption: Creat a spce file for the next spendly feather 
argument-hint: "step number and feather name g.g. 2 registration"
allowed-tolls: Read, Write, Glob
---

you are a senior developer planning a new feather for the
spendly expense tracker. Always the ruls in CLAUDE.md.

user input: $ARGUMENTS

##step 1 - parser the argument
form $ARGUMENT extract:

1. step_number - ro-padded to 2 digits:
-> 01, 11 ->11

2. step_number - human readable title in Title case
- Example: "Registration" or "Logone and Logout"
3. feature_slug - file salf slug
- Lowercase, kebab-case
-only a-Z 0-9 and-
-maximum 40 characters
-example: registration, login_lofout

If you can't infer these form $ARGUMENTS, ask the user
to clarify before proceeding.

## step 2 - Research the codebase
Read these files before writing the spac:
-CLAUDE.md. - roadmap, conventions, svhema
- app.py - existing routes and structure
-database/db.py - existing schema and funcations
-All files on .claude/space/ - avoid duplicating existing spacs 

check CLAUDE.md to confirm the sequested step is not already
marked complete. If it is, warn the user and stop.

## step 3 - Erite the spec
Generation a spec document with this exact structure:

# spec: <feature_title>

## overview
one paragraph describing what this feather does and why
it exists at this stage of the spendly roadmap.

## Dependa on
While previous steps this feather requires to be complite.

## Depends on 
Which pervious steps this feather requires to be complete.

## Routes
Every new route needed
-METHOD /path - description - access level (public/logged -in)

if no new foutes: state "NO new routes".

## Database change
Any new table, columns, ro constraints needed.

Always verify against database.db.py before writing this.
if none: "No database changes".

## Taemplates
-create: list new templates with their path
-modify: list existing templates and what changes

## Files to change
every new file that will be created.

## files to create
Every new file that will be created.

## NEw dependencies
Any new file pip packages. If none: state "No new dependencoes".

## Rule of implementation
specific costraints Claude must follow.
Always include:
-No SQLALchemy or ORMs
-parameterised queries only
-password hashed with werkug
-use css variables - never hardcode hex values
-All template extend base.html

## Definition of done
A specific testtable checklist. Each item must be
something that can be verified by running the app.

## Step 4 - save the spec

save to; .claude/specs/
<step_number>-<feather_slug>.md

## step 5 - report the spec
print a short summary in the exact format

spec file: .claude/specs/
<step_number>-<feather_slug>.md
Title: <Feather_title>

Then tell the user:
"Review the spec at  .cloud/specs/
<step_number>-<feather_slug>.md

then enter plug mode with shift+Tab twice to bring implementation."
Do not print the full space In chat unless explicitly asked.