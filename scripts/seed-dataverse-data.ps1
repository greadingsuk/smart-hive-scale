#!/usr/bin/env pwsh
# Seed Dataverse tables with initial hive, inspection, note, and task data
$ErrorActionPreference = 'Stop'
$dvUrl = "https://orgc5731d44.crm.dynamics.com"
$apiBase = "$dvUrl/api/data/v9.2"

# Auth
$tokenResp = Get-AzAccessToken -ResourceUrl $dvUrl
if ($tokenResp.Token -is [System.Security.SecureString]) {
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($tokenResp.Token)
    try { $token = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
} else { $token = $tokenResp.Token }
$h = @{ Authorization="Bearer $token"; 'OData-MaxVersion'='4.0'; 'OData-Version'='4.0'; Accept='application/json'; 'Content-Type'='application/json; charset=utf-8'; Prefer='return=representation' }

function Post-Record($entity, $data) {
    $json = $data | ConvertTo-Json -Depth 10
    try {
        $result = Invoke-RestMethod -Uri "$apiBase/$entity" -Method Post -Headers $h -Body ([System.Text.Encoding]::UTF8.GetBytes($json)) -ContentType 'application/json; charset=utf-8'
        return $result
    } catch {
        Write-Host "  FAILED: $($_.ErrorDetails.Message)" -ForegroundColor Red
        return $null
    }
}

# ─── HIVES ───
Write-Host "=== Seeding Hives ===" -ForegroundColor Magenta

$hives = @(
    @{ gr_name="Hive 1 - Obsidian"; gr_hivetype="Hive"; gr_hivestyle="14x12"; gr_status="Active"; gr_strength=100; gr_beetype="Buckfast"; gr_color="#f59e0b"; gr_queenmarked=$true; gr_queencolor="Green"; gr_queenyear=2024; gr_queenclipped=$true; gr_queensource="Bred"; gr_queenaddeddate="2024-06-03"; gr_queennotes="Found, marked & clipped Jun 2025"; gr_dateadded="2025-05-16"; gr_orientation="vertical"; gr_components='[{"type":"hive-roof"},{"type":"super"},{"type":"queen-excluder"},{"type":"14x12-brood"},{"type":"hive-floor"},{"type":"hive-stand"}]' },
    @{ gr_name="Hive 2 - BMH"; gr_hivetype="Hive"; gr_hivestyle="14x12"; gr_status="Active"; gr_strength=100; gr_beetype="Buckfast"; gr_color="#ef4444"; gr_queenmarked=$true; gr_queencolor="Pink"; gr_queenyear=2024; gr_queenclipped=$false; gr_queensource="Purchased"; gr_queenaddeddate="2024-05-01"; gr_queennotes=""; gr_dateadded="2025-04-27"; gr_orientation="vertical"; gr_components='[{"type":"hive-roof"},{"type":"super"},{"type":"super"},{"type":"queen-excluder"},{"type":"14x12-brood"},{"type":"hive-floor"},{"type":"hive-stand"}]' },
    @{ gr_name="Hive 4 - Carly"; gr_hivetype="Hive"; gr_hivestyle="National"; gr_status="Active"; gr_strength=71; gr_beetype="Local"; gr_color="#a78bfa"; gr_queenmarked=$false; gr_queenyear=2025; gr_queenclipped=$false; gr_queensource="Purchased"; gr_queenaddeddate="2025-06-20"; gr_queennotes="New queen caged Jun 20, released Jun 30"; gr_dateadded="2025-05-12"; gr_orientation="vertical"; gr_components='[{"type":"hive-roof"},{"type":"national-brood"},{"type":"hive-floor"},{"type":"hive-stand"}]' },
    @{ gr_name="Hive 5 - Survivor"; gr_hivetype="Hive"; gr_hivestyle="14x12"; gr_status="Active"; gr_strength=100; gr_beetype="Local"; gr_color="#3b82f6"; gr_queenmarked=$false; gr_queenyear=2023; gr_queenclipped=$false; gr_queensource="Swarm"; gr_queenaddeddate="2023-08-31"; gr_queennotes=""; gr_dateadded="2023-08-31"; gr_orientation="vertical"; gr_components='[{"type":"hive-roof"},{"type":"super"},{"type":"queen-excluder"},{"type":"14x12-brood"},{"type":"hive-floor"},{"type":"hive-stand"}]' },
    @{ gr_name="Hive 6 - Backup"; gr_hivetype="Hive"; gr_hivestyle="14x12"; gr_status="Active"; gr_strength=100; gr_beetype="Buckfast"; gr_color="#22c55e"; gr_queenmarked=$true; gr_queencolor="Blue"; gr_queenyear=2025; gr_queenclipped=$true; gr_queensource="Split"; gr_queenaddeddate="2025-06-25"; gr_queennotes="Made from BMH buckfast. Clipped & marked Jul 28."; gr_dateadded="2025-06-25"; gr_orientation="vertical"; gr_components='[{"type":"hive-roof"},{"type":"14x12-brood"},{"type":"hive-floor"},{"type":"hive-stand"}]' },
    @{ gr_name="Nuc 1 - Obsidian"; gr_hivetype="Nuc"; gr_hivestyle="National"; gr_status="Active"; gr_strength=100; gr_beetype="Buckfast"; gr_color="#06b6d4"; gr_queenmarked=$false; gr_queenyear=2025; gr_queenclipped=$false; gr_queensource="Unknown"; gr_queennotes=""; gr_dateadded="2025-05-16"; gr_orientation="vertical"; gr_components='[{"type":"nuc-roof"},{"type":"nuc-brood"},{"type":"nuc-floor"},{"type":"nuc-stand"}]' }
)

foreach ($hive in $hives) {
    $result = Post-Record 'gr_hives' $hive
    if ($result) { Write-Host "  + $($hive.gr_name) -> $($result.gr_hiveid)" -ForegroundColor Green }
}

# ─── INSPECTIONS ───
Write-Host "`n=== Seeding Inspections ===" -ForegroundColor Magenta

$inspections = @(
    @{ gr_name="a1"; gr_activitydate="2025-09-26"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 15.83 Right 15.43" },
    @{ gr_name="a2"; gr_activitydate="2025-09-26"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 15.46 right 13.90" },
    @{ gr_name="a3"; gr_activitydate="2025-09-26"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=71; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 12.98 right 13.04" },
    @{ gr_name="a4"; gr_activitydate="2025-09-26"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="16.39 left 15.81 right" },
    @{ gr_name="a5"; gr_activitydate="2025-09-26"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="7.66 left 7.27 right" },
    @{ gr_name="a6"; gr_activitydate="2025-09-08"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=71; gr_queenseen=$false; gr_broodspotted=$true; gr_notes="There is a queen but couldn't find her. They were active but need to be fed and assessed after winter." },
    @{ gr_name="a7"; gr_activitydate="2025-09-08"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="F1 - stores 70% F2- Stores 50% F3- eggs brood stores 40% F4 - brood, eggs, queen stores 20%..." },
    @{ gr_name="a8"; gr_activitydate="2025-09-08"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Lots of bees with stores but will need feeding still. Queen spotted and could see brood larve and eggs." },
    @{ gr_name="a9"; gr_activitydate="2025-09-08"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="F1 - stores 10% F2 - brood and larve stores 20% F3 - Brood stores 40%..." },
    @{ gr_name="a10"; gr_activitydate="2025-09-08"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="F1 - stores 10% F2 - stores 10% F3 - stores 30%... queen larve eggs tiny brood." },
    @{ gr_name="a11"; gr_activitydate="2025-09-05"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 6.69 Right 7.32" },
    @{ gr_name="a12"; gr_activitydate="2025-09-05"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 12.76 right 11.55" },
    @{ gr_name="a13"; gr_activitydate="2025-09-05"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 12.66 Right 12.37" },
    @{ gr_name="a14"; gr_activitydate="2025-09-05"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 14.39 Right 13.93" },
    @{ gr_name="a15"; gr_activitydate="2025-08-25"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 5.71 Right 6.45 added feed" },
    @{ gr_name="a16"; gr_activitydate="2025-08-25"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 12.75 Right 11.03 added feed" },
    @{ gr_name="a17"; gr_activitydate="2025-08-25"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 12.09 Right 11.66 added feed" },
    @{ gr_name="a18"; gr_activitydate="2025-08-25"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Left 13.33 Right 12.61 added more feed" },
    @{ gr_name="a19"; gr_activitydate="2025-08-17"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Super off and feeder added" },
    @{ gr_name="a20"; gr_activitydate="2025-08-17"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Super off and feeders added" },
    @{ gr_name="a21"; gr_activitydate="2025-08-17"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Supers off and feeder added" },
    @{ gr_name="a22"; gr_activitydate="2025-08-17"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Bit light for winter so added feeder and will start to feed" },
    @{ gr_name="a23"; gr_activitydate="2025-07-28"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Built up well. Removed a super to help them finish off and condense down." },
    @{ gr_name="a24"; gr_activitydate="2025-07-28"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Doing really well. Removed one super condense them down." },
    @{ gr_name="a25"; gr_activitydate="2025-07-28"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=100; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="No queen. Loads of stores and still horrid." },
    @{ gr_name="a26"; gr_activitydate="2025-07-28"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Doing really well. Supers swapped about so they can finish capping." },
    @{ gr_name="a27"; gr_activitydate="2025-07-28"; gr_activitytype="Inspection"; gr_hivename="Hive 6 - Backup"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Queen found. Clipped and marked. She is laying and they are building up." },
    @{ gr_name="a28"; gr_activitydate="2025-06-30"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$false; gr_notes="Let queen out of cage" },
    @{ gr_name="a29"; gr_activitydate="2025-06-25"; gr_activitytype="Hive Added"; gr_hivename="Hive 6 - Backup"; gr_queenseen=$false; gr_broodspotted=$false; gr_notes="Made from BMH buckfast" },
    @{ gr_name="a30"; gr_activitydate="2025-06-25"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Good temper and very productive. Took 1 frame nuc off them as insurance policy" },
    @{ gr_name="a31"; gr_activitydate="2025-06-25"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="All doing good. Slightly up in face but not to bad." },
    @{ gr_name="a32"; gr_activitydate="2025-06-25"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Added in super" },
    @{ gr_name="a33"; gr_activitydate="2025-06-20"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Ripped down QC and placed new queen in from mating nuc in the queen cage." },
    @{ gr_name="a34"; gr_activitydate="2025-06-17"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Going really well. Stores in brood box that could move up." },
    @{ gr_name="a35"; gr_activitydate="2025-06-17"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Growing well added 2x supers for the coming flow." },
    @{ gr_name="a36"; gr_activitydate="2025-06-17"; gr_activitytype="Inspection"; gr_hivename="Nuc 1 - Obsidian"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="All looking good and added 2x supers." },
    @{ gr_name="a37"; gr_activitydate="2025-06-13"; gr_activitytype="Inspection"; gr_hivename="Hive 4 - Carly"; gr_strength=82; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Queen and 4 shakes off bees taken to remove her to Johnny." },
    @{ gr_name="a38"; gr_activitydate="2025-06-03"; gr_activitytype="Inspection"; gr_hivename="Hive 1 - Obsidian"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="2 Queen cells spotted and charged with some empty. Found, marked/clipped queen." },
    @{ gr_name="a39"; gr_activitydate="2025-06-03"; gr_activitytype="Inspection"; gr_hivename="Hive 2 - BMH"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Doing well needs a super asap." },
    @{ gr_name="a40"; gr_activitydate="2025-06-03"; gr_activitytype="Inspection"; gr_hivename="Hive 5 - Survivor"; gr_strength=100; gr_queenseen=$true; gr_broodspotted=$true; gr_notes="Building out well on the plastic frames." }
)

$count = 0
foreach ($insp in $inspections) {
    $result = Post-Record 'gr_inspections' $insp
    if ($result) { $count++ }
}
Write-Host "  Seeded $count inspections" -ForegroundColor Green

# ─── NOTES ───
Write-Host "`n=== Seeding Notes ===" -ForegroundColor Magenta

$notes = @(
    @{ gr_name="n1"; gr_text="157c oxalic acid 2:1 sugar syrup in metric is 1.6kg to 1L"; gr_notedate="2024-07-14"; gr_pinned=$true; gr_deleted=$false },
    @{ gr_name="n2"; gr_text="Spring inspection schedule begins mid-March"; gr_notedate="2025-03-01"; gr_pinned=$false; gr_deleted=$false }
)

foreach ($note in $notes) {
    $result = Post-Record 'gr_notes' $note
    if ($result) { Write-Host "  + $($note.gr_name)" -ForegroundColor Green }
}

# ─── TASKS ───
Write-Host "`n=== Seeding Tasks ===" -ForegroundColor Magenta

$tasks = @(
    @{ gr_name="t1"; gr_text="Spring varroa check all hives"; gr_done=$false; gr_duedate="2026-03-20"; gr_deleted=$false },
    @{ gr_name="t2"; gr_text="Order new frames for Hive 4"; gr_done=$false; gr_duedate="2026-04-01"; gr_deleted=$false },
    @{ gr_name="t3"; gr_text="Check fondant levels"; gr_done=$true; gr_duedate="2026-03-15"; gr_deleted=$false },
    @{ gr_name="t4"; gr_text="Assemble new nuc boxes"; gr_done=$false; gr_duedate="2026-04-10"; gr_deleted=$false }
)

foreach ($task in $tasks) {
    $result = Post-Record 'gr_tasks' $task
    if ($result) { Write-Host "  + $($task.gr_name)" -ForegroundColor Green }
}

Write-Host "`n=== SEED COMPLETE ===" -ForegroundColor Green
