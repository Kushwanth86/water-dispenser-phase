/* =========================================================
   AQUASENSE
   Automatic Touchless Water Dispenser
   Global JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. MOBILE NAVIGATION
    ========================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            const isOpen = navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

    }


    /* =========================================
       2. MOBILE DROPDOWNS
    ========================================= */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {

        const button = dropdown.querySelector(".dropbtn");

        if (!button) return;

        button.addEventListener("click", (event) => {

            if (window.innerWidth <= 850) {

                event.preventDefault();

                dropdowns.forEach((item) => {

                    if (item !== dropdown) {
                        item.classList.remove("active");
                    }

                });

                dropdown.classList.toggle("active");

            }

        });

    });


    /* =========================================
       3. CLOSE MOBILE MENU AFTER LINK CLICK
    ========================================= */

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (
                window.innerWidth <= 850 &&
                navLinks
            ) {

                navLinks.classList.remove("active");

            }

        });

    });


    /* =========================================
       4. RESET MENU WHEN WINDOW RESIZES
    ========================================= */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("active");
            });

        }

    });


    /* =========================================
       5. BACK TO TOP BUTTON
    ========================================= */

    const backToTop =
        document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                backToTop.classList.add("visible");

            } else {

                backToTop.classList.remove("visible");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================================
       6. SMOOTH INTERNAL ANCHOR SCROLLING
    ========================================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       7. COPY CODE BUTTON
    ========================================= */

    const copyButtons =
        document.querySelectorAll(".copy-code");

    copyButtons.forEach((button) => {

        button.addEventListener("click", async () => {

            const codeContainer =
                button.closest(".code-container");

            if (!codeContainer) return;

            const code =
                codeContainer.querySelector("code");

            if (!code) return;

            try {

                await navigator.clipboard.writeText(
                    code.innerText
                );

                const originalText =
                    button.textContent;

                button.textContent = "Copied";

                setTimeout(() => {

                    button.textContent =
                        originalText;

                }, 1600);

            } catch (error) {

                console.error(
                    "Unable to copy code:",
                    error
                );

            }

        });

    });


    /* =========================================
       8. CURRENT YEAR
    ========================================= */

    const yearElements =
        document.querySelectorAll(".current-year");

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach((element) => {

        element.textContent =
            currentYear;

    });


    /* =========================================
       9. EXTERNAL LINKS SECURITY
    ========================================= */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    externalLinks.forEach((link) => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });

});