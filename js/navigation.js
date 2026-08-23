/**
 * AQUASENSE - NAVIGATION & SEARCH MODULE
 * File: js/navigation.js
 */

const Navigation = {
    header: null,
    searchBtn: null,
    searchOverlay: null,
    searchInput: null,
    searchResults: null,
    searchCloseBtn: null,
    rootPath: './', // Default to current directory
    
    // Engineering Project Search Index
    searchIndex: [
        { title: "Project Overview", category: "Overview", url: "pages/overview/overview.html", desc: "Introduction, scope, and objectives of the AquaSense prototype." },
        { title: "System Architecture", category: "System", url: "pages/system/architecture.html", desc: "High-level block diagram and component integration flow." },
        { title: "System Workflow", category: "System", url: "pages/system/workflow.html", desc: "Step-by-step sequence of automated operations." },
        { title: "Working Principle", category: "System", url: "pages/system/working-principle.html", desc: "Detailed explanation of ultrasonic detection and dispensing logic." },
        { title: "Hardware Overview", category: "Hardware", url: "pages/hardware/hardware.html", desc: "Physical setup and structural integration of the dispenser." },
        { title: "Components", category: "Hardware", url: "pages/hardware/components.html", desc: "SG90 servo motor used for mechanical valve control. Ultrasonic sensor, Arduino Uno." },
        { title: "Circuit Diagram", category: "Hardware", url: "pages/hardware/circuit.html", desc: "Wiring schematic and pin connections for Phase 1." },
        { title: "Source Code", category: "Software", url: "pages/software/code.html", desc: "AquaSense_Phase1.ino Arduino sketch with syntax highlighting." },
        { title: "Code Explanation", category: "Software", url: "pages/software/code-explanation.html", desc: "Breakdown of decision logic, sensor reading, and servo control sequences." },
        { title: "CAD Models", category: "CAD", url: "pages/cad/cad.html", desc: "3D printable main box and lid designs." },
        { title: "3D Viewer", category: "CAD", url: "pages/cad/3d-viewer.html", desc: "Interactive inspection of the main-box and main-lid models." },
        { title: "Testing Results", category: "Testing", url: "pages/testing/testing.html", desc: "Methodology, expected behavior, actual results, and mechanical limitations." },
        { title: "Hardware Demo", category: "Demo", url: "pages/demo/demo.html", desc: "Video presentation of the working physical prototype." },
        { title: "Learning Journey", category: "Learning", url: "pages/learning/learning.html", desc: "Skills acquired in electronics, embedded C++, and mechanics." },
        { title: "Team Timeline", category: "Team", url: "pages/team/teamjourney.html", desc: "Development timeline from idea to functional prototype." },
        { title: "Documentation", category: "Documentation", url: "pages/documentation/documentation.html", desc: "Library of all project PDFs, engineering reports, and manuals." },
        { title: "Downloads", category: "Documentation", url: "pages/documentation/downloads.html", desc: "Direct links to download BOM, manual, and source code files." },
        { title: "Presentation", category: "Presentation", url: "pages/presentation/presentation.html", desc: "Official project slide deck (Automatic-Water-Dispenser.pptx)." },
        { title: "Phase 2 Roadmap", category: "Future", url: "pages/future/phase2.html", desc: "Planned enhancements for the Smart Dispenser ecosystem." }
    ],

    init() {
        this.header = document.getElementById('mainHeader');
        this.searchBtn = document.getElementById('searchBtn');
        
        // Dynamically ascertain the correct relative path to root for linking
        const bodyTag = document.querySelector('body');
        if (bodyTag && bodyTag.hasAttribute('data-rootpath')) {
            this.rootPath = bodyTag.getAttribute('data-rootpath');
        }

        this.injectSearchUI();
        this.bindEvents();
        this.checkScroll();
        this.setActiveLink();
    },

    injectSearchUI() {
        const searchHTML = `
            <div class="search-overlay" id="searchOverlay">
                <div class="search-modal">
                    <div class="search-header">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input type="text" class="search-input" id="searchInput" placeholder="Search hardware, code, docs..." autocomplete="off">
                        <button class="search-close" id="searchClose">ESC</button>
                    </div>
                    <div class="search-results" id="searchResults">
                        <!-- Results dynamically injected here -->
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', searchHTML);
        
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchCloseBtn = document.getElementById('searchClose');
    },

    bindEvents() {
        // Scroll event for sticky header
        window.addEventListener('scroll', () => {
            this.checkScroll();
        });

        // Global Keybindings
        document.addEventListener('keydown', (e) => {
            // Open Search (Ctrl + K or Cmd + K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearch();
            }
            // Close Search (ESC)
            if (e.key === 'Escape' && this.searchOverlay.classList.contains('active')) {
                this.closeSearch();
            }
        });

        // Click Bindings
        if (this.searchBtn) this.searchBtn.addEventListener('click', () => this.openSearch());
        if (this.searchCloseBtn) this.searchCloseBtn.addEventListener('click', () => this.closeSearch());

        // Click outside modal to close
        if (this.searchOverlay) {
            this.searchOverlay.addEventListener('click', (e) => {
                if (e.target === this.searchOverlay) this.closeSearch();
            });
        }

        // Live Search Input Logic
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
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
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && currentPath.includes(href.split('/').pop())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    openSearch() {
        this.searchOverlay.classList.add('active');
        this.searchInput.value = '';
        this.searchResults.innerHTML = '';
        document.body.style.overflow = 'hidden'; // Freeze background scrolling
        
        // Slight delay to allow CSS transition before focusing
        setTimeout(() => this.searchInput.focus(), 100);
    },

    closeSearch() {
        this.searchOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    },

    handleSearch(query) {
        query = query.toLowerCase().trim();
        if (!query) {
            this.searchResults.innerHTML = '';
            return;
        }

        // Filter based on title, category, or description matches
        const filtered = this.searchIndex.filter(item => {
            return item.title.toLowerCase().includes(query) || 
                   item.category.toLowerCase().includes(query) || 
                   item.desc.toLowerCase().includes(query);
        });

        this.renderResults(filtered);
    },

    renderResults(results) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="no-results">No engineering data found for this query.</div>';
            return;
        }

        const html = results.map(item => `
            <a href="${this.rootPath}${item.url}" class="search-result-item">
                <div class="search-result-header">
                    <span class="search-result-title">${item.title}</span>
                    <span class="search-result-category">${item.category}</span>
                </div>
                <div class="search-result-desc">${item.desc}</div>
            </a>
        `).join('');

        this.searchResults.innerHTML = html;
    }
};