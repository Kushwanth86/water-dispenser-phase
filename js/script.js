/* =========================================================
   AQUASENSE
   Automatic Touchless Water Dispenser
   Global JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.setAttribute("aria-expanded", navLinks.classList.contains("active") ? "true" : "false");
        });
    }

    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".dropbtn");
        if (!button) return;
        button.addEventListener("click", (event) => {
            if (window.innerWidth <= 850) {
                event.preventDefault();
                dropdowns.forEach((item) => { if (item !== dropdown) item.classList.remove("active"); });
                dropdown.classList.toggle("active");
            }
        });
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 850 && navLinks) navLinks.classList.remove("active");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 850) {
            if (navLinks) navLinks.classList.remove("active");
            dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
        }
    });

    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            backToTop.classList.toggle("visible", window.scrollY > 400);
        });
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    document.querySelectorAll(".copy-code").forEach((button) => {
        button.addEventListener("click", async () => {
            const code = button.closest(".code-container")?.querySelector("code");
            if (!code) return;
            try {
                await navigator.clipboard.writeText(code.innerText);
                const originalText = button.textContent;
                button.textContent = "Copied";
                setTimeout(() => button.textContent = originalText, 1600);
            } catch (error) { console.error("Unable to copy code:", error); }
        });
    });

    document.querySelectorAll(".current-year").forEach((element) => element.textContent = new Date().getFullYear());
    document.querySelectorAll('a[target="_blank"]').forEach((link) => link.setAttribute("rel", "noopener noreferrer"));

    /* =====================================================
       AQUASENSE PROJECT JOURNEY + GLOBAL SEARCH
       Added as one global layer so every page remains easy
       to navigate without creating another complicated menu.
    ===================================================== */

    const journey = [
        { n: "01", label: "Overview", path: "pages/project/overview.html", keys: "overview project introduction problem objective" },
        { n: "02", label: "Working", path: "pages/project/working-principle.html", keys: "working principle operation how works" },
        { n: "03", label: "Architecture", path: "pages/system/architecture.html", keys: "architecture system block diagram controller" },
        { n: "04", label: "Workflow", path: "pages/system/workflow.html", keys: "workflow process sequence detection dispensing" },
        { n: "05", label: "Hardware", path: "pages/hardware/hardware.html", keys: "hardware arduino uno hc sr04 ultrasonic servo lcd battery components" },
        { n: "06", label: "Circuit", path: "pages/design/circuit.html", keys: "circuit wiring electrical connections" },
        { n: "07", label: "CAD", path: "pages/design/cad.html", keys: "cad fusion 360 enclosure 3d model box lid servo" },
        { n: "08", label: "Software", path: "pages/software/code.html", keys: "software code arduino programming ino" },
        { n: "09", label: "Testing", path: "pages/testing/testing.html", keys: "testing results prototype validation" },
        { n: "10", label: "Demo", path: "pages/demo/demo.html", keys: "demo hardware demonstration video setup" },
        { n: "11", label: "Learning", path: "pages/learning/learning.html", keys: "learning lessons mentor" },
        { n: "12", label: "Team", path: "pages/team/journey.html", keys: "team journey contribution mentor" },
        { n: "13", label: "Documents", path: "pages/documentation/documentation.html", keys: "documentation report manual documents" },
        { n: "14", label: "Downloads", path: "pages/documentation/downloads.html", keys: "download files source report pdf" }
    ];

    const scriptTag = Array.from(document.scripts).find((s) => s.src.includes("/js/script.js"));
    const siteRoot = scriptTag ? new URL("../", scriptTag.src).href : new URL("./", window.location.href).href;
    const hrefFor = (path) => siteRoot + path;
    const currentPath = window.location.pathname.replace(/\\/g, "/");
    const currentIndex = journey.findIndex((item) => currentPath.endsWith("/" + item.path) || currentPath.endsWith(item.path));

    const navbar = document.querySelector(".navbar");

    /* Sequential journey strip */
    if (navbar) {
        const journeyBar = document.createElement("div");
        journeyBar.className = "as-journey-bar";
        journeyBar.innerHTML = `
            <div class="as-journey-inner">
                <span class="as-journey-title">PROJECT JOURNEY</span>
                <div class="as-journey-track">
                    ${journey.map((item, index) => `
                        <a class="as-journey-step ${index === currentIndex ? "current" : ""} ${index < currentIndex ? "completed" : ""}"
                           href="${hrefFor(item.path)}" title="Step ${item.n}: ${item.label}">
                            <span>${item.n}</span><b>${item.label}</b>
                        </a>
                    `).join("")}
                </div>
            </div>`;
        navbar.insertAdjacentElement("afterend", journeyBar);
    }

    /* Global search button */
    const searchButton = document.createElement("button");
    searchButton.className = "as-search-trigger";
    searchButton.type = "button";
    searchButton.innerHTML = "⌕ <span>Search project</span><kbd>Ctrl K</kbd>";
    searchButton.setAttribute("aria-label", "Search AquaSense project");
    if (navbar?.querySelector(".nav-container")) navbar.querySelector(".nav-container").appendChild(searchButton);

    const searchOverlay = document.createElement("div");
    searchOverlay.className = "as-search-overlay";
    searchOverlay.innerHTML = `
        <div class="as-search-backdrop"></div>
        <section class="as-search-panel" role="dialog" aria-modal="true" aria-label="Search AquaSense project">
            <div class="as-search-head">
                <div><small>AQUASENSE PROJECT SEARCH</small><h2>What do you want to explore?</h2></div>
                <button class="as-search-close" type="button" aria-label="Close search">×</button>
            </div>
            <div class="as-search-input-wrap">
                <span>⌕</span><input id="as-project-search" type="search" autocomplete="off" placeholder="Try: servo, circuit, CAD, Arduino, report..."><kbd>ESC</kbd>
            </div>
            <div class="as-search-hint">Results stay in project order, so you can search without losing the overall sequence.</div>
            <div id="as-search-results" class="as-search-results"></div>
        </section>`;
    document.body.appendChild(searchOverlay);

    const searchInput = searchOverlay.querySelector("#as-project-search");
    const results = searchOverlay.querySelector("#as-search-results");
    const closeSearch = () => {
        searchOverlay.classList.remove("open");
        document.body.classList.remove("as-search-open");
    };

    const renderResults = (query = "") => {
        const q = query.trim().toLowerCase();
        const matches = journey.filter((item) => !q || `${item.label} ${item.keys}`.toLowerCase().includes(q));
        if (!matches.length) {
            results.innerHTML = `<div class="as-no-results"><strong>No exact match.</strong><span>Try <b>servo</b>, <b>Arduino</b>, <b>CAD</b>, <b>circuit</b>, or <b>testing</b>.</span></div>`;
            return;
        }
        results.innerHTML = matches.map((item) => {
            const index = journey.indexOf(item);
            return `<a class="as-result ${index === currentIndex ? "active" : ""}" href="${hrefFor(item.path)}">
                <span class="as-result-number">${item.n}</span>
                <span class="as-result-copy"><strong>${item.label}</strong><small>${item.keys.split(" ").slice(0, 7).join(" • ")}</small></span>
                <span class="as-result-arrow">→</span>
            </a>`;
        }).join("");
    };

    const openSearch = () => {
        searchOverlay.classList.add("open");
        document.body.classList.add("as-search-open");
        renderResults(searchInput.value);
        setTimeout(() => searchInput.focus(), 50);
    };

    searchButton.addEventListener("click", openSearch);
    searchOverlay.querySelector(".as-search-close").addEventListener("click", closeSearch);
    searchOverlay.querySelector(".as-search-backdrop").addEventListener("click", closeSearch);
    searchInput.addEventListener("input", () => renderResults(searchInput.value));
    document.addEventListener("keydown", (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); }
        if (event.key === "Escape") closeSearch();
    });

    /* Previous / next controls on journey pages */
    if (currentIndex >= 0) {
        const controls = document.createElement("div");
        controls.className = "as-page-controls";
        controls.innerHTML = `
            ${currentIndex > 0 ? `<a href="${hrefFor(journey[currentIndex - 1].path)}" class="as-prev">← <span>Previous</span><b>${journey[currentIndex - 1].label}</b></a>` : `<span></span>`}
            <span class="as-position">STEP ${journey[currentIndex].n} OF ${journey.length}</span>
            ${currentIndex < journey.length - 1 ? `<a href="${hrefFor(journey[currentIndex + 1].path)}" class="as-next"><span>Next</span><b>${journey[currentIndex + 1].label}</b> →</a>` : `<span></span>`}`;
        document.querySelector("main")?.appendChild(controls);
    }

    /* Self-contained styles for the new navigation layer */
    const style = document.createElement("style");
    style.textContent = `
        .as-journey-bar{position:sticky;top:78px;z-index:900;background:#0c1b2e;border-bottom:1px solid #20344c;color:#fff;overflow-x:auto;scrollbar-width:none}.as-journey-bar::-webkit-scrollbar{display:none}.as-journey-inner{width:min(1180px,calc(100% - 40px));margin:auto;display:flex;align-items:center;gap:18px;min-height:46px}.as-journey-title{font-size:9px;font-weight:900;letter-spacing:1.4px;color:#8fc5ff;white-space:nowrap}.as-journey-track{display:flex;align-items:center;gap:4px;white-space:nowrap}.as-journey-step{display:flex;align-items:center;gap:6px;padding:6px 8px;border-radius:7px;color:#b8c7d8;font-size:9px;font-weight:700}.as-journey-step span{font-size:8px;color:#6f849d}.as-journey-step:hover{background:#17304d;color:#fff}.as-journey-step.completed{color:#d8e9ff}.as-journey-step.current{background:#1769e0;color:#fff}.as-journey-step.current span{color:#fff}.as-search-trigger{margin-left:8px;padding:8px 11px;border:1px solid #dce6f1;border-radius:8px;background:#fff;color:#20344c;font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap}.as-search-trigger:hover{border-color:#1769e0;color:#1769e0}.as-search-trigger kbd{margin-left:8px;padding:2px 5px;border-radius:4px;background:#eef5ff;color:#1769e0;font-size:8px}.as-search-overlay{position:fixed;inset:0;z-index:5000;display:none}.as-search-overlay.open{display:block}.as-search-backdrop{position:absolute;inset:0;background:rgba(4,15,28,.62);backdrop-filter:blur(5px)}.as-search-panel{position:relative;width:min(720px,calc(100% - 30px));max-height:min(760px,calc(100vh - 70px));margin:70px auto 0;padding:26px;border:1px solid #dce6f1;border-radius:18px;background:#fff;box-shadow:0 30px 80px rgba(0,0,0,.28);overflow:auto}.as-search-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start}.as-search-head small{color:#1769e0;font-size:9px;font-weight:900;letter-spacing:1.5px}.as-search-head h2{margin-top:6px;font-size:26px}.as-search-close{width:34px;height:34px;border-radius:9px;background:#f7faff;color:#20344c;font-size:24px;cursor:pointer}.as-search-input-wrap{display:flex;align-items:center;gap:10px;margin-top:22px;padding:0 14px;border:2px solid #dce6f1;border-radius:11px}.as-search-input-wrap:focus-within{border-color:#1769e0}.as-search-input-wrap span{color:#1769e0;font-size:20px}.as-search-input-wrap input{width:100%;height:52px;border:0;outline:0;color:#102033;background:transparent}.as-search-input-wrap kbd{padding:3px 6px;border-radius:4px;background:#eef5ff;color:#1769e0;font-size:8px}.as-search-hint{margin:12px 0 16px;color:#64758b;font-size:11px}.as-search-results{display:grid;gap:7px}.as-result{display:grid;grid-template-columns:42px 1fr 20px;align-items:center;gap:12px;padding:12px;border:1px solid #dce6f1;border-radius:10px;background:#fff}.as-result:hover,.as-result.active{border-color:#9fc5ef;background:#f7faff}.as-result-number{display:grid;place-items:center;width:34px;height:34px;border-radius:8px;background:#eaf3ff;color:#1769e0;font-size:9px;font-weight:900}.as-result-copy strong{display:block;color:#102033;font-size:12px}.as-result-copy small{display:block;margin-top:2px;color:#64758b;font-size:9px;text-transform:capitalize}.as-result-arrow{color:#1769e0;font-weight:900}.as-no-results{padding:24px;border-radius:10px;background:#f7faff}.as-no-results strong{display:block;color:#102033}.as-no-results span{display:block;margin-top:5px;color:#64758b;font-size:11px}.as-page-controls{width:min(1180px,calc(100% - 40px));margin:30px auto 60px;padding:16px 0;border-top:1px solid #dce6f1;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:15px}.as-page-controls a{display:flex;align-items:center;gap:7px;color:#1769e0;font-size:10px}.as-page-controls b{color:#102033}.as-page-controls .as-next{justify-content:flex-end}.as-position{color:#64758b;text-align:center;font-size:8px;font-weight:900;letter-spacing:1px}@media(max-width:850px){.as-journey-bar{top:70px}.as-journey-inner{width:calc(100% - 20px)}.as-journey-title{display:none}.as-search-trigger{margin-left:5px;padding:7px 8px}.as-search-trigger span,.as-search-trigger kbd{display:none}.as-search-panel{margin-top:20px;padding:20px}.as-page-controls{width:calc(100% - 30px)}}
    `;
    document.head.appendChild(style);
});