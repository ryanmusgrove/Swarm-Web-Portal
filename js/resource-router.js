// ==========================================
// RESOURCE ROUTER (v3.0)
// ==========================================

let cancelRouterBoot = null;

const routerBootLines = [
    "> EXEC resource_router.exe",
    "> CONNECTING TO GLOBAL NETWORK...",
    "> VERIFYING ENDPOINTS...",
    "> UPLINK READY."
];

function openExternalSafe(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
}

// --- Link click delegation ---
(function bindRouterLinks() {
    const routerApp = document.getElementById('router-app');
    if (!routerApp) return;
    routerApp.addEventListener('click', (event) => {
        const tile = event.target.closest('[data-router-link]');
        if (!tile) return;
        openExternalSafe(tile.dataset.routerLink);
    });
})();

// --- LAUNCH / CLOSE ---
function launchResourceRouter() {
    const layer = document.getElementById('layer-resource-router');
    const loading = document.getElementById('router-loading');
    const textEl = document.getElementById('router-loading-text');
    const app = document.getElementById('router-app');

    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-resource-router');
    layer.style.display = 'flex';
    app.style.display = 'none';

    if (cancelRouterBoot) {
        cancelRouterBoot();
        cancelRouterBoot = null;
    }

    cancelRouterBoot = appBootAnimation(loading, textEl, routerBootLines, () => {
        cancelRouterBoot = null;
        app.style.display = 'flex';
    });
}

function closeResourceRouter() {
    if (cancelRouterBoot) {
        cancelRouterBoot();
        cancelRouterBoot = null;
    }
    document.getElementById('layer-resource-router').style.display = 'none';
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-resource-router');
}
