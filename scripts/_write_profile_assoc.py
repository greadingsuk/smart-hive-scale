"""Write the profile association for 2026 GR Personal Projects into state.vscdb"""
import sqlite3
import json
import os

db_path = os.path.join(os.environ['APPDATA'], 'Code', 'User', 'globalStorage', 'state.vscdb')

# The folder URI for this workspace (as VS Code encodes it)
folder_uri = "file:///c%3A/Users/greadings/%21VS%20Code/2026%20GR%20Personal%20Projects"
# The profile ID for "2026 Demo Tenant"
profile_id = "-21979858"

conn = sqlite3.connect(db_path)
cur = conn.cursor()

# 1. Read existing associations
cur.execute("SELECT value FROM ItemTable WHERE key = 'profileAssociations'")
row = cur.fetchone()
if row:
    assoc = json.loads(row[0])
else:
    assoc = {"workspaces": {}, "folders": {}}

print("=== BEFORE ===")
print(json.dumps(assoc, indent=2))

# 2. Add the folder association (don't overwrite existing)
assoc.setdefault("folders", {})
assoc["folders"][folder_uri] = profile_id

new_value = json.dumps(assoc)

# 3. Write back
cur.execute("INSERT OR REPLACE INTO ItemTable (key, value) VALUES (?, ?)",
            ("profileAssociations", new_value))
conn.commit()
print("\n=== WRITTEN ===")

# 4. Verify by reading back
cur.execute("SELECT value FROM ItemTable WHERE key = 'profileAssociations'")
row = cur.fetchone()
verified = json.loads(row[0])
print(json.dumps(verified, indent=2))

conn.close()
print("\nDone. Restart VS Code for the change to take effect.")
