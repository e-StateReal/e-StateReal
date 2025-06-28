# Educational Material Generator for e-State Real Store
# This script helps you create new educational materials with automatic GUID generation

param(
    [switch]$Interactive = $true
)

function Generate-GUID {
    return [guid]::NewGuid().ToString()
}

function Get-UserInput {
    param(
        [string]$Prompt,
        [string]$DefaultValue = "",
        [bool]$Required = $true
    )
    
    do {
        if ($DefaultValue) {
            $input = Read-Host "$Prompt (default: $DefaultValue)"
            if ([string]::IsNullOrWhiteSpace($input)) {
                $input = $DefaultValue
            }
        } else {
            $input = Read-Host $Prompt
        }
        
        if ($Required -and [string]::IsNullOrWhiteSpace($input)) {
            Write-Host "This field is required. Please enter a value." -ForegroundColor Red
        }
    } while ($Required -and [string]::IsNullOrWhiteSpace($input))
    
    return $input
}

function Get-MultipleInput {
    param(
        [string]$Prompt,
        [string]$ExitCommand = "done"
    )
    
    $items = @()
    Write-Host "$Prompt (type '$ExitCommand' when finished):" -ForegroundColor Yellow
    
    do {
        $item = Read-Host "  - "
        if ($item -ne $ExitCommand) {
            $items += $item
        }
    } while ($item -ne $ExitCommand)
    
    return $items
}

function Get-SelectOption {
    param(
        [string]$Prompt,
        [array]$Options,
        [string]$DefaultValue = ""
        [bool]$Required = $true
    )
    
    Write-Host "$Prompt" -ForegroundColor Yellow
    for ($i = 0; $i -lt $Options.Count; $i++) {
        $marker = if ($Options[$i] -eq $DefaultValue) { ">" } else { " " }
        Write-Host "  $marker $($i + 1). $($Options[$i])"
    }
    
    do {
        $selection = Read-Host "Enter number (1-$($Options.Count))"
        if ([string]::IsNullOrWhiteSpace($selection) -and $DefaultValue) {
            return $DefaultValue
        }
        
        if ($selection -match '^\d+$' -and [int]$selection -ge 1 -and [int]$selection -le $Options.Count) {
            return $Options[[int]$selection - 1]
        } else {
            Write-Host "Please enter a valid number between 1 and $($Options.Count)" -ForegroundColor Red
        }
    } while ($true)
}

function Generate-EducationalMaterial {
    Write-Host "`n🎓 Educational Material Generator" -ForegroundColor Cyan
    Write-Host "================================`n"
    
    # Generate GUID
    $guid = Generate-GUID
    Write-Host "Generated GUID: $guid" -ForegroundColor Green
    
    # Get basic information
    $title = Get-UserInput "Enter the title of the educational material"
    $type = Get-SelectOption "Select the type of educational material" @("course", "webinar", "workshop", "ebook", "certification", "masterclass")
    $price = Get-UserInput "Enter the price (e.g., $997, Free, $49.99)"
    $duration = Get-UserInput "Enter the duration (e.g., 12 weeks, 90 minutes, 6 months)"
    
    # Get description
    Write-Host "`nEnter a detailed description:" -ForegroundColor Yellow
    $description = Get-UserInput "Description" -Required $false
    
    # Get features
    $features = Get-MultipleInput "Enter the key features/learning objectives"
    
    # Additional fields based on type
    $additionalFields = @{}
    
    if ($type -eq "webinar") {
        $additionalFields.date = Get-UserInput "Enter the webinar date (e.g., December 15, 2024)"
        $additionalFields.time = Get-UserInput "Enter the webinar time (e.g., 7:00 PM EST)"
    }
    
    if ($type -eq "course") {
        $additionalFields.original_price = Get-UserInput "Enter original price (for discount display)" -Required $false
    }
    
    # Generate YAML configuration
    $yamlConfig = @"
  $guid:
    title: "$title"
    type: "$type"
    price: "$price"
    duration: "$duration"
    description: "$description"
    features:
$($features | ForEach-Object { "      - `"$_`"" })
"@
    
    # Add additional fields
    foreach ($field in $additionalFields.GetEnumerator()) {
        $yamlConfig += "`n    $($field.Key): `"$($field.Value)`""
    }
    
    # Display the generated configuration
    Write-Host "`n📋 Generated Configuration:" -ForegroundColor Cyan
    Write-Host "============================" -ForegroundColor Cyan
    Write-Host $yamlConfig -ForegroundColor White
    
    # Ask if user wants to save to file
    $saveToFile = Get-UserInput "Save configuration to file? (y/n)" -Required $false
    if ($saveToFile -eq "y" -or $saveToFile -eq "yes") {
        $filename = "educational-material-$guid.txt"
        $yamlConfig | Out-File -FilePath $filename -Encoding UTF8
        Write-Host "Configuration saved to: $filename" -ForegroundColor Green
    }
    
    # Display instructions
    Write-Host "`n📝 Instructions:" -ForegroundColor Cyan
    Write-Host "================" -ForegroundColor Cyan
    Write-Host "1. Copy the generated configuration above" -ForegroundColor White
    Write-Host "2. Open _config.yml" -ForegroundColor White
    Write-Host "3. Add the configuration to the 'educational_materials' section" -ForegroundColor White
    Write-Host "4. Save the file and rebuild the site" -ForegroundColor White
    Write-Host "5. Create a modal in _includes/modals.html if needed" -ForegroundColor White
    
    return @{
        GUID = $guid
        Title = $title
        Type = $type
        YAML = $yamlConfig
    }
}

# Main execution
if ($Interactive) {
    try {
        $result = Generate-EducationalMaterial
        
        Write-Host "`n✅ Educational material generated successfully!" -ForegroundColor Green
        Write-Host "GUID: $($result.GUID)" -ForegroundColor Yellow
        Write-Host "Title: $($result.Title)" -ForegroundColor Yellow
        Write-Host "Type: $($result.Type)" -ForegroundColor Yellow
    }
    catch {
        Write-Host "`n❌ Error generating educational material: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "This script is designed to run interactively. Use -Interactive switch." -ForegroundColor Yellow
} 