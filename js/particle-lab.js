// ==========================================
// PARTICLE LAB ENGINE
// ==========================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
const plabCanvasWrap = document.getElementById('plab-canvas-wrap');
const layerPLab = document.getElementById('layer-particle-lab');
const plabLoadingEl = document.getElementById('plab-loading');
const plabLoadingText = document.getElementById('plab-loading-text');
const plabAppEl = document.getElementById('plab-app');

const S = {
    mode: 'plexus', amount: 150, size: 3, speed: 1.5, gravity: 0,
    repelStrength: 1.5, trails: 0, shape: 'circle', colormode: 'solid', color: '#00ffcc'
};
let particles = [];
let pw = 100, ph = 100;
let plabActive = false, plabAnimId = null;

const pmouse = { x: -1000, y: -1000, leftDown: false, rightDown: false, attractRadius: 150 };

canvas.addEventListener('mousedown', e => { if(e.button===0)pmouse.leftDown=true; if(e.button===2)pmouse.rightDown=true; });
canvas.addEventListener('mouseup',   e => { if(e.button===0)pmouse.leftDown=false; if(e.button===2)pmouse.rightDown=false; });
canvas.addEventListener('mousemove', e => { const r=canvas.getBoundingClientRect(); pmouse.x=e.clientX-r.left; pmouse.y=e.clientY-r.top; });
canvas.addEventListener('mouseleave',() => { pmouse.leftDown=false; pmouse.rightDown=false; pmouse.x=-1000; });
canvas.addEventListener('contextmenu', e => e.preventDefault());

function plabResize() {
    pw = plabCanvasWrap.clientWidth; ph = plabCanvasWrap.clientHeight;
    canvas.width = pw; canvas.height = ph;
}

function rnd(a, b) { return Math.random() * (b - a) + a; }
const neons = ['#00ffcc','#ff00ff','#00ff00','#ffff00','#ff3300','#0066ff'];
function rndNeon() { return neons[Math.floor(Math.random()*neons.length)]; }
function hex2rgb(h) {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return r ? {r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)} : {r:0,g:255,b:204};
}

class Particle {
    constructor(x, y, boom) {
        this.x = x||rnd(0,pw); this.y = y||rnd(0,ph);
        const a = rnd(0,Math.PI*2);
        const sp = boom ? rnd(S.speed*2,S.speed*5) : rnd(S.speed*0.2,S.speed);
        this.vx = Math.cos(a)*sp; this.vy = Math.sin(a)*sp;
        this.baseColor = rndNeon();
        this.da = rnd(0,Math.PI*2); this.ds = rnd(0.02,0.05);
        this.w = rnd(0.5,1.5);
    }
    update() {
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
            for(let i=0;i<particles.length;i++){
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
    draw() {
        let c=S.color, cs=Math.sqrt(this.vx*this.vx+this.vy*this.vy);
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

function syncP() {
    while(particles.length<S.amount)particles.push(new Particle());
    if(particles.length>S.amount)particles.splice(S.amount);
}

function plabAnimate() {
    if(!plabActive)return;
    if(pmouse.rightDown)pmouse.attractRadius=Math.min(pmouse.attractRadius+5,Math.max(pw,ph));
    else pmouse.attractRadius=150;
    let t=1-S.trails; if(t<0.01)t=0.01;
    ctx.fillStyle=`rgba(0,0,0,${t})`; ctx.fillRect(0,0,pw,ph);
    for(let i=0;i<particles.length;i++){particles[i].update();particles[i].draw();}
    if(S.mode==='plexus'){
        let rgb=hex2rgb(S.color),mx=120;
        for(let i=0;i<particles.length;i++){
            for(let j=i+1;j<particles.length;j++){
                let dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);
                if(d<mx){ctx.beginPath();ctx.strokeStyle=`rgba(${rgb.r},${rgb.g},${rgb.b},${1-d/mx})`;ctx.lineWidth=1;ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.stroke();}
            }
        }
    }
    plabAnimId=requestAnimationFrame(plabAnimate);
}

// --- UI BINDINGS ---
function plabBind(id, key, isF) {
    const inp=document.getElementById(`ctrl-${id}`), disp=document.getElementById(`val-${id}`);
    inp.addEventListener('input', e => {
        S[key] = isF ? parseFloat(e.target.value) : parseInt(e.target.value);
        if(disp) disp.textContent = S[key];
        if(key==='amount') syncP();
    });
}
plabBind('amount','amount'); plabBind('size','size');
plabBind('speed','speed',true); plabBind('gravity','gravity',true);
plabBind('trails','trails',true); plabBind('repel','repelStrength',true);

document.getElementById('ctrl-shape').addEventListener('change', e => S.shape=e.target.value);
document.getElementById('ctrl-colormode').addEventListener('change', e => {
    S.colormode=e.target.value;
    document.getElementById('solid-color-group').style.display=e.target.value==='solid'?'flex':'none';
});
document.getElementById('ctrl-color').addEventListener('input', e => S.color=e.target.value);

document.getElementById('btn-explode').addEventListener('click', () => {
    let cx=pw/2,cy=ph/2;
    particles.forEach(p => { p.x=cx;p.y=cy; let a=rnd(0,Math.PI*2),sp=rnd(5,20); p.vx=Math.cos(a)*sp;p.vy=Math.sin(a)*sp; });
});

const btnSnow=document.getElementById('btn-snow'), btnVortex=document.getElementById('btn-vortex');
const btnPlexus=document.getElementById('btn-plexus'), btnLiquid=document.getElementById('btn-liquid');

function pUI(key, val, dv) {
    S[key]=val; let el=document.getElementById(`ctrl-${key}`); if(el)el.value=val;
    if(dv!==null&&dv!==undefined){let d=document.getElementById(`val-${key}`);if(d)d.textContent=dv;}
    if(key==='amount')syncP();
}

function setPlabMode(m) {
    S.mode=m;
    btnSnow.classList.remove('active'); btnSnow.textContent='Snow';
    btnVortex.classList.remove('active'); btnVortex.textContent='Vortex';
    btnPlexus.classList.remove('active'); btnPlexus.textContent='Plexus';
    btnLiquid.classList.remove('active'); btnLiquid.textContent='Liquid';
    canvas.classList.remove('gooey-effect');

    const shpEl=document.getElementById('ctrl-shape'), cmEl=document.getElementById('ctrl-colormode'), colEl=document.getElementById('ctrl-color');
    const scg=document.getElementById('solid-color-group');

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
        pUI('amount',100,'100'); pUI('shape','circle'); shpEl.value='circle'; pUI('colormode','solid'); cmEl.value='solid'; scg.style.display='flex';
        pUI('color','#00aaff'); colEl.value='#00aaff'; pUI('gravity',0.5,'0.5'); pUI('speed',2,'2'); pUI('trails',0,'0');
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
let presets = [];
const presetSel = document.getElementById('ctrl-presets');
document.getElementById('btn-save-preset').addEventListener('click', () => {
    presets.push(JSON.parse(JSON.stringify(S)));
    let i=presets.length-1;
    if(presets.length===1) presetSel.innerHTML='';
    let o=document.createElement('option'); o.value=i; o.textContent=`Preset ${i+1}`;
    presetSel.appendChild(o); presetSel.value=i;
    let b=document.getElementById('btn-save-preset'),old=b.textContent; b.textContent='Saved!'; setTimeout(()=>b.textContent=old,1000);
});
document.getElementById('btn-load-preset').addEventListener('click', () => {
    let i=parseInt(presetSel.value);
    if(i>=0&&presets[i]){
        Object.assign(S,JSON.parse(JSON.stringify(presets[i])));
        pUI('amount',S.amount,S.amount); pUI('size',S.size,S.size); pUI('speed',S.speed,S.speed);
        pUI('gravity',S.gravity,S.gravity); pUI('repel',S.repelStrength,S.repelStrength); pUI('trails',S.trails,S.trails);
        document.getElementById('ctrl-shape').value=S.shape;
        document.getElementById('ctrl-colormode').value=S.colormode;
        document.getElementById('ctrl-color').value=S.color;
        document.getElementById('solid-color-group').style.display=S.colormode==='solid'?'flex':'none';
        [['snow',btnSnow],['vortex',btnVortex],['plexus',btnPlexus],['liquid',btnLiquid]].forEach(([m,b])=>{
            b.classList.toggle('active',S.mode===m);
            b.textContent=S.mode===m?`\u2713 ${m[0].toUpperCase()+m.slice(1)}`:m[0].toUpperCase()+m.slice(1);
        });
        if(S.mode==='liquid')canvas.classList.add('gooey-effect'); else canvas.classList.remove('gooey-effect');
    }
});

// --- LAUNCH / CLOSE ---
const plabBootLines = [
    "> EXEC particle_lab.exe",
    "> LOADING RENDER ENGINE... [OK]",
    "> ALLOCATING PARTICLE BUFFER...",
    "> LINKING PHYSICS SUBSYSTEM...",
    "> DISPLAY READY."
];

function launchParticleLab() {
    layerPLab.style.display = 'flex';
    plabAppEl.style.display = 'none';

    appBootAnimation(plabLoadingEl, plabLoadingText, plabBootLines, () => {
        plabAppEl.style.display = 'flex';
        plabActive = true;
        requestAnimationFrame(() => {
            plabResize();
            syncP();
            plabAnimate();
        });
    });
}

function closeParticleLab() {
    plabActive = false;
    if (plabAnimId) cancelAnimationFrame(plabAnimId);
    plabAnimId = null;
    layerPLab.style.display = 'none';
    canvas.classList.remove('gooey-effect');
}

function togglePlabControls() {
    document.getElementById('plab-controls').classList.toggle('collapsed');
}

window.addEventListener('resize', () => { if (plabActive) plabResize(); });
