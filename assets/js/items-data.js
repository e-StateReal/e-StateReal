// Items Data for e-State Real Store
// This file contains the mapping between GUIDs and item information
// Generated from _config.yml configuration

// Educational Materials Data
const educationalMaterialsData = {
    "a1b2c3d4-e5f6-7890-abcd-ef1234567890": {
        guid: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        title: "Premium Real Estate Course",
        type: "course",
        price: "$997",
        original_price: "$1,497",
        duration: "12 weeks",
        description: "Master the fundamentals of real estate investment, market analysis, and property management through our expert-led curriculum.",
        features: [
            "Market Analysis: Understanding local and global real estate trends",
            "Investment Strategies: From fix-and-flip to long-term rentals",
            "Property Valuation: Accurate pricing and appraisal techniques",
            "Legal Framework: Contracts, regulations, and compliance",
            "Financing Options: Mortgages, loans, and creative financing",
            "Portfolio Management: Building and scaling your real estate empire"
        ]
    },
    "b2c3d4e5-f6g7-8901-bcde-f23456789012": {
        guid: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
        title: "Investment Strategies Webinar",
        type: "webinar",
        price: "Free",
        duration: "90 minutes",
        date: "December 15, 2024",
        time: "7:00 PM EST",
        description: "Join industry experts for an exclusive live session on advanced real estate investment strategies.",
        features: [
            "Market Timing: When to buy, sell, or hold properties",
            "Risk Management: Protecting your investments in volatile markets",
            "Tax Strategies: Maximizing deductions and minimizing liabilities",
            "Technology Integration: Using AI and data analytics for better decisions"
        ]
    }
};

// Properties Data
const propertiesData = {
    "c3d4e5f6-g7h8-9012-cdef-345678901234": {
        guid: "c3d4e5f6-g7h8-9012-cdef-345678901234",
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
        amenities: [
            "Modern kitchen with stainless steel appliances",
            "Hardwood floors throughout",
            "Large windows with city views",
            "In-unit laundry",
            "Secure building access"
        ],
        market_analysis: "This property is located in a rapidly appreciating neighborhood with strong rental demand from young professionals and small families."
    },
    "d4e5f6g7-h8i9-0123-defg-456789012345": {
        guid: "d4e5f6g7-h8i9-0123-defg-456789012345",
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
        amenities: [
            "Infinity pool with ocean views",
            "Chef's kitchen with premium appliances",
            "Home theater and wine cellar",
            "Private beach access",
            "Smart home technology",
            "3-car garage"
        ],
        market_analysis: "This luxury villa offers both personal enjoyment and excellent rental income potential, especially during peak tourist seasons."
    }
};

// Function to get item info by GUID
function getItemInfo(guid) {
    return educationalMaterialsData[guid] || propertiesData[guid] || null;
}

// Function to get educational material info by GUID
function getEducationalMaterialInfo(guid) {
    return educationalMaterialsData[guid] || null;
}

// Function to get property info by GUID
function getPropertyInfo(guid) {
    return propertiesData[guid] || null;
}

// Function to get all educational materials as array
function getEducationalMaterials() {
    return Object.values(educationalMaterialsData);
}

// Function to get all properties as array
function getProperties() {
    return Object.values(propertiesData);
}

// Function to get item title by GUID
function getItemTitle(guid) {
    const item = getItemInfo(guid);
    return item ? item.title : 'Unknown Item';
}

// Function to get item description by GUID
function getItemDescription(guid) {
    const item = getItemInfo(guid);
    return item ? item.description : '';
}

// Function to get item type by GUID
function getItemType(guid) {
    const item = getItemInfo(guid);
    return item ? item.type : '';
}

// Make functions available globally
window.getItemInfo = getItemInfo;
window.getEducationalMaterialInfo = getEducationalMaterialInfo;
window.getPropertyInfo = getPropertyInfo;
window.getEducationalMaterials = getEducationalMaterials;
window.getProperties = getProperties;
window.getItemTitle = getItemTitle;
window.getItemDescription = getItemDescription;
window.getItemType = getItemType; 