#!/usr/bin/env pwsh
# Deploy all 4 Logic App workflow definitions with Dataverse credentials
param(
    [Parameter(Mandatory=$true)] [string]$ClientSecret
)

$ErrorActionPreference = 'Stop'
$rg = "rg-gr-personal-hivescale"
$clientId = "79fe719c-9f37-4948-8059-c7409b1a236e"
$tenantId = "f70245ca-d729-484b-8f15-f52733b433f1"
$dvUrl = "https://orgc5731d44.crm.dynamics.com"
$scriptDir = $PSScriptRoot

$logicApps = @(
    @{ name = "ApiaryReadAPI";       file = "ApiaryReadAPI.json" },
    @{ name = "ApiaryWriteAPI";      file = "ApiaryWriteAPI.json" },
    @{ name = "HiveTelemetryRead";   file = "HiveTelemetryRead.json" },
    @{ name = "HiveTelemetryIngest"; file = "HiveTelemetryIngest.json" }
)

foreach ($la in $logicApps) {
    Write-Host "`nDeploying $($la.name)..." -ForegroundColor Cyan
    $defPath = Join-Path $scriptDir "logic-apps" $la.file
    $defJson = Get-Content $defPath -Raw | ConvertFrom-Json
    $definition = $defJson.definition | ConvertTo-Json -Depth 20 -Compress

    # Build the full workflow body with parameters
    $workflowBody = @{
        definition = $defJson.definition
        parameters = @{
            dataverseUrl = @{ value = $dvUrl }
            clientId     = @{ value = $clientId }
            clientSecret = @{ value = $ClientSecret }
            tenantId     = @{ value = $tenantId }
        }
    } | ConvertTo-Json -Depth 20

    # Deploy via Azure CLI
    az logic workflow update `
        --name $la.name `
        --resource-group $rg `
        --definition $defPath `
        -o none 2>&1 | Out-Null

    # Now set the parameters via REST API since az logic doesn't support parameter values well
    $mgmtTokenResp = Get-AzAccessToken -ResourceUrl "https://management.azure.com"
    if ($mgmtTokenResp.Token -is [System.Security.SecureString]) {
        $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($mgmtTokenResp.Token)
        try { $mgmtToken = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
        finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
    } else { $mgmtToken = $mgmtTokenResp.Token }

    $uri = "https://management.azure.com/subscriptions/e7401b5d-1ce7-4ee2-999a-249758af59ab/resourceGroups/$rg/providers/Microsoft.Logic/workflows/$($la.name)?api-version=2019-05-01"
    
    $fullBody = @{
        location = "ukwest"
        identity = @{ type = "SystemAssigned" }
        properties = @{
            state = "Enabled"
            definition = $defJson.definition
            parameters = @{
                dataverseUrl = @{ value = $dvUrl }
                clientId     = @{ value = $clientId }
                clientSecret = @{ value = $ClientSecret }
                tenantId     = @{ value = $tenantId }
            }
        }
    } | ConvertTo-Json -Depth 20

    $headers = @{ Authorization="Bearer $mgmtToken"; 'Content-Type'='application/json' }
    $result = Invoke-RestMethod -Uri $uri -Method Put -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($fullBody))
    Write-Host "  Deployed: $($result.name) - State: $($result.properties.state)" -ForegroundColor Green
}

# Get trigger URLs for all HTTP-triggered Logic Apps
Write-Host "`n=== Logic App Trigger URLs ===" -ForegroundColor Magenta
foreach ($la in $logicApps) {
    $callbackUri = "https://management.azure.com/subscriptions/e7401b5d-1ce7-4ee2-999a-249758af59ab/resourceGroups/$rg/providers/Microsoft.Logic/workflows/$($la.name)/triggers/manual/listCallbackUrl?api-version=2019-05-01"
    $mgmtTokenResp2 = Get-AzAccessToken -ResourceUrl "https://management.azure.com"
    if ($mgmtTokenResp2.Token -is [System.Security.SecureString]) {
        $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($mgmtTokenResp2.Token)
        try { $t = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
        finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
    } else { $t = $mgmtTokenResp2.Token }
    $h2 = @{ Authorization="Bearer $t"; 'Content-Type'='application/json' }
    $cb = Invoke-RestMethod -Uri $callbackUri -Method Post -Headers $h2
    Write-Host "`n$($la.name):" -ForegroundColor Yellow
    Write-Host $cb.value
}

Write-Host "`n=== ALL DEPLOYED ===" -ForegroundColor Green
