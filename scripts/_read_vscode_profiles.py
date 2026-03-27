"""Read VS Code profile data from state.vscdb"""
import sqlite3
import json
import os
import sys

db_path = os.path.join(os.environ['APPDATA'], 'Code', 'User', 'globalStorage', 'state.vscdb')
conn = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
cur = conn.cursor()

# 1. All tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
print("=== TABLES ===")
for row in cur.fetchall():
    print(f"  {row[0]}")

# 2. Profile-related keys
print("\n=== PROFILE-RELATED KEYS ===")
cur.execute("SELECT key FROM ItemTable WHERE key LIKE '%rofile%' OR key LIKE '%Profile%'")
for row in cur.fetchall():
    print(f"  {row[0]}")

# 3. userDataProfiles
print("\n=== userDataProfiles ===")
cur.execute("SELECT value FROM ItemTable WHERE key = 'userDataProfiles'")
row = cur.fetchone()
if row:
    profiles = json.loads(row[0])
    print(json.dumps(profiles, indent=2))
else:
    print("NOT FOUND")

# 4. profileAssociations
print("\n=== profileAssociations ===")
cur.execute("SELECT value FROM ItemTable WHERE key = 'profileAssociations'")
row = cur.fetchone()
if row:
    assoc = json.loads(row[0])
    print(json.dumps(assoc, indent=2))
else:
    print("NOT FOUND")

# 5. Recently opened (look for this workspace)
print("\n=== RECENTLY OPENED (matching 2026 GR) ===")
cur.execute("SELECT value FROM ItemTable WHERE key = 'history.recentlyOpenedPathsList'")
row = cur.fetchone()
if row:
    recent = json.loads(row[0])
    for entry in recent.get('entries', []):
        label = entry.get('label', '')
        config = entry.get('workspace', {}).get('configPath', '') if 'workspace' in entry else ''
        folder = entry.get('folderUri', '')
        if '2026' in str(entry) or 'Personal' in str(entry):
            print(json.dumps(entry, indent=2))
else:
    print("NOT FOUND")

conn.close()
