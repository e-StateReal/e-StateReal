# GUID Generator Guide - e-State Real Store

This guide explains how to generate and manage GUIDs for educational materials and properties in the system.

## What are GUIDs?

GUIDs (Globally Unique Identifiers) are 128-bit identifiers that are virtually guaranteed to be unique. They're perfect for identifying items in a database or system without conflicts.

## Current GUIDs in Use

### Educational Materials

- `a1b2c3d4-e5f6-7890-abcd-ef1234567890` - Premium Real Estate Course
- `b2c3d4e5-f6g7-8901-bcde-f23456789012` - Investment Strategies Webinar

### Properties

- `c3d4e5f6-g7h8-9012-cdef-345678901234` - Downtown Loft Opportunity
- `d4e5f6g7-h8i9-0123-defg-456789012345` - Luxury Beachfront Villa

## How to Generate New GUIDs

### Option 1: Online GUID Generator

1. Visit: [GUID Generator](https://www.guidgenerator.com/)
2. Click "Generate GUID"
3. Copy the generated GUID
4. Use it in your configuration

### Option 2: Command Line (Windows)

```powershell
[guid]::NewGuid().ToString()
```

### Option 3: Command Line (Linux/Mac)

```bash
uuidgen
```

### Option 4: JavaScript (Browser Console)

```javascript
crypto.randomUUID()
```

## Adding New Items

### Step 1: Generate a GUID

Use one of the methods above to generate a new GUID.

### Step 2: Add to Configuration

Edit `_config.yml` and add your new item:

```yaml
# For Educational Materials
educational_materials:
  YOUR-NEW-GUID-HERE:
    title: "Your New Course Title"
    type: "course" # or "webinar", "workshop", etc.
    price: "$XXX"
    duration: "X weeks"
    description: "Your course description"
    features:
      - "Feature 1"
      - "Feature 2"

# For Properties
properties:
  YOUR-NEW-GUID-HERE:
    title: "Your New Property"
    type: "investment" # or "luxury", "residential", etc.
    price: "$XXX,XXX"
    location: "Property Location"
    size: "X,XXX sq ft"
    bedrooms: X
    bathrooms: X.X
    year_built: 20XX
    condition: "Excellent"
    roi: "X-X% annually"
    monthly_rent: "$X,XXX - $X,XXX"
    description: "Property description"
    amenities:
      - "Amenity 1"
      - "Amenity 2"
    market_analysis: "Market analysis text"
```

### Step 3: Update Navigation (if needed)

If you want the new item to appear in the navigation dropdowns, add it to the navigation configuration:

```yaml
navigation:
  education:
    - title: "Your New Course"
      url: "/pages/enroll.html"
      icon: "fas fa-your-icon"
  properties:
    - title: "Your New Property"
      url: "/pages/contact.html"
      icon: "fas fa-your-property-icon"
```

### Step 4: Create Modal (if needed)

If you want a modal for the new item, add it to `_includes/modals.html`:

```html
<div class="modal fade" id="modalYourItem" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-draggable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Your Item Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Your modal content -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <a href="#" class="btn btn-primary" onclick="handleYourAction('YOUR-NEW-GUID-HERE')">Action</a>
      </div>
    </div>
  </div>
</div>
```

## Best Practices

1. **Never reuse GUIDs**: Each item should have a unique GUID
2. **Keep backups**: Store your GUIDs in a separate document
3. **Use descriptive titles**: The title should clearly identify the item
4. **Consistent formatting**: Follow the existing format in `_config.yml`
5. **Test thoroughly**: Always test new items before going live

## GUID Format

GUIDs follow this format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

- 8 characters
- 4 characters
- 4 characters
- 4 characters
- 12 characters

Example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

## Security Note

GUIDs are not secret - they're designed to be unique, not secure. Don't use them for sensitive information or authentication.
