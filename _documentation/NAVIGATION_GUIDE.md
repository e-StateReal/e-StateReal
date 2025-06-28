# Navigation Guide - e-State Real Store

This guide explains how to add new pages to the navigation system in a scalable way.

## Current Structure

The navigation is organized into two main categories:

### Education
- **Get Started** - Introduction and onboarding
- **Enroll Now** - Course enrollment
- **Register** - User registration

### Properties
- **Contact Agent** - Contact property agents
- **Schedule Visit** - Schedule property viewings

## Adding New Pages

### Step 1: Create the Page File

Create a new Markdown file in the `_pages/` directory:

```markdown
---
layout: form-page
title: "Your Page Title"
description: "Brief description of the page"
---

<!-- Your page content here -->
```

### Step 2: Add to Navigation Configuration

Edit `_config.yml` and add your new page to the appropriate category:

```yaml
navigation:
  education:
    - title: "Get Started"
      url: "/pages/get-started.html"
      icon: "fas fa-rocket"
    # Add your new education page here
    - title: "Your New Page"
      url: "/pages/your-new-page.html"
      icon: "fas fa-your-icon"
  properties:
    - title: "Contact Agent"
      url: "/pages/contact.html"
      icon: "fas fa-phone"
    # Add your new property page here
    - title: "Your New Property Page"
      url: "/pages/your-new-property-page.html"
      icon: "fas fa-your-property-icon"
```

### Step 3: Available Icons

Use Font Awesome icons. Some popular options:

**Education Icons:**
- `fas fa-graduation-cap` - General education
- `fas fa-book` - Courses/books
- `fas fa-chalkboard-teacher` - Teaching
- `fas fa-certificate` - Certifications
- `fas fa-video` - Video content
- `fas fa-download` - Downloads

**Property Icons:**
- `fas fa-home` - Houses
- `fas fa-building` - Buildings
- `fas fa-map-marker-alt` - Location
- `fas fa-search` - Search
- `fas fa-eye` - View
- `fas fa-heart` - Favorites

### Step 4: Build and Test

```bash
bundle exec jekyll build
bundle exec jekyll serve
```

## Best Practices

1. **Consistent Naming**: Use kebab-case for file names (e.g., `my-new-page.md`)
2. **Descriptive Titles**: Make titles clear and user-friendly
3. **Appropriate Icons**: Choose icons that match the page content
4. **Category Placement**: Put pages in the most logical category
5. **URL Structure**: Keep URLs consistent with existing patterns

## Example: Adding a "Property Search" Page

1. Create `_pages/property-search.md`:
```markdown
---
layout: form-page
title: "Property Search"
description: "Search for available properties"
---

<h1>Property Search</h1>
<p>Find your perfect property...</p>
```

2. Add to `_config.yml`:
```yaml
properties:
  - title: "Contact Agent"
    url: "/pages/contact.html"
    icon: "fas fa-phone"
  - title: "Schedule Visit"
    url: "/pages/schedule.html"
    icon: "fas fa-calendar-alt"
  - title: "Property Search"
    url: "/pages/property-search.html"
    icon: "fas fa-search"
```

The navigation will automatically update to include your new page! 