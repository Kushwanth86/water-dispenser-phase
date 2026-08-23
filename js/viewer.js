/**
 * AQUASENSE - VIEWER MODULE
 * File: js/viewer.js
 */

const Viewer = {
    init() {
        this.setupImageZoom();
    },

    setupImageZoom() {
        const zoomables = document.querySelectorAll('.zoomable');
        if (zoomables.length === 0) return;

        // Inject overlay UI only if there are zoomable images on the page
        const overlayHTML = `
            <div class="zoom-overlay" id="zoomOverlay">
                <button class="zoom-close" id="zoomClose">&times;</button>
                <img id="zoomImg" src="" alt="Zoomed View">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', overlayHTML);

        const overlay = document.getElementById('zoomOverlay');
        const zoomImg = document.getElementById('zoomImg');
        const closeBtn = document.getElementById('zoomClose');

        const openZoom = (src) => {
            zoomImg.src = src;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeZoom = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => zoomImg.src = '', 300); // Clear image source after transition
        };

        zoomables.forEach(img => {
            img.addEventListener('click', () => openZoom(img.src));
        });

        closeBtn.addEventListener('click', closeZoom);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeZoom();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeZoom();
            }
        });
    }
};