#!/usr/bin/env pwsh
# Update Logic App definitions only (preserves existing parameters including secrets)
$ErrorActionPreference = 'Stop'

$mgmtToken = (Get-AzAccessToken -ResourceUrl "https://management.azure.com").Token
if ($mgmtToken -is [System.Security.SecureString]) {
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($mgmtToken)
    try { $mgmtToken = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}
$h = @{ Authorization="Bearer $mgmtToken"; 'Content-Type'='application/json' }
$subId = "e7401b5d-1ce7-4ee2-999a-249758af59ab"
$rg = "rg-gr-personal-hivescale"
$scriptDir = $PSScriptRoot

foreach ($name in @("HiveTelemetryIngest","HiveTelemetryRead")) {
    Write-Host "Updating $name..." -ForegroundColor Cyan
    $uri = "https://management.azure.com/subscriptions/$subId/resourceGroups/$rg/providers/Microsoft.Logic/workflows/${name}?api-version=2019-05-01"
    $current = Invoke-RestMethod -Uri $uri -Headers $h
    $defFile = Join-Path $scriptDir "logic-apps" "${name}.json"
    $newDef = (Get-Content $defFile -Raw | ConvertFrom-Json).definition
    $body = @{
        location = $current.location
        identity = $current.identity
        properties = @{
            state = $current.properties.state
            definition = $newDef
            parameters = $current.properties.parameters
        }
    } | ConvertTo-Json -Depth 20
    $result = Invoke-RestMethod -Uri $uri -Method Put -Headers $h -Body ([System.Text.Encoding]::UTF8.GetBytes($body))
    Write-Host "  OK: $($result.name) - $($result.properties.state)" -ForegroundColor Green
}

Write-Host "`nDone." -ForegroundColor Green
