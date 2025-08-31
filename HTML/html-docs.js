// Element filtering
function filterElements() {
    const searchInput = document.getElementById('elementSearch');
    const categorySelect = document.getElementById('categoryFilter');
    const elements = document.querySelectorAll('.element-item');
    
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    
    elements.forEach(element => {
        const elementText = element.textContent.toLowerCase();
        const elementCategory = element.dataset.category;
        
        const matchesSearch = elementText.includes(searchTerm);
        const matchesCategory = category === 'all' || elementCategory === category;
        
        element.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}

// Tab switching
function switchTab(button, contentId) {
    // Remove active class from all buttons and content
    const tabButtons = button.parentElement.querySelectorAll('.tab-btn');
    const tabContents = button.parentElement.parentElement.querySelectorAll('.tab-content');
    
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(contentId).classList.add('active');
}

// Code copying
function copyCode(button) {
    const codeBlock = button.parentElement.querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Smooth scrolling to elements when clicking sidebar links
document.querySelectorAll('.element-item a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Remove active class from all links
            document.querySelectorAll('.element-item a').forEach(a => {
                a.classList.remove('active');
            });
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to element
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.element-list a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Remove active class from all links
    document.querySelectorAll('.element-list a').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    // Hide all articles
    document.querySelectorAll('.element-docs').forEach(doc => doc.style.display = 'none');
    // Show the selected article
    const id = this.getAttribute('href').replace('#', '');
    document.getElementById(id).style.display = '';
    // Optionally, scroll to top of docs-main
    document.querySelector('.docs-main').scrollTop = 0;
  });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Show first element's content
    const firstLink = document.querySelector('.element-item a');
    if (firstLink) {
        firstLink.classList.add('active');
    }
});
