// Full view functionality for education and properties pages

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('education-full')) {
        initializeEducationFullView();
    } else if (currentPage.includes('properties-full')) {
        initializePropertiesFullView();
    }
});

// Education Full View
function initializeEducationFullView() {
    let allMaterials = [];
    let filteredMaterials = [];
    let currentPage = 0;
    const itemsPerPage = 12;
    
    // Load all materials
    if (window.getEducationalMaterials) {
        allMaterials = window.getEducationalMaterials();
        filteredMaterials = [...allMaterials];
        loadEducationPage();
    }
    
    // Filter functionality
    const typeFilter = document.getElementById('typeFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreEducation);
    }
    
    function applyFilters() {
        const typeValue = typeFilter ? typeFilter.value : '';
        const priceValue = priceFilter ? priceFilter.value : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        filteredMaterials = allMaterials.filter(material => {
            // Type filter
            if (typeValue && material.type !== typeValue) return false;
            
            // Price filter
            if (priceValue) {
                if (priceValue === 'free' && material.price !== 'Free') return false;
                if (priceValue === 'paid' && material.price === 'Free') return false;
            }
            
            // Search filter
            if (searchValue) {
                const searchText = `${material.title} ${material.description || ''}`.toLowerCase();
                if (!searchText.includes(searchValue)) return false;
            }
            
            return true;
        });
        
        currentPage = 0;
        loadEducationPage();
    }
    
    function loadEducationPage() {
        const grid = document.getElementById('education-grid');
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageMaterials = filteredMaterials.slice(startIndex, endIndex);
        
        if (currentPage === 0) {
            // First page - replace content
            if (pageMaterials.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <i class="fas fa-search"></i>
                        <h4>No Materials Found</h4>
                        <p>Try adjusting your filters or search terms.</p>
                    </div>
                `;
            } else {
                const itemsHTML = pageMaterials.map(item => createEducationCard(item)).join('');
                grid.innerHTML = itemsHTML;
            }
        } else {
            // Append to existing content
            const itemsHTML = pageMaterials.map(item => createEducationCard(item)).join('');
            grid.insertAdjacentHTML('beforeend', itemsHTML);
        }
        
        // Show/hide load more button
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            if (endIndex < filteredMaterials.length) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }
    
    function loadMoreEducation() {
        currentPage++;
        loadEducationPage();
    }
}

// Properties Full View
function initializePropertiesFullView() {
    let allProperties = [];
    let filteredProperties = [];
    let currentPage = 0;
    const itemsPerPage = 12;
    
    // Load all properties
    if (window.getProperties) {
        allProperties = window.getProperties();
        filteredProperties = [...allProperties];
        loadPropertiesPage();
    }
    
    // Filter functionality
    const typeFilter = document.getElementById('typeFilter');
    const priceRangeFilter = document.getElementById('priceRangeFilter');
    const bedroomsFilter = document.getElementById('bedroomsFilter');
    const searchInput = document.getElementById('searchInput');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyFilters);
    }
    if (priceRangeFilter) {
        priceRangeFilter.addEventListener('change', applyFilters);
    }
    if (bedroomsFilter) {
        bedroomsFilter.addEventListener('change', applyFilters);
    }
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProperties);
    }
    
    function applyFilters() {
        const typeValue = typeFilter ? typeFilter.value : '';
        const priceRangeValue = priceRangeFilter ? priceRangeFilter.value : '';
        const bedroomsValue = bedroomsFilter ? bedroomsFilter.value : '';
        const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
        
        filteredProperties = allProperties.filter(property => {
            // Type filter
            if (typeValue && property.type !== typeValue) return false;
            
            // Price range filter
            if (priceRangeValue) {
                const price = parsePrice(property.price);
                if (priceRangeValue === '0-200000' && price > 200000) return false;
                if (priceRangeValue === '200000-500000' && (price < 200000 || price > 500000)) return false;
                if (priceRangeValue === '500000-1000000' && (price < 500000 || price > 1000000)) return false;
                if (priceRangeValue === '1000000+' && price < 1000000) return false;
            }
            
            // Bedrooms filter
            if (bedroomsValue && property.bedrooms < parseInt(bedroomsValue)) return false;
            
            // Search filter
            if (searchValue) {
                const searchText = `${property.title} ${property.description || ''} ${property.location || ''}`.toLowerCase();
                if (!searchText.includes(searchValue)) return false;
            }
            
            return true;
        });
        
        currentPage = 0;
        loadPropertiesPage();
    }
    
    function parsePrice(priceString) {
        if (!priceString || priceString === 'Free') return 0;
        return parseInt(priceString.replace(/[$,]/g, ''));
    }
    
    function loadPropertiesPage() {
        const grid = document.getElementById('properties-grid');
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageProperties = filteredProperties.slice(startIndex, endIndex);
        
        if (currentPage === 0) {
            // First page - replace content
            if (pageProperties.length === 0) {
                grid.innerHTML = `
                    <div class="empty-state" style="grid-column: 1 / -1;">
                        <i class="fas fa-search"></i>
                        <h4>No Properties Found</h4>
                        <p>Try adjusting your filters or search terms.</p>
                    </div>
                `;
            } else {
                const itemsHTML = pageProperties.map(item => createPropertyCard(item)).join('');
                grid.innerHTML = itemsHTML;
            }
        } else {
            // Append to existing content
            const itemsHTML = pageProperties.map(item => createPropertyCard(item)).join('');
            grid.insertAdjacentHTML('beforeend', itemsHTML);
        }
        
        // Show/hide load more button
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            if (endIndex < filteredProperties.length) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }
    
    function loadMoreProperties() {
        currentPage++;
        loadPropertiesPage();
    }
}

// Enhanced card creation functions for full view
function createEducationCard(item) {
    const priceDisplay = item.original_price && item.original_price !== item.price 
        ? `<span class="original-price">${item.original_price}</span>` : '';
    
    const metaInfo = [];
    if (item.duration) metaInfo.push(`<span class="meta-item"><i class="fas fa-clock"></i>${item.duration}</span>`);
    if (item.type) metaInfo.push(`<span class="meta-item"><i class="fas fa-tag"></i>${item.type}</span>`);
    if (item.date) metaInfo.push(`<span class="meta-item"><i class="fas fa-calendar"></i>${item.date}</span>`);
    
    // Determine which buttons to show based on type
    let actionButtons = '';
    if (item.type === 'course') {
        actionButtons = `
            <a href="#" onclick="handleGetStarted('${item.guid}'); return false;" class="btn btn-outline-primary">Get Started</a>
            <a href="#" onclick="handleEnrollNow('${item.guid}'); return false;" class="btn btn-primary">Enroll Now</a>
        `;
    } else {
        // For webinars, workshops, etc. - only show Enroll Now
        actionButtons = `
            <a href="#" onclick="handleEnrollNow('${item.guid}'); return false;" class="btn btn-primary">Enroll Now</a>
        `;
    }
    
    return `
        <div class="item-card">
            <div class="item-header">
                <h5 class="item-title">${item.title}</h5>
                <div class="item-price">${item.price}${priceDisplay}</div>
            </div>
            <div class="item-details">
                <div class="item-meta">${metaInfo.join('')}</div>
                <p class="item-description">${item.description || 'Learn more about this educational opportunity.'}</p>
            </div>
            <div class="item-actions">
                ${actionButtons}
            </div>
        </div>
    `;
}

function createPropertyCard(item) {
    const metaInfo = [];
    if (item.location) metaInfo.push(`<span class="meta-item"><i class="fas fa-map-marker-alt"></i>${item.location}</span>`);
    if (item.size) metaInfo.push(`<span class="meta-item"><i class="fas fa-ruler-combined"></i>${item.size}</span>`);
    if (item.bedrooms) metaInfo.push(`<span class="meta-item"><i class="fas fa-bed"></i>${item.bedrooms} bed</span>`);
    if (item.bathrooms) metaInfo.push(`<span class="meta-item"><i class="fas fa-bath"></i>${item.bathrooms} bath</span>`);
    
    return `
        <div class="item-card">
            <div class="item-header">
                <h5 class="item-title">${item.title}</h5>
                <div class="item-price">${item.price}</div>
            </div>
            <div class="item-details">
                <div class="item-meta">${metaInfo.join('')}</div>
                <p class="item-description">${item.description || 'Discover this amazing property opportunity.'}</p>
            </div>
            <div class="item-actions">
                <a href="#" onclick="handleContactAgent('${item.guid}'); return false;" class="btn btn-outline-primary">Contact Agent</a>
                <a href="#" onclick="handleScheduleVisit('${item.guid}'); return false;" class="btn btn-primary">Schedule Visit</a>
            </div>
        </div>
    `;
} 