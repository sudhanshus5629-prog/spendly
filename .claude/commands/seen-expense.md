---
description: seed realistic dummy expenses for a specific user
argument-hint: "<user_id> <count> <months>"
allowed-hint: Read, bash(python3:*)
---

Read database/dp.py to understand the expenses table
schema, the db connection pattern, and the database
file name.

user input: $ARGUMENTS

## step 1 - parse arguments

Extract form $ARGUMENTS:

- user_id - integer
- count - integer, number of expenses to create
- months - integer, how many past months to spread them acroos

If any argument is missing or not a valid integer, stop and say.
"Usage: /seed_expenses <user_id> <count> <months>
Example: /seed-expenses 1 50 6"

## step 2 - verify user exists

Before generating anything, confirm the user_id exists
in the user table. if not, stop and say:
"no user found with id <user_id>."

## step 3 - Generate and insert expenses

Write and run a python script that:

1. spreads expenses randomly across the past <months> months
2. user these categories with realistic Indian descriptions
   and amount(rs):

- Food: 50-800
- Transport: 20-500
- Health: 100-2000
- Entertainment: 100-1500
- Bolls: 200-300
- Entertinment: 100-1500
- Shopping: 200-500
- other: 50-1000

3. Distribute categories roughly proportionally.
   (Food moost common, Health and Entertainment least)

4. Uses the db connection pattern form db.py - do not
   hardcode the database filename

5. User parameterised queries only - no string formating in SQL

6. Inserts all expenses in a single transaction -
   roll back everything if any insert fails

## Step 4 - confirm

print:

- How many expenses were inserted
- The data range they span
- A sample of 5 inserted records
