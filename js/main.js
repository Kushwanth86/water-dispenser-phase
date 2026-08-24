/* js/main.js */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('nav-open');
            
            const lines = mobileToggle.querySelectorAll('.hamburger-line');
            if (!isExpanded) {
                lines[0].style.transform = 'translateY(6px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
            header.style.background = 'rgba(5, 10, 21, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.background = 'rgba(5, 10, 21, 0.95)';
        }
    });
});

function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
        const depth = path.split('/pages/')[1].split('/').length;
        return '../'.repeat(depth);
    }
    return './';
}