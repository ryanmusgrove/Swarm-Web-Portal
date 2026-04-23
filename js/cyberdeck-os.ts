// ==========================================
// CYBERDECK OS - Core System
// ==========================================

import { ENGINE_VERSION } from './version';

interface BugReportPayload {
    title: string;
    description: string;
    includeTelemetry: boolean;
    gpuInfo?: string;
}

// --- External functions (defined in sibling scripts) ---
declare function closeParticleLab(): void;
declare function closeResourceRouter(): void;
declare function closeBeeSim(): void;
declare function closeDocsViewer(): void;
declare function launchParticleLab(): void;
declare function launchBeeSim(): void;
declare function launchResourceRouter(): void;
declare function launchDocsViewer(docKey?: string): void;
declare function togglePlabControls(): void;
declare function toggleBeeSimControls(): void;

// --- Types ---
interface CyberdeckTheme {
    ui: string;
    uiDim: string;
    uiBorder: string;
    flames: [string, string, string, string];
}

type ThemeKey = 'amber' | 'green' | 'blue' | 'pink';

const themes: Record<ThemeKey, CyberdeckTheme> = {
    amber: { ui: '#f59e0b', uiDim: 'rgba(245,158,11,0.2)', uiBorder: '#78350f', flames: ['#78350f','#b45309','#f59e0b','#fef3c7'] },
    green: { ui: '#22c55e', uiDim: 'rgba(34,197,94,0.2)',   uiBorder: '#14532d', flames: ['#14532d','#16a34a','#22c55e','#bbf7d0'] },
    blue:  { ui: '#3b82f6', uiDim: 'rgba(59,130,246,0.2)',  uiBorder: '#1e3a8a', flames: ['#1e3a8a','#2563eb','#60a5fa','#ffffff'] },
    pink:  { ui: '#ec4899', uiDim: 'rgba(236,72,153,0.2)',  uiBorder: '#831843', flames: ['#831843','#be185d','#ec4899','#fce7f3'] }
};

let currentThemeKey: ThemeKey = 'amber';
let currentProtocol: string = 'standby';
let osIsActive: boolean = false;
let isPowerOn: boolean = false;
let activeTimeouts: number[] = [];

// --- DOM REFERENCES ---
function requireEl<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Missing required element: ${id}`);
    return el as T;
}
const layerOff       = requireEl<HTMLDivElement>('layer-off');
const layerTerminal  = requireEl<HTMLDivElement>('layer-terminal');
const layerSwarm     = requireEl<HTMLDivElement>('layer-swarm');
const layerOs        = requireEl<HTMLDivElement>('layer-os');
const terminalText   = requireEl<HTMLDivElement>('terminal-text');
const loadingBar     = requireEl<HTMLDivElement>('loading-bar-container');
const swarmContainer = requireEl<HTMLDivElement>('swarm-container');
const miniDisplay    = requireEl<HTMLDivElement>('mini-display');
const powerSwitch    = document.getElementById('power-switch') as HTMLButtonElement | null;
const asciiLogo      = requireEl<HTMLPreElement>('ascii-logo');
const overlayFocusMemory = new Map<string, HTMLElement>();

function handleAppTileAction(action: string): void {
    if (action === 'apps-folder') openAppsFolder();
    else if (action === 'docs-folder') openDocsFolder();
    else if (action === 'docs-viewer') launchDocsViewer();
    else if (action === 'particle-lab') launchParticleLab();
    else if (action === 'sysmon') launchSysMon();
    else if (action === 'resource-router') launchResourceRouter();
    else if (action === 'bee-sim') launchBeeSim();
    else if (action === 'crypt-vault') showPlaceholder('CRYPT_VAULT');
    else if (action === 'jack-in') showPlaceholder('JACK_IN');
}

function openAppsFolder(): void {
    rememberFocusForLayer('layer-apps-folder');
    (document.getElementById('layer-apps-folder') as HTMLDivElement).style.display = 'block';
}

function closeAppsFolder(): void {
    (document.getElementById('layer-apps-folder') as HTMLDivElement).style.display = 'none';
    restoreFocusForLayer('layer-apps-folder');
}

function openDocsFolder(): void {
    rememberFocusForLayer('layer-docs-folder');
    (document.getElementById('layer-docs-folder') as HTMLDivElement).style.display = 'block';
}

function closeDocsFolder(): void {
    (document.getElementById('layer-docs-folder') as HTMLDivElement).style.display = 'none';
    restoreFocusForLayer('layer-docs-folder');
}

function bindCoreInteractions(): void {
    if (powerSwitch) {
        powerSwitch.addEventListener('click', togglePower);
    }
    if (layerOs) {
        layerOs.addEventListener('click', (event: MouseEvent) => {
            const appTile = (event.target as Element).closest('[data-app-action]') as HTMLElement | null;
            if (!appTile) return;
            handleAppTileAction(appTile.dataset.appAction!);
        });
    }
    const folderLayer = document.getElementById('layer-apps-folder') as HTMLDivElement | null;
    if (folderLayer) {
        folderLayer.addEventListener('click', (event: MouseEvent) => {
            const folderApp = (event.target as Element).closest('[data-folder-app]') as HTMLElement | null;
            if (!folderApp) return;
            const appAction = folderApp.dataset.folderApp!;
            closeAppsFolder();
            handleAppTileAction(appAction);
        });
    }
    const docsFolderLayer = document.getElementById('layer-docs-folder') as HTMLDivElement | null;
    if (docsFolderLayer) {
        docsFolderLayer.addEventListener('click', (event: MouseEvent) => {
            const folderDoc = (event.target as Element).closest('[data-folder-doc]') as HTMLElement | null;
            if (!folderDoc) return;
            const docKey = folderDoc.dataset.folderDoc!;
            closeDocsFolder();
            launchDocsViewer(docKey);
        });
    }
    document.addEventListener('keydown', handleGlobalKeydown);
}

function rememberFocusForLayer(layerId: string): void {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) {
        overlayFocusMemory.set(layerId, active);
    } else {
        overlayFocusMemory.delete(layerId);
    }
}

function canReceiveFocus(el: unknown): el is HTMLElement {
    if (!(el instanceof HTMLElement)) return false;
    if (!document.contains(el)) return false;
    if (el.hasAttribute('disabled')) return false;
    if (el.hasAttribute('hidden')) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return el.getClientRects().length > 0;
}

function restoreFocusForLayer(layerId: string): void {
    const target = overlayFocusMemory.get(layerId);
    overlayFocusMemory.delete(layerId);
    if (!canReceiveFocus(target)) return;
    target.focus({ preventScroll: true });
}

function isLayerVisible(id: string): boolean {
    const el = document.getElementById(id);
    if (!el) return false;
    return window.getComputedStyle(el).display !== 'none';
}

function getActiveOverlayLayer(): HTMLElement | null {
    const overlayOrder = [
        'layer-placeholder',
        'layer-docs-viewer',
        'layer-resource-router',
        'layer-sysmon',
        'layer-beesim',
        'layer-particle-lab',
        'layer-docs-folder',
        'layer-apps-folder'
    ];
    for (const id of overlayOrder) {
        if (isLayerVisible(id)) return document.getElementById(id);
    }
    return null;
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selector = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    return (Array.from(container.querySelectorAll(selector)) as HTMLElement[]).filter((el) => {
        if (el.hasAttribute('hidden')) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        return el.getClientRects().length > 0;
    });
}

function trapFocusInActiveOverlay(event: KeyboardEvent): boolean {
    if (event.key !== 'Tab') return false;

    const layer = getActiveOverlayLayer();
    if (!layer) return false;

    const focusables = getFocusableElements(layer);
    if (focusables.length === 0) {
        if (!layer.hasAttribute('tabindex')) layer.setAttribute('tabindex', '-1');
        layer.focus();
        event.preventDefault();
        return true;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (!layer.contains(active as Node)) {
        first.focus();
        event.preventDefault();
        return true;
    }

    if (!event.shiftKey && active === last) {
        first.focus();
        event.preventDefault();
        return true;
    }

    if (event.shiftKey && active === first) {
        last.focus();
        event.preventDefault();
        return true;
    }

    return false;
}

function handleGlobalKeydown(event: KeyboardEvent): void {
    if (trapFocusInActiveOverlay(event)) return;
    if (event.key !== 'Escape') return;

    // Close highest z-index overlay/app first.
    if (bugReportOpen) {
        cancelBugReport();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-placeholder')) {
        closePlaceholder();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-docs-viewer') && typeof closeDocsViewer === 'function') {
        closeDocsViewer();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-resource-router') && typeof closeResourceRouter === 'function') {
        closeResourceRouter();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-sysmon')) {
        closeSysMon();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-beesim') && typeof closeBeeSim === 'function') {
        closeBeeSim();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-particle-lab') && typeof closeParticleLab === 'function') {
        closeParticleLab();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-docs-folder')) {
        closeDocsFolder();
        event.preventDefault();
        return;
    }
    if (isLayerVisible('layer-apps-folder')) {
        closeAppsFolder();
        event.preventDefault();
    }
}

const bootText: string[] = [
    `BIOS Date 04/12/2077 14:32:01 Ver ${ENGINE_VERSION}`,
    "CPU: Kiroshi Optic-Core 9.2GHz",
    "Memory Test: 1048576K OK",
    "Initializing Neural Interface...",
    "Allocating Core Arena... [64MB OK]",
    "Enforcing 64-Byte SIMD Alignment... [STRICT]",
    "Initializing MPSC Job Queues... [LOCK-FREE]",
    "Mounting VFS... [OK]",
    "Loading Subroutines... [OK]",
    "<span style='color:#eab308;font-weight:bold;'>HIVE PROTOCOL INITIATED.</span>",
    "Deploying Swarm OS...",
    "Initiating visual payload..."
];

// --- UTILITY ---
function clearAllTimeouts(): void { activeTimeouts.forEach(clearTimeout); activeTimeouts = []; }
function schedule(fn: () => void, delay: number): number { const id = setTimeout(fn, delay); activeTimeouts.push(id); return id; }

// --- THEME ---
function changeTheme(key: ThemeKey): void {
    const t = themes[key]; if (!t) return;
    currentThemeKey = key;
    document.documentElement.style.setProperty('--primary', t.ui);
    document.documentElement.style.setProperty('--primary-dim', t.uiDim);
    document.documentElement.style.setProperty('--primary-border', t.uiBorder);
    if (isPowerOn && osIsActive) startMiniDisplay();
}

// --- LIGHT / DARK MODE ---
let isLightMode: boolean = false;
function toggleLightMode(): void {
    isLightMode = !isLightMode;
    document.body.classList.toggle('light-mode', isLightMode);
    const icon = document.getElementById('mode-icon') as HTMLSpanElement | null;
    if (icon) icon.innerHTML = isLightMode ? '&#9788;' : '&#9790;';
}

// --- BUG REPORT ---
let bugReportOpen: boolean = false;
let bugReportSubmitting: boolean = false;

async function fetchWithTimeout(input: RequestInfo, init: RequestInit, timeoutMs: number): Promise<Response> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        return await fetch(input, { ...init, signal: controller.signal });
    } finally {
        clearTimeout(timer);
    }
}

function isBugReportDirty(): boolean {
    const title = document.getElementById('bug-report-title') as HTMLInputElement | null;
    const desc = document.getElementById('bug-report-desc') as HTMLTextAreaElement | null;
    return (title != null && title.value.length > 0) || (desc != null && desc.value.length > 0);
}

function openBugReport(): void {
    if (bugReportOpen) return;

    // Close side panels if open (Particle Lab / Bee Sim controls)
    const plabCtrl = document.getElementById('plab-controls') as HTMLDivElement | null;
    if (plabCtrl && !plabCtrl.classList.contains('collapsed')) {
        plabCtrl.classList.add('collapsed');
    }
    const beeCtrl = document.getElementById('beesim-controls') as HTMLDivElement | null;
    if (beeCtrl && !beeCtrl.classList.contains('collapsed')) {
        beeCtrl.classList.add('collapsed');
    }

    const panel = document.getElementById('bug-report-panel') as HTMLDivElement | null;
    const btn = document.getElementById('bug-report-btn') as HTMLButtonElement | null;
    if (!panel) return;
    panel.style.display = 'flex';
    // Force reflow for transition
    void panel.offsetHeight;
    panel.classList.add('open');
    if (btn) btn.classList.add('active');
    bugReportOpen = true;

    // Update char counters
    updateBugCharCount('bug-report-title', 'bug-title-count', 60);
    updateBugCharCount('bug-report-desc', 'bug-desc-count', 250);
}

function closeBugReport(): void {
    const panel = document.getElementById('bug-report-panel') as HTMLDivElement | null;
    const btn = document.getElementById('bug-report-btn') as HTMLButtonElement | null;
    if (!panel) return;

    // Remove confirm overlay if present
    const confirm = panel.querySelector('.bug-report-confirm');
    if (confirm) confirm.remove();

    panel.classList.remove('open');
    if (btn) btn.classList.remove('active');
    bugReportOpen = false;

    // Clear fields
    const title = document.getElementById('bug-report-title') as HTMLInputElement | null;
    const desc = document.getElementById('bug-report-desc') as HTMLTextAreaElement | null;
    if (title) title.value = '';
    if (desc) desc.value = '';
    updateBugCharCount('bug-report-title', 'bug-title-count', 60);
    updateBugCharCount('bug-report-desc', 'bug-desc-count', 250);

    // Hide after transition
    setTimeout(() => {
        if (!bugReportOpen) panel.style.display = 'none';
    }, 350);
}

function cancelBugReport(): void {
    if (isBugReportDirty()) {
        showBugReportConfirm();
    } else {
        closeBugReport();
    }
}

function showBugReportConfirm(): void {
    const panel = document.getElementById('bug-report-panel') as HTMLDivElement | null;
    if (!panel || panel.querySelector('.bug-report-confirm')) return;

    const overlay = document.createElement('div');
    overlay.className = 'bug-report-confirm';
    overlay.innerHTML = `
        <div class="bug-report-confirm-text">Discard unsaved changes?</div>
        <div class="bug-report-confirm-actions">
            <button type="button" class="plab-topbar-btn" id="bug-confirm-discard">DISCARD</button>
            <button type="button" class="plab-topbar-btn" id="bug-confirm-keep">KEEP EDITING</button>
        </div>
    `;
    panel.appendChild(overlay);

    (overlay.querySelector('#bug-confirm-discard') as HTMLButtonElement).addEventListener('click', () => {
        closeBugReport();
    });
    (overlay.querySelector('#bug-confirm-keep') as HTMLButtonElement).addEventListener('click', () => {
        overlay.remove();
    });
}

function toggleBugReport(): void {
    if (!isPowerOn || !osIsActive) return;
    if (bugReportOpen) {
        cancelBugReport();
    } else {
        openBugReport();
    }
}

function updateBugCharCount(inputId: string, countId: string, max: number): void {
    const input = document.getElementById(inputId) as HTMLInputElement | HTMLTextAreaElement | null;
    const counter = document.getElementById(countId) as HTMLSpanElement | null;
    if (input && counter) {
        counter.textContent = input.value.length + ' / ' + max;
    }
}

function bindBugReportInputs(): void {
    const title = document.getElementById('bug-report-title') as HTMLInputElement | null;
    const desc = document.getElementById('bug-report-desc') as HTMLTextAreaElement | null;
    if (title) {
        title.addEventListener('input', () => updateBugCharCount('bug-report-title', 'bug-title-count', 60));
    }
    if (desc) {
        desc.addEventListener('input', () => updateBugCharCount('bug-report-desc', 'bug-desc-count', 250));
    }
}

function getHardwareTelemetry(): string {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'Unknown (WebGL unavailable)';
    const ext = (gl as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'Unknown (renderer info unavailable)';
    return (gl as WebGLRenderingContext).getParameter(ext.UNMASKED_RENDERER_WEBGL) || 'Unknown';
}

function renderUplinkSuccess(ticketId: string): string {
    const width = 36;
    const bar = '═'.repeat(width);
    const line = (text: string): string => '║' + text.padEnd(width) + '║';
    return [
        '╔' + bar + '╗',
        line('      BUG REPORT UPLINKED'),
        '╠' + bar + '╣',
        line(''),
        line('   »» TICKET: ' + ticketId.toUpperCase() + ' ««'),
        line(''),
        line('      STATUS: ACKNOWLEDGED'),
        line('      ROUTE:  SWARM CENTRAL'),
        '╚' + bar + '╝',
    ].join('\n');
}

function armResetOnFirstInput(el: HTMLTextAreaElement): void {
    const clear = () => {
        el.value = '';
        el.removeEventListener('focus', clear);
        el.removeEventListener('keydown', clear);
    };
    el.addEventListener('focus', clear, { once: true });
    el.addEventListener('keydown', clear, { once: true });
}

async function submitBugReport(): Promise<void> {
    if (bugReportSubmitting) return;

    const titleEl = document.getElementById('bug-report-title') as HTMLInputElement;
    const descEl = document.getElementById('bug-report-desc') as HTMLTextAreaElement;
    const sendBtn = document.getElementById('bug-report-send') as HTMLButtonElement;
    const telemetryToggle = document.getElementById('telemetry-toggle') as HTMLInputElement | null;

    if (!titleEl.value.trim() || !descEl.value.trim()) return;

    bugReportSubmitting = true;
    sendBtn.textContent = 'UPLINKING...';
    sendBtn.disabled = true;

    const includeTelemetry = !!telemetryToggle?.checked;
    const payload: BugReportPayload = {
        title: titleEl.value.trim(),
        description: descEl.value.trim(),
        includeTelemetry
    };
    if (includeTelemetry) {
        payload.gpuInfo = getHardwareTelemetry();
    }

    try {
        const res = await fetchWithTimeout('/api/report-bug', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }, 10000);
        if (!res.ok) {
            const body = await res.json().catch(() => null);
            throw new Error(body?.error || 'Uplink failed');
        }
        const data = await res.json();
        titleEl.value = '';
        descEl.value = renderUplinkSuccess(data.id ?? 'UNKNOWN');
        armResetOnFirstInput(descEl);
    } catch (error) {
        const detail =
            error instanceof Error && error.name === 'AbortError' ? 'Uplink timed out' :
            error instanceof Error ? error.message :
            typeof error === 'string' ? error :
            'Unknown error';
        descEl.value =
            '[ ERR :: UPLINK FAILED ]\n' +
            '> Transmission interrupted.\n' +
            '> Details: ' + detail;
    } finally {
        bugReportSubmitting = false;
        sendBtn.textContent = 'SEND';
        sendBtn.disabled = false;
    }
}

// --- PROTOCOL ---
function changeProtocol(proto: string): void {
    currentProtocol = proto;

    const iceEl = document.getElementById('ice-status') as HTMLSpanElement | null;
    const sentEl = document.getElementById('sentinel-status') as HTMLSpanElement | null;
    const stealthEl = document.getElementById('stealth-status') as HTMLSpanElement | null;

    if (iceEl) { iceEl.textContent = 'STANDBY'; iceEl.className = 'status-standby'; }
    if (sentEl) { sentEl.textContent = 'STANDBY'; sentEl.className = 'status-standby'; }
    if (stealthEl) { stealthEl.textContent = 'STANDBY'; stealthEl.className = 'status-standby'; }

    if (proto === 'iceburn' && iceEl) {
        iceEl.textContent = '[ ACTIVE ]'; iceEl.className = 'status-iceburn-pulse';
    } else if (proto === 'sentinel' && sentEl) {
        sentEl.textContent = '[ ACTIVE ]'; sentEl.className = 'status-sentinel';
    } else if (proto === 'ghost' && stealthEl) {
        stealthEl.textContent = '[ CLOAKED ]'; stealthEl.className = 'status-ghost';
    }

    if (isPowerOn && osIsActive) startMiniDisplay();
}

// --- POWER ---
function togglePower(): void {
    isPowerOn = !isPowerOn;
    if (powerSwitch) powerSwitch.setAttribute('aria-pressed', isPowerOn ? 'true' : 'false');
    if (isPowerOn) {
        powerSwitch.classList.add('on');
        startBootSequence();
    } else {
        powerSwitch.classList.remove('on');
        if (typeof closeParticleLab === 'function') closeParticleLab();
        if (typeof closeResourceRouter === 'function') closeResourceRouter();
        if (typeof closeBeeSim === 'function') closeBeeSim();
        if (typeof closeDocsViewer === 'function') closeDocsViewer();
        if (bugReportOpen) closeBugReport();
        closeDocsFolder();
        closeAppsFolder();
        closeSysMon();
        closePlaceholder();
        turnOff();
    }
}

function turnOff(): void {
    clearAllTimeouts(); osIsActive = false;
    if (powerSwitch) powerSwitch.setAttribute('aria-pressed', 'false');
    layerOff.style.display = 'flex';
    layerTerminal.style.display = 'none';
    layerSwarm.style.display = 'none';
    layerOs.style.display = 'none';
    miniDisplay.classList.remove('active');
    terminalText.innerHTML = '';
    loadingBar.style.display = 'none';
    swarmContainer.innerHTML = '';
    miniDisplay.innerHTML = '';
    asciiLogo.style.display = 'none';
    (document.getElementById('protocol-selector') as HTMLSelectElement).value = 'standby';
    currentProtocol = 'standby';
}

// --- BOOT SEQUENCE ---
function startBootSequence(): void {
    layerOff.style.display = 'none';
    layerTerminal.style.display = 'flex';

    // Show ASCII logo first
    schedule(() => {
        asciiLogo.style.display = 'block';
    }, 200);

    let delay = 600;
    bootText.forEach((txt, i) => {
        schedule(() => {
            const line = document.createElement('div');
            line.innerHTML = txt;
            terminalText.appendChild(line);
            if (i === 8) loadingBar.style.display = 'block';
        }, delay);
        delay += 250;
    });
    schedule(() => { layerTerminal.style.display = 'none'; startSwarmBoot(); }, delay + 800);
}

// --- FLAME GENERATION ---
function generateFlames(container: HTMLElement, count: number, color: string, speedBase: number, z: number, hMin: number, hMax: number): void {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'flame-shard';
        s.style.backgroundColor = color;
        s.style.left = `${Math.random()*100}%`;
        s.style.width = `${2+Math.random()*10}%`;
        s.style.height = `${hMin+Math.random()*(hMax-hMin)}%`;
        s.style.zIndex = z;
        s.style.animationDuration = `${speedBase+Math.random()}s`;
        s.style.animationDelay = `${Math.random()*2}s`;
        container.appendChild(s);
    }
}

// --- SWARM BOOT ---
function startSwarmBoot(): void {
    layerSwarm.style.display = 'block';
    swarmContainer.innerHTML = '';
    for (let i = 0; i < 80; i++) {
        const b = document.createElement('div');
        b.className = 'bee';
        b.style.top = `${Math.random()*100}%`;
        b.style.animationDuration = `${2+Math.random()*3}s, ${0.1+Math.random()*0.3}s`;
        b.style.animationDelay = `${Math.random()*3}s, 0s`;
        b.style.transform = `scale(${0.5+Math.random()})`;
        swarmContainer.appendChild(b);
    }
    schedule(() => { layerSwarm.style.display = 'none'; showOS(); }, 5000);
}

// --- MINI DISPLAY ---
function startMiniDisplay(): void {
    miniDisplay.innerHTML = '';

    if (currentProtocol === 'iceburn') {
        const f = themes[currentThemeKey].flames;
        generateFlames(miniDisplay, 20, f[0], 1.5, 1, 60, 100);
        generateFlames(miniDisplay, 25, f[1], 1.2, 2, 40, 80);
        generateFlames(miniDisplay, 30, f[2], 0.8, 3, 20, 60);
        generateFlames(miniDisplay, 15, f[3], 0.5, 4, 10, 40);
    } else if (currentProtocol === 'sentinel') {
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'sentinel-dot';
            dot.style.left = `${5 + Math.random() * 90}%`;
            dot.style.top = `${10 + Math.random() * 70}%`;
            dot.style.animationDuration = `${0.8 + Math.random() * 1.5}s`;
            dot.style.animationDelay = `${Math.random() * 2}s`;
            miniDisplay.appendChild(dot);
        }
    } else if (currentProtocol === 'ghost') {
        for (let i = 0; i < 12; i++) {
            const bar = document.createElement('div');
            bar.className = 'ghost-bar';
            bar.style.top = `${Math.random() * 100}%`;
            bar.style.width = `${10 + Math.random() * 30}%`;
            bar.style.animationDuration = `${1.5 + Math.random() * 3}s`;
            bar.style.animationDelay = `${Math.random() * 3}s`;
            miniDisplay.appendChild(bar);
        }
    } else {
        const label = document.createElement('div');
        label.className = 'mini-standby-label';
        label.textContent = 'STANDBY';
        miniDisplay.appendChild(label);
    }
}

// --- SHOW OS ---
function showOS(): void {
    osIsActive = true;
    layerOs.style.display = 'flex';
    miniDisplay.classList.add('active');
    changeProtocol(currentProtocol);
    startMiniDisplay();
}

// --- SYSTEM CLOCK ---
setInterval(() => {
    const el = document.getElementById('sys-time') as HTMLParagraphElement | null;
    if (el) el.innerText = `SYS.TIME: ${new Date().toLocaleTimeString()}`;
}, 1000);

let cancelSysMonBoot: (() => void) | null = null;

// --- APP BOOT ANIMATION (shared helper) ---
function appBootAnimation(loadingEl: HTMLElement, textEl: HTMLElement, lines: string[], onComplete: () => void): () => void {
    let cancelled = false;
    const localTimeouts: number[] = [];
    const localSetTimeout = (fn: () => void, delay: number): number => {
        const id = setTimeout(() => {
            if (!cancelled) fn();
        }, delay);
        localTimeouts.push(id);
        return id;
    };

    loadingEl.style.display = 'flex';
    textEl.innerHTML = '';

    let delay = 150;
    lines.forEach((line, idx) => {
        localSetTimeout(() => {
            const div = document.createElement('div');
            div.textContent = line;
            div.classList.add('visible');
            textEl.appendChild(div);
            if (idx === lines.length - 1) {
                const bar = document.createElement('div');
                bar.className = 'plab-load-bar';
                textEl.appendChild(bar);
            }
        }, delay);
        delay += 250;
    });

    localSetTimeout(() => {
        loadingEl.style.display = 'none';
        onComplete();
    }, delay + 600);

    return () => {
        cancelled = true;
        localTimeouts.forEach(clearTimeout);
        localTimeouts.length = 0;
        loadingEl.style.display = 'none';
    };
}

// --- SYS MON APP ---
const sysmonBootLines: string[] = [
    "> EXEC sys_monitor.exe",
    "> POLLING HARDWARE INTERFACES...",
    "> LOADING PROCESS TABLE...",
    "> SENSORS ONLINE."
];

function launchSysMon(): void {
    const layer = document.getElementById('layer-sysmon') as HTMLDivElement;
    const loading = document.getElementById('sysmon-loading') as HTMLDivElement;
    const textEl = document.getElementById('sysmon-loading-text') as HTMLDivElement;
    const app = document.getElementById('sysmon-app') as HTMLDivElement;

    rememberFocusForLayer('layer-sysmon');
    layer.style.display = 'flex';
    app.style.display = 'none';

    if (cancelSysMonBoot) {
        cancelSysMonBoot();
        cancelSysMonBoot = null;
    }

    cancelSysMonBoot = appBootAnimation(loading, textEl, sysmonBootLines, () => {
        cancelSysMonBoot = null;
        app.style.display = 'flex';
        changeProtocol(currentProtocol);
    });
}

function closeSysMon(): void {
    if (cancelSysMonBoot) {
        cancelSysMonBoot();
        cancelSysMonBoot = null;
    }
    (document.getElementById('layer-sysmon') as HTMLDivElement).style.display = 'none';
    restoreFocusForLayer('layer-sysmon');
}

// --- PLACEHOLDER APP ---
function showPlaceholder(name: string): void {
    rememberFocusForLayer('layer-placeholder');
    (document.getElementById('placeholder-name') as HTMLDivElement).textContent = name;
    (document.getElementById('layer-placeholder') as HTMLDivElement).style.display = 'block';
}
function closePlaceholder(): void {
    (document.getElementById('layer-placeholder') as HTMLDivElement).style.display = 'none';
    restoreFocusForLayer('layer-placeholder');
}

bindCoreInteractions();
bindBugReportInputs();

// Cross-file calls (consumed by other script modules via declare function)
(window as any).rememberFocusForLayer = rememberFocusForLayer;
(window as any).restoreFocusForLayer = restoreFocusForLayer;
(window as any).appBootAnimation = appBootAnimation;

// Inline HTML handlers. Remove a registration only after replacing its HTML caller.
(window as any).changeTheme = changeTheme;
(window as any).toggleLightMode = toggleLightMode;
(window as any).changeProtocol = changeProtocol;
(window as any).toggleBugReport = toggleBugReport;
(window as any).cancelBugReport = cancelBugReport;
(window as any).closeSysMon = closeSysMon;
(window as any).closeAppsFolder = closeAppsFolder;
(window as any).closeDocsFolder = closeDocsFolder;
(window as any).closePlaceholder = closePlaceholder;

// Bug report submission (button wired directly)
document.getElementById('bug-report-send')?.addEventListener('click', submitBugReport);
