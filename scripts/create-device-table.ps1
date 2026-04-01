#!/usr/bin/env pwsh
# Create gr_device table in Dataverse for ESP32 device management
# Target: Grant Personal environment (orgc5731d44.crm.dynamics.com)

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
    Authorization  = "Bearer $token"
    'OData-MaxVersion' = '4.0'
    'OData-Version'    = '4.0'
    Accept             = 'application/json'
    'Content-Type'     = 'application/json; charset=utf-8'
    'MSCRM.SolutionName' = $solutionName
}
$apiBase = "$dvUrl/api/data/v9.2"

# Verify connection
$whoami = Invoke-RestMethod -Uri "$apiBase/WhoAmI" -Headers $headers
Write-Host "Connected as: $($whoami.UserId)" -ForegroundColor Green

# ── Create gr_device table ──
Write-Host "`nCreating gr_device table..." -ForegroundColor Cyan

$tableBody = @{
    SchemaName          = "gr_device"
    EntitySetName       = "gr_devices"
    DisplayName         = @{
        "@odata.type"   = "Microsoft.Dynamics.CRM.Label"
        LocalizedLabels = @(@{ "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"; Label = "Device"; LanguageCode = 1033 })
    }
    DisplayCollectionName = @{
        "@odata.type"   = "Microsoft.Dynamics.CRM.Label"
        LocalizedLabels = @(@{ "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"; Label = "Devices"; LanguageCode = 1033 })
    }
    Description         = @{
        "@odata.type"   = "Microsoft.Dynamics.CRM.Label"
        LocalizedLabels = @(@{ "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"; Label = "ESP32 IoT hive stand devices"; LanguageCode = 1033 })
    }
    HasActivities       = $false
    HasNotes            = $false
    IsActivity          = $false
    OwnershipType       = "UserOwned"
    PrimaryNameAttribute = "gr_name"
    PrimaryIdAttribute   = "gr_deviceid"
    Attributes          = @(
        @{
            "@odata.type" = "#Microsoft.Dynamics.CRM.StringAttributeMetadata"
            SchemaName    = "gr_name"
            MaxLength     = 200
            IsPrimaryName = $true
            FormatName    = @{ Value = "Text" }
            RequiredLevel = @{ Value = "ApplicationRequired" }
            DisplayName   = @{
                "@odata.type" = "Microsoft.Dynamics.CRM.Label"
                LocalizedLabels = @(@{ "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"; Label = "Name"; LanguageCode = 1033 })
            }
        }
    )
} | ConvertTo-Json -Depth 10

try {
    Invoke-RestMethod -Uri "$apiBase/EntityDefinitions" -Method POST -Headers $headers -Body $tableBody
    Write-Host "  gr_device table created" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode -eq 409 -or $_.ErrorDetails.Message -match 'already exists') {
        Write-Host "  gr_device table already exists, skipping" -ForegroundColor Yellow
    } else { throw }
}

# ── Add columns ──
$entity = "gr_device"
$entityUri = "$apiBase/EntityDefinitions(LogicalName='$entity')/Attributes"

function Add-StringColumn($schema, $label, $maxLen = 200) {
    $body = @{
        "@odata.type"    = "#Microsoft.Dynamics.CRM.StringAttributeMetadata"
        SchemaName       = $schema
        MaxLength        = $maxLen
        FormatName       = @{ Value = "Text" }
        RequiredLevel    = @{ Value = "None" }
        DisplayName      = @{
            "@odata.type" = "Microsoft.Dynamics.CRM.Label"
            LocalizedLabels = @(@{ "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"; Label = $label; LanguageCode = 1033 })
        }
    } | ConvertTo-Json -Depth 10
    try {
        Invoke-RestMethod -Uri $entityUri -Method POST -Headers $headers -Body $body
        Write-Host "  + $schema ($label)" -ForegroundColor Green
    } catch {
        if ($_.ErrorDetails.Message -match 'already exists') {
            Write-Host "  ~ $schema already exists" -ForegroundColor Yellow
        } else { throw }
    }
}

Write-Host "`nAdding columns to gr_device..." -ForegroundColor Cyan

# gr_name is the primary name (created with the table)
Add-StringColumn "gr_macaddress"     "MAC Address"     50
Add-StringColumn "gr_ipaddress"      "IP Address"      50
Add-StringColumn "gr_firmware"       "Firmware Version" 50
Add-StringColumn "gr_assignedhive"   "Assigned Hive"   200

Write-Host "`nDone! Table gr_device (entity set: gr_devices) is ready." -ForegroundColor Green
Write-Host "Columns: gr_name, gr_macaddress, gr_ipaddress, gr_firmware, gr_assignedhive"
