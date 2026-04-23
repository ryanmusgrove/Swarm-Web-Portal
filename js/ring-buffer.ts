// ==========================================
// RING BUFFER VISUALIZER
// ==========================================

// --- External functions (defined in sibling scripts) ---
declare function appBootAnimation(loadingEl: HTMLElement, textEl: HTMLElement, lines: string[], onComplete: () => void): () => void;
declare function rememberFocusForLayer(layerId: string): void;
declare function restoreFocusForLayer(layerId: string): void;

// --- Types ---
interface RbBuffer {
    capacity: number;
    slots: (number | null)[];
    head: number;        // write index
    tail: number;        // read index
    count: number;       // distinguishes empty (0) from full (capacity)
    nextValue: number;
}
interface RbAnim {
    type: 'write' | 'read' | 'shake';
    index: number;
    progress: number;
}
interface RbParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}
type RbLogKind = 'write' | 'read' | 'error' | 'info';

const CAPACITY = 8;

// --- DOM REFS ---
const rbCanvas = document.getElementById('ringbufferCanvas') as HTMLCanvasElement;
const rbCtx = rbCanvas.getContext('2d') as CanvasRenderingContext2D;
const rbWrap = document.getElementById('ringbuf-canvas-wrap') as HTMLDivElement;
const layerRingBuffer = document.getElementById('layer-ring-buffer') as HTMLDivElement;
const rbLoadingEl = document.getElementById('ringbuf-loading') as HTMLDivElement;
const rbLoadingText = document.getElementById('ringbuf-loading-text') as HTMLDivElement;
const rbAppEl = document.getElementById('ringbuf-app') as HTMLDivElement;
const rbLogEl = document.getElementById('ringbuf-log') as HTMLDivElement;
const rbAutoBtn = document.getElementById('ringbuf-btn-auto') as HTMLButtonElement;
const rbInfoSize = document.getElementById('ringbuf-info-size') as HTMLSpanElement;
const rbInfoCount = document.getElementById('ringbuf-info-count') as HTMLSpanElement;
const rbInfoHead = document.getElementById('ringbuf-info-head') as HTMLSpanElement;
const rbInfoTail = document.getElementById('ringbuf-info-tail') as HTMLSpanElement;

// --- STATE ---
const RB: RbBuffer = {
    capacity: CAPACITY,
    slots: new Array(CAPACITY).fill(null),
    head: 0,
    tail: 0,
    count: 0,
    nextValue: 1
};
let rbAnimations: RbAnim[] = [];
let rbParticles: RbParticle[] = [];
let rbActive = false;
let rbAnimId: number | null = null;
let rbAutoMode = false;
let rbAutoTimer: number | null = null;
let cancelRbBoot: (() => void) | null = null;
let rbResizeListener: (() => void) | null = null;
let rbVisibilityListener: (() => void) | null = null;
let rbResizeObserver: ResizeObserver | null = null;
let rbTime = 0;
let rbCw = 100;
let rbCh = 100;

// --- GEOMETRY ---
function rbResize(): void {
    const side = Math.max(64, Math.min(rbWrap.clientWidth, rbWrap.clientHeight));
    if (side === rbCw) return;
    rbCw = side;
    rbCh = side;
    rbCanvas.width = side;
    rbCanvas.height = side;
    rbCanvas.style.width = side + 'px';
    rbCanvas.style.height = side + 'px';
}

function rbSlotAngle(i: number): number {
    return (Math.PI * 2 * i / RB.capacity) - Math.PI / 2;
}

function rbSpawnParticles(slotIdx: number, color: string): void {
    const cx = rbCw / 2;
    const cy = rbCh / 2;
    const R = Math.min(cx, cy) * 0.38;
    const angle = rbSlotAngle(slotIdx);
    const px = cx + Math.cos(angle) * R;
    const py = cy + Math.sin(angle) * R;
    for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 2.5;
        rbParticles.push({
            x: px,
            y: py,
            vx: Math.cos(a) * speed,
            vy: Math.sin(a) * speed,
            life: 1,
            color
        });
    }
}

function rbShake(): void {
    rbAnimations.push({ type: 'shake', index: -1, progress: 0 });
}

// --- INFO + LOG ---
function rbUpdateInfo(): void {
    rbInfoSize.textContent = String(RB.capacity);
    rbInfoCount.textContent = String(RB.count);
    rbInfoHead.textContent = String(RB.head);
    rbInfoTail.textContent = String(RB.tail);
}

function rbLog(msg: string, kind: RbLogKind): void {
    const d = document.createElement('div');
    d.className = `ringbuf-log-${kind}`;
    d.textContent = '> ' + msg;
    rbLogEl.appendChild(d);
    rbLogEl.scrollTop = rbLogEl.scrollHeight;
    while (rbLogEl.children.length > 50) {
        rbLogEl.removeChild(rbLogEl.firstChild as Node);
    }
}

// --- OPERATIONS ---
function ringbufEnqueue(): void {
    if (RB.count >= RB.capacity) {
        rbLog('Buffer FULL — cannot write!', 'error');
        rbShake();
        return;
    }
    const val = RB.nextValue++;
    RB.slots[RB.head] = val;
    rbAnimations.push({ type: 'write', index: RB.head, progress: 0 });
    rbSpawnParticles(RB.head, '#4ade80');
    rbLog(`Write [${RB.head}] ← ${val}`, 'write');
    RB.head = (RB.head + 1) % RB.capacity;
    RB.count++;
    rbUpdateInfo();
}

function ringbufDequeue(): void {
    if (RB.count <= 0) {
        rbLog('Buffer EMPTY — nothing to read!', 'error');
        rbShake();
        return;
    }
    const val = RB.slots[RB.tail];
    rbAnimations.push({ type: 'read', index: RB.tail, progress: 0 });
    rbSpawnParticles(RB.tail, '#60a5fa');
    rbLog(`Read  [${RB.tail}] → ${val}`, 'read');
    RB.slots[RB.tail] = null;
    RB.tail = (RB.tail + 1) % RB.capacity;
    RB.count--;
    rbUpdateInfo();
}

function ringbufClear(): void {
    RB.slots.fill(null);
    RB.head = 0;
    RB.tail = 0;
    RB.count = 0;
    RB.nextValue = 1;
    rbAnimations = [];
    rbParticles = [];
    rbLog('Buffer cleared.', 'info');
    rbUpdateInfo();
}

function ringbufToggleAuto(): void {
    rbAutoMode = !rbAutoMode;
    rbAutoBtn.innerHTML = rbAutoMode ? '\u23F8 Stop Demo' : '\u25B6 Auto Demo';
    if (rbAutoMode) {
        rbLog('Auto demo started.', 'info');
        rbRunAuto();
    } else {
        if (rbAutoTimer !== null) {
            clearTimeout(rbAutoTimer);
            rbAutoTimer = null;
        }
        rbLog('Auto demo stopped.', 'info');
    }
}

function rbRunAuto(): void {
    if (!rbAutoMode) return;
    if (RB.count === 0 || (Math.random() < 0.6 && RB.count < RB.capacity)) {
        ringbufEnqueue();
    } else {
        ringbufDequeue();
    }
    rbAutoTimer = window.setTimeout(rbRunAuto, 900);
}

// --- RENDER ---
function rbDraw(): void {
    rbTime += 0.016;
    const W = rbCw, H = rbCh;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(cx, cy) * 0.38;
    const slotRadius = Math.min(cx, cy) * 0.09;

    rbCtx.clearRect(0, 0, W, H);

    // Background glow
    const bgGrad = rbCtx.createRadialGradient(cx, cy, 0, cx, cy, R * 2);
    bgGrad.addColorStop(0, '#14162005');
    bgGrad.addColorStop(0.5, '#0f111700');
    rbCtx.fillStyle = bgGrad;
    rbCtx.fillRect(0, 0, W, H);

    // Ring track
    rbCtx.beginPath();
    rbCtx.arc(cx, cy, R, 0, Math.PI * 2);
    rbCtx.strokeStyle = '#2a2d3a';
    rbCtx.lineWidth = slotRadius * 2 + 6;
    rbCtx.stroke();

    // Direction arrow arc
    rbCtx.save();
    rbCtx.beginPath();
    rbCtx.arc(cx, cy, R + slotRadius + 16, -Math.PI * 0.35, Math.PI * 0.8);
    rbCtx.strokeStyle = 'rgba(126,184,255,0.12)';
    rbCtx.lineWidth = 2;
    rbCtx.setLineDash([6, 8]);
    rbCtx.stroke();
    rbCtx.setLineDash([]);
    const arrowAngle = Math.PI * 0.8;
    const arrowR = R + slotRadius + 16;
    const ax = cx + Math.cos(arrowAngle) * arrowR;
    const ay = cy + Math.sin(arrowAngle) * arrowR;
    rbCtx.beginPath();
    rbCtx.moveTo(ax, ay);
    rbCtx.lineTo(ax + Math.cos(arrowAngle - 0.5) * 10, ay + Math.sin(arrowAngle - 0.5) * 10);
    rbCtx.moveTo(ax, ay);
    rbCtx.lineTo(ax + Math.cos(arrowAngle + 1.2) * 10, ay + Math.sin(arrowAngle + 1.2) * 10);
    rbCtx.strokeStyle = 'rgba(126,184,255,0.25)';
    rbCtx.lineWidth = 2;
    rbCtx.stroke();
    rbCtx.restore();

    // Connection lines between slots
    for (let i = 0; i < RB.capacity; i++) {
        const a1 = rbSlotAngle(i);
        const a2 = rbSlotAngle((i + 1) % RB.capacity);
        const x1 = cx + Math.cos(a1) * R;
        const y1 = cy + Math.sin(a1) * R;
        const x2 = cx + Math.cos(a2) * R;
        const y2 = cy + Math.sin(a2) * R;
        rbCtx.beginPath();
        rbCtx.moveTo(x1, y1);
        rbCtx.lineTo(x2, y2);
        rbCtx.strokeStyle = '#1e2130';
        rbCtx.lineWidth = 2;
        rbCtx.stroke();
    }

    // Filled arc showing used portion
    if (RB.count > 0) {
        rbCtx.save();
        const startA = rbSlotAngle(RB.tail) - 0.01;
        let endA: number;
        if (RB.count === RB.capacity) {
            endA = startA + Math.PI * 2;
        } else {
            endA = rbSlotAngle((RB.tail + RB.count - 1) % RB.capacity) + 0.01;
            if (endA < startA) endA += Math.PI * 2;
        }
        rbCtx.beginPath();
        rbCtx.arc(cx, cy, R, startA, endA);
        rbCtx.strokeStyle = 'rgba(74, 222, 128, 0.12)';
        rbCtx.lineWidth = slotRadius * 2 + 2;
        rbCtx.stroke();
        rbCtx.restore();
    }

    // Find active shake
    const shakeOffset = { x: 0, y: 0 };
    for (const a of rbAnimations) {
        if (a.type === 'shake' && a.progress < 1) {
            const intensity = (1 - a.progress) * 5;
            shakeOffset.x = Math.sin(a.progress * 30) * intensity;
            shakeOffset.y = Math.cos(a.progress * 25) * intensity;
        }
    }

    // Draw slots
    for (let i = 0; i < RB.capacity; i++) {
        const angle = rbSlotAngle(i);
        const sx = cx + Math.cos(angle) * R + shakeOffset.x;
        const sy = cy + Math.sin(angle) * R + shakeOffset.y;

        let extraScale = 1;
        let glowColor: string | null = null;
        for (const a of rbAnimations) {
            if (a.index === i && a.progress < 1) {
                if (a.type === 'write') {
                    extraScale = 1 + 0.25 * Math.sin(a.progress * Math.PI);
                    glowColor = '#4ade80';
                } else if (a.type === 'read') {
                    extraScale = 1 + 0.2 * Math.sin(a.progress * Math.PI);
                    glowColor = '#60a5fa';
                }
            }
        }

        const r = slotRadius * extraScale;

        if (glowColor) {
            rbCtx.save();
            rbCtx.shadowColor = glowColor;
            rbCtx.shadowBlur = 25;
            rbCtx.beginPath();
            rbCtx.arc(sx, sy, r + 3, 0, Math.PI * 2);
            rbCtx.fillStyle = glowColor + '33';
            rbCtx.fill();
            rbCtx.restore();
        }

        const isFilled = RB.slots[i] !== null;
        let fillColor = '#1a1d27';
        if (isFilled) {
            const hue = ((RB.slots[i] as number) * 37) % 360;
            fillColor = `hsl(${hue}, 55%, 22%)`;
        }

        rbCtx.beginPath();
        rbCtx.arc(sx, sy, r, 0, Math.PI * 2);
        rbCtx.fillStyle = fillColor;
        rbCtx.fill();
        rbCtx.strokeStyle = isFilled ? 'rgba(74,222,128,0.5)' : '#333';
        rbCtx.lineWidth = 2;
        rbCtx.stroke();

        // Index label
        rbCtx.fillStyle = '#555';
        rbCtx.font = `${Math.round(slotRadius * 0.5)}px 'Segoe UI', sans-serif`;
        rbCtx.textAlign = 'center';
        rbCtx.textBaseline = 'middle';
        const labelR = R + slotRadius + 12;
        const lx = cx + Math.cos(angle) * labelR;
        const ly = cy + Math.sin(angle) * labelR;
        rbCtx.fillText(String(i), lx, ly);

        // Value
        if (isFilled) {
            rbCtx.fillStyle = '#fff';
            rbCtx.font = `bold ${Math.round(slotRadius * 0.7)}px 'Segoe UI', sans-serif`;
            rbCtx.textAlign = 'center';
            rbCtx.textBaseline = 'middle';
            rbCtx.fillText(String(RB.slots[i]), sx, sy);
        }
    }

    // Pointers
    rbDrawPointer(cx, cy, R, slotRadius, RB.head, '#4ade80', 'W', 1);
    rbDrawPointer(cx, cy, R, slotRadius, RB.tail, '#60a5fa', 'R', -1);

    // Center text
    rbCtx.fillStyle = '#555';
    rbCtx.font = `${Math.round(slotRadius * 0.65)}px 'Segoe UI', sans-serif`;
    rbCtx.textAlign = 'center';
    rbCtx.textBaseline = 'middle';
    rbCtx.fillText(`${RB.count} / ${RB.capacity}`, cx, cy - 8);
    rbCtx.fillStyle = '#444';
    rbCtx.font = `${Math.round(slotRadius * 0.45)}px 'Segoe UI', sans-serif`;
    rbCtx.fillText(RB.count === RB.capacity ? 'FULL' : RB.count === 0 ? 'EMPTY' : 'used', cx, cy + 12);

    // Particles
    for (let i = rbParticles.length - 1; i >= 0; i--) {
        const p = rbParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.025;
        if (p.life <= 0) {
            rbParticles.splice(i, 1);
            continue;
        }
        rbCtx.beginPath();
        rbCtx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2);
        rbCtx.fillStyle = p.color + Math.round(p.life * 200).toString(16).padStart(2, '0');
        rbCtx.fill();
    }

    // Advance animations
    for (let i = rbAnimations.length - 1; i >= 0; i--) {
        rbAnimations[i].progress += 0.03;
        if (rbAnimations[i].progress >= 1) rbAnimations.splice(i, 1);
    }
}

function rbDrawPointer(cx: number, cy: number, R: number, slotRadius: number, index: number, color: string, label: string, direction: number): void {
    const angle = rbSlotAngle(index);
    const pointerR = R + (direction === 1 ? slotRadius + 30 : -(slotRadius + 20));
    const px = cx + Math.cos(angle) * pointerR;
    const py = cy + Math.sin(angle) * pointerR;

    const bob = Math.sin(rbTime * 3 + (direction === 1 ? 0 : 2)) * 3;
    const bx = px + Math.cos(angle) * bob * direction;
    const by = py + Math.sin(angle) * bob * direction;

    const tipR = R + (direction === 1 ? slotRadius + 8 : -(slotRadius + 6));
    const tx = cx + Math.cos(angle) * tipR;
    const ty = cy + Math.sin(angle) * tipR;

    rbCtx.beginPath();
    rbCtx.moveTo(bx, by);
    rbCtx.lineTo(tx, ty);
    rbCtx.strokeStyle = color + 'aa';
    rbCtx.lineWidth = 2.5;
    rbCtx.stroke();

    const aLen = 8;
    const aAngle = Math.atan2(ty - by, tx - bx);
    rbCtx.beginPath();
    rbCtx.moveTo(tx, ty);
    rbCtx.lineTo(tx - Math.cos(aAngle - 0.4) * aLen, ty - Math.sin(aAngle - 0.4) * aLen);
    rbCtx.moveTo(tx, ty);
    rbCtx.lineTo(tx - Math.cos(aAngle + 0.4) * aLen, ty - Math.sin(aAngle + 0.4) * aLen);
    rbCtx.strokeStyle = color;
    rbCtx.lineWidth = 2.5;
    rbCtx.stroke();

    rbCtx.beginPath();
    rbCtx.arc(bx, by, 12, 0, Math.PI * 2);
    rbCtx.fillStyle = color + '33';
    rbCtx.fill();
    rbCtx.strokeStyle = color;
    rbCtx.lineWidth = 1.5;
    rbCtx.stroke();
    rbCtx.fillStyle = color;
    rbCtx.font = `bold 11px 'Segoe UI', sans-serif`;
    rbCtx.textAlign = 'center';
    rbCtx.textBaseline = 'middle';
    rbCtx.fillText(label, bx, by);
}

function rbAnimate(): void {
    if (!rbActive) return;
    rbResize();
    rbDraw();
    rbAnimId = requestAnimationFrame(rbAnimate);
}

// --- UI BINDINGS ---
(document.getElementById('ringbuf-btn-write') as HTMLButtonElement).addEventListener('click', ringbufEnqueue);
(document.getElementById('ringbuf-btn-read') as HTMLButtonElement).addEventListener('click', ringbufDequeue);
(document.getElementById('ringbuf-btn-clear') as HTMLButtonElement).addEventListener('click', ringbufClear);
rbAutoBtn.addEventListener('click', ringbufToggleAuto);

// --- LAUNCH / CLOSE ---
const rbBootLines: string[] = [
    "> EXEC ring_buffer.exe",
    "> ALLOC SLOT ARRAY [8]... [OK]",
    "> INIT HEAD/TAIL POINTERS...",
    "> DISPLAY READY."
];

function launchRingBuffer(): void {
    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-ring-buffer');
    layerRingBuffer.style.display = 'flex';
    rbAppEl.style.display = 'none';

    if (cancelRbBoot) {
        cancelRbBoot();
        cancelRbBoot = null;
    }

    if (!rbResizeListener) {
        rbResizeListener = () => { if (rbActive) rbResize(); };
        window.addEventListener('resize', rbResizeListener);
    }
    if (!rbResizeObserver && typeof ResizeObserver !== 'undefined') {
        rbResizeObserver = new ResizeObserver(() => { if (rbActive) rbResize(); });
        rbResizeObserver.observe(rbWrap);
    }
    if (!rbVisibilityListener) {
        rbVisibilityListener = () => {
            if (!rbActive) return;
            if (document.hidden) {
                if (rbAnimId) cancelAnimationFrame(rbAnimId);
                rbAnimId = null;
                return;
            }
            if (!rbAnimId) rbAnimate();
        };
        document.addEventListener('visibilitychange', rbVisibilityListener);
    }

    cancelRbBoot = appBootAnimation(rbLoadingEl, rbLoadingText, rbBootLines, () => {
        cancelRbBoot = null;
        rbAppEl.style.display = 'flex';
        rbActive = true;
        rbUpdateInfo();
        rbAnimate();
    });
}

function closeRingBuffer(): void {
    try {
        if (cancelRbBoot) {
            cancelRbBoot();
            cancelRbBoot = null;
        }
        if (rbAutoMode) {
            rbAutoMode = false;
            rbAutoBtn.innerHTML = '\u25B6 Auto Demo';
        }
        if (rbAutoTimer !== null) {
            clearTimeout(rbAutoTimer);
            rbAutoTimer = null;
        }
        layerRingBuffer.style.display = 'none';
        if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-ring-buffer');
    } finally {
        rbActive = false;
        if (rbAnimId) cancelAnimationFrame(rbAnimId);
        rbAnimId = null;
        if (rbResizeListener) {
            window.removeEventListener('resize', rbResizeListener);
            rbResizeListener = null;
        }
        if (rbVisibilityListener) {
            document.removeEventListener('visibilitychange', rbVisibilityListener);
            rbVisibilityListener = null;
        }
        if (rbResizeObserver) {
            rbResizeObserver.disconnect();
            rbResizeObserver = null;
        }
    }
}

function toggleRingBufferControls(): void {
    (document.getElementById('ringbuf-controls') as HTMLDivElement).classList.toggle('collapsed');
}

// Expose to global scope for inline HTML handlers and cross-file calls
(window as any).launchRingBuffer = launchRingBuffer;
(window as any).closeRingBuffer = closeRingBuffer;
(window as any).toggleRingBufferControls = toggleRingBufferControls;
