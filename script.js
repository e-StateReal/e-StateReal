// Admin password (in a real app, this would be handled server-side with proper authentication)
const ADMIN_PASSWORD = 'Mazorr@33186'; // Change this to a secure password

// Sample data - in a real app, this would come from a database
let links = [
    {
        name: "Premium Real Estate Course",
        description: "Learn how to invest in real estate with our comprehensive course",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        url: "https://example.com/real-estate-course",
        category: "education"
    },
    {
        name: "Investment Properties",
        description: "Browse our selection of high-yield investment properties",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        url: "https://example.com/investment-properties",
        category: "properties"
    }
];

// Load links from localStorage if available
if (localStorage.getItem('affiliateLinks')) {
    links = JSON.parse(localStorage.getItem('affiliateLinks'));
}

// DOM Elements
const adminPanel = document.getElementById('adminPanel');
const adminLogin = document.getElementById('adminLogin');
const passwordInput = document.getElementById('adminPassword');

// Show admin panel
function showAdminPanel() {
    try {
        const password = prompt('Enter admin password:');
        if (password === ADMIN_PASSWORD) {
            // Set admin mode flag
            isAdminMode = true;
            
            // Show admin panel and hide login button
            const adminPanel = document.getElementById('adminPanel');
            const adminLogin = document.getElementById('adminLogin');
            adminPanel.style.display = 'block';
            adminLogin.style.display = 'none';
            
            // Add admin mode class to body
            document.body.classList.add('admin-mode');
            
            // Force re-render to show edit buttons
            renderLinks();
            
            // Add a small delay to ensure the DOM is updated
            setTimeout(() => {
                // Make sure all action buttons are visible
                document.querySelectorAll('.link-actions').forEach(actions => {
                    actions.style.display = 'flex';
                    actions.style.opacity = '1';
                    actions.style.visibility = 'visible';
                });
                
                // Add padding to all link cards for action buttons
                document.querySelectorAll('.link-card').forEach(card => {
                    card.style.paddingRight = '150px';
                });
            }, 50);
            
        } else if (password !== null) {
            alert('Incorrect password');
        }
    } catch (error) {
        console.error('Error in showAdminPanel:', error);
        alert('An error occurred. Please check the console for details.');
    }
}

// Hide admin panel
function hideAdminPanel() {
    try {
        const adminPanel = document.getElementById('adminPanel');
        const adminLogin = document.getElementById('adminLogin');
        
        // Hide admin panel and show login button
        adminPanel.style.display = 'none';
        adminLogin.style.display = 'block';
        
        // Remove admin mode class from body
        document.body.classList.remove('admin-mode');
        
        // Clear the form
        clearForm();
        
        // Re-render links without admin controls
        renderLinks();
        
        // Reset padding on link cards
        document.querySelectorAll('.link-card').forEach(card => {
            card.style.paddingRight = '';
        });
        
    } catch (error) {
        console.error('Error in hideAdminPanel:', error);
    }
}

// Clear the form
function clearForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('affiliateLink').value = '';
    document.getElementById('productCategory').value = '';
}

// Render the links
function renderLinks() {
    const linksContainer = document.getElementById('affiliateLinks');
    linksContainer.innerHTML = '';
    
    // Check if in admin mode
    const isAdminMode = document.body.classList.contains('admin-mode');
    
    // Group links by category
    const linksByCategory = {};
    links.forEach(link => {
        if (!linksByCategory[link.category]) {
            linksByCategory[link.category] = [];
        }
        linksByCategory[link.category].push(link);
    });
    
    // Define category display names
    const categoryNames = {
        'featured': '⭐ Featured',
        'properties': '🏠 Properties',
        'investments': '💼 Investments',
        'services': '🔧 Services',
        'education': '📚 Education'
    };
    
    // Render each category
    Object.entries(linksByCategory).forEach(([category, categoryLinks]) => {
        // Skip empty categories
        if (categoryLinks.length === 0) return;
        
        // Create category header
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'category-header';
        categoryHeader.textContent = categoryNames[category] || category;
        linksContainer.appendChild(categoryHeader);
        
        // Add links for this category
        categoryLinks.forEach((link, index) => {
            const linkIndex = links.findIndex(l => l.name === link.name);
            const linkElement = document.createElement('div');
            linkElement.className = 'link-card';
            
            // Use full product name for main page
            let displayName = link.name;
            
            // Create the main link content
            const linkContent = document.createElement('div');
            linkContent.className = 'link-content';
            linkContent.style.cursor = 'default';
            linkContent.style.display = 'flex';
            linkContent.style.flexDirection = 'row';
            linkContent.style.alignItems = 'center';
            linkContent.innerHTML = `
                <div class="link-icon">
                    ${link.image ? `<img src="${link.image}" alt="${link.name}">` : `<i class="fas fa-link"></i>`}
                </div>
                <div class="link-text" style="display: flex; flex-direction: column; align-items: flex-start; flex: 1; min-width: 0;">
                    <div class="link-title" title="${link.name}">${displayName}</div>
                    ${!isAdminMode ? `<a href="javascript:void(0);" class="view-details-link" data-index="${linkIndex}">View Details</a>` : ''}
                </div>
            `;
            
            linkElement.appendChild(linkContent);
            
            // Always add actions container, but only show in admin mode
            const actions = document.createElement('div');
            actions.className = 'link-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.title = 'Edit';
            editBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
            editBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                editLink(linkIndex);
            };
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.title = 'Delete';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this link?')) {
                    deleteLink(linkIndex);
                }
            };
            
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            if (isAdminMode) {
                linkElement.appendChild(actions);
            }
            
            // Add context menu for right-click
            linkElement.oncontextmenu = (e) => {
                e.preventDefault();
                showLinkMenu(e, linkIndex);
            };
            
            linksContainer.appendChild(linkElement);
        });
    });

    // Add event listeners for View Details links (only if not admin mode)
    if (!document.body.classList.contains('admin-mode')) {
        document.querySelectorAll('.view-details-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const idx = this.getAttribute('data-index');
                const offer = links[idx];
                showModal(offer.name, offer.description);
            });
        });
    }
}

// Show context menu for link actions
function showLinkMenu(e, index) {
    // Remove any existing menus
    const existingMenu = document.querySelector('.context-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.position = 'fixed';
    menu.style.left = `${e.pageX}px`;
    menu.style.top = `${e.pageY}px`;
    menu.style.background = 'white';
    menu.style.borderRadius = '8px';
    menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    menu.style.zIndex = '1000';
    menu.style.overflow = 'hidden';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'menu-item';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.onclick = () => editLink(index);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'menu-item delete';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> Delete';
    deleteBtn.onclick = () => deleteLink(index);
    
    menu.appendChild(editBtn);
    menu.appendChild(deleteBtn);
    document.body.appendChild(menu);
    
    // Close menu when clicking outside
    const closeMenu = (e) => {
        if (!menu.contains(e.target)) {
            menu.remove();
            document.removeEventListener('click', closeMenu);
        }
    };
    
    setTimeout(() => {
        document.addEventListener('click', closeMenu);
    }, 100);
}

// Add a new link
function addLink() {
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const image = document.getElementById('productImage').value.trim();
    const url = document.getElementById('affiliateLink').value.trim();
    const category = document.getElementById('productCategory').value;
    
    if (!name || !url || !category) {
        alert('Please fill in all required fields');
        return;
    }
    
    const newLink = {
        name,
        description,
        image: image || null,
        url: url.startsWith('http') ? url : `https://${url}`,
        category
    };
    
    links.push(newLink);
    saveLinks();
    clearForm();
    renderLinks();
}

// Edit a link
function editLink(index) {
    const link = links[index];
    if (!link) return;
    
    // Fill the form with link data
    document.getElementById('productName').value = link.name;
    document.getElementById('productDescription').value = link.description || '';
    document.getElementById('productImage').value = link.image || '';
    document.getElementById('affiliateLink').value = link.url;
    document.getElementById('productCategory').value = link.category;
    
    // Remove the link from the array (we'll add it back if saved)
    links.splice(index, 1);
    saveLinks();
    
    // Show admin panel if not already visible
    if (adminPanel.style.display !== 'block') {
        showAdminPanel();
    } else {
        // Scroll to form
        document.querySelector('.admin-panel').scrollIntoView({ behavior: 'smooth' });
    }
    
    // Re-render to update the UI
    renderLinks();
}

// Delete a link
function deleteLink(index) {
    if (confirm('Are you sure you want to delete this link?')) {
        links.splice(index, 1);
        saveLinks();
        renderLinks();
    }
}

// Save links to localStorage
function saveLinks() {
    localStorage.setItem('affiliateLinks', JSON.stringify(links));
}

// Modal logic
function showModal(title, desc) {
    // Remove any existing modal
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-box">
            <button class="modal-close" title="Close">&times;</button>
            <div class="modal-title">${title}</div>
            <div class="modal-desc">${desc || 'No description available.'}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Close logic
    overlay.querySelector('.modal-close').onclick = () => overlay.remove();
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Show Admin Login button only if #admin is in the URL
    const adminLogin = document.getElementById('adminLogin');
    if (window.location.hash === '#admin') {
        adminLogin.style.display = 'block';
    } else {
        adminLogin.style.display = 'none';
    }

    // Check if there's a hash in the URL for admin access
    if (window.location.hash === '#admin') {
        showAdminPanel();
    }
    
    // Render initial links
    renderLinks();
    
    // Add keyboard shortcut for admin panel (Ctrl+Alt+A)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            e.preventDefault();
            if (adminPanel.style.display === 'block') {
                hideAdminPanel();
            } else {
                showAdminPanel();
            }
        }
    });

    // Make sure admin mode is properly initialized
    if (adminPanel.style.display === 'block') {
        document.body.classList.add('admin-mode');
    }
});

