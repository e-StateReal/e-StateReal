# Item Generation Scripts - e-State Real Store

This directory contains PowerShell scripts to help you generate new educational materials and properties for your e-State Real Store website.

## 📁 Available Scripts

### 1. `generate-item.ps1` - Main Menu Script
The main script that provides a menu to choose between generating educational materials or properties.

### 2. `generate-educational-material.ps1` - Educational Material Generator
Generates new educational materials (courses, webinars, workshops, etc.) with automatic GUID generation.

### 3. `generate-property.ps1` - Property Generator
Generates new properties (investment, luxury, residential, etc.) with automatic GUID generation.

### 4. `update-items-data.ps1` - Items Data Updater
Updates the `assets/js/items-data.js` file with the latest item information from `_config.yml`.

## 🚀 How to Use

### Quick Start
1. Open PowerShell in the project directory
2. Navigate to the `_scripts` folder
3. Run the main script:
   ```powershell
   .\generate-item.ps1
   ```

### Individual Scripts
You can also run the individual scripts directly:

```powershell
# Generate educational material only
.\generate-educational-material.ps1

# Generate property only
.\generate-property.ps1

# Update items data file
.\update-items-data.ps1
```

## 📋 What Each Script Does

### Educational Material Generator
- Generates a unique GUID automatically
- Prompts for:
  - Title
  - Type (course, webinar, workshop, ebook, certification, masterclass)
  - Price
  - Duration
  - Description
  - Features/learning objectives
  - Additional fields based on type (date/time for webinars, original price for courses)
- Generates YAML configuration ready to paste into `_config.yml`
- Option to save configuration to a text file

### Property Generator
- Generates a unique GUID automatically
- Prompts for:
  - Title
  - Type (investment, luxury, residential, commercial, vacation, land)
  - Price
  - Location
  - Size
  - Bedrooms and bathrooms
  - Year built
  - Condition
  - ROI and monthly rent potential
  - Description and market analysis
  - Amenities
- Generates YAML configuration ready to paste into `_config.yml`
- Option to save configuration to a text file

## 🎯 Example Workflow

### Step 1: Run the Generator
```powershell
.\generate-item.ps1
```

### Step 2: Choose Item Type
```
🎯 e-State Real Store - Item Generator
========================================

What would you like to generate?
  1. Educational Material (Course, Webinar, etc.)
  2. Property (Investment, Luxury, etc.)
  3. Exit

Enter your choice (1-3): 1
```

### Step 3: Fill in the Details
The script will guide you through entering all the necessary information with helpful prompts and validation.

### Step 4: Copy the Generated Configuration
The script will display the YAML configuration that you can copy and paste directly into `_config.yml`.

### Step 5: Add to Your Site
1. Open `_config.yml`
2. Add the generated configuration to the appropriate section
3. Save the file
4. Rebuild your site: `bundle exec jekyll build`

## 🔧 Features

### Automatic GUID Generation
- Each item gets a unique GUID automatically
- No risk of duplicate identifiers
- Ready for database integration

### Input Validation
- Required field validation
- Numeric input validation
- Option selection with numbered menus

### Flexible Input
- Support for multiple amenities/features
- Optional fields for descriptions
- Default values where appropriate

### File Output
- Option to save configurations to text files
- Files named with the generated GUID for easy reference

## 📝 Tips for Best Results

### Educational Materials
- Use descriptive titles that clearly explain the content
- Include specific learning objectives as features
- For courses, consider including an original price for discount displays
- For webinars, include specific date and time information

### Properties
- Be specific about location and neighborhood
- Include realistic ROI and rent potential
- List all major amenities and features
- Provide detailed market analysis

### General
- Keep descriptions concise but informative
- Use consistent formatting for prices and measurements
- Test the generated configuration before going live

## 🛠️ Troubleshooting

### Script Won't Run
- Ensure PowerShell execution policy allows script execution:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Missing Scripts
- Ensure all three scripts are in the `_scripts` directory
- Check file permissions

### YAML Errors
- Ensure proper indentation when pasting into `_config.yml`
- Check for special characters that might need escaping
- Validate YAML syntax before rebuilding

## 🔄 Integration with Site

After generating items, you may want to:

1. **Create Modals**: Add modal HTML to `_includes/modals.html` for the new items
2. **Update Navigation**: Add items to the navigation configuration in `_config.yml`
3. **Add Images**: Include property images in `assets/img/`
4. **Test Forms**: Ensure form pages work correctly with the new GUIDs

## 📞 Support

If you encounter issues with the scripts:
1. Check that all required files are present
2. Verify PowerShell execution policy
3. Ensure you're running the scripts from the correct directory
4. Check the generated YAML for syntax errors 