#!/usr/bin/env pwsh
# One-time script: backfill structured weight fields on existing inspection records.
# Parses "Left X Right Y" from gr_notes and sets gr_weightleft, gr_weightright, gr_weighttotal.
# Also deletes all dummy sensor readings from gr_hivereadings.
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
$h = @{ Authorization="Bearer $token"; 'OData-MaxVersion'='4.0'; 'OData-Version'='4.0'; Accept='application/json'; 'Content-Type'='application/json; charset=utf-8' }

# ─── PATCH INSPECTION WEIGHTS ───
Write-Host "=== Patching inspection weight fields ===" -ForegroundColor Magenta

# Fetch all inspections
$inspResp = Invoke-RestMethod -Uri "$apiBase/gr_inspections?`$select=gr_inspectionid,gr_notes,gr_weightleft,gr_weightright,gr_weighttotal&`$top=500" -Headers $h
$inspections = $inspResp.value

$patched = 0
foreach ($insp in $inspections) {
    # Skip if already has structured weight
    if ($insp.gr_weighttotal -and $insp.gr_weighttotal -gt 0) { continue }
    
    $notes = $insp.gr_notes
    if (-not $notes) { continue }
    
    # Try pattern: "Left X Right Y" (any order, case-insensitive)
    $left = $null; $right = $null
    if ($notes -match '(?i)left\s+([\d.]+)') { $left = [decimal]$Matches[1] }
    if ($notes -match '(?i)right\s+([\d.]+)') { $right = [decimal]$Matches[1] }
    # Also try "X left Y right" pattern
    if (-not $left -and $notes -match '([\d.]+)\s+(?i)left') { $left = [decimal]$Matches[1] }
    if (-not $right -and $notes -match '([\d.]+)\s+(?i)right') { $right = [decimal]$Matches[1] }
    
    if ($left -and $right) {
        $total = [math]::Round($left + $right, 2)
        $body = @{ gr_weightleft = $left; gr_weightright = $right; gr_weighttotal = $total } | ConvertTo-Json
        try {
            Invoke-RestMethod -Uri "$apiBase/gr_inspections($($insp.gr_inspectionid))" -Method Patch -Headers $h -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json; charset=utf-8'
            Write-Host "  + $($insp.gr_inspectionid): L=$left R=$right T=$total" -ForegroundColor Green
            $patched++
        } catch {
            Write-Host "  FAILED $($insp.gr_inspectionid): $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
}
Write-Host "  Patched $patched inspection records" -ForegroundColor Green

# ─── DELETE DUMMY SENSOR READINGS ───
Write-Host "`n=== Deleting dummy sensor readings ===" -ForegroundColor Magenta

$deleted = 0
$hasMore = $true
while ($hasMore) {
    $readResp = Invoke-RestMethod -Uri "$apiBase/gr_hivereadings?`$select=gr_hivereadingid&`$top=50" -Headers $h
    $readings = $readResp.value
    if ($readings.Count -eq 0) { $hasMore = $false; break }
    
    foreach ($r in $readings) {
        try {
            Invoke-RestMethod -Uri "$apiBase/gr_hivereadings($($r.gr_hivereadingid))" -Method Delete -Headers $h
            $deleted++
        } catch {
            Write-Host "  FAILED to delete $($r.gr_hivereadingid): $($_.ErrorDetails.Message)" -ForegroundColor Red
        }
    }
    Write-Host "  Deleted batch of $($readings.Count) readings ($deleted total)" -ForegroundColor Yellow
}
Write-Host "  Deleted $deleted sensor readings total" -ForegroundColor Green

Write-Host "`n=== PATCH COMPLETE ===" -ForegroundColor Green
