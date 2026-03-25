#!/usr/bin/env pwsh
# Add IoT device identity columns to gr_hivereading table
# Run once to patch the existing Dataverse table with new columns
# for HiveId, DeviceMAC, and DeviceName sent by the ESP32 firmware.

$ErrorActionPreference = 'Stop'
$dvUrl = "https://orgc5731d44.crm.dynamics.com"
$solutionName = "SmartHiveScale"

# Auth
$tokenResp = Get-AzAccessToken -ResourceUrl $dvUrl
if ($tokenResp.Token -is [System.Security.SecureString]) {
    $bstr = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($tokenResp.Token)
    try { $token = [System.Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [System.Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
} else { $token = $tokenResp.Token }

$headers = @{
    Authorization = "Bearer $token"
    'OData-MaxVersion' = '4.0'
    'OData-Version' = '4.0'
    Accept = 'application/json'
    'Content-Type' = 'application/json; charset=utf-8'
    'MSCRM.SolutionName' = $solutionName
}

$apiBase = "$dvUrl/api/data/v9.2"

# Verify connection
$whoami = Invoke-RestMethod -Uri "$apiBase/WhoAmI" -Headers $headers
Write-Host "Connected as: $($whoami.UserId)" -ForegroundColor Green

function Add-StringColumn {
    param($entity, $schema, $label, $maxLength = 100)
    $body = @{
        '@odata.type' = '#Microsoft.Dynamics.CRM.StringAttributeMetadata'
        SchemaName = $schema
        RequiredLevel = @{ Value = "None" }
        DisplayName = @{
            '@odata.type' = 'Microsoft.Dynamics.CRM.Label'
            LocalizedLabels = @(@{
                '@odata.type' = 'Microsoft.Dynamics.CRM.LocalizedLabel'
                Label = $label
                LanguageCode = 1033
            })
        }
        MaxLength = $maxLength
        FormatName = @{ Value = "Text" }
    }
    $uri = "$apiBase/EntityDefinitions(LogicalName='$entity')/Attributes"
    try {
        Invoke-RestMethod -Uri $uri -Headers $headers -Method Post -Body ($body | ConvertTo-Json -Depth 10)
        Write-Host "  + $schema ($label)" -ForegroundColor Green
    } catch {
        $err = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        if ($err.error.message -match 'already exists') {
            Write-Host "  ~ $schema already exists" -ForegroundColor Yellow
        } else {
            Write-Host "  ! $schema FAILED: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== Adding IoT device columns to gr_hivereading ===" -ForegroundColor Magenta
Add-StringColumn 'gr_hivereading' 'gr_hiveid'     'Hive ID'     50
Add-StringColumn 'gr_hivereading' 'gr_devicemac'  'Device MAC'  20
Add-StringColumn 'gr_hivereading' 'gr_devicename' 'Device Name' 100

Write-Host "`n=== DONE ===" -ForegroundColor Green
Write-Host "Next steps:"
Write-Host "  1. Redeploy HiveTelemetryIngest Logic App (scripts/deploy-logic-apps.ps1)"
Write-Host "  2. Redeploy HiveTelemetryRead Logic App"
Write-Host "  3. ESP32 firmware will start sending these fields on next boot"
