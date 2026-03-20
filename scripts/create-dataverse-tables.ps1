#!/usr/bin/env pwsh
# Create Dataverse tables for Smart Hive Scale apiary data
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
    Authorization = "Bearer $token"
    'OData-MaxVersion' = '4.0'
    'OData-Version' = '4.0'
    Accept = 'application/json'
    'Content-Type' = 'application/json; charset=utf-8'
    'MSCRM.SolutionName' = $solutionName
}

$apiBase = "$dvUrl/api/data/v9.2"

# Verify
$whoami = Invoke-RestMethod -Uri "$apiBase/WhoAmI" -Headers $headers
Write-Host "Connected as: $($whoami.UserId)" -ForegroundColor Green

# Helper to add a column to an existing entity
function Add-Column {
    param($entityLogical, $schema, $label, $type, $extraProps = @{})
    
    $base = @{
        SchemaName = $schema
        RequiredLevel = @{ Value = "None" }
        DisplayName = @{
            "@odata.type" = "Microsoft.Dynamics.CRM.Label"
            LocalizedLabels = @(@{
                "@odata.type" = "Microsoft.Dynamics.CRM.LocalizedLabel"
                Label = $label
                LanguageCode = 1033
            })
        }
    }
    
    switch ($type) {
        'String' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.StringAttributeMetadata"
            $base["AttributeType"] = "String"
            $base["MaxLength"] = if ($extraProps.MaxLength) { $extraProps.MaxLength } else { 200 }
            $base["FormatName"] = @{ Value = "Text" }
        }
        'Memo' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.MemoAttributeMetadata"
            $base["AttributeType"] = "Memo"
            $base["MaxLength"] = if ($extraProps.MaxLength) { $extraProps.MaxLength } else { 10000 }
            $base["FormatName"] = @{ Value = "Text" }
        }
        'Boolean' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.BooleanAttributeMetadata"
            $base["AttributeType"] = "Boolean"
            $base["OptionSet"] = @{
                "@odata.type" = "Microsoft.Dynamics.CRM.BooleanOptionSetMetadata"
                TrueOption = @{ Value = 1; Label = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label="Yes"; LanguageCode=1033 }) } }
                FalseOption = @{ Value = 0; Label = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label="No"; LanguageCode=1033 }) } }
            }
        }
        'Integer' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.IntegerAttributeMetadata"
            $base["AttributeType"] = "Integer"
            $base["MinValue"] = if ($null -ne $extraProps.Min) { $extraProps.Min } else { -2147483648 }
            $base["MaxValue"] = if ($null -ne $extraProps.Max) { $extraProps.Max } else { 2147483647 }
        }
        'Decimal' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.DecimalAttributeMetadata"
            $base["AttributeType"] = "Decimal"
            $base["Precision"] = if ($extraProps.Precision) { $extraProps.Precision } else { 2 }
        }
        'DateTime' {
            $base["@odata.type"] = "Microsoft.Dynamics.CRM.DateTimeAttributeMetadata"
            $base["AttributeType"] = "DateTime"
            $base["Format"] = "DateOnly"
            $base["DateTimeBehavior"] = @{ Value = "UserLocal" }
        }
    }
    
    $json = $base | ConvertTo-Json -Depth 10
    try {
        $null = Invoke-RestMethod -Uri "$apiBase/EntityDefinitions(LogicalName='$entityLogical')/Attributes" -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($json)) -ContentType 'application/json; charset=utf-8'
        Write-Host "  + $schema ($type)" -ForegroundColor Cyan
    } catch {
        $errMsg = $_.ErrorDetails.Message
        if ($errMsg -match 'already exists') {
            Write-Host "  ~ $schema already exists" -ForegroundColor Yellow
        } else {
            Write-Host "  ! $schema FAILED: $errMsg" -ForegroundColor Red
        }
    }
}

# Helper to create a table
function New-Table {
    param($schema, $displayName, $displayPlural, $description)
    
    $body = @{
        "@odata.type" = "Microsoft.Dynamics.CRM.EntityMetadata"
        SchemaName = $schema
        DisplayName = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label=$displayName; LanguageCode=1033 }) }
        DisplayCollectionName = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label=$displayPlural; LanguageCode=1033 }) }
        Description = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label=$description; LanguageCode=1033 }) }
        HasActivities = $false
        HasNotes = $false
        OwnershipType = "UserOwned"
        IsActivity = $false
        PrimaryNameAttribute = "gr_name"
        Attributes = @(
            @{
                "@odata.type" = "Microsoft.Dynamics.CRM.StringAttributeMetadata"
                SchemaName = "gr_name"
                AttributeType = "String"
                RequiredLevel = @{ Value = "ApplicationRequired" }
                MaxLength = 200
                FormatName = @{ Value = "Text" }
                DisplayName = @{ "@odata.type"="Microsoft.Dynamics.CRM.Label"; LocalizedLabels=@(@{ "@odata.type"="Microsoft.Dynamics.CRM.LocalizedLabel"; Label="Name"; LanguageCode=1033 }) }
                IsPrimaryName = $true
            }
        )
    } | ConvertTo-Json -Depth 10
    
    try {
        $null = Invoke-RestMethod -Uri "$apiBase/EntityDefinitions" -Method Post -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -ContentType 'application/json; charset=utf-8'
        Write-Host "Table $schema created" -ForegroundColor Green
    } catch {
        $errMsg = $_.ErrorDetails.Message
        if ($errMsg -match 'already exists') {
            Write-Host "Table $schema already exists" -ForegroundColor Yellow
        } else {
            Write-Host "Table $schema FAILED: $errMsg" -ForegroundColor Red
            throw
        }
    }
}

# ─── 1. Create gr_hive table ───
Write-Host "`n=== Creating gr_hive ===" -ForegroundColor Magenta
New-Table -schema 'gr_hive' -displayName 'Hive' -displayPlural 'Hives' -description 'Beehive master data'

Write-Host "Adding columns to gr_hive..."
Add-Column 'gr_hive' 'gr_hivetype'       'Hive Type'           'String'
Add-Column 'gr_hive' 'gr_hivestyle'      'Hive Style'          'String'
Add-Column 'gr_hive' 'gr_status'         'Status'              'String'
Add-Column 'gr_hive' 'gr_strength'       'Strength (%)'        'Integer'  @{ Min=0; Max=100 }
Add-Column 'gr_hive' 'gr_beetype'        'Bee Type'            'String'
Add-Column 'gr_hive' 'gr_color'          'Color'               'String'   @{ MaxLength=20 }
Add-Column 'gr_hive' 'gr_queenmarked'    'Queen Marked'        'Boolean'
Add-Column 'gr_hive' 'gr_queencolor'     'Queen Color'         'String'   @{ MaxLength=20 }
Add-Column 'gr_hive' 'gr_queenyear'      'Queen Year'          'Integer'  @{ Min=2000; Max=2100 }
Add-Column 'gr_hive' 'gr_queenclipped'   'Queen Clipped'       'Boolean'
Add-Column 'gr_hive' 'gr_queensource'    'Queen Source'        'String'
Add-Column 'gr_hive' 'gr_queenaddeddate' 'Queen Added Date'    'DateTime'
Add-Column 'gr_hive' 'gr_queennotes'     'Queen Notes'         'Memo'
Add-Column 'gr_hive' 'gr_components'     'Components (JSON)'   'Memo'     @{ MaxLength=10000 }
Add-Column 'gr_hive' 'gr_dateadded'      'Date Added'          'DateTime'
Add-Column 'gr_hive' 'gr_orientation'    'Orientation'         'String'   @{ MaxLength=20 }

# ─── 2. Create gr_note table ───
Write-Host "`n=== Creating gr_note ===" -ForegroundColor Magenta
New-Table -schema 'gr_note' -displayName 'Note' -displayPlural 'Notes' -description 'Apiary notes'

Write-Host "Adding columns to gr_note..."
Add-Column 'gr_note' 'gr_text'     'Text'      'Memo'
Add-Column 'gr_note' 'gr_notedate' 'Note Date' 'DateTime'
Add-Column 'gr_note' 'gr_pinned'   'Pinned'    'Boolean'
Add-Column 'gr_note' 'gr_deleted'  'Deleted'   'Boolean'
Add-Column 'gr_note' 'gr_hiveid'   'Hive ID'   'String'  @{ MaxLength=100 }

# ─── 3. Create gr_task table ───
Write-Host "`n=== Creating gr_task ===" -ForegroundColor Magenta
New-Table -schema 'gr_task' -displayName 'Task' -displayPlural 'Tasks' -description 'Apiary tasks'

Write-Host "Adding columns to gr_task..."
Add-Column 'gr_task' 'gr_text'    'Text'    'String' @{ MaxLength=500 }
Add-Column 'gr_task' 'gr_done'    'Done'    'Boolean'
Add-Column 'gr_task' 'gr_duedate' 'Due Date' 'DateTime'
Add-Column 'gr_task' 'gr_deleted' 'Deleted' 'Boolean'

# ─── 4. Add missing columns to gr_inspection ───
Write-Host "`n=== Updating gr_inspection ===" -ForegroundColor Magenta
Add-Column 'gr_inspection' 'gr_broodpattern' 'Brood Pattern' 'String'
Add-Column 'gr_inspection' 'gr_diseases'     'Diseases (JSON)' 'Memo' @{ MaxLength=4000 }
Add-Column 'gr_inspection' 'gr_pests'        'Pests (JSON)'    'Memo' @{ MaxLength=4000 }

Write-Host "`n=== ALL DONE ===" -ForegroundColor Green
