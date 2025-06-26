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
    const password = prompt('Enter admin password:');
    if (password === ADMIN_PASSWORD) {
        adminPanel.style.display = 'block';
        adminLogin.style.display = 'none';
        passwordInput.value = '';
    } else if (password !== null) {
        alert('Incorrect password');
    }
}

// Hide admin panel
function hideAdminPanel() {
    adminPanel.style.display = 'none';
    adminLogin.style.display = 'block';
    clearForm();
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
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.target = '_blank';
            linkElement.className = 'link-card';
            linkElement.innerHTML = `
                <div class="link-icon">
                    ${link.image ? 
                        `<img src="${link.image}" alt="${link.name}">` : 
                        `<i class="fas fa-link"></i>`}
                </div>
                <div class="link-text">
                    <div class="link-title">${link.name}</div>
                    ${link.description ? `<div class="link-desc">${link.description}</div>` : ''}
                </div>
                <i class="fas fa-chevron-right"></i>
            `;
            
            // Add right-click menu for admin
            if (adminPanel.style.display === 'block') {
                linkElement.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showLinkMenu(e, linkIndex);
                });
            }
            
            linksContainer.appendChild(linkElement);
        });
    });
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
    
    document.getElementById('productName').value = link.name;
    document.getElementById('productDescription').value = link.description || '';
    document.getElementById('productImage').value = link.image || '';
    document.getElementById('affiliateLink').value = link.url;
    document.getElementById('productCategory').value = link.category;
    
    // Remove the link from the array
    links.splice(index, 1);
    saveLinks();
    
    // Scroll to form
    document.querySelector('.admin-panel').scrollIntoView({ behavior: 'smooth' });
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

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a hash in the URL for admin access
    if (window.location.hash === '#admin') {
        showAdminPanel();
    }
    
    // Add keyboard shortcut (Ctrl+Alt+A) to show admin panel
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 'a') {
            e.preventDefault();
            showAdminPanel();
        }
    });
    
    renderLinks();
});
