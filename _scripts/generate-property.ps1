# Property Generator for e-State Real Store
# This script helps you create new properties with automatic GUID generation

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

function Get-NumericInput {
    param(
        [string]$Prompt,
        [string]$DefaultValue = "",
        [bool]$AllowDecimal = $true
    )
    
    do {
        $input = Get-UserInput $Prompt $DefaultValue
        if ($AllowDecimal) {
            if ($input -match '^\d+(\.\d+)?$') {
                return $input
            }
        } else {
            if ($input -match '^\d+$') {
                return $input
            }
        }
        Write-Host "Please enter a valid number" -ForegroundColor Red
    } while ($true)
}

function Generate-Property {
    Write-Host "`n🏠 Property Generator" -ForegroundColor Cyan
    Write-Host "====================`n"
    
    # Generate GUID
    $guid = Generate-GUID
    Write-Host "Generated GUID: $guid" -ForegroundColor Green
    
    # Get basic information
    $title = Get-UserInput "Enter the property title"
    $type = Get-SelectOption "Select the property type" @("investment", "luxury", "residential", "commercial", "vacation", "land")
    $price = Get-UserInput "Enter the price (e.g., $450,000, $2,850,000)"
    $location = Get-UserInput "Enter the location/address"
    
    # Property details
    $size = Get-UserInput "Enter the size (e.g., 1,200 sq ft, 4,500 sq ft)"
    $bedrooms = Get-NumericInput "Enter number of bedrooms" -AllowDecimal $false
    $bathrooms = Get-NumericInput "Enter number of bathrooms" -AllowDecimal $true
    $yearBuilt = Get-NumericInput "Enter year built" -AllowDecimal $false
    $condition = Get-SelectOption "Select property condition" @("Excellent", "Good", "Fair", "Like New", "Needs Renovation")
    
    # Investment details
    $roi = Get-UserInput "Enter estimated ROI (e.g., 8-12% annually)"
    $monthlyRent = Get-UserInput "Enter monthly rent potential (e.g., $3,200 - $3,800)"
    
    # Description and analysis
    Write-Host "`nEnter a detailed description:" -ForegroundColor Yellow
    $description = Get-UserInput "Description" -Required $false
    
    Write-Host "`nEnter market analysis:" -ForegroundColor Yellow
    $marketAnalysis = Get-UserInput "Market Analysis" -Required $false
    
    # Get amenities
    $amenities = Get-MultipleInput "Enter property amenities"
    
    # Generate YAML configuration
    $yamlConfig = @"
  $guid`:
    title: "$title"
    type: "$type"
    price: "$price"
    location: "$location"
    size: "$size"
    bedrooms: $bedrooms
    bathrooms: $bathrooms
    year_built: $yearBuilt
    condition: "$condition"
    roi: "$roi"
    monthly_rent: "$monthlyRent"
    description: "$description"
    amenities:
$($amenities | ForEach-Object { "      - `"$_`"" })
    market_analysis: "$marketAnalysis"
"@
    
    # Display the generated configuration
    Write-Host "`n📋 Generated Configuration:" -ForegroundColor Cyan
    Write-Host "============================" -ForegroundColor Cyan
    Write-Host $yamlConfig -ForegroundColor White
    
    # Ask if user wants to save to file
    $saveToFile = Get-UserInput "Save configuration to file? (y/n)" -Required $false
    if ($saveToFile -eq "y" -or $saveToFile -eq "yes") {
        $filename = "property-$guid.txt"
        $yamlConfig | Out-File -FilePath $filename -Encoding UTF8
        Write-Host "Configuration saved to: $filename" -ForegroundColor Green
    }
    
    # Display instructions
    Write-Host "`n📝 Instructions:" -ForegroundColor Cyan
    Write-Host "================" -ForegroundColor Cyan
    Write-Host "1. Copy the generated configuration above" -ForegroundColor White
    Write-Host "2. Open _config.yml" -ForegroundColor White
    Write-Host "3. Add the configuration to the 'properties' section" -ForegroundColor White
    Write-Host "4. Save the file and rebuild the site" -ForegroundColor White
    Write-Host "5. Create a modal in _includes/modals.html if needed" -ForegroundColor White
    
    return @{
        GUID = $guid
        Title = $title
        Type = $type
        Price = $price
        YAML = $yamlConfig
    }
}

# Main execution
if ($Interactive) {
    try {
        $result = Generate-Property
        
        Write-Host "`n✅ Property generated successfully!" -ForegroundColor Green
        Write-Host "GUID: $($result.GUID)" -ForegroundColor Yellow
        Write-Host "Title: $($result.Title)" -ForegroundColor Yellow
        Write-Host "Type: $($result.Type)" -ForegroundColor Yellow
        Write-Host "Price: $($result.Price)" -ForegroundColor Yellow
    }
    catch {
        Write-Host "`n❌ Error generating property: $($_.Exception.Message)" -ForegroundColor Red
    }
} else {
    Write-Host "This script is designed to run interactively. Use -Interactive switch." -ForegroundColor Yellow
} 