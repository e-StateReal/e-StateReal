# Example Output from Generation Scripts

This file shows examples of what the generation scripts produce.

## 🎓 Educational Material Example

### Generated Configuration:
```yaml
  f8e7d6c5-b4a3-4321-9876-543210fedcba:
    title: "Advanced Real Estate Investment Strategies"
    type: "course"
    price: "$1,299"
    duration: "8 weeks"
    description: "Master advanced investment techniques for experienced real estate investors looking to scale their portfolios."
    features:
      - "Portfolio Diversification Strategies"
      - "Advanced Market Analysis Techniques"
      - "Creative Financing Methods"
      - "Tax Optimization Strategies"
      - "Risk Management Protocols"
      - "Exit Strategy Planning"
    original_price: "$1,799"
```

### Generated File: `educational-material-f8e7d6c5-b4a3-4321-9876-543210fedcba.txt`

## 🏠 Property Example

### Generated Configuration:
```yaml
  a1b2c3d4-e5f6-7890-abcd-ef1234567890:
    title: "Modern Downtown Condo Investment"
    type: "investment"
    price: "$325,000"
    location: "Downtown Financial District"
    size: "950 sq ft"
    bedrooms: 1
    bathrooms: 1.5
    year_built: 2019
    condition: "Excellent"
    roi: "7-10% annually"
    monthly_rent: "$2,800 - $3,200"
    description: "Prime downtown location with excellent rental potential and modern amenities."
    amenities:
      - "Modern kitchen with granite countertops"
      - "Hardwood floors throughout"
      - "Floor-to-ceiling windows"
      - "In-unit washer/dryer"
      - "Secure building access"
      - "Fitness center"
      - "Rooftop terrace"
    market_analysis: "Located in a rapidly growing downtown area with strong demand from young professionals and small families."
```

### Generated File: `property-a1b2c3d4-e5f6-7890-abcd-ef1234567890.txt`

## 📋 Integration Steps

### 1. Copy the Generated YAML
Copy the generated configuration from the script output or the saved text file.

### 2. Add to _config.yml
Add the configuration to the appropriate section in `_config.yml`:

```yaml
# Educational Materials Configuration
educational_materials:
  # ... existing materials ...
  f8e7d6c5-b4a3-4321-9876-543210fedcba:
    title: "Advanced Real Estate Investment Strategies"
    # ... rest of configuration

# Properties Configuration
properties:
  # ... existing properties ...
  a1b2c3d4-e5f6-7890-abcd-ef1234567890:
    title: "Modern Downtown Condo Investment"
    # ... rest of configuration
```

### 3. Create Modal (Optional)
Add a modal to `_includes/modals.html`:

```html
<div class="modal fade" id="modalNewItem" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-draggable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Advanced Real Estate Investment Strategies</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Add your modal content here -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <a href="#" class="btn btn-primary" onclick="handleGetStarted('f8e7d6c5-b4a3-4321-9876-543210fedcba')">Get Started</a>
      </div>
    </div>
  </div>
</div>
```

### 4. Rebuild the Site
```bash
bundle exec jekyll build
```

## 🎯 Benefits

- **Automatic GUID Generation**: No duplicate identifiers
- **Consistent Formatting**: All items follow the same structure
- **Validation**: Scripts validate input to prevent errors
- **File Backup**: Option to save configurations for reference
- **Easy Integration**: Generated YAML is ready to paste into _config.yml 