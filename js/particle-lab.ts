// ==========================================
// PARTICLE LAB ENGINE
// ==========================================

// --- External functions (defined in sibling scripts) ---
declare function appBootAnimation(loadingEl: HTMLElement, textEl: HTMLElement, lines: string[], onComplete: () => void): () => void;
declare function rememberFocusForLayer(layerId: string): void;
declare function restoreFocusForLayer(layerId: string): void;

// --- Types ---
type ParticleMode = 'snow' | 'vortex' | 'plexus' | 'liquid' | 'normal';
type ParticleShape = 'square' | 'circle' | 'triangle' | 'star';
type ParticleColorMode = 'solid' | 'random' | 'velocity';

interface ParticleConfig {
    mode: ParticleMode;
    amount: number;
    size: number;
    speed: number;
    gravity: number;
    repelStrength: number;
    trails: number;
    shape: ParticleShape;
    colormode: ParticleColorMode;
    color: string;
}

interface ParticleMouse {
    x: number;
    y: number;
    leftDown: boolean;
    rightDown: boolean;
    attractRadius: number;
}

const canvas = document.getElementById('particleCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const plabCanvasWrap = document.getElementById('plab-canvas-wrap') as HTMLDivElement;
const layerPLab = document.getElementById('layer-particle-lab') as HTMLDivElement;
const plabLoadingEl = document.getElementById('plab-loading') as HTMLDivElement;
const plabLoadingText = document.getElementById('plab-loading-text') as HTMLDivElement;
const plabAppEl = document.getElementById('plab-app') as HTMLDivElement;

const S: ParticleConfig = {
    mode: 'plexus', amount: 150, size: 3, speed: 1.5, gravity: 0,
    repelStrength: 1.5, trails: 0, shape: 'circle', colormode: 'solid', color: '#00ffcc'
};
let particles: Particle[] = [];
let pw: number = 100, ph: number = 100;
let plabActive: boolean = false, plabAnimId: number | null = null;
let cancelPlabBoot: (() => void) | null = null;
const LIQUID_PAIR_SAMPLE_TARGET = 320;
const PLEXUS_SAMPLE_TARGET = 320;

const pmouse: ParticleMouse = { x: -1000, y: -1000, leftDown: false, rightDown: false, attractRadius: 150 };

canvas.addEventListener('mousedown', (e: MouseEvent) => { if(e.button===0)pmouse.leftDown=true; if(e.button===2)pmouse.rightDown=true; });
canvas.addEventListener('mouseup',   (e: MouseEvent) => { if(e.button===0)pmouse.leftDown=false; if(e.button===2)pmouse.rightDown=false; });
canvas.addEventListener('mousemove', (e: MouseEvent) => { const r=canvas.getBoundingClientRect(); pmouse.x=e.clientX-r.left; pmouse.y=e.clientY-r.top; });
canvas.addEventListener('mouseleave',() => { pmouse.leftDown=false; pmouse.rightDown=false; pmouse.x=-1000; });
canvas.addEventListener('contextmenu', (e: Event) => e.preventDefault());

function plabResize(): void {
    pw = plabCanvasWrap.clientWidth; ph = plabCanvasWrap.clientHeight;
    canvas.width = pw; canvas.height = ph;
}

function rnd(a: number, b: number): number { return Math.random() * (b - a) + a; }
const neons: string[] = ['#00ffcc','#ff00ff','#00ff00','#ffff00','#ff3300','#0066ff'];
function rndNeon(): string { return neons[Math.floor(Math.random()*neons.length)]; }
function hex2rgb(h: string): { r: number; g: number; b: number } {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return r ? {r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)} : {r:0,g:255,b:204};
}

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseColor: string;
    da: number;
    ds: number;
    w: number;

    constructor(x?: number, y?: number, boom?: boolean) {
        this.x = x||rnd(0,pw); this.y = y||rnd(0,ph);
        const a = rnd(0,Math.PI*2);
        const sp = boom ? rnd(S.speed*2,S.speed*5) : rnd(S.speed*0.2,S.speed);
        this.vx = Math.cos(a)*sp; this.vy = Math.sin(a)*sp;
        this.baseColor = rndNeon();
        this.da = rnd(0,Math.PI*2); this.ds = rnd(0.02,0.05);
        this.w = rnd(0.5,1.5);
    }
    update(): void {
        if (pmouse.leftDown || pmouse.rightDown) {
            let dx=pmouse.x-this.x, dy=pmouse.y-this.y;
            let d=Math.sqrt(dx*dx+dy*dy), a=Math.atan2(dy,dx);
            if (pmouse.leftDown && d<150) { let f=(150-d)/150; this.vx-=Math.cos(a)*f*S.repelStrength; this.vy-=Math.sin(a)*f*S.repelStrength; }
            if (pmouse.rightDown && d<pmouse.attractRadius) { let f=(pmouse.attractRadius-d)/pmouse.attractRadius; this.vx+=Math.cos(a)*f*0.8; this.vy+=Math.sin(a)*f*0.8; }
        }
        if (S.mode==='snow') {
            this.y+=(S.speed*0.5*this.w)+S.gravity;
            this.x+=Math.sin(this.da)*(S.speed*0.5); this.da+=this.ds;
            if(this.y>ph+S.size){this.y=-S.size;this.x=rnd(0,pw);}
            else if(this.y<-S.size&&S.gravity<0){this.y=ph+S.size;this.x=rnd(0,pw);}
            if(this.x>pw+S.size)this.x=-S.size; if(this.x<-S.size)this.x=pw+S.size;
        } else if (S.mode==='vortex') {
            let cx=pw/2,cy=ph/2,dx=cx-this.x,dy=cy-this.y;
            let d=Math.sqrt(dx*dx+dy*dy),ac=Math.atan2(dy,dx),sp=ac+Math.PI/2;
            let pull=S.gravity,orb=S.speed*1.5;
            let tvx=Math.cos(sp)*orb+Math.cos(ac)*pull*5;
            let tvy=Math.sin(sp)*orb+Math.sin(ac)*pull*5;
            this.vx+=(tvx-this.vx)*0.05; this.vy+=(tvy-this.vy)*0.05;
            this.x+=this.vx; this.y+=this.vy;
            if(d<10&&pull>0){let sa=rnd(0,Math.PI*2),sr=Math.max(pw,ph)/1.5;this.x=cx+Math.cos(sa)*sr;this.y=cy+Math.sin(sa)*sr;}
            else if(d>Math.max(pw,ph)&&pull<0){let sa=rnd(0,Math.PI*2);this.x=cx+Math.cos(sa)*20;this.y=cy+Math.sin(sa)*20;}
        } else if (S.mode==='liquid') {
            this.vy+=S.gravity; this.x+=this.vx; this.y+=this.vy;
            const neighborStep = particles.length > LIQUID_PAIR_SAMPLE_TARGET
                ? Math.ceil(particles.length / LIQUID_PAIR_SAMPLE_TARGET)
                : 1;
            for(let i=0;i<particles.length;i+=neighborStep){
                let p2=particles[i]; if(p2===this)continue;
                let dx=p2.x-this.x,dy=p2.y-this.y,d=Math.sqrt(dx*dx+dy*dy),th=S.size*4;
                if(d<th&&d>0){
                    if(d<S.size*2){let f=(S.size*2-d)*0.05;this.vx-=(dx/d)*f;this.vy-=(dy/d)*f;}
                    else{let f=(d-S.size*2)*0.005;this.vx+=(dx/d)*f;this.vy+=(dy/d)*f;}
                }
            }
            this.vx*=0.98; this.vy*=0.99;
            if(this.x<0){this.x=0;this.vx*=-0.5;} if(this.x>pw){this.x=pw;this.vx*=-0.5;}
            if(this.y<0){this.y=0;this.vy*=-0.5;} if(this.y>ph){this.y=ph;this.vy*=-0.3;this.vx*=0.8;}
        } else {
            this.vy+=S.gravity; this.x+=this.vx; this.y+=this.vy;
            let cs=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
            if(cs>S.speed*2&&S.gravity===0&&!pmouse.leftDown&&!pmouse.rightDown){this.vx*=0.95;this.vy*=0.95;}
            else if(cs<S.speed*0.5&&S.gravity===0&&S.speed>0){this.vx*=1.05;this.vy*=1.05;}
            if(this.x<0){this.x=0;this.vx*=-1;} if(this.x>pw){this.x=pw;this.vx*=-1;}
            if(this.y<0){this.y=0;this.vy*=-1;} if(this.y>ph){this.y=ph;this.vy*=-0.8;if(S.gravity>0)this.vx*=0.98;}
        }
    }
    draw(): void {
        let c: string=S.color, cs=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
        if(S.colormode==='random')c=this.baseColor;
        else if(S.colormode==='velocity'){let sp=S.mode==='snow'?(S.speed*0.5*this.w):cs;c=`hsl(${Math.min(280,sp*25)},100%,50%)`;}
        ctx.fillStyle=c; ctx.beginPath(); let sz=S.size;
        if(S.shape==='square'){ctx.rect(this.x-sz/2,this.y-sz/2,sz,sz);}
        else if(S.shape==='circle'){ctx.arc(this.x,this.y,sz/2,0,Math.PI*2);}
        else if(S.shape==='triangle'){let a=Math.atan2(this.vy,this.vx);ctx.translate(this.x,this.y);ctx.rotate(a);ctx.moveTo(sz,0);ctx.lineTo(-sz/2,sz/2);ctx.lineTo(-sz/2,-sz/2);ctx.rotate(-a);ctx.translate(-this.x,-this.y);}
        else if(S.shape==='star'){let sp=5,oR=sz,iR=sz/2,rot=Math.PI/2*3,step=Math.PI/sp;ctx.moveTo(this.x,this.y-oR);for(let i=0;i<sp;i++){ctx.lineTo(this.x+Math.cos(rot)*oR,this.y+Math.sin(rot)*oR);rot+=step;ctx.lineTo(this.x+Math.cos(rot)*iR,this.y+Math.sin(rot)*iR);rot+=step;}}
        ctx.fill();
    }
}

function syncP(): void {
    while(particles.length<S.amount)particles.push(new Particle());
    if(particles.length>S.amount)particles.splice(S.amount);
}

function plabAnimate(): void {
    if(!plabActive)return;
    if(pmouse.rightDown)pmouse.attractRadius=Math.min(pmouse.attractRadius+5,Math.max(pw,ph));
    else pmouse.attractRadius=150;
    let t=1-S.trails; if(t<0.01)t=0.01;
    ctx.fillStyle=`rgba(0,0,0,${t})`; ctx.fillRect(0,0,pw,ph);
    for(let i=0;i<particles.length;i++){particles[i].update();particles[i].draw();}
    if(S.mode==='plexus'){
        let rgb=hex2rgb(S.color),mx=120;
        const pairStep = particles.length > PLEXUS_SAMPLE_TARGET
            ? Math.ceil(particles.length / PLEXUS_SAMPLE_TARGET)
            : 1;
        for(let i=0;i<particles.length;i+=pairStep){
            for(let j=i+pairStep;j<particles.length;j+=pairStep){
                let dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
                if(d<mx){ctx.beginPath();ctx.strokeStyle=`rgba(${rgb.r},${rgb.g},${rgb.b},${1-d/mx})`;ctx.lineWidth=1;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}
            }
        }
    }
    plabAnimId=requestAnimationFrame(plabAnimate);
}

// --- UI BINDINGS ---
function plabBind(id: string, key: keyof ParticleConfig, isF?: boolean): void {
    const inp = document.getElementById(`ctrl-${id}`) as HTMLInputElement;
    const disp = document.getElementById(`val-${id}`) as HTMLElement | null;
    inp.addEventListener('input', () => {
        (S as Record<string, number | string>)[key] = isF ? parseFloat(inp.value) : parseInt(inp.value);
        if(disp) disp.textContent = String(S[key]);
        if(key==='amount') syncP();
    });
}
plabBind('amount','amount'); plabBind('size','size');
plabBind('speed','speed',true); plabBind('gravity','gravity',true);
plabBind('trails','trails',true); plabBind('repel','repelStrength',true);

(document.getElementById('ctrl-shape') as HTMLSelectElement).addEventListener('change', (e: Event) => { S.shape = (e.target as HTMLSelectElement).value as ParticleShape; });
(document.getElementById('ctrl-colormode') as HTMLSelectElement).addEventListener('change', (e: Event) => {
    S.colormode = (e.target as HTMLSelectElement).value as ParticleColorMode;
    (document.getElementById('solid-color-group') as HTMLDivElement).style.display = S.colormode==='solid'?'flex':'none';
});
(document.getElementById('ctrl-color') as HTMLInputElement).addEventListener('input', (e: Event) => { S.color = (e.target as HTMLInputElement).value; });

(document.getElementById('btn-explode') as HTMLButtonElement).addEventListener('click', () => {
    let cx=pw/2,cy=ph/2;
    particles.forEach(p => { p.x=cx;p.y=cy; let a=rnd(0,Math.PI*2),sp=rnd(5,20); p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp; });
});

const btnSnow = document.getElementById('btn-snow') as HTMLButtonElement;
const btnVortex = document.getElementById('btn-vortex') as HTMLButtonElement;
const btnPlexus = document.getElementById('btn-plexus') as HTMLButtonElement;
const btnLiquid = document.getElementById('btn-liquid') as HTMLButtonElement;

function pUI(key: string, val: number | string, dv?: number | string | null): void {
    (S as Record<string, number | string>)[key]=val;
    const el = document.getElementById(`ctrl-${key}`) as HTMLInputElement | HTMLSelectElement | null;
    if(el) el.value = String(val);
    if(dv!==null&&dv!==undefined){let d=document.getElementById(`val-${key}`) as HTMLElement | null;if(d)d.textContent=String(dv);}
    if(key==='amount')syncP();
}

function setPlabMode(m: ParticleMode): void {
    S.mode=m;
    btnSnow.classList.remove('active'); btnSnow.textContent='Snow';
    btnVortex.classList.remove('active'); btnVortex.textContent='Vortex';
    btnPlexus.classList.remove('active'); btnPlexus.textContent='Plexus';
    btnLiquid.classList.remove('active'); btnLiquid.textContent='Liquid';
    canvas.classList.remove('gooey-effect');

    // Unlock size slider by default (liquid will lock it)
    const sizeSlider = document.getElementById('ctrl-size') as HTMLInputElement | null;
    if(sizeSlider) sizeSlider.disabled=false;

    const shpEl = document.getElementById('ctrl-shape') as HTMLSelectElement;
    const cmEl = document.getElementById('ctrl-colormode') as HTMLSelectElement;
    const colEl = document.getElementById('ctrl-color') as HTMLInputElement;
    const scg = document.getElementById('solid-color-group') as HTMLDivElement;

    if(m==='snow'){
        btnSnow.classList.add('active'); btnSnow.textContent='\u2713 Snow';
        pUI('shape','circle'); shpEl.value='circle'; pUI('colormode','solid'); cmEl.value='solid'; scg.style.display='flex';
        pUI('color','#ffffff'); colEl.value='#ffffff'; pUI('gravity',0,'0'); pUI('speed',3,'3'); pUI('trails',0.5,'0.5');
    } else if(m==='vortex'){
        btnVortex.classList.add('active'); btnVortex.textContent='\u2713 Vortex';
        pUI('shape','triangle'); shpEl.value='triangle'; pUI('colormode','velocity'); cmEl.value='velocity'; scg.style.display='none';
        pUI('gravity',0.5,'0.5'); pUI('speed',6,'6'); pUI('trails',0.9,'0.9');
    } else if(m==='plexus'){
        btnPlexus.classList.add('active'); btnPlexus.textContent='\u2713 Plexus';
        pUI('amount',150,'150'); pUI('shape','circle'); shpEl.value='circle'; pUI('colormode','solid'); cmEl.value='solid'; scg.style.display='flex';
        pUI('color','#00ffcc'); colEl.value='#00ffcc'; pUI('gravity',0,'0'); pUI('speed',1.5,'1.5'); pUI('trails',0,'0');
    } else if(m==='liquid'){
        btnLiquid.classList.add('active'); btnLiquid.textContent='\u2713 Liquid';
        canvas.classList.add('gooey-effect');
        pUI('amount',100,'100'); pUI('size',20,'20'); pUI('shape','circle'); shpEl.value='circle'; pUI('colormode','solid'); cmEl.value='solid'; scg.style.display='flex';
        pUI('color','#00aaff'); colEl.value='#00aaff'; pUI('gravity',0.5,'0.5'); pUI('speed',2,'2'); pUI('trails',0,'0');
        if(sizeSlider) sizeSlider.disabled=true;
    } else {
        pUI('shape','circle'); shpEl.value='circle'; pUI('colormode','solid'); cmEl.value='solid'; scg.style.display='flex';
        pUI('color','#00ffcc'); colEl.value='#00ffcc'; pUI('gravity',0,'0'); pUI('speed',1.5,'1.5'); pUI('trails',0,'0'); pUI('amount',150,'150');
        particles.forEach(p => { let a=rnd(0,Math.PI*2),sp=rnd(S.speed*0.2,S.speed); p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp; });
    }
}

btnSnow.addEventListener('click', () => setPlabMode(S.mode==='snow'?'normal':'snow'));
btnVortex.addEventListener('click', () => setPlabMode(S.mode==='vortex'?'normal':'vortex'));
btnPlexus.addEventListener('click', () => setPlabMode(S.mode==='plexus'?'normal':'plexus'));
btnLiquid.addEventListener('click', () => setPlabMode(S.mode==='liquid'?'normal':'liquid'));

// --- PRESETS ---
let presets: ParticleConfig[] = [];
const presetSel = document.getElementById('ctrl-presets') as HTMLSelectElement;
(document.getElementById('btn-save-preset') as HTMLButtonElement).addEventListener('click', () => {
    presets.push(JSON.parse(JSON.stringify(S)) as ParticleConfig);
    let i=presets.length-1;
    if(presets.length===1) presetSel.innerHTML='';
    let o=document.createElement('option'); o.value=String(i); o.textContent=`Preset ${i+1}`;
    presetSel.appendChild(o); presetSel.value=String(i);
    let b=document.getElementById('btn-save-preset') as HTMLButtonElement,old=b.textContent; b.textContent='Saved!'; setTimeout(()=>b.textContent=old,1000);
});
(document.getElementById('btn-load-preset') as HTMLButtonElement).addEventListener('click', () => {
    let i=parseInt(presetSel.value);
    if(i>=0&&presets[i]){
        Object.assign(S,JSON.parse(JSON.stringify(presets[i])) as ParticleConfig);
        pUI('amount',S.amount,S.amount); pUI('size',S.size,S.size); pUI('speed',S.speed,S.speed);
        pUI('gravity',S.gravity,S.gravity); pUI('repel',S.repelStrength,S.repelStrength); pUI('trails',S.trails,S.trails);
        (document.getElementById('ctrl-shape') as HTMLSelectElement).value=S.shape;
        (document.getElementById('ctrl-colormode') as HTMLSelectElement).value=S.colormode;
        (document.getElementById('ctrl-color') as HTMLInputElement).value=S.color;
        (document.getElementById('solid-color-group') as HTMLDivElement).style.display=S.colormode==='solid'?'flex':'none';
        ([['snow',btnSnow],['vortex',btnVortex],['plexus',btnPlexus],['liquid',btnLiquid]] as [string, HTMLButtonElement][]).forEach(([m,b])=>{
            b.classList.toggle('active',S.mode===m);
            b.textContent=S.mode===m?`\u2713 ${m[0].toUpperCase()+m.slice(1)}`:m[0].toUpperCase()+m.slice(1);
        });
        if(S.mode==='liquid'){canvas.classList.add('gooey-effect');S.size=20;pUI('size',20,'20');(document.getElementById('ctrl-size') as HTMLInputElement).disabled=true;} else {canvas.classList.remove('gooey-effect');(document.getElementById('ctrl-size') as HTMLInputElement).disabled=false;}
    }
});

// --- LAUNCH / CLOSE ---
const plabBootLines: string[] = [
    "> EXEC particle_lab.exe",
    "> LOADING RENDER ENGINE... [OK]",
    "> ALLOCATING PARTICLE BUFFER...",
    "> LINKING PHYSICS SUBSYSTEM...",
    "> DISPLAY READY."
];

function launchParticleLab(): void {
    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-particle-lab');
    layerPLab.style.display = 'flex';
    plabAppEl.style.display = 'none';

    if (cancelPlabBoot) {
        cancelPlabBoot();
        cancelPlabBoot = null;
    }

    cancelPlabBoot = appBootAnimation(plabLoadingEl, plabLoadingText, plabBootLines, () => {
        cancelPlabBoot = null;
        plabAppEl.style.display = 'flex';
        plabActive = true;
        // Restore gooey filter if liquid mode was active
        if (S.mode === 'liquid') canvas.classList.add('gooey-effect');
        requestAnimationFrame(() => {
            plabResize();
            syncP();
            plabAnimate();
        });
    });
}

function closeParticleLab(): void {
    if (cancelPlabBoot) {
        cancelPlabBoot();
        cancelPlabBoot = null;
    }
    plabActive = false;
    if (plabAnimId) cancelAnimationFrame(plabAnimId);
    plabAnimId = null;
    layerPLab.style.display = 'none';
    canvas.classList.remove('gooey-effect');
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-particle-lab');
}

function togglePlabControls(): void {
    (document.getElementById('plab-controls') as HTMLDivElement).classList.toggle('collapsed');
}

window.addEventListener('resize', () => { if (plabActive) plabResize(); });

document.addEventListener('visibilitychange', () => {
    if (!plabActive) return;
    if (document.hidden) {
        if (plabAnimId) cancelAnimationFrame(plabAnimId);
        plabAnimId = null;
        return;
    }
    if (!plabAnimId) plabAnimate();
});

// Expose to global scope for inline HTML handlers and cross-file calls
(window as any).launchParticleLab = launchParticleLab;
(window as any).closeParticleLab = closeParticleLab;
(window as any).togglePlabControls = togglePlabControls;
