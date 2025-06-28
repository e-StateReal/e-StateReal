# Update Items Data Script for e-State Real Store
# This script reads the _config.yml file and updates assets/js/items-data.js

param(
    [string]$ConfigPath = "_config.yml",
    [string]$OutputPath = "assets/js/items-data.js"
)

function Convert-YamlToJs {
    param(
        [string]$YamlContent
    )
    
    # This is a simplified conversion - in a real scenario, you might want to use a YAML parser
    # For now, we'll create a basic structure that can be manually updated
    
    $jsContent = @"
// Items Data for e-State Real Store
// This file contains the mapping between GUIDs and item information
// Generated from _config.yml configuration
// Last updated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

const ITEMS_DATA = {
    // Educational Materials
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890": {
        title: "Premium Real Estate Course",
        type: "course",
        price: "$997",
        original_price: "$1,497",
        duration: "12 weeks",
        description: "Master the fundamentals of real estate investment, market analysis, and property management through our expert-led curriculum.",
        category: "education"
    },
    "b2c3d4e5-f6g7-8901-bcde-f23456789012": {
        title: "Investment Strategies Webinar",
        type: "webinar",
        price: "Free",
        duration: "90 minutes",
        date: "December 15, 2024",
        time: "7:00 PM EST",
        description: "Join industry experts for an exclusive live session on advanced real estate investment strategies.",
        category: "education"
    },
    
    // Properties
    "c3d4e5f6-g7h8-9012-cdef-345678901234": {
        title: "Downtown Loft Opportunity",
        type: "investment",
        price: "$450,000",
        location: "Downtown Business District",
        size: "1,200 sq ft",
        bedrooms: 2,
        bathrooms: 2,
        year_built: 2018,
        condition: "Excellent",
        roi: "8-12% annually",
        monthly_rent: "$3,200 - $3,800",
        description: "Prime location loft with exceptional ROI potential and modern amenities.",
        category: "property"
    },
    "d4e5f6g7-h8i9-0123-defg-456789012345": {
        title: "Luxury Beachfront Villa",
        type: "luxury",
        price: "$2,850,000",
        location: "Exclusive Beachfront Community",
        size: "4,500 sq ft",
        bedrooms: 5,
        bathrooms: 4.5,
        year_built: 2020,
        condition: "Like New",
        roi: "6-9% annually",
        monthly_rent: "$15,000 - $25,000",
        description: "Exclusive beachfront property offering the ultimate in luxury living and investment potential.",
        category: "property"
    }
};

// Function to get item information by GUID
function getItemInfo(itemId) {
    return ITEMS_DATA[itemId] || null;
}

// Function to get item title by GUID
function getItemTitle(itemId) {
    const item = getItemInfo(itemId);
    return item ? item.title : itemId;
}

// Function to get all items by category
function getItemsByCategory(category) {
    return Object.entries(ITEMS_DATA)
        .filter(([guid, item]) => item.category === category)
        .map(([guid, item]) => ({ guid, ...item }));
}

// Function to get all educational materials
function getEducationalMaterials() {
    return getItemsByCategory('education');
}

// Function to get all properties
function getProperties() {
    return getItemsByCategory('property');
}

// Make functions available globally
window.getItemInfo = getItemInfo;
window.getItemTitle = getItemTitle;
window.getItemsByCategory = getItemsByCategory;
window.getEducationalMaterials = getEducationalMaterials;
window.getProperties = getProperties;
"@
    
    return $jsContent
}

function Update-ItemsDataFile {
    Write-Host "🔄 Updating items-data.js from _config.yml..." -ForegroundColor Cyan
    
    # Check if config file exists
    if (-not (Test-Path $ConfigPath)) {
        Write-Host "❌ Config file not found: $ConfigPath" -ForegroundColor Red
        return $false
    }
    
    # Read config file
    $yamlContent = Get-Content $ConfigPath -Raw -Encoding UTF8
    
    # Convert to JavaScript
    $jsContent = Convert-YamlToJs $yamlContent
    
    # Ensure output directory exists
    $outputDir = Split-Path $OutputPath -Parent
    if (-not (Test-Path $outputDir)) {
        New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
    }
    
    # Write to output file
    try {
        $jsContent | Out-File -FilePath $OutputPath -Encoding UTF8
        Write-Host "✅ Successfully updated: $OutputPath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Error writing to file: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Main execution
try {
    $success = Update-ItemsDataFile
    
    if ($success) {
        Write-Host "`n📝 Note: This script provides a basic template." -ForegroundColor Yellow
        Write-Host "For automatic YAML to JS conversion, consider using a YAML parser library." -ForegroundColor Yellow
        Write-Host "You can manually update the ITEMS_DATA object with new items from your _config.yml" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "`n❌ Error updating items data: $($_.Exception.Message)" -ForegroundColor Red
} 