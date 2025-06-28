# Main Item Generator for e-State Real Store
# This script provides a menu to generate educational materials or properties

param(
    [switch]$Interactive = $true
)

function Show-Menu {
    Write-Host "`n🎯 e-State Real Store - Item Generator" -ForegroundColor Cyan
    Write-Host "========================================`n"
    Write-Host "What would you like to generate?" -ForegroundColor Yellow
    Write-Host "  1. Educational Material (Course, Webinar, etc.)" -ForegroundColor White
    Write-Host "  2. Property (Investment, Luxury, etc.)" -ForegroundColor White
    Write-Host "  3. Exit" -ForegroundColor White
    Write-Host ""
}

function Get-MenuSelection {
    do {
        $selection = Read-Host "Enter your choice (1-3)"
        if ($selection -match '^[1-3]$') {
            return [int]$selection
        } else {
            Write-Host "Please enter a valid number between 1 and 3" -ForegroundColor Red
        }
    } while ($true)
}

function Generate-EducationalMaterial {
    Write-Host "`n🎓 Launching Educational Material Generator..." -ForegroundColor Green
    $scriptPath = Join-Path $PSScriptRoot "generate-educational-material.ps1"
    if (Test-Path $scriptPath) {
        & $scriptPath -Interactive
    } else {
        Write-Host "❌ Educational material generator script not found!" -ForegroundColor Red
        Write-Host "Expected location: $scriptPath" -ForegroundColor Yellow
    }
}

function Generate-Property {
    Write-Host "`n🏠 Launching Property Generator..." -ForegroundColor Green
    $scriptPath = Join-Path $PSScriptRoot "generate-property.ps1"
    if (Test-Path $scriptPath) {
        & $scriptPath -Interactive
    } else {
        Write-Host "❌ Property generator script not found!" -ForegroundColor Red
        Write-Host "Expected location: $scriptPath" -ForegroundColor Yellow
    }
}

# Main execution
if ($Interactive) {
    do {
        Show-Menu
        $choice = Get-MenuSelection
        
        switch ($choice) {
            1 {
                Generate-EducationalMaterial
                Write-Host "`nPress any key to continue..." -ForegroundColor Gray
                $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
            }
            2 {
                Generate-Property
                Write-Host "`nPress any key to continue..." -ForegroundColor Gray
                $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
            }
            3 {
                Write-Host "`n👋 Goodbye! Thank you for using the Item Generator." -ForegroundColor Green
                break
            }
        }
    } while ($choice -ne 3)
} else {
    Write-Host "This script is designed to run interactively. Use -Interactive switch." -ForegroundColor Yellow
} 