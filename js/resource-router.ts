// ==========================================
// RESOURCE ROUTER (v3.0)
// ==========================================

// --- External functions (defined in sibling scripts) ---
declare function appBootAnimation(loadingEl: HTMLElement, textEl: HTMLElement, lines: string[], onComplete: () => void): () => void;
declare function rememberFocusForLayer(layerId: string): void;
declare function restoreFocusForLayer(layerId: string): void;

let cancelRouterBoot: (() => void) | null = null;

const routerBootLines: string[] = [
    "> EXEC resource_router.exe",
    "> CONNECTING TO GLOBAL NETWORK...",
    "> NO ROUTES CONFIGURED.",
    "> AWAITING OPERATOR INPUT."
];

// --- LAUNCH / CLOSE ---
function launchResourceRouter(): void {
    const layer = document.getElementById('layer-resource-router') as HTMLDivElement;
    const loading = document.getElementById('router-loading') as HTMLDivElement;
    const textEl = document.getElementById('router-loading-text') as HTMLDivElement;
    const app = document.getElementById('router-app') as HTMLDivElement;

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

function closeResourceRouter(): void {
    if (cancelRouterBoot) {
        cancelRouterBoot();
        cancelRouterBoot = null;
    }
    (document.getElementById('layer-resource-router') as HTMLDivElement).style.display = 'none';
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-resource-router');
}

// Expose to global scope for inline HTML handlers and cross-file calls
(window as any).launchResourceRouter = launchResourceRouter;
(window as any).closeResourceRouter = closeResourceRouter;
