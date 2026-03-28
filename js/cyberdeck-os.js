// ==========================================
// CYBERDECK OS - Core System
// ==========================================

const themes = {
    amber: { ui: '#f59e0b', uiDim: 'rgba(245,158,11,0.2)', uiBorder: '#78350f', flames: ['#78350f','#b45309','#f59e0b','#fef3c7'] },
    green: { ui: '#22c55e', uiDim: 'rgba(34,197,94,0.2)',   uiBorder: '#14532d', flames: ['#14532d','#16a34a','#22c55e','#bbf7d0'] },
    blue:  { ui: '#3b82f6', uiDim: 'rgba(59,130,246,0.2)',  uiBorder: '#1e3a8a', flames: ['#1e3a8a','#2563eb','#60a5fa','#ffffff'] },
    pink:  { ui: '#ec4899', uiDim: 'rgba(236,72,153,0.2)',  uiBorder: '#831843', flames: ['#831843','#be185d','#ec4899','#fce7f3'] }
};

let currentThemeKey = 'amber';
let currentProtocol = 'standby';
let osIsActive = false;
let isPowerOn = false;
let activeTimeouts = [];

// --- DOM REFERENCES ---
const layerOff       = document.getElementById('layer-off');
const layerTerminal  = document.getElementById('layer-terminal');
const layerSwarm     = document.getElementById('layer-swarm');
const layerOs        = document.getElementById('layer-os');
const terminalText   = document.getElementById('terminal-text');
const loadingBar     = document.getElementById('loading-bar-container');
const swarmContainer = document.getElementById('swarm-container');
const miniDisplay    = document.getElementById('mini-display');
const powerSwitch    = document.getElementById('power-switch');
const asciiLogo      = document.getElementById('ascii-logo');
const overlayFocusMemory = new Map();

function handleAppTileAction(action) {
    if (action === 'apps-folder') openAppsFolder();
    else if (action === 'docs-viewer') launchDocsViewer();
    else if (action === 'particle-lab') launchParticleLab();
    else if (action === 'sysmon') launchSysMon();
    else if (action === 'resource-router') launchResourceRouter();
    else if (action === 'bee-sim') launchBeeSim();
    else if (action === 'crypt-vault') showPlaceholder('CRYPT_VAULT');
    else if (action === 'jack-in') showPlaceholder('JACK_IN');
}

function openAppsFolder() {
    rememberFocusForLayer('layer-apps-folder');
    document.getElementById('layer-apps-folder').style.display = 'block';
}

function closeAppsFolder() {
    document.getElementById('layer-apps-folder').style.display = 'none';
    restoreFocusForLayer('layer-apps-folder');
}

function bindCoreInteractions() {
    if (powerSwitch) {
        powerSwitch.addEventListener('click', togglePower);
    }
    if (layerOs) {
        layerOs.addEventListener('click', (event) => {
            const appTile = event.target.closest('[data-app-action]');
            if (!appTile) return;
            handleAppTileAction(appTile.dataset.appAction);
        });
    }
    const folderLayer = document.getElementById('layer-apps-folder');
    if (folderLayer) {
        folderLayer.addEventListener('click', (event) => {
            const folderApp = event.target.closest('[data-folder-app]');
            if (!folderApp) return;
            const appAction = folderApp.dataset.folderApp;
            closeAppsFolder();
            handleAppTileAction(appAction);
        });
    }
    document.addEventListener('keydown', handleGlobalKeydown);
}

function rememberFocusForLayer(layerId) {
    const active = document.activeElement;
    if (active instanceof HTMLElement && active !== document.body) {
        overlayFocusMemory.set(layerId, active);
    } else {
        overlayFocusMemory.delete(layerId);
    }
}

function canReceiveFocus(el) {
    if (!(el instanceof HTMLElement)) return false;
    if (!document.contains(el)) return false;
    if (el.hasAttribute('disabled')) return false;
    if (el.hasAttribute('hidden')) return false;
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') return false;
    return el.getClientRects().length > 0;
}

function restoreFocusForLayer(layerId) {
    const target = overlayFocusMemory.get(layerId);
    overlayFocusMemory.delete(layerId);
    if (!canReceiveFocus(target)) return;
    target.focus({ preventScroll: true });
}

function isLayerVisible(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    return window.getComputedStyle(el).display !== 'none';
}

function getActiveOverlayLayer() {
    const overlayOrder = [
        'layer-placeholder',
        'layer-docs-viewer',
        'layer-resource-router',
        'layer-sysmon',
        'layer-beesim',
        'layer-particle-lab',
        'layer-apps-folder'
    ];
    for (const id of overlayOrder) {
        if (isLayerVisible(id)) return document.getElementById(id);
    }
    return null;
}

function getFocusableElements(container) {
    const selector = [
        'a[href]',
        'area[href]',
        'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    return Array.from(container.querySelectorAll(selector)).filter((el) => {
        if (el.hasAttribute('hidden')) return false;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden') return false;
        return el.getClientRects().length > 0;
    });
}

function trapFocusInActiveOverlay(event) {
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

    if (!layer.contains(active)) {
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

function handleGlobalKeydown(event) {
    if (trapFocusInActiveOverlay(event)) return;
    if (event.key !== 'Escape') return;

    // Close highest z-index overlay/app first.
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
    if (isLayerVisible('layer-apps-folder')) {
        closeAppsFolder();
        event.preventDefault();
    }
}

const bootText = [
    "BIOS Date 04/12/2077 14:32:01 Ver 7.0.4",
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
function clearAllTimeouts() { activeTimeouts.forEach(clearTimeout); activeTimeouts = []; }
function schedule(fn, delay) { const id = setTimeout(fn, delay); activeTimeouts.push(id); return id; }

// --- THEME ---
function changeTheme(key) {
    const t = themes[key]; if (!t) return;
    currentThemeKey = key;
    document.documentElement.style.setProperty('--primary', t.ui);
    document.documentElement.style.setProperty('--primary-dim', t.uiDim);
    document.documentElement.style.setProperty('--primary-border', t.uiBorder);
    if (isPowerOn && osIsActive) startMiniDisplay();
}

// --- PROTOCOL ---
function changeProtocol(proto) {
    currentProtocol = proto;

    const iceEl = document.getElementById('ice-status');
    const sentEl = document.getElementById('sentinel-status');
    const stealthEl = document.getElementById('stealth-status');

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
function togglePower() {
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
        closeAppsFolder();
        closeSysMon();
        closePlaceholder();
        turnOff();
    }
}

function turnOff() {
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
    document.getElementById('protocol-selector').value = 'standby';
    currentProtocol = 'standby';
}

// --- BOOT SEQUENCE ---
function startBootSequence() {
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
function generateFlames(container, count, color, speedBase, z, hMin, hMax) {
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
function startSwarmBoot() {
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
function startMiniDisplay() {
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
        for (let i = 0; i < 30; i++) {
            const b = document.createElement('div');
            b.className = 'bee-mini';
            b.style.top = `${10+Math.random()*80}%`;
            b.style.animationDuration = `${1.5+Math.random()*2}s, ${0.05+Math.random()*0.15}s`;
            b.style.animationDelay = `${Math.random()*3}s, 0s`;
            miniDisplay.appendChild(b);
        }
    }
}

// --- SHOW OS ---
function showOS() {
    osIsActive = true;
    layerOs.style.display = 'flex';
    miniDisplay.classList.add('active');
    changeProtocol(currentProtocol);
    startMiniDisplay();
}

// --- SYSTEM CLOCK ---
setInterval(() => {
    const el = document.getElementById('sys-time');
    if (el) el.innerText = `SYS.TIME: ${new Date().toLocaleTimeString()}`;
}, 1000);

let cancelSysMonBoot = null;

// --- APP BOOT ANIMATION (shared helper) ---
function appBootAnimation(loadingEl, textEl, lines, onComplete) {
    let cancelled = false;
    const localTimeouts = [];
    const localSetTimeout = (fn, delay) => {
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
const sysmonBootLines = [
    "> EXEC sys_monitor.exe",
    "> POLLING HARDWARE INTERFACES...",
    "> LOADING PROCESS TABLE...",
    "> SENSORS ONLINE."
];

function launchSysMon() {
    const layer = document.getElementById('layer-sysmon');
    const loading = document.getElementById('sysmon-loading');
    const textEl = document.getElementById('sysmon-loading-text');
    const app = document.getElementById('sysmon-app');

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

function closeSysMon() {
    if (cancelSysMonBoot) {
        cancelSysMonBoot();
        cancelSysMonBoot = null;
    }
    document.getElementById('layer-sysmon').style.display = 'none';
    restoreFocusForLayer('layer-sysmon');
}

// --- PLACEHOLDER APP ---
function showPlaceholder(name) {
    rememberFocusForLayer('layer-placeholder');
    document.getElementById('placeholder-name').textContent = name;
    document.getElementById('layer-placeholder').style.display = 'block';
}
function closePlaceholder() {
    document.getElementById('layer-placeholder').style.display = 'none';
    restoreFocusForLayer('layer-placeholder');
}

bindCoreInteractions();

window.rememberFocusForLayer = rememberFocusForLayer;
window.restoreFocusForLayer = restoreFocusForLayer;
