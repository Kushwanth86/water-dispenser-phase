/**
 * AQUASENSE - NAVIGATION & SEARCH MODULE
 * File: js/navigation.js
 */

const Navigation = {
    header: null,
    searchBtn: null,
    
    init() {
        this.header = document.getElementById('mainHeader');
        this.searchBtn = document.getElementById('searchBtn');
        
        this.bindEvents();
        this.checkScroll();
        this.setActiveLink();
    },

    bindEvents() {
        // Sticky Header Scroll Event
        window.addEventListener('scroll', () => {
            this.checkScroll();
        });

        // Search Shortcut (Ctrl + K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
        });

        // Search Button Click
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => {
                this.openSearch();
            });
        }
    },

    checkScroll() {
        if (!this.header) return;
        
        if (window.scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    },

    setActiveLink() {
        // Highlights the current page in the navigation
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            // Simple path matching
            if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href').split('/').pop())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    openSearch() {
        // Stub for Search UI (Will be built in Step 5)
        console.log('Search Interface Triggered');
        alert('Global Search Interface will open here. (To be built in Step 5)');
    }
};