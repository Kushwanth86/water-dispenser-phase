/**
 * AQUASENSE - MAIN INITIALIZATION
 * File: js/main.js
 */

const UIComponents = {
    init() {
        this.setupCopyButtons();
        this.setupAccordions();
    },

    setupCopyButtons() {
        const copyBtns = document.querySelectorAll('.btn-copy');
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-target');
                const textToCopy = document.getElementById(targetId)?.innerText;
                
                if (textToCopy) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        const originalText = btn.innerHTML;
                        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!`;
                        btn.classList.add('copied');
                        
                        setTimeout(() => {
                            btn.innerHTML = originalText;
                            btn.classList.remove('copied');
                        }, 2000);
                    });
                }
            });
        });
    },

    setupAccordions() {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                
                // Close other open items (optional, but keeps UI clean)
                const allItems = document.querySelectorAll('.accordion-item');
                allItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize global modules
    if (typeof Navigation !== 'undefined') Navigation.init();
    if (typeof Animations !== 'undefined') Animations.init();
    if (typeof Viewer !== 'undefined') Viewer.init();
    UIComponents.init();
});