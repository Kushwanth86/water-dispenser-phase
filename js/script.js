/* =========================================================
   AQUASENSE — GLOBAL JAVASCRIPT
   Automatic Touchless Water Dispenser
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", (event) => {

            event.stopPropagation();

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =====================================================
       2. MOBILE DROPDOWN MENUS
    ===================================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {

        const button = dropdown.querySelector(".dropbtn");

        if (!button) return;

        button.addEventListener("click", (event) => {

            if (window.innerWidth <= 850) {

                event.preventDefault();

                event.stopPropagation();

                dropdowns.forEach((item) => {

                    if (item !== dropdown) {

                        item.classList.remove("active");

                    }

                });

                dropdown.classList.toggle("active");

            }

        });

    });


    /* =====================================================
       3. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!navLinks) return;

        const clickedInsideNav =
            event.target.closest(".nav-container");

        if (!clickedInsideNav) {

            navLinks.classList.remove("active");

            dropdowns.forEach((dropdown) => {

                dropdown.classList.remove("active");

            });

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    });


    /* =====================================================
       4. CLOSE MOBILE MENU AFTER SELECTING LINK
    ===================================================== */

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 850) {

                if (navLinks) {

                    navLinks.classList.remove("active");

                }

                dropdowns.forEach((dropdown) => {

                    dropdown.classList.remove("active");

                });

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        });

    });


    /* =====================================================
       5. ACTIVE PAGE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";

    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            const href = link
                .getAttribute("href");

            if (!href) return;

            const cleanHref =
                href.split("#")[0]
                    .split("/")
                    .pop()
                    .toLowerCase();

            if (
                cleanHref &&
                cleanHref === currentPage
            ) {

                link.classList.add("active");

            }

        });


    /* =====================================================
       6. SMOOTH SCROLL FOR SAME-PAGE LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute("href");

                    if (
                        !targetID ||
                        targetID === "#"
                    ) {

                        return;

                    }

                    const target =
                        document.querySelector(targetID);

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({

                            behavior: "smooth",

                            block: "start"

                        });

                    }

                }
            );

        });


    /* =====================================================
       7. NAVBAR SHADOW ON SCROLL
    ===================================================== */

    const navbar =
        document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 20) {

            navbar.style.boxShadow =
                "0 8px 25px rgba(15, 23, 42, 0.08)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }

    updateNavbar();

    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    /* =====================================================
       8. COPY CODE BUTTON
    ===================================================== */

    const copyButtons =
        document.querySelectorAll(".copy-code");

    copyButtons.forEach((button) => {

        button.addEventListener(
            "click",
            async () => {

                const codeContainer =
                    button.closest(
                        ".code-container"
                    );

                if (!codeContainer) return;

                const code =
                    codeContainer.querySelector(
                        "pre code"
                    ) ||
                    codeContainer.querySelector(
                        "pre"
                    );

                if (!code) return;

                const originalText =
                    button.textContent;

                try {

                    await navigator.clipboard.writeText(
                        code.innerText
                    );

                    button.textContent =
                        "Copied ✓";

                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 1800);

                } catch (error) {

                    console.error(
                        "Unable to copy code:",
                        error
                    );

                    button.textContent =
                        "Copy failed";

                    setTimeout(() => {

                        button.textContent =
                            originalText;

                    }, 1800);

                }

            }
        );

    });


    /* =====================================================
       9. BACK TO TOP BUTTON
    ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        function toggleBackToTop() {

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        }

        toggleBackToTop();

        window.addEventListener(
            "scroll",
            toggleBackToTop,
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       10. RESPONSIVE RESET
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {

                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }

                dropdowns.forEach(
                    (dropdown) => {

                        dropdown.classList.remove(
                            "active"
                        );

                    }
                );

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );


    /* =====================================================
       11. EXTERNAL LINKS SECURITY
    ===================================================== */

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach((link) => {

            if (
                !link.hasAttribute("rel")
            ) {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        });


    /* =====================================================
       12. IMAGE ERROR HANDLING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image could not be loaded:",
                        image.getAttribute("src")
                    );

                    image.classList.add(
                        "image-error"
                    );

                }
            );

        });


    /* =====================================================
       13. AQUASENSE INITIALIZATION
    ===================================================== */

    console.log(
        "AquaSense website initialized successfully."
    );

});