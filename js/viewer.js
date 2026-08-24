/* js/viewer.js */
document.addEventListener('DOMContentLoaded', () => {
    const viewerHTML = `
        <div class="media-viewer-overlay" id="mediaViewer">
            <div class="media-viewer-toolbar">
                <div class="viewer-title" id="viewerTitle" style="font-size:0.9rem; color:var(--text-primary);">Asset Viewer</div>
                <div class="viewer-actions">
                    <a href="#" id="viewerDownloadBtn" class="btn btn-primary" download style="font-size:0.75rem; padding:0.4rem 0.8rem;">
                        Download File
                    </a>
                    <button class="close-viewer" id="closeViewer" aria-label="Close Viewer">✕</button>
                </div>
            </div>
            <div class="media-viewer-content">
                <img id="viewerImage" src="" alt="Full Screen View">
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', viewerHTML);

    const viewer = document.getElementById('mediaViewer');
    const viewerImg = document.getElementById('viewerImage');
    const viewerTitle = document.getElementById('viewerTitle');
    const downloadBtn = document.getElementById('viewerDownloadBtn');
    const closeBtn = document.getElementById('closeViewer');

    const zoomableImages = document.querySelectorAll('img.zoomable');

    zoomableImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || 'Project Asset';
            
            viewerImg.src = src;
            viewerTitle.textContent = alt;
            downloadBtn.href = src;
            downloadBtn.download = src.split('/').pop(); 

            viewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeMediaViewer = () => {
        viewer.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => viewerImg.src = '', 300);
    };

    closeBtn.addEventListener('click', closeMediaViewer);
    viewer.addEventListener('click', (e) => {
        if (e.target === viewer) closeMediaViewer();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewer.classList.contains('active')) {
            closeMediaViewer();
        }
    });
});