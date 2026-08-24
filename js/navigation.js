/* js/navigation.js */
document.addEventListener('DOMContentLoaded', () => {
    const searchIndex = [
        { title: "Project Overview", url: "index.html", category: "General", desc: "Phase 1 Prototype overview and goals.", keywords: "home start main overview" },
        { title: "System Architecture", url: "pages/system/architecture.html", category: "System", desc: "High-level block diagram and component flow.", keywords: "flowchart diagram input output" },
        { title: "Working Principle", url: "pages/system/working-principle.html", category: "System", desc: "How the ultrasonic sensor and servo interact.", keywords: "logic mechanics how it works" },
        { title: "Hardware Components", url: "pages/hardware/components.html", category: "Hardware", desc: "List of Arduino, Sensors, LCD, and Motors.", keywords: "parts bom list arduino ultrasonic servo" },
        { title: "Circuit Diagram", url: "pages/hardware/circuit.html", category: "Hardware", desc: "Wiring schematics and pin connections.", keywords: "wiring schematic pins breadboard" },
        { title: "Source Code", url: "pages/software/code.html", category: "Software", desc: "Main Arduino (.ino) code and logic.", keywords: "programming sketch c++ script" },
        { title: "CAD & 3D Models", url: "pages/cad/cad.html", category: "CAD", desc: "Enclosure design and STL downloads.", keywords: "box lid stl solidworks fusion 3d print" },
        { title: "Test Results", url: "pages/testing/testing.html", category: "Testing", desc: "Performance metrics and limitations.", keywords: "bugs errors performance accuracy" },
        { title: "Hardware Demo", url: "pages/demo/demo.html", category: "Demo", desc: "Video demonstration of the working prototype.", keywords: "video mp4 working real life" },
        { title: "Project Documentation", url: "pages/documentation/documentation.html", category: "Docs", desc: "Downloadable PDFs, BOM, and Reports.", keywords: "pdf download report manual" },
        { title: "Phase 2 Roadmap", url: "pages/future/phase2.html", category: "Future", desc: "Planned upgrades for the Enhanced Smart Dispenser.", keywords: "future next upgrades v2" }
    ];

    const searchHTML = `
        <div class="search-overlay" id="searchOverlay">
            <div class="search-modal glass-panel">
                <div class="search-header">
                    <input type="text" id="searchInput" placeholder="Search components, code, CAD..." autocomplete="off">
                    <button class="close-search" aria-label="Close Search">✕</button>
                </div>
                <div class="search-results" id="searchResults">
                    <div class="search-empty">Type to start searching the project...</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHTML);

    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const closeSearch = document.querySelector('.close-search');

    function performSearch(query) {
        if (!query) {
            searchResults.innerHTML = '<div class="search-empty">Type to start searching...</div>';
            return;
        }
        
        const q = query.toLowerCase();
        const results = searchIndex.filter(item => 
            item.title.toLowerCase().includes(q) || 
            item.category.toLowerCase().includes(q) || 
            item.keywords.includes(q)
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-empty">No matching engineering data found.</div>';
            return;
        }

        const basePath = getBasePath();
        
        searchResults.innerHTML = results.map(item => `
            <a href="${basePath}${item.url}" class="search-result-item">
                <div class="sr-category">${item.category}</div>
                <div class="sr-content">
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            </a>
        `).join('');
    }

    const toggleSearch = (show) => {
        searchOverlay.classList.toggle('active', show);
        if (show) setTimeout(() => searchInput.focus(), 100);
        else searchInput.value = '';
    };

    searchTriggers.forEach(btn => btn.addEventListener('click', () => toggleSearch(true)));
    closeSearch.addEventListener('click', () => toggleSearch(false));
    searchInput.addEventListener('input', (e) => performSearch(e.target.value));

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearch(!searchOverlay.classList.contains('active'));
        }
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            toggleSearch(false);
        }
    });
});