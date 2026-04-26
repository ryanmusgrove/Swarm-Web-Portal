// ==========================================
// GAME OF LIFE — toggleable Hex (B2/S3,4) or Square Conway (B3/S2,3)
// on a toroidal grid. Internal identifiers retain the historical
// `hx`/`hexlife` prefix from v1.0 (hex-only).
// ==========================================

// --- External functions (defined in sibling scripts) ---
declare function appBootAnimation(loadingEl: HTMLElement, textEl: HTMLElement, lines: string[], onComplete: () => void): () => void;
declare function rememberFocusForLayer(layerId: string): void;
declare function restoreFocusForLayer(layerId: string): void;

// --- Constants ---
const HX_COLS = 32;
const HX_ROWS = 28;
const HX_SQRT3 = Math.sqrt(3);

// Flat-top hex, odd-q offset coords. Neighbour deltas depend on column parity.
const HX_NEIGHBORS_EVEN: ReadonlyArray<readonly [number, number]> = [
    [+1,  0], [+1, -1],
    [ 0, -1], [ 0, +1],
    [-1,  0], [-1, -1]
];
const HX_NEIGHBORS_ODD: ReadonlyArray<readonly [number, number]> = [
    [+1, +1], [+1,  0],
    [ 0, -1], [ 0, +1],
    [-1, +1], [-1,  0]
];

// Conway / square: 8-neighbour Moore neighbourhood.
const SQ_NEIGHBORS: ReadonlyArray<readonly [number, number]> = [
    [-1, -1], [ 0, -1], [+1, -1],
    [-1,  0],           [+1,  0],
    [-1, +1], [ 0, +1], [+1, +1]
];

// --- Types ---
type HxPaintMode = 'alive' | 'dead' | null;
type HxGridMode = 'hex' | 'square';

// --- DOM REFS ---
const hxCanvas       = document.getElementById('hexLifeCanvas') as HTMLCanvasElement;
const hxCtx          = hxCanvas.getContext('2d') as CanvasRenderingContext2D;
const hxWrap         = document.getElementById('hexlife-canvas-wrap') as HTMLDivElement;
const layerHexLife   = document.getElementById('layer-hex-life') as HTMLDivElement;
const hxLoadingEl    = document.getElementById('hexlife-loading') as HTMLDivElement;
const hxLoadingText  = document.getElementById('hexlife-loading-text') as HTMLDivElement;
const hxAppEl        = document.getElementById('hexlife-app') as HTMLDivElement;
const hxBtnPlay      = document.getElementById('hexlife-btn-play') as HTMLButtonElement;
const hxBtnStep      = document.getElementById('hexlife-btn-step') as HTMLButtonElement;
const hxBtnRand      = document.getElementById('hexlife-btn-rand') as HTMLButtonElement;
const hxBtnClear     = document.getElementById('hexlife-btn-clear') as HTMLButtonElement;
const hxBtnModeHex   = document.getElementById('hexlife-mode-hex') as HTMLButtonElement;
const hxBtnModeSq    = document.getElementById('hexlife-mode-square') as HTMLButtonElement;
const hxRuleLabel    = document.getElementById('hexlife-rule-label') as HTMLDivElement;
const hxSpeedInput   = document.getElementById('hexlife-speed') as HTMLInputElement;
const hxSpeedVal     = document.getElementById('hexlife-speed-val') as HTMLSpanElement;
const hxDensityInput = document.getElementById('hexlife-density') as HTMLInputElement;
const hxDensityVal   = document.getElementById('hexlife-density-val') as HTMLSpanElement;
const hxInfoGen      = document.getElementById('hexlife-info-gen') as HTMLSpanElement;
const hxInfoPop      = document.getElementById('hexlife-info-pop') as HTMLSpanElement;

// --- STATE ---
let hxCells: Uint8Array = new Uint8Array(HX_COLS * HX_ROWS);
let hxNext:  Uint8Array = new Uint8Array(HX_COLS * HX_ROWS);
const hxAge: Uint8Array = new Uint8Array(HX_COLS * HX_ROWS);
let hxGeneration = 0;
let hxPopulation = 0;
let hxPlaying = true;
let hxMode: HxGridMode = 'hex';

let hxPaintMode: HxPaintMode = null;
let hxLastPaintCell = -1;
let hxHoverCell = -1;

let hxActive = false;
let hxAnimId: number | null = null;
let hxLastTickMs = 0;
let cancelHxBoot: (() => void) | null = null;
let hxResizeListener: (() => void) | null = null;
let hxVisibilityListener: (() => void) | null = null;
let hxResizeObserver: ResizeObserver | null = null;

let hxCw = 0, hxCh = 0;
let hxHexSize = 14;     // hex circumradius (also serves as square side / 1)
let hxCellSize = 14;    // square cell side
let hxOriginX = 0;
let hxOriginY = 0;

// --- INDEX HELPERS ---
function hxIdx(col: number, row: number): number { return col * HX_ROWS + row; }

// --- GEOMETRY ---
function hxResize(): void {
    const w = Math.max(64, hxWrap.clientWidth);
    const h = Math.max(64, hxWrap.clientHeight);
    if (w === hxCw && h === hxCh) return;
    hxCw = w; hxCh = h;
    hxCanvas.width = w; hxCanvas.height = h;
    hxCanvas.style.width = w + 'px';
    hxCanvas.style.height = h + 'px';

    if (hxMode === 'hex') {
        const sX = (w - 8) / (1.5 * (HX_COLS - 1) + 2);
        const sY = (h - 8) / (HX_SQRT3 * (HX_ROWS + 0.5));
        hxHexSize = Math.max(4, Math.min(sX, sY));
        const gridW = 1.5 * hxHexSize * (HX_COLS - 1) + 2 * hxHexSize;
        const gridH = HX_SQRT3 * hxHexSize * (HX_ROWS + 0.5);
        hxOriginX = (w - gridW) / 2 + hxHexSize;
        hxOriginY = (h - gridH) / 2 + hxHexSize * HX_SQRT3 / 2;
    } else {
        hxCellSize = Math.max(4, Math.min((w - 8) / HX_COLS, (h - 8) / HX_ROWS));
        const gridW = HX_COLS * hxCellSize;
        const gridH = HX_ROWS * hxCellSize;
        hxOriginX = (w - gridW) / 2;
        hxOriginY = (h - gridH) / 2;
    }
}

function hxCellCenter(col: number, row: number): { x: number; y: number } {
    if (hxMode === 'hex') {
        const x = hxOriginX + 1.5 * hxHexSize * col;
        const yOffset = (col & 1) ? HX_SQRT3 * hxHexSize * 0.5 : 0;
        const y = hxOriginY + HX_SQRT3 * hxHexSize * row + yOffset;
        return { x, y };
    }
    return {
        x: hxOriginX + (col + 0.5) * hxCellSize,
        y: hxOriginY + (row + 0.5) * hxCellSize
    };
}

function hxHexPath(cx: number, cy: number, s: number): void {
    hxCtx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i;
        const px = cx + s * Math.cos(a);
        const py = cy + s * Math.sin(a);
        if (i === 0) hxCtx.moveTo(px, py); else hxCtx.lineTo(px, py);
    }
    hxCtx.closePath();
}

function hxPixelToCell(mx: number, my: number): number {
    if (hxMode === 'square') {
        const col = Math.floor((mx - hxOriginX) / hxCellSize);
        const row = Math.floor((my - hxOriginY) / hxCellSize);
        if (col < 0 || col >= HX_COLS || row < 0 || row >= HX_ROWS) return -1;
        return hxIdx(col, row);
    }
    const approxCol = Math.round((mx - hxOriginX) / (1.5 * hxHexSize));
    const c0 = Math.max(0, approxCol - 1);
    const c1 = Math.min(HX_COLS - 1, approxCol + 1);
    let bestIdx = -1;
    let bestD2 = hxHexSize * hxHexSize * 1.21;
    for (let col = c0; col <= c1; col++) {
        const yOffset = (col & 1) ? HX_SQRT3 * hxHexSize * 0.5 : 0;
        const approxRow = Math.round((my - hxOriginY - yOffset) / (HX_SQRT3 * hxHexSize));
        const r0 = Math.max(0, approxRow - 1);
        const r1 = Math.min(HX_ROWS - 1, approxRow + 1);
        for (let row = r0; row <= r1; row++) {
            const c = hxCellCenter(col, row);
            const dx = mx - c.x;
            const dy = my - c.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < bestD2) { bestD2 = d2; bestIdx = hxIdx(col, row); }
        }
    }
    return bestIdx;
}

// --- INFO ---
function hxUpdateInfo(): void {
    hxInfoGen.textContent = String(hxGeneration);
    hxInfoPop.textContent = String(hxPopulation);
}

// --- SIMULATION ---
function hxRecountPop(): void {
    let n = 0;
    for (let i = 0; i < hxCells.length; i++) if (hxCells[i]) n++;
    hxPopulation = n;
}

function hxStep(): void {
    let pop = 0;
    if (hxMode === 'hex') {
        for (let col = 0; col < HX_COLS; col++) {
            const offsets = (col & 1) ? HX_NEIGHBORS_ODD : HX_NEIGHBORS_EVEN;
            for (let row = 0; row < HX_ROWS; row++) {
                let alive = 0;
                for (let k = 0; k < 6; k++) {
                    const dc = offsets[k][0];
                    const dr = offsets[k][1];
                    const nc = (col + dc + HX_COLS) % HX_COLS;
                    const nr = (row + dr + HX_ROWS) % HX_ROWS;
                    if (hxCells[nc * HX_ROWS + nr]) alive++;
                }
                const idx = col * HX_ROWS + row;
                const wasAlive = hxCells[idx] === 1;
                // B2 / S3,4 — Carter Bays Hex-Life
                const willLive = wasAlive ? (alive === 3 || alive === 4) : (alive === 2);
                hxNext[idx] = willLive ? 1 : 0;
                if (willLive) pop++;
                if (willLive) {
                    hxAge[idx] = Math.min(255, hxAge[idx] + 14);
                } else {
                    hxAge[idx] = hxAge[idx] > 28 ? hxAge[idx] - 28 : 0;
                }
            }
        }
    } else {
        for (let col = 0; col < HX_COLS; col++) {
            for (let row = 0; row < HX_ROWS; row++) {
                let alive = 0;
                for (let k = 0; k < 8; k++) {
                    const dc = SQ_NEIGHBORS[k][0];
                    const dr = SQ_NEIGHBORS[k][1];
                    const nc = (col + dc + HX_COLS) % HX_COLS;
                    const nr = (row + dr + HX_ROWS) % HX_ROWS;
                    if (hxCells[nc * HX_ROWS + nr]) alive++;
                }
                const idx = col * HX_ROWS + row;
                const wasAlive = hxCells[idx] === 1;
                // B3 / S2,3 — Conway's classic Game of Life
                const willLive = wasAlive ? (alive === 2 || alive === 3) : (alive === 3);
                hxNext[idx] = willLive ? 1 : 0;
                if (willLive) pop++;
                if (willLive) {
                    hxAge[idx] = Math.min(255, hxAge[idx] + 14);
                } else {
                    hxAge[idx] = hxAge[idx] > 28 ? hxAge[idx] - 28 : 0;
                }
            }
        }
    }
    const tmp = hxCells; hxCells = hxNext; hxNext = tmp;
    hxGeneration++;
    hxPopulation = pop;
    hxUpdateInfo();
}

function hxRandomize(): void {
    const d = Math.max(0.05, Math.min(0.7, parseFloat(hxDensityInput.value) / 100));
    let pop = 0;
    for (let i = 0; i < hxCells.length; i++) {
        const alive = Math.random() < d ? 1 : 0;
        hxCells[i] = alive;
        hxAge[i] = alive ? 200 : 0;
        if (alive) pop++;
    }
    hxGeneration = 0;
    hxPopulation = pop;
    hxUpdateInfo();
}

function hxClear(): void {
    hxCells.fill(0);
    hxAge.fill(0);
    hxGeneration = 0;
    hxPopulation = 0;
    hxUpdateInfo();
}

function hxSetPlaying(playing: boolean): void {
    hxPlaying = playing;
    hxBtnPlay.innerHTML = hxPlaying ? '⏸ Pause' : '▶ Play';
    hxBtnPlay.classList.toggle('hexlife-btn-play', !hxPlaying);
    hxBtnPlay.classList.toggle('hexlife-btn-pause', hxPlaying);
    hxLastTickMs = performance.now();
    if (!hxPlaying) {
        hxPaintMode = null;
    } else {
        hxHoverCell = -1;
    }
}

function hxTogglePlay(): void {
    hxSetPlaying(!hxPlaying);
}

function hxStepBtn(): void {
    if (hxPlaying) hxSetPlaying(false);
    hxStep();
}

function hxApplyModeUI(): void {
    hxBtnModeHex.classList.toggle('active', hxMode === 'hex');
    hxBtnModeSq.classList.toggle('active', hxMode === 'square');
    hxRuleLabel.textContent = hxMode === 'hex'
        ? 'Hex-Life · B2 / S3,4'
        : 'Conway · B3 / S2,3';
}

function hxSetMode(mode: HxGridMode): void {
    if (hxMode === mode) return;
    hxMode = mode;
    hxApplyModeUI();
    // Geometry depends on mode; recompute synchronously so paint hit-tests
    // and the next draw both see the new layout, even if rAF is paused.
    hxCw = 0; hxCh = 0;
    hxResize();
    hxLastTickMs = performance.now();
}

// --- RENDER ---
function hxThemeColor(): string {
    const s = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
    return s || '#f59e0b';
}

function hxDraw(): void {
    hxCtx.fillStyle = '#05060a';
    hxCtx.fillRect(0, 0, hxCw, hxCh);

    const live = hxThemeColor();
    const showHover = !hxPlaying && hxHoverCell >= 0;

    if (hxMode === 'hex') {
        for (let col = 0; col < HX_COLS; col++) {
            for (let row = 0; row < HX_ROWS; row++) {
                const idx = col * HX_ROWS + row;
                const c = hxCellCenter(col, row);
                const alive = hxCells[idx] === 1;
                const ageA = hxAge[idx] / 255;

                hxHexPath(c.x, c.y, hxHexSize - 1);
                if (alive) {
                    hxCtx.fillStyle = live;
                    hxCtx.globalAlpha = 0.85;
                    hxCtx.fill();
                    hxCtx.globalAlpha = 1;
                } else if (ageA > 0.04) {
                    hxCtx.fillStyle = live;
                    hxCtx.globalAlpha = ageA * 0.18;
                    hxCtx.fill();
                    hxCtx.globalAlpha = 1;
                } else {
                    hxCtx.fillStyle = 'rgba(20,22,30,0.55)';
                    hxCtx.fill();
                }

                if (showHover && idx === hxHoverCell) {
                    hxHexPath(c.x, c.y, hxHexSize - 1.5);
                    hxCtx.strokeStyle = 'rgba(255,255,255,0.7)';
                    hxCtx.lineWidth = 1.5;
                    hxCtx.stroke();
                }

                hxHexPath(c.x, c.y, hxHexSize - 0.5);
                hxCtx.strokeStyle = alive ? live : 'rgba(120,130,160,0.18)';
                hxCtx.lineWidth = alive ? 1 : 0.6;
                hxCtx.globalAlpha = alive ? 0.9 : 1;
                hxCtx.stroke();
                hxCtx.globalAlpha = 1;
            }
        }
        return;
    }

    // Square / Conway mode
    const cs = hxCellSize;
    for (let col = 0; col < HX_COLS; col++) {
        for (let row = 0; row < HX_ROWS; row++) {
            const idx = col * HX_ROWS + row;
            const x = hxOriginX + col * cs;
            const y = hxOriginY + row * cs;
            const alive = hxCells[idx] === 1;
            const ageA = hxAge[idx] / 255;

            if (alive) {
                hxCtx.fillStyle = live;
                hxCtx.globalAlpha = 0.85;
                hxCtx.fillRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
                hxCtx.globalAlpha = 1;
            } else if (ageA > 0.04) {
                hxCtx.fillStyle = live;
                hxCtx.globalAlpha = ageA * 0.18;
                hxCtx.fillRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
                hxCtx.globalAlpha = 1;
            } else {
                hxCtx.fillStyle = 'rgba(20,22,30,0.55)';
                hxCtx.fillRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
            }

            if (showHover && idx === hxHoverCell) {
                hxCtx.strokeStyle = 'rgba(255,255,255,0.7)';
                hxCtx.lineWidth = 1.5;
                hxCtx.strokeRect(x + 1, y + 1, cs - 2, cs - 2);
            }

            hxCtx.strokeStyle = alive ? live : 'rgba(120,130,160,0.18)';
            hxCtx.lineWidth = alive ? 1 : 0.6;
            hxCtx.globalAlpha = alive ? 0.9 : 1;
            hxCtx.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
            hxCtx.globalAlpha = 1;
        }
    }
}

function hxAnimate(): void {
    if (!hxActive) return;
    hxResize();

    if (hxPlaying) {
        const now = performance.now();
        const speed = parseFloat(hxSpeedInput.value);
        const interval = 1000 / Math.max(1, speed);
        if (now - hxLastTickMs >= interval) {
            const elapsed = now - hxLastTickMs;
            const steps = Math.min(4, Math.max(1, Math.floor(elapsed / interval)));
            for (let s = 0; s < steps; s++) hxStep();
            hxLastTickMs = now;
        }
    }

    hxDraw();
    hxAnimId = requestAnimationFrame(hxAnimate);
}

// --- MOUSE / PAINT ---
function hxApplyPaint(idx: number): void {
    if (idx === hxLastPaintCell) return;
    hxLastPaintCell = idx;
    const target = hxPaintMode === 'alive' ? 1 : 0;
    if (hxCells[idx] === target) return;
    hxCells[idx] = target;
    hxAge[idx] = target ? 200 : 0;
    hxRecountPop();
    hxUpdateInfo();
}

function hxOnMouseDown(e: MouseEvent): void {
    if (hxPlaying) return;
    e.preventDefault();
    const rect = hxCanvas.getBoundingClientRect();
    const idx = hxPixelToCell(e.clientX - rect.left, e.clientY - rect.top);
    if (idx < 0) return;
    hxPaintMode = e.button === 2 ? 'dead' : 'alive';
    hxLastPaintCell = -1;
    hxApplyPaint(idx);
}

function hxOnMouseMove(e: MouseEvent): void {
    const rect = hxCanvas.getBoundingClientRect();
    const idx = hxPixelToCell(e.clientX - rect.left, e.clientY - rect.top);
    hxHoverCell = idx;
    if (hxPaintMode && idx >= 0) hxApplyPaint(idx);
}

function hxOnMouseUp(): void {
    hxPaintMode = null;
    hxLastPaintCell = -1;
}

function hxOnMouseLeave(): void {
    hxPaintMode = null;
    hxHoverCell = -1;
    hxLastPaintCell = -1;
}

// --- UI BINDINGS ---
hxBtnPlay.addEventListener('click', hxTogglePlay);
hxBtnStep.addEventListener('click', hxStepBtn);
hxBtnRand.addEventListener('click', hxRandomize);
hxBtnClear.addEventListener('click', hxClear);
hxBtnModeHex.addEventListener('click', () => hxSetMode('hex'));
hxBtnModeSq.addEventListener('click', () => hxSetMode('square'));

hxSpeedInput.addEventListener('input', () => {
    hxSpeedVal.textContent = hxSpeedInput.value;
    hxLastTickMs = performance.now();
});
hxDensityInput.addEventListener('input', () => {
    hxDensityVal.textContent = hxDensityInput.value;
});

hxCanvas.addEventListener('mousedown', hxOnMouseDown);
hxCanvas.addEventListener('mousemove', hxOnMouseMove);
hxCanvas.addEventListener('mouseup', hxOnMouseUp);
hxCanvas.addEventListener('mouseleave', hxOnMouseLeave);
hxCanvas.addEventListener('contextmenu', (e) => { if (!hxPlaying) e.preventDefault(); });

// --- LAUNCH / CLOSE ---
const hxBootLines: string[] = [
    "> EXEC game_of_life.exe",
    "> ALLOC GRID [32 x 28]... [OK]",
    "> RULES: HEX B2/S3,4 | SQUARE B3/S2,3",
    "> WRAP: TOROIDAL",
    "> DISPLAY READY."
];

function launchHexLife(): void {
    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-hex-life');
    layerHexLife.style.display = 'flex';
    hxAppEl.style.display = 'none';

    if (cancelHxBoot) {
        cancelHxBoot();
        cancelHxBoot = null;
    }

    if (!hxResizeListener) {
        hxResizeListener = () => { if (hxActive) hxResize(); };
        window.addEventListener('resize', hxResizeListener);
    }
    if (!hxResizeObserver && typeof ResizeObserver !== 'undefined') {
        hxResizeObserver = new ResizeObserver(() => { if (hxActive) hxResize(); });
        hxResizeObserver.observe(hxWrap);
    }
    if (!hxVisibilityListener) {
        hxVisibilityListener = () => {
            if (!hxActive) return;
            if (document.hidden) {
                if (hxAnimId) cancelAnimationFrame(hxAnimId);
                hxAnimId = null;
                return;
            }
            if (!hxAnimId) {
                hxLastTickMs = performance.now();
                hxAnimate();
            }
        };
        document.addEventListener('visibilitychange', hxVisibilityListener);
    }

    cancelHxBoot = appBootAnimation(hxLoadingEl, hxLoadingText, hxBootLines, () => {
        cancelHxBoot = null;
        hxAppEl.style.display = 'flex';
        hxActive = true;
        hxApplyModeUI();
        hxRandomize();
        hxSetPlaying(true);
        hxAnimate();
    });
}

function closeHexLife(): void {
    try {
        if (cancelHxBoot) {
            cancelHxBoot();
            cancelHxBoot = null;
        }
        layerHexLife.style.display = 'none';
        if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-hex-life');
    } finally {
        hxActive = false;
        if (hxAnimId) cancelAnimationFrame(hxAnimId);
        hxAnimId = null;
        if (hxResizeListener) {
            window.removeEventListener('resize', hxResizeListener);
            hxResizeListener = null;
        }
        if (hxVisibilityListener) {
            document.removeEventListener('visibilitychange', hxVisibilityListener);
            hxVisibilityListener = null;
        }
        if (hxResizeObserver) {
            hxResizeObserver.disconnect();
            hxResizeObserver = null;
        }
        hxPaintMode = null;
        hxHoverCell = -1;
        hxLastPaintCell = -1;
    }
}

function toggleHexLifeControls(): void {
    (document.getElementById('hexlife-controls') as HTMLDivElement).classList.toggle('collapsed');
}

(window as any).launchHexLife = launchHexLife;
(window as any).closeHexLife = closeHexLife;
(window as any).toggleHexLifeControls = toggleHexLifeControls;
