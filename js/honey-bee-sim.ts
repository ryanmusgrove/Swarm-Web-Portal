// ── Honey Bee Colony Simulation ──
// Integrated into Cyberdeck OS framework

const beeCanvas = document.getElementById('beeSimCanvas');
const beeCtx = beeCanvas.getContext('2d');
const beeWrap = document.getElementById('beesim-canvas-wrap');
const beeLayer = document.getElementById('layer-beesim');
const beeAppEl = document.getElementById('beesim-app');
const beeLoadingEl = document.getElementById('beesim-loading');
const beeLoadingText = document.getElementById('beesim-loading-text');

let beeSimActive = false;
let beeAnimId = null;
let cancelBeeSimBoot = null;

const BEE_NUM = 75;
const BEE_HEX_SIZE = 13;
const BEE_HEX_RADIUS = 5;
const BEE_FOV_ANGLE = Math.PI * 0.75;
const BEE_MAX_COLLECTORS = 4;

let beeW, beeH;

// ── Sliders ──
const beeSliders = {};
['bee-cohesion','bee-alignment','bee-separation','bee-speed','bee-vision'].forEach(id => {
    const el = document.getElementById(id);
    const v = document.getElementById(id + 'Val');
    const key = id.replace('bee-', '');
    beeSliders[key] = { el, get value(){ return +el.value; } };
    el.addEventListener('input', () => v.textContent = el.value);
});
const beeShowVisionCb = document.getElementById('bee-showVision');

// ── Mouse ──
let beeMouse = { x: -9999, y: -9999, active: false, repel: false };
beeCanvas.addEventListener('mousemove', e => {
    const r = beeCanvas.getBoundingClientRect();
    beeMouse.x = e.clientX - r.left;
    beeMouse.y = e.clientY - r.top;
});
beeCanvas.addEventListener('mousedown', e => { e.preventDefault(); beeMouse.active = true; beeMouse.repel = e.button === 2; });
beeCanvas.addEventListener('mouseup', () => { beeMouse.active = false; });
beeCanvas.addEventListener('contextmenu', e => e.preventDefault());
beeCanvas.addEventListener('touchstart', e => {
    const t = e.touches[0]; const r = beeCanvas.getBoundingClientRect();
    beeMouse.x = t.clientX - r.left; beeMouse.y = t.clientY - r.top; beeMouse.active = true;
}, {passive:true});
beeCanvas.addEventListener('touchmove', e => {
    const t = e.touches[0]; const r = beeCanvas.getBoundingClientRect();
    beeMouse.x = t.clientX - r.left; beeMouse.y = t.clientY - r.top;
}, {passive:true});
beeCanvas.addEventListener('touchend', () => { beeMouse.active = false; });

function beeD2(a, b) { const dx = a.x - b.x, dy = a.y - b.y; return dx*dx + dy*dy; }
function beeDst(a, b) { return Math.sqrt(beeD2(a, b)); }

// ── Particles ──
let beeParticles = [];
function beeSpawnP(x, y, type) {
    if (beeParticles.length > 400) return;
    beeParticles.push({
        x, y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: -Math.random() * 1.2 - 0.3,
        life: 20 + Math.random() * 25,
        maxLife: 45,
        size: 1 + Math.random() * 2,
        type
    });
}
function beeUpdateParticles() {
    for (let i = beeParticles.length - 1; i >= 0; i--) {
        const p = beeParticles[i];
        p.x += p.vx; p.y += p.vy;
        p.vy -= 0.01; p.vx *= 0.98;
        if (--p.life <= 0) beeParticles.splice(i, 1);
    }
}
function beeDrawParticles() {
    for (const p of beeParticles) {
        const a = p.life / p.maxLife;
        beeCtx.fillStyle = p.type === 'honey'
            ? `rgba(255,180,40,${a * 0.8})`
            : `rgba(255,220,60,${a * 0.7})`;
        beeCtx.beginPath();
        beeCtx.arc(p.x, p.y, p.size * a, 0, Math.PI * 2);
        beeCtx.fill();
    }
}

// ── Honeycomb ──
let beeCells = [];
let beeCombCenter = { x: 0, y: 0 };
let beeTotalHoney = 0;

function beeGenerateComb() {
    beeCells = [];
    for (let q = -BEE_HEX_RADIUS; q <= BEE_HEX_RADIUS; q++) {
        const r1 = Math.max(-BEE_HEX_RADIUS, -q - BEE_HEX_RADIUS);
        const r2 = Math.min(BEE_HEX_RADIUS, -q + BEE_HEX_RADIUS);
        for (let r = r1; r <= r2; r++) {
            beeCells.push({ q, r, x: 0, y: 0, beeIndex: -1, honey: 0 });
        }
    }
    beeCells.sort((a, b) => (a.q*a.q + a.r*a.r + a.q*a.r) - (b.q*b.q + b.r*b.r + b.q*b.r));
    for (let i = BEE_NUM; i < beeCells.length; i++) beeCells[i].honey = 0.4 + Math.random() * 0.6;
}

function beeUpdateCombPos() {
    const span = BEE_HEX_SIZE * BEE_HEX_RADIUS * 1.8;
    if (beeW < 600) { beeCombCenter.x = beeW / 2; beeCombCenter.y = span + 20; }
    else { beeCombCenter.x = beeW - span - 35; beeCombCenter.y = span + 45; }
    for (const c of beeCells) {
        c.x = beeCombCenter.x + BEE_HEX_SIZE * 1.5 * c.q;
        c.y = beeCombCenter.y + BEE_HEX_SIZE * (Math.sqrt(3) / 2 * c.q + Math.sqrt(3) * c.r);
    }
}

function beeHexPath(cx, cy, s) {
    beeCtx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i;
        const px = cx + s * Math.cos(a), py = cy + s * Math.sin(a);
        i === 0 ? beeCtx.moveTo(px, py) : beeCtx.lineTo(px, py);
    }
    beeCtx.closePath();
}

function beeDrawComb(time) {
    const gr = BEE_HEX_SIZE * (BEE_HEX_RADIUS + 3) * 1.7;
    const glow = beeCtx.createRadialGradient(beeCombCenter.x, beeCombCenter.y, gr * 0.15, beeCombCenter.x, beeCombCenter.y, gr);
    glow.addColorStop(0, 'rgba(255,170,40,0.12)');
    glow.addColorStop(0.6, 'rgba(255,140,20,0.04)');
    glow.addColorStop(1, 'rgba(255,140,20,0)');
    beeCtx.fillStyle = glow;
    beeCtx.beginPath(); beeCtx.arc(beeCombCenter.x, beeCombCenter.y, gr, 0, Math.PI * 2); beeCtx.fill();

    beeTotalHoney = 0;
    for (let i = 0; i < beeCells.length; i++) {
        const c = beeCells[i];
        beeTotalHoney += c.honey;
        const bee = c.beeIndex >= 0 ? beeSwarm[c.beeIndex] : null;
        const sleeping = bee && bee.state === 'sleeping';

        beeHexPath(c.x, c.y, BEE_HEX_SIZE - 1.5);
        if (sleeping) {
            beeCtx.fillStyle = 'rgba(50,35,8,0.95)';
        } else {
            const h = c.honey;
            beeCtx.fillStyle = `rgba(${Math.floor(38 + h * 185)},${Math.floor(26 + h * 135)},${Math.floor(8 + h * 28)},0.9)`;
        }
        beeCtx.fill();

        if (c.honey > 0.15 && !sleeping) {
            beeHexPath(c.x - 1.5, c.y - 1.5, BEE_HEX_SIZE * 0.4 * c.honey);
            beeCtx.fillStyle = `rgba(255,235,140,${0.06 + c.honey * 0.12})`;
            beeCtx.fill();
        }
        if (c.honey > 0.85) {
            beeHexPath(c.x, c.y, BEE_HEX_SIZE - 2.5);
            beeCtx.fillStyle = `rgba(255,245,180,${0.04 + Math.sin(time * 0.05 + i) * 0.025})`;
            beeCtx.fill();
        }
        beeHexPath(c.x, c.y, BEE_HEX_SIZE - 0.5);
        beeCtx.strokeStyle = `rgba(210,170,60,${0.35 + c.honey * 0.2})`;
        beeCtx.lineWidth = 1.3;
        beeCtx.stroke();

        if (sleeping) beeDrawSleepingBee(c.x, c.y, bee, time);
    }

    const sl = beeSwarm.filter(b => b.state === 'sleeping').length;
    const co = beeSwarm.filter(b => b.state === 'collecting').length;
    const rt = beeSwarm.filter(b => b.state === 'returning').length;
    const fo = BEE_NUM - sl - co - rt;
    beeCtx.fillStyle = 'rgba(240,220,140,0.55)';
    beeCtx.font = '11px Segoe UI, sans-serif';
    beeCtx.textAlign = 'center';
    const ly = beeCombCenter.y + BEE_HEX_SIZE * BEE_HEX_RADIUS * Math.sqrt(3) + 18;
    beeCtx.fillText(`Honey: ${beeTotalHoney.toFixed(1)} · Flying ${fo} · Collecting ${co} · Returning ${rt} · Sleeping ${sl}`, beeCombCenter.x, ly);
}

function beeDrawSleepingBee(cx, cy, bee, time) {
    beeCtx.save();
    beeCtx.translate(cx, cy);
    const g = beeCtx.createLinearGradient(-4, 0, 4, 0);
    g.addColorStop(0, '#b8860b'); g.addColorStop(0.4, '#ffd700');
    g.addColorStop(0.55, '#2a1800'); g.addColorStop(0.7, '#ffd700'); g.addColorStop(1, '#daa520');
    beeCtx.beginPath(); beeCtx.ellipse(0, 0, 5, 3.2, 0, 0, Math.PI * 2);
    beeCtx.fillStyle = g; beeCtx.fill();

    beeCtx.globalAlpha = 0.25;
    beeCtx.fillStyle = 'rgba(190,210,255,1)';
    beeCtx.beginPath(); beeCtx.ellipse(-1, -3, 3, 1.8, -0.3, 0, Math.PI * 2); beeCtx.fill();
    beeCtx.beginPath(); beeCtx.ellipse(-1, 3, 3, 1.8, 0.3, 0, Math.PI * 2); beeCtx.fill();
    beeCtx.globalAlpha = 1;

    if (bee.cargo > 0) {
        beeCtx.fillStyle = 'rgba(255,200,40,0.6)';
        beeCtx.beginPath(); beeCtx.ellipse(-1, -4.5, 2, 1.4, 0, 0, Math.PI * 2); beeCtx.fill();
        beeCtx.beginPath(); beeCtx.ellipse(-1, 4.5, 2, 1.4, 0, 0, Math.PI * 2); beeCtx.fill();
    }

    const st = bee.sleepTimer || 0;
    const za = 0.3 + 0.25 * Math.sin(st * 0.06);
    beeCtx.fillStyle = `rgba(180,190,255,${za})`;
    beeCtx.font = 'bold 8px sans-serif'; beeCtx.textAlign = 'left';
    const yOff = -6 - Math.sin(st * 0.04) * 2;
    beeCtx.fillText('z', 3, yOff);
    beeCtx.font = 'bold 6px sans-serif'; beeCtx.fillText('z', 7, yOff - 5);

    const pct = bee.stamina / bee.maxStamina;
    beeCtx.beginPath();
    beeCtx.arc(0, 0, 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * pct);
    beeCtx.strokeStyle = `rgba(120,255,120,${0.2 + pct * 0.15})`;
    beeCtx.lineWidth = 1.2; beeCtx.stroke();
    beeCtx.restore();
}

// ── Flowers ──
let beeFlowers = [];

function beeGenerateFlowers() {
    beeFlowers = [];
    const n = Math.max(7, Math.min(14, Math.floor(beeW * beeH / 75000)));
    for (let i = 0; i < n; i++) {
        let x, y, att = 0;
        do {
            x = 40 + Math.random() * (beeW - 80);
            y = 60 + Math.random() * (beeH - 120);
            att++;
        } while (att < 60 && beeDst({x, y}, beeCombCenter) < BEE_HEX_SIZE * BEE_HEX_RADIUS * 3);
        const mN = 5 + Math.random() * 5;
        beeFlowers.push({
            x, y, nectar: mN * (0.4 + Math.random() * 0.6), maxNectar: mN,
            regen: 0.0025 + Math.random() * 0.002,
            size: 14 + Math.random() * 10,
            hue: [45, 340, 300, 25, 15, 55, 195][Math.floor(Math.random() * 7)],
            petals: 5 + Math.floor(Math.random() * 4),
            phase: Math.random() * Math.PI * 2
        });
    }
}

function beeUpdateFlowers() {
    for (const f of beeFlowers) {
        if (f.nectar < f.maxNectar) f.nectar = Math.min(f.maxNectar, f.nectar + f.regen);
    }
}

function beeDrawFlowers(time) {
    for (const f of beeFlowers) {
        const nP = f.nectar / f.maxNectar;
        beeCtx.save();
        beeCtx.translate(f.x, f.y);
        beeCtx.rotate(Math.sin(time * 0.015 + f.phase) * 0.04);

        if (nP > 0.05) {
            const glR = f.size * 2 + nP * f.size;
            const gl = beeCtx.createRadialGradient(0, 0, 2, 0, 0, glR);
            gl.addColorStop(0, `hsla(${f.hue},80%,60%,${nP * 0.07})`);
            gl.addColorStop(1, `hsla(${f.hue},80%,60%,0)`);
            beeCtx.fillStyle = gl;
            beeCtx.beginPath(); beeCtx.arc(0, 0, glR, 0, Math.PI * 2); beeCtx.fill();
        }

        beeCtx.beginPath();
        beeCtx.moveTo(0, f.size * 0.3);
        beeCtx.quadraticCurveTo(2, f.size * 1.2, 0, f.size * 2);
        beeCtx.strokeStyle = `rgba(60,130,40,${0.2 + nP * 0.2})`;
        beeCtx.lineWidth = 2; beeCtx.stroke();

        beeCtx.save();
        beeCtx.translate(1, f.size * 1.1);
        beeCtx.rotate(0.3);
        beeCtx.beginPath(); beeCtx.ellipse(6, 0, 7, 3, 0.2, 0, Math.PI * 2);
        beeCtx.fillStyle = `rgba(50,120,35,${0.15 + nP * 0.1})`; beeCtx.fill();
        beeCtx.restore();

        const pS = f.size * (0.38 + nP * 0.15);
        const pA = 0.18 + nP * 0.38;
        for (let p = 0; p < f.petals; p++) {
            beeCtx.save();
            beeCtx.rotate((Math.PI * 2 / f.petals) * p + Math.sin(time * 0.02 + f.phase) * 0.02);
            beeCtx.beginPath();
            beeCtx.ellipse(f.size * 0.55, 0, pS, pS * 0.48, 0, 0, Math.PI * 2);
            beeCtx.fillStyle = `hsla(${f.hue},75%,${48 + nP * 15}%,${pA})`;
            beeCtx.fill();
            beeCtx.strokeStyle = `hsla(${f.hue},60%,38%,${pA * 0.4})`;
            beeCtx.lineWidth = 0.5; beeCtx.stroke();
            beeCtx.restore();
        }

        beeCtx.beginPath(); beeCtx.arc(0, 0, f.size * 0.25, 0, Math.PI * 2);
        const cg = beeCtx.createRadialGradient(0, 0, 0, 0, 0, f.size * 0.25);
        cg.addColorStop(0, `rgba(255,220,60,${0.35 + nP * 0.35})`);
        cg.addColorStop(1, `rgba(200,160,40,${0.25 + nP * 0.25})`);
        beeCtx.fillStyle = cg; beeCtx.fill();

        beeCtx.beginPath();
        beeCtx.arc(0, 0, f.size * 0.35, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * nP);
        beeCtx.strokeStyle = `rgba(255,230,100,${0.15 + nP * 0.4})`;
        beeCtx.lineWidth = 2; beeCtx.stroke();

        beeCtx.restore();
    }
}

// ── Bee Class ──
class SimBee {
    constructor(i) {
        this.index = i;
        this.x = 100 + Math.random() * 400;
        this.y = 100 + Math.random() * 300;
        const a = Math.random() * Math.PI * 2;
        this.vx = Math.cos(a) * 2; this.vy = Math.sin(a) * 2;
        this.wingPhase = Math.random() * Math.PI * 2;
        this.wobble = Math.random() * Math.PI * 2;

        this.stamina = 50 + Math.random() * 50;
        this.maxStamina = 100;
        this.drainRate = 0.02 + Math.random() * 0.022;
        this.rechargeRate = 0.16 + Math.random() * 0.1;
        this.tiredAt = 15 + Math.random() * 10;
        this.wakeAt = 82 + Math.random() * 18;

        this.state = 'foraging';
        this.cellIndex = -1;
        this.sleepTimer = 0;

        this.cargo = 0;
        this.targetFlower = null;
        this.collectTimer = 0;
        this.collectDuration = 65 + Math.random() * 50;
    }

    get cell() { return this.cellIndex >= 0 ? beeCells[this.cellIndex] : null; }

    canSee(other) {
        const dx = other.x - this.x, dy = other.y - this.y;
        const dd = dx * dx + dy * dy;
        const vr = beeSliders.vision.value;
        if (dd > vr * vr || dd < 0.01) return false;
        const h = Math.atan2(this.vy, this.vx);
        let diff = Math.atan2(dy, dx) - h;
        if (diff > Math.PI) diff -= Math.PI * 2;
        if (diff < -Math.PI) diff += Math.PI * 2;
        return Math.abs(diff) < BEE_FOV_ANGLE;
    }

    update(all, time) {
        if (this.state === 'sleeping') {
            this.sleepTimer++;
            this.stamina = Math.min(this.maxStamina, this.stamina + this.rechargeRate);

            if (this.cargo > 0) {
                const dep = Math.min(this.cargo, 0.008);
                this.cargo -= dep;
                const c = this.cell;
                if (c) c.honey = Math.min(1, c.honey + dep * 0.85);
                if (this.cargo < 0.01) {
                    this.cargo = 0;
                    if (time % 12 === 0) {
                        const c2 = this.cell;
                        if (c2) beeSpawnP(c2.x + (Math.random()-0.5)*6, c2.y + (Math.random()-0.5)*6, 'honey');
                    }
                }
            }

            if (this.stamina >= this.wakeAt && this.cargo <= 0) {
                this.state = 'foraging';
                const c = this.cell;
                if (c) {
                    this.x = c.x; this.y = c.y;
                    const ang = Math.atan2(c.y - beeCombCenter.y, c.x - beeCombCenter.x) + (Math.random() - 0.5) * 1.0;
                    this.vx = Math.cos(ang) * 3; this.vy = Math.sin(ang) * 3;
                }
                this.targetFlower = null;
            }
            return;
        }

        const maxSpd = beeSliders.speed.value / 15;

        if (this.state === 'collecting') {
            this.collectTimer--;
            this.stamina -= this.drainRate * 0.2;
            if (this.targetFlower) {
                const f = this.targetFlower;
                this.x += (f.x - this.x) * 0.1;
                this.y += (f.y - this.y) * 0.1;
                this.x += Math.sin(time * 0.08 + this.index * 2.3) * 0.7;
                this.y += Math.cos(time * 0.08 + this.index * 2.3) * 0.7;
                if (time % 7 === 0) beeSpawnP(this.x + (Math.random()-0.5)*8, this.y + (Math.random()-0.5)*8, 'pollen');
            }
            if (this.collectTimer <= 0 || this.stamina <= this.tiredAt * 0.5) {
                if (this.targetFlower && this.targetFlower.nectar > 0.05) {
                    const take = Math.min(1, this.targetFlower.nectar);
                    this.cargo = take;
                    this.targetFlower.nectar -= take;
                }
                this.state = 'returning';
                this.targetFlower = null;
                const c = this.cell;
                if (c) {
                    const dx = c.x - this.x, dy = c.y - this.y;
                    const d = Math.sqrt(dx*dx + dy*dy) || 1;
                    this.vx = (dx/d) * maxSpd; this.vy = (dy/d) * maxSpd;
                }
            }
            this.wingPhase += 0.25;
            return;
        }

        if (this.state === 'foraging') {
            this.stamina -= this.drainRate;
            if (this.stamina <= this.tiredAt) {
                this.state = 'returning';
                this.targetFlower = null;
            } else {
                this.applyBoids(all);
                this.applyMouse();
                this.seekFlower();

                for (const f of beeFlowers) {
                    if (f.nectar < 0.3) continue;
                    if (beeDst(this, f) < 18) {
                        let atF = 0;
                        for (const b of all) if (b.state === 'collecting' && b.targetFlower === f) atF++;
                        if (atF < BEE_MAX_COLLECTORS) {
                            this.state = 'collecting';
                            this.targetFlower = f;
                            this.collectTimer = this.collectDuration;
                            break;
                        }
                    }
                }
            }
        }

        if (this.state === 'returning') {
            this.stamina -= this.drainRate * 0.35;
            const c = this.cell;
            if (c) {
                const dx = c.x - this.x, dy = c.y - this.y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < 8) {
                    if (this.cargo > 0) {
                        for (let p = 0; p < 3; p++) beeSpawnP(c.x + (Math.random()-0.5)*8, c.y + (Math.random()-0.5)*8, 'honey');
                    }
                    this.state = 'sleeping';
                    this.x = c.x; this.y = c.y;
                    this.vx = 0; this.vy = 0;
                    this.sleepTimer = 0;
                    return;
                }
                this.vx += (dx / d) * 0.5;
                this.vy += (dy / d) * 0.5;
            }
            this.applySep(all, 0.3);
        }

        const m = 40, tf = 0.3;
        if (this.x < m) this.vx += tf;
        if (this.x > beeW - m) this.vx -= tf;
        if (this.y < m) this.vy += tf;
        if (this.y > beeH - m) this.vy -= tf;

        this.wobble += 0.08;
        const wA = this.state === 'returning' ? 0.015 : 0.04;
        this.vx += Math.sin(this.wobble) * wA;
        this.vy += Math.cos(this.wobble * 1.3) * wA;

        const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const cap = this.state === 'returning' ? maxSpd * 1.25 : maxSpd;
        if (spd > cap) { this.vx = this.vx / spd * cap; this.vy = this.vy / spd * cap; }
        else if (spd < cap * 0.2 && spd > 0.01) { this.vx = this.vx / spd * cap * 0.2; this.vy = this.vy / spd * cap * 0.2; }

        this.x += this.vx; this.y += this.vy;
        this.wingPhase += 0.5;
        this.stamina = Math.max(0, this.stamina);
    }

    seekFlower() {
        let best = null, bestScore = -Infinity;
        for (const f of beeFlowers) {
            if (f.nectar < 0.4) continue;
            const d = beeDst(this, f);
            if (d > 600) continue;
            const score = (f.nectar / f.maxNectar) * 0.6 - (d / 500);
            if (score > bestScore) { bestScore = score; best = f; }
        }
        if (best) {
            this.targetFlower = best;
            const dx = best.x - this.x, dy = best.y - this.y;
            const d = Math.sqrt(dx*dx + dy*dy) || 1;
            this.vx += (dx / d) * 0.13;
            this.vy += (dy / d) * 0.13;
        }
    }

    applyBoids(all) {
        const cF = beeSliders.cohesion.value / 1000;
        const aF = beeSliders.alignment.value / 1000;
        const sF = beeSliders.separation.value / 100;
        let cx=0,cy=0,ax=0,ay=0,sx=0,sy=0,n=0;
        for (const o of all) {
            if (o === this || o.state === 'sleeping' || o.state === 'collecting') continue;
            if (!this.canSee(o)) continue;
            const dx = o.x - this.x, dy = o.y - this.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            n++; cx += o.x; cy += o.y; ax += o.vx; ay += o.vy;
            if (d < 28 && d > 0.01) { sx -= dx/d*(28-d); sy -= dy/d*(28-d); }
        }
        if (n > 0) {
            this.vx += (cx/n - this.x) * cF;
            this.vy += (cy/n - this.y) * cF;
            this.vx += (ax/n - this.vx) * aF;
            this.vy += (ay/n - this.vy) * aF;
            this.vx += sx * sF; this.vy += sy * sF;
        }
    }

    applySep(all, str) {
        const sF = beeSliders.separation.value / 100 * str;
        let sx = 0, sy = 0;
        for (const o of all) {
            if (o === this || o.state === 'sleeping') continue;
            const dx = o.x - this.x, dy = o.y - this.y;
            const d = Math.sqrt(dx*dx + dy*dy);
            if (d < 24 && d > 0.01) { sx -= dx/d*(24-d); sy -= dy/d*(24-d); }
        }
        this.vx += sx * sF; this.vy += sy * sF;
    }

    applyMouse() {
        if (!beeMouse.active) return;
        const dx = beeMouse.x - this.x, dy = beeMouse.y - this.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 200 && d > 1) {
            const f = beeMouse.repel ? -0.9 : 0.35;
            this.vx += dx/d*f; this.vy += dy/d*f;
        }
    }

    draw(time) {
        if (this.state === 'sleeping') return;
        const heading = Math.atan2(this.vy, this.vx);

        if (beeShowVisionCb.checked && this.state === 'foraging') {
            beeCtx.save(); beeCtx.translate(this.x, this.y); beeCtx.rotate(heading);
            beeCtx.beginPath(); beeCtx.moveTo(0,0);
            beeCtx.arc(0, 0, beeSliders.vision.value, -BEE_FOV_ANGLE, BEE_FOV_ANGLE);
            beeCtx.closePath();
            beeCtx.fillStyle = 'rgba(240,230,140,0.03)'; beeCtx.fill();
            beeCtx.restore();
        }

        beeCtx.save();
        beeCtx.translate(this.x, this.y);
        if (this.state === 'collecting') {
            beeCtx.rotate(heading + Math.sin(time * 0.12) * 0.3);
        } else {
            beeCtx.rotate(heading);
        }

        const wf = Math.sin(this.wingPhase) * 0.5;
        beeCtx.fillStyle = 'rgba(200,220,255,0.4)';
        beeCtx.strokeStyle = 'rgba(180,200,240,0.4)';
        beeCtx.lineWidth = 0.4;
        beeCtx.beginPath(); beeCtx.ellipse(-2, -5, 4, 7, wf-0.3, 0, Math.PI*2); beeCtx.fill(); beeCtx.stroke();
        beeCtx.beginPath(); beeCtx.ellipse(-2, 5, 4, 7, -wf+0.3, 0, Math.PI*2); beeCtx.fill(); beeCtx.stroke();

        const bg = beeCtx.createLinearGradient(-9, 0, 3, 0);
        bg.addColorStop(0, '#b8860b'); bg.addColorStop(0.3, '#ffd700');
        bg.addColorStop(0.5, '#1a1000'); bg.addColorStop(0.7, '#ffd700'); bg.addColorStop(1, '#daa520');
        beeCtx.beginPath(); beeCtx.ellipse(-3, 0, 6, 4, 0, 0, Math.PI*2);
        beeCtx.fillStyle = bg; beeCtx.fill();
        beeCtx.strokeStyle = 'rgba(100,70,0,0.5)'; beeCtx.lineWidth = 0.4; beeCtx.stroke();

        beeCtx.strokeStyle = 'rgba(30,15,0,0.5)'; beeCtx.lineWidth = 1.1;
        for (let s = -2; s <= 3; s += 2.5) {
            beeCtx.beginPath(); beeCtx.moveTo(-3+s, -3.5); beeCtx.lineTo(-3+s, 3.5); beeCtx.stroke();
        }

        beeCtx.beginPath(); beeCtx.ellipse(5, 0, 3, 2.8, 0, 0, Math.PI*2);
        beeCtx.fillStyle = '#daa520'; beeCtx.fill();
        beeCtx.fillStyle = '#1a1000';
        beeCtx.beginPath(); beeCtx.arc(6.5, -1.5, 1, 0, Math.PI*2); beeCtx.fill();
        beeCtx.beginPath(); beeCtx.arc(6.5, 1.5, 1, 0, Math.PI*2); beeCtx.fill();

        beeCtx.strokeStyle = 'rgba(100,70,0,0.65)'; beeCtx.lineWidth = 0.6;
        beeCtx.beginPath(); beeCtx.moveTo(6,-2); beeCtx.quadraticCurveTo(10,-6,12,-5); beeCtx.stroke();
        beeCtx.beginPath(); beeCtx.moveTo(6,2); beeCtx.quadraticCurveTo(10,6,12,5); beeCtx.stroke();

        beeCtx.beginPath(); beeCtx.moveTo(-9,0); beeCtx.lineTo(-11,0);
        beeCtx.strokeStyle = 'rgba(80,50,0,0.6)'; beeCtx.lineWidth = 0.8; beeCtx.stroke();

        if (this.cargo > 0) {
            const pa = 0.45 + this.cargo * 0.4;
            beeCtx.fillStyle = `rgba(255,200,40,${pa})`;
            beeCtx.beginPath(); beeCtx.ellipse(-1, -5.5, 2.5, 1.8, 0, 0, Math.PI*2); beeCtx.fill();
            beeCtx.beginPath(); beeCtx.ellipse(-1, 5.5, 2.5, 1.8, 0, 0, Math.PI*2); beeCtx.fill();
            beeCtx.fillStyle = `rgba(255,220,60,${pa*0.3})`;
            beeCtx.beginPath(); beeCtx.ellipse(-1, -5.5, 4, 3, 0, 0, Math.PI*2); beeCtx.fill();
            beeCtx.beginPath(); beeCtx.ellipse(-1, 5.5, 4, 3, 0, 0, Math.PI*2); beeCtx.fill();
        }

        beeCtx.restore();

        if (this.state !== 'collecting') {
            const bw = 16, bh = 2.5;
            const bx = this.x - bw/2, by = this.y - 14;
            const pct = Math.max(0, this.stamina / this.maxStamina);
            beeCtx.fillStyle = 'rgba(0,0,0,0.4)';
            beeCtx.fillRect(bx-0.5, by-0.5, bw+1, bh+1);
            const cr = pct < 0.5 ? 255 : Math.floor(255*(1-pct)*2);
            const cg2 = pct > 0.5 ? 210 : Math.floor(210*pct*2);
            beeCtx.fillStyle = `rgb(${cr},${cg2},50)`;
            beeCtx.fillRect(bx, by, bw*pct, bh);

            if (this.state === 'returning') {
                beeCtx.save(); beeCtx.translate(this.x, by - 5);
                if (this.cargo > 0) {
                    beeCtx.fillStyle = 'rgba(255,200,50,0.8)';
                    beeCtx.beginPath(); beeCtx.arc(0, 0, 2.5, 0, Math.PI*2); beeCtx.fill();
                } else {
                    beeCtx.fillStyle = 'rgba(255,200,80,0.6)';
                    beeCtx.beginPath();
                    beeCtx.moveTo(0,-3); beeCtx.lineTo(-3,0); beeCtx.lineTo(-2,0);
                    beeCtx.lineTo(-2,2); beeCtx.lineTo(2,2); beeCtx.lineTo(2,0);
                    beeCtx.lineTo(3,0); beeCtx.closePath(); beeCtx.fill();
                }
                beeCtx.restore();
            }
        }
    }
}

// ── Background ──
function beeDrawBg() {
    const bg = beeCtx.createRadialGradient(beeW*0.3, beeH*0.6, 50, beeW*0.5, beeH*0.5, beeW*0.8);
    bg.addColorStop(0, '#1e3a1e'); bg.addColorStop(0.5, '#142814'); bg.addColorStop(1, '#0a150a');
    beeCtx.fillStyle = bg; beeCtx.fillRect(0, 0, beeW, beeH);
    beeCtx.globalAlpha = 0.03;
    for (let i = 0; i < 200; i++) {
        beeCtx.fillStyle = '#4a8a3a';
        beeCtx.fillRect((i*137.5)%beeW, (i*97.3)%beeH, 1, 3+(i%4));
    }
    beeCtx.globalAlpha = 1;
}

// ── Init & Loop ──
let beeSwarm = [];
let beeTime = 0;

function beeSimInit() {
    beeW = beeCanvas.width = beeWrap.offsetWidth;
    beeH = beeCanvas.height = beeWrap.offsetHeight;
    beeGenerateComb();
    beeSwarm = [];
    for (let i = 0; i < BEE_NUM; i++) beeSwarm.push(new SimBee(i));
    for (let i = 0; i < BEE_NUM && i < beeCells.length; i++) {
        beeCells[i].beeIndex = i; beeSwarm[i].cellIndex = i;
    }
    beeUpdateCombPos();
    beeGenerateFlowers();

    for (const bee of beeSwarm) {
        const c = bee.cell;
        if (c) {
            if (bee.stamina > bee.tiredAt + 15) {
                bee.x = 40 + Math.random() * (beeW * 0.6);
                bee.y = 80 + Math.random() * (beeH - 160);
            } else {
                bee.state = 'sleeping';
                bee.x = c.x; bee.y = c.y; bee.vx = 0; bee.vy = 0;
            }
        }
    }
    beeParticles = [];
    beeTime = 0;
}

function beeSimResize() {
    beeW = beeCanvas.width = beeWrap.offsetWidth;
    beeH = beeCanvas.height = beeWrap.offsetHeight;
    beeUpdateCombPos();
    for (const f of beeFlowers) {
        if (beeDst(f, beeCombCenter) < BEE_HEX_SIZE * BEE_HEX_RADIUS * 3) {
            f.x = 40 + Math.random() * (beeW * 0.5);
            f.y = 80 + Math.random() * (beeH - 160);
        }
    }
}

function beeSimLoop() {
    if (!beeSimActive) return;
    beeDrawBg();
    beeUpdateFlowers();
    beeDrawFlowers(beeTime);
    beeDrawComb(beeTime);
    beeUpdateParticles();
    beeDrawParticles();

    if (beeMouse.active) {
        beeCtx.beginPath();
        beeCtx.arc(beeMouse.x, beeMouse.y, 14 + Math.sin(beeTime*0.12)*3, 0, Math.PI*2);
        beeCtx.fillStyle = beeMouse.repel ? 'rgba(255,70,70,0.25)' : 'rgba(255,230,100,0.25)';
        beeCtx.fill();
    }

    for (const bee of beeSwarm) bee.update(beeSwarm, beeTime);
    for (const bee of beeSwarm) bee.draw(beeTime);

    beeTime++;
    beeAnimId = requestAnimationFrame(beeSimLoop);
}

// ── Boot Lines ──
const beeSimBootLines = [
    "> EXEC bee_colony.exe",
    "> SPAWNING AGENTS...",
    "> GENERATING FLORA GRID...",
    "> HIVE ONLINE."
];

// ── Launch / Close ──
function launchBeeSim() {
    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-beesim');
    beeLayer.style.display = 'flex';
    beeAppEl.style.display = 'none';

    if (cancelBeeSimBoot) {
        cancelBeeSimBoot();
        cancelBeeSimBoot = null;
    }

    cancelBeeSimBoot = appBootAnimation(beeLoadingEl, beeLoadingText, beeSimBootLines, () => {
        cancelBeeSimBoot = null;
        beeAppEl.style.display = 'flex';
        beeSimActive = true;
        requestAnimationFrame(() => {
            beeSimInit();
            beeSimLoop();
        });
    });
}

function closeBeeSim() {
    if (cancelBeeSimBoot) {
        cancelBeeSimBoot();
        cancelBeeSimBoot = null;
    }
    beeSimActive = false;
    if (beeAnimId) cancelAnimationFrame(beeAnimId);
    beeAnimId = null;
    beeLayer.style.display = 'none';
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-beesim');
}

function toggleBeeSimControls() {
    document.getElementById('beesim-controls').classList.toggle('collapsed');
}

window.addEventListener('resize', () => { if (beeSimActive) beeSimResize(); });

document.addEventListener('visibilitychange', () => {
    if (!beeSimActive) return;
    if (document.hidden) {
        if (beeAnimId) cancelAnimationFrame(beeAnimId);
        beeAnimId = null;
        return;
    }
    if (!beeAnimId) beeSimLoop();
});
