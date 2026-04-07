(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e={amber:{ui:`#f59e0b`,uiDim:`rgba(245,158,11,0.2)`,uiBorder:`#78350f`,flames:[`#78350f`,`#b45309`,`#f59e0b`,`#fef3c7`]},green:{ui:`#22c55e`,uiDim:`rgba(34,197,94,0.2)`,uiBorder:`#14532d`,flames:[`#14532d`,`#16a34a`,`#22c55e`,`#bbf7d0`]},blue:{ui:`#3b82f6`,uiDim:`rgba(59,130,246,0.2)`,uiBorder:`#1e3a8a`,flames:[`#1e3a8a`,`#2563eb`,`#60a5fa`,`#ffffff`]},pink:{ui:`#ec4899`,uiDim:`rgba(236,72,153,0.2)`,uiBorder:`#831843`,flames:[`#831843`,`#be185d`,`#ec4899`,`#fce7f3`]}},t=`amber`,n=`standby`,r=!1,i=!1,a=[],o=document.getElementById(`layer-off`),s=document.getElementById(`layer-terminal`),c=document.getElementById(`layer-swarm`),l=document.getElementById(`layer-os`),u=document.getElementById(`terminal-text`),ee=document.getElementById(`loading-bar-container`),te=document.getElementById(`swarm-container`),d=document.getElementById(`mini-display`),f=document.getElementById(`power-switch`),ne=document.getElementById(`ascii-logo`),re=new Map;function ie(e){e===`apps-folder`?ae():e===`docs-folder`?se():e===`docs-viewer`?launchDocsViewer():e===`particle-lab`?launchParticleLab():e===`sysmon`?Ve():e===`resource-router`?launchResourceRouter():e===`bee-sim`?launchBeeSim():e===`crypt-vault`?Ue(`CRYPT_VAULT`):e===`jack-in`&&Ue(`JACK_IN`)}function ae(){ue(`layer-apps-folder`),document.getElementById(`layer-apps-folder`).style.display=`block`}function oe(){document.getElementById(`layer-apps-folder`).style.display=`none`,p(`layer-apps-folder`)}function se(){ue(`layer-docs-folder`),document.getElementById(`layer-docs-folder`).style.display=`block`}function ce(){document.getElementById(`layer-docs-folder`).style.display=`none`,p(`layer-docs-folder`)}function le(){f&&f.addEventListener(`click`,Me),l&&l.addEventListener(`click`,e=>{let t=e.target.closest(`[data-app-action]`);t&&ie(t.dataset.appAction)});let e=document.getElementById(`layer-apps-folder`);e&&e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-folder-app]`);if(!t)return;let n=t.dataset.folderApp;oe(),ie(n)});let t=document.getElementById(`layer-docs-folder`);t&&t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-folder-doc]`);if(!t)return;let n=t.dataset.folderDoc;ce(),launchDocsViewer(n)}),document.addEventListener(`keydown`,he)}function ue(e){let t=document.activeElement;t instanceof HTMLElement&&t!==document.body?re.set(e,t):re.delete(e)}function de(e){if(!(e instanceof HTMLElement)||!document.contains(e)||e.hasAttribute(`disabled`)||e.hasAttribute(`hidden`))return!1;let t=window.getComputedStyle(e);return t.display===`none`||t.visibility===`hidden`?!1:e.getClientRects().length>0}function p(e){let t=re.get(e);re.delete(e),de(t)&&t.focus({preventScroll:!0})}function m(e){let t=document.getElementById(e);return t?window.getComputedStyle(t).display!==`none`:!1}function fe(){for(let e of[`layer-placeholder`,`layer-docs-viewer`,`layer-resource-router`,`layer-sysmon`,`layer-beesim`,`layer-particle-lab`,`layer-docs-folder`,`layer-apps-folder`])if(m(e))return document.getElementById(e);return null}function pe(e){let t=[`a[href]`,`area[href]`,`button:not([disabled])`,`input:not([disabled]):not([type="hidden"])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`,`);return Array.from(e.querySelectorAll(t)).filter(e=>{if(e.hasAttribute(`hidden`))return!1;let t=window.getComputedStyle(e);return t.display===`none`||t.visibility===`hidden`?!1:e.getClientRects().length>0})}function me(e){if(e.key!==`Tab`)return!1;let t=fe();if(!t)return!1;let n=pe(t);if(n.length===0)return t.hasAttribute(`tabindex`)||t.setAttribute(`tabindex`,`-1`),t.focus(),e.preventDefault(),!0;let r=n[0],i=n[n.length-1],a=document.activeElement;return!t.contains(a)||!e.shiftKey&&a===i?(r.focus(),e.preventDefault(),!0):e.shiftKey&&a===r?(i.focus(),e.preventDefault(),!0):!1}function he(e){if(!me(e)&&e.key===`Escape`){if(h){Te(),e.preventDefault();return}if(m(`layer-placeholder`)){We(),e.preventDefault();return}if(m(`layer-docs-viewer`)&&typeof closeDocsViewer==`function`){closeDocsViewer(),e.preventDefault();return}if(m(`layer-resource-router`)&&typeof closeResourceRouter==`function`){closeResourceRouter(),e.preventDefault();return}if(m(`layer-sysmon`)){He(),e.preventDefault();return}if(m(`layer-beesim`)&&typeof closeBeeSim==`function`){closeBeeSim(),e.preventDefault();return}if(m(`layer-particle-lab`)&&typeof closeParticleLab==`function`){closeParticleLab(),e.preventDefault();return}if(m(`layer-docs-folder`)){ce(),e.preventDefault();return}m(`layer-apps-folder`)&&(oe(),e.preventDefault())}}var ge=[`BIOS Date 04/12/2077 14:32:01 Ver 7.0.4`,`CPU: Kiroshi Optic-Core 9.2GHz`,`Memory Test: 1048576K OK`,`Initializing Neural Interface...`,`Allocating Core Arena... [64MB OK]`,`Enforcing 64-Byte SIMD Alignment... [STRICT]`,`Initializing MPSC Job Queues... [LOCK-FREE]`,`Mounting VFS... [OK]`,`Loading Subroutines... [OK]`,`<span style='color:#eab308;font-weight:bold;'>HIVE PROTOCOL INITIATED.</span>`,`Deploying Swarm OS...`,`Initiating visual payload...`];function _e(){a.forEach(clearTimeout),a=[]}function ve(e,t){let n=setTimeout(e,t);return a.push(n),n}function ye(n){let a=e[n];a&&(t=n,document.documentElement.style.setProperty(`--primary`,a.ui),document.documentElement.style.setProperty(`--primary-dim`,a.uiDim),document.documentElement.style.setProperty(`--primary-border`,a.uiBorder),i&&r&&Le())}var be=!1;function xe(){be=!be,document.body.classList.toggle(`light-mode`,be);let e=document.getElementById(`mode-icon`);e&&(e.innerHTML=be?`&#9788;`:`&#9790;`)}var h=!1;function Se(){let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`);return e!=null&&e.value.length>0||t!=null&&t.value.length>0}function Ce(){if(h)return;let e=document.getElementById(`plab-controls`);e&&!e.classList.contains(`collapsed`)&&e.classList.add(`collapsed`);let t=document.getElementById(`beesim-controls`);t&&!t.classList.contains(`collapsed`)&&t.classList.add(`collapsed`);let n=document.getElementById(`bug-report-panel`),r=document.getElementById(`bug-report-btn`);n&&(n.style.display=`flex`,n.offsetHeight,n.classList.add(`open`),r&&r.classList.add(`active`),h=!0,g(`bug-report-title`,`bug-title-count`,60),g(`bug-report-desc`,`bug-desc-count`,250))}function we(){let e=document.getElementById(`bug-report-panel`),t=document.getElementById(`bug-report-btn`);if(!e)return;let n=e.querySelector(`.bug-report-confirm`);n&&n.remove(),e.classList.remove(`open`),t&&t.classList.remove(`active`),h=!1;let r=document.getElementById(`bug-report-title`),i=document.getElementById(`bug-report-desc`);r&&(r.value=``),i&&(i.value=``),g(`bug-report-title`,`bug-title-count`,60),g(`bug-report-desc`,`bug-desc-count`,250),setTimeout(()=>{h||(e.style.display=`none`)},350)}function Te(){Se()?Ee():we()}function Ee(){let e=document.getElementById(`bug-report-panel`);if(!e||e.querySelector(`.bug-report-confirm`))return;let t=document.createElement(`div`);t.className=`bug-report-confirm`,t.innerHTML=`
        <div class="bug-report-confirm-text">Discard unsaved changes?</div>
        <div class="bug-report-confirm-actions">
            <button type="button" class="plab-topbar-btn" id="bug-confirm-discard">DISCARD</button>
            <button type="button" class="plab-topbar-btn" id="bug-confirm-keep">KEEP EDITING</button>
        </div>
    `,e.appendChild(t),t.querySelector(`#bug-confirm-discard`).addEventListener(`click`,()=>{we()}),t.querySelector(`#bug-confirm-keep`).addEventListener(`click`,()=>{t.remove()})}function De(){!i||!r||(h?Te():Ce())}function g(e,t,n){let r=document.getElementById(e),i=document.getElementById(t);r&&i&&(i.textContent=r.value.length+` / `+n)}function Oe(){let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`);e&&e.addEventListener(`input`,()=>g(`bug-report-title`,`bug-title-count`,60)),t&&t.addEventListener(`input`,()=>g(`bug-report-desc`,`bug-desc-count`,250))}function ke(){let e=document.createElement(`canvas`),t=e.getContext(`webgl`)||e.getContext(`experimental-webgl`);if(!t)return`Unknown (WebGL unavailable)`;let n=t.getExtension(`WEBGL_debug_renderer_info`);return n?t.getParameter(n.UNMASKED_RENDERER_WEBGL)||`Unknown`:`Unknown (renderer info unavailable)`}async function Ae(){let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`),n=document.getElementById(`bug-report-send`),r=document.getElementById(`telemetry-toggle`);if(!e.value.trim()||!t.value.trim())return;n.textContent=`UPLINKING...`,n.disabled=!0;let i={title:e.value.trim(),description:t.value.trim(),engineVersion:`v7.0.4`,gpuInfo:r?.checked?ke():`Opt-out`};try{let n=await fetch(`/api/report-bug`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(i)});if(!n.ok)throw Error(`Uplink failed`);let r=await n.json();e.value=``,t.value=`╔══════════════════════════════════╗
║  BUG REPORT UPLINKED             ║
╠══════════════════════════════════╣
║  TICKET ID: `+r.id+`
║  STATUS: ACKNOWLEDGED            ║
║  ROUTE: SWARM CENTRAL            ║
╚══════════════════════════════════╝`,e.disabled=!0,t.disabled=!0}catch{t.value=`[ ERR :: UPLINK FAILED ]
> Bug report transmission interrupted.
> Please retry or contact your operator.`}finally{n.textContent=`SEND`,n.disabled=!1}}function je(e){n=e;let t=document.getElementById(`ice-status`),a=document.getElementById(`sentinel-status`),o=document.getElementById(`stealth-status`);t&&(t.textContent=`STANDBY`,t.className=`status-standby`),a&&(a.textContent=`STANDBY`,a.className=`status-standby`),o&&(o.textContent=`STANDBY`,o.className=`status-standby`),e===`iceburn`&&t?(t.textContent=`[ ACTIVE ]`,t.className=`status-iceburn-pulse`):e===`sentinel`&&a?(a.textContent=`[ ACTIVE ]`,a.className=`status-sentinel`):e===`ghost`&&o&&(o.textContent=`[ CLOAKED ]`,o.className=`status-ghost`),i&&r&&Le()}function Me(){i=!i,f&&f.setAttribute(`aria-pressed`,i?`true`:`false`),i?(f.classList.add(`on`),Pe()):(f.classList.remove(`on`),typeof closeParticleLab==`function`&&closeParticleLab(),typeof closeResourceRouter==`function`&&closeResourceRouter(),typeof closeBeeSim==`function`&&closeBeeSim(),typeof closeDocsViewer==`function`&&closeDocsViewer(),h&&we(),ce(),oe(),He(),We(),Ne())}function Ne(){_e(),r=!1,f&&f.setAttribute(`aria-pressed`,`false`),o.style.display=`flex`,s.style.display=`none`,c.style.display=`none`,l.style.display=`none`,d.classList.remove(`active`),u.innerHTML=``,ee.style.display=`none`,te.innerHTML=``,d.innerHTML=``,ne.style.display=`none`,document.getElementById(`protocol-selector`).value=`standby`,n=`standby`}function Pe(){o.style.display=`none`,s.style.display=`flex`,ve(()=>{ne.style.display=`block`},200);let e=600;ge.forEach((t,n)=>{ve(()=>{let e=document.createElement(`div`);e.innerHTML=t,u.appendChild(e),n===8&&(ee.style.display=`block`)},e),e+=250}),ve(()=>{s.style.display=`none`,Ie()},e+800)}function Fe(e,t,n,r,i,a,o){for(let s=0;s<t;s++){let t=document.createElement(`div`);t.className=`flame-shard`,t.style.backgroundColor=n,t.style.left=`${Math.random()*100}%`,t.style.width=`${2+Math.random()*10}%`,t.style.height=`${a+Math.random()*(o-a)}%`,t.style.zIndex=i,t.style.animationDuration=`${r+Math.random()}s`,t.style.animationDelay=`${Math.random()*2}s`,e.appendChild(t)}}function Ie(){c.style.display=`block`,te.innerHTML=``;for(let e=0;e<80;e++){let e=document.createElement(`div`);e.className=`bee`,e.style.top=`${Math.random()*100}%`,e.style.animationDuration=`${2+Math.random()*3}s, ${.1+Math.random()*.3}s`,e.style.animationDelay=`${Math.random()*3}s, 0s`,e.style.transform=`scale(${.5+Math.random()})`,te.appendChild(e)}ve(()=>{c.style.display=`none`,Re()},5e3)}function Le(){if(d.innerHTML=``,n===`iceburn`){let n=e[t].flames;Fe(d,20,n[0],1.5,1,60,100),Fe(d,25,n[1],1.2,2,40,80),Fe(d,30,n[2],.8,3,20,60),Fe(d,15,n[3],.5,4,10,40)}else if(n===`sentinel`)for(let e=0;e<20;e++){let e=document.createElement(`div`);e.className=`sentinel-dot`,e.style.left=`${5+Math.random()*90}%`,e.style.top=`${10+Math.random()*70}%`,e.style.animationDuration=`${.8+Math.random()*1.5}s`,e.style.animationDelay=`${Math.random()*2}s`,d.appendChild(e)}else if(n===`ghost`)for(let e=0;e<12;e++){let e=document.createElement(`div`);e.className=`ghost-bar`,e.style.top=`${Math.random()*100}%`,e.style.width=`${10+Math.random()*30}%`,e.style.animationDuration=`${1.5+Math.random()*3}s`,e.style.animationDelay=`${Math.random()*3}s`,d.appendChild(e)}else{let e=document.createElement(`div`);e.className=`mini-standby-label`,e.textContent=`STANDBY`,d.appendChild(e)}}function Re(){r=!0,l.style.display=`flex`,d.classList.add(`active`),je(n),Le()}setInterval(()=>{let e=document.getElementById(`sys-time`);e&&(e.innerText=`SYS.TIME: ${new Date().toLocaleTimeString()}`)},1e3);var _=null;function ze(e,t,n,r){let i=!1,a=[],o=(e,t)=>{let n=setTimeout(()=>{i||e()},t);return a.push(n),n};e.style.display=`flex`,t.innerHTML=``;let s=150;return n.forEach((e,r)=>{o(()=>{let i=document.createElement(`div`);if(i.textContent=e,i.classList.add(`visible`),t.appendChild(i),r===n.length-1){let e=document.createElement(`div`);e.className=`plab-load-bar`,t.appendChild(e)}},s),s+=250}),o(()=>{e.style.display=`none`,r()},s+600),()=>{i=!0,a.forEach(clearTimeout),a.length=0,e.style.display=`none`}}var Be=[`> EXEC sys_monitor.exe`,`> POLLING HARDWARE INTERFACES...`,`> LOADING PROCESS TABLE...`,`> SENSORS ONLINE.`];function Ve(){let e=document.getElementById(`layer-sysmon`),t=document.getElementById(`sysmon-loading`),r=document.getElementById(`sysmon-loading-text`),i=document.getElementById(`sysmon-app`);ue(`layer-sysmon`),e.style.display=`flex`,i.style.display=`none`,_&&=(_(),null),_=ze(t,r,Be,()=>{_=null,i.style.display=`flex`,je(n)})}function He(){_&&=(_(),null),document.getElementById(`layer-sysmon`).style.display=`none`,p(`layer-sysmon`)}function Ue(e){ue(`layer-placeholder`),document.getElementById(`placeholder-name`).textContent=e,document.getElementById(`layer-placeholder`).style.display=`block`}function We(){document.getElementById(`layer-placeholder`).style.display=`none`,p(`layer-placeholder`)}le(),Oe(),window.rememberFocusForLayer=ue,window.restoreFocusForLayer=p,window.changeTheme=ye,window.toggleLightMode=xe,window.changeProtocol=je,window.toggleBugReport=De,window.cancelBugReport=Te,window.closeSysMon=He,window.closeAppsFolder=oe,window.closeDocsFolder=ce,window.closePlaceholder=We,window.submitBugReport=Ae,document.getElementById(`bug-report-send`)?.addEventListener(`click`,Ae),window.appBootAnimation=ze,window.launchSysMon=Ve;var v=document.getElementById(`particleCanvas`),y=v.getContext(`2d`),Ge=document.getElementById(`plab-canvas-wrap`),Ke=document.getElementById(`layer-particle-lab`),qe=document.getElementById(`plab-loading`),Je=document.getElementById(`plab-loading-text`),Ye=document.getElementById(`plab-app`),b={mode:`plexus`,amount:150,size:3,speed:1.5,gravity:0,repelStrength:1.5,trails:0,shape:`circle`,colormode:`solid`,color:`#00ffcc`},x=[],S=100,C=100,Xe=!1,w=null,T=null,Ze=320,Qe=320,E={x:-1e3,y:-1e3,leftDown:!1,rightDown:!1,attractRadius:150};v.addEventListener(`mousedown`,e=>{e.button===0&&(E.leftDown=!0),e.button===2&&(E.rightDown=!0)}),v.addEventListener(`mouseup`,e=>{e.button===0&&(E.leftDown=!1),e.button===2&&(E.rightDown=!1)}),v.addEventListener(`mousemove`,e=>{let t=v.getBoundingClientRect();E.x=e.clientX-t.left,E.y=e.clientY-t.top}),v.addEventListener(`mouseleave`,()=>{E.leftDown=!1,E.rightDown=!1,E.x=-1e3}),v.addEventListener(`contextmenu`,e=>e.preventDefault());function $e(){S=Ge.clientWidth,C=Ge.clientHeight,v.width=S,v.height=C}function D(e,t){return Math.random()*(t-e)+e}var et=[`#00ffcc`,`#ff00ff`,`#00ff00`,`#ffff00`,`#ff3300`,`#0066ff`];function tt(){return et[Math.floor(Math.random()*et.length)]}function nt(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:{r:0,g:255,b:204}}var rt=class{x;y;vx;vy;baseColor;da;ds;w;constructor(e,t,n){this.x=e||D(0,S),this.y=t||D(0,C);let r=D(0,Math.PI*2),i=n?D(b.speed*2,b.speed*5):D(b.speed*.2,b.speed);this.vx=Math.cos(r)*i,this.vy=Math.sin(r)*i,this.baseColor=tt(),this.da=D(0,Math.PI*2),this.ds=D(.02,.05),this.w=D(.5,1.5)}update(){if(E.leftDown||E.rightDown){let e=E.x-this.x,t=E.y-this.y,n=Math.sqrt(e*e+t*t),r=Math.atan2(t,e);if(E.leftDown&&n<150){let e=(150-n)/150;this.vx-=Math.cos(r)*e*b.repelStrength,this.vy-=Math.sin(r)*e*b.repelStrength}if(E.rightDown&&n<E.attractRadius){let e=(E.attractRadius-n)/E.attractRadius;this.vx+=Math.cos(r)*e*.8,this.vy+=Math.sin(r)*e*.8}}if(b.mode===`snow`)this.y+=b.speed*.5*this.w+b.gravity,this.x+=Math.sin(this.da)*(b.speed*.5),this.da+=this.ds,this.y>C+b.size?(this.y=-b.size,this.x=D(0,S)):this.y<-b.size&&b.gravity<0&&(this.y=C+b.size,this.x=D(0,S)),this.x>S+b.size&&(this.x=-b.size),this.x<-b.size&&(this.x=S+b.size);else if(b.mode===`vortex`){let e=S/2,t=C/2,n=e-this.x,r=t-this.y,i=Math.sqrt(n*n+r*r),a=Math.atan2(r,n),o=a+Math.PI/2,s=b.gravity,c=b.speed*1.5,l=Math.cos(o)*c+Math.cos(a)*s*5,u=Math.sin(o)*c+Math.sin(a)*s*5;if(this.vx+=(l-this.vx)*.05,this.vy+=(u-this.vy)*.05,this.x+=this.vx,this.y+=this.vy,i<10&&s>0){let n=D(0,Math.PI*2),r=Math.max(S,C)/1.5;this.x=e+Math.cos(n)*r,this.y=t+Math.sin(n)*r}else if(i>Math.max(S,C)&&s<0){let n=D(0,Math.PI*2);this.x=e+Math.cos(n)*20,this.y=t+Math.sin(n)*20}}else if(b.mode===`liquid`){this.vy+=b.gravity,this.x+=this.vx,this.y+=this.vy;let e=x.length>Ze?Math.ceil(x.length/Ze):1;for(let t=0;t<x.length;t+=e){let e=x[t];if(e===this)continue;let n=e.x-this.x,r=e.y-this.y,i=Math.sqrt(n*n+r*r);if(i<b.size*4&&i>0)if(i<b.size*2){let e=(b.size*2-i)*.05;this.vx-=n/i*e,this.vy-=r/i*e}else{let e=(i-b.size*2)*.005;this.vx+=n/i*e,this.vy+=r/i*e}}this.vx*=.98,this.vy*=.99,this.x<0&&(this.x=0,this.vx*=-.5),this.x>S&&(this.x=S,this.vx*=-.5),this.y<0&&(this.y=0,this.vy*=-.5),this.y>C&&(this.y=C,this.vy*=-.3,this.vx*=.8)}else{this.vy+=b.gravity,this.x+=this.vx,this.y+=this.vy;let e=Math.sqrt(this.vx*this.vx+this.vy*this.vy);e>b.speed*2&&b.gravity===0&&!E.leftDown&&!E.rightDown?(this.vx*=.95,this.vy*=.95):e<b.speed*.5&&b.gravity===0&&b.speed>0&&(this.vx*=1.05,this.vy*=1.05),this.x<0&&(this.x=0,this.vx*=-1),this.x>S&&(this.x=S,this.vx*=-1),this.y<0&&(this.y=0,this.vy*=-1),this.y>C&&(this.y=C,this.vy*=-.8,b.gravity>0&&(this.vx*=.98))}}draw(){let e=b.color,t=Math.sqrt(this.vx*this.vx+this.vy*this.vy);if(b.colormode===`random`)e=this.baseColor;else if(b.colormode===`velocity`){let n=b.mode===`snow`?b.speed*.5*this.w:t;e=`hsl(${Math.min(280,n*25)},100%,50%)`}y.fillStyle=e,y.beginPath();let n=b.size;if(b.shape===`square`)y.rect(this.x-n/2,this.y-n/2,n,n);else if(b.shape===`circle`)y.arc(this.x,this.y,n/2,0,Math.PI*2);else if(b.shape===`triangle`){let e=Math.atan2(this.vy,this.vx);y.translate(this.x,this.y),y.rotate(e),y.moveTo(n,0),y.lineTo(-n/2,n/2),y.lineTo(-n/2,-n/2),y.rotate(-e),y.translate(-this.x,-this.y)}else if(b.shape===`star`){let e=n,t=n/2,r=Math.PI/2*3,i=Math.PI/5;y.moveTo(this.x,this.y-e);for(let n=0;n<5;n++)y.lineTo(this.x+Math.cos(r)*e,this.y+Math.sin(r)*e),r+=i,y.lineTo(this.x+Math.cos(r)*t,this.y+Math.sin(r)*t),r+=i}y.fill()}};function it(){for(;x.length<b.amount;)x.push(new rt);x.length>b.amount&&x.splice(b.amount)}function at(){if(!Xe)return;E.rightDown?E.attractRadius=Math.min(E.attractRadius+5,Math.max(S,C)):E.attractRadius=150;let e=1-b.trails;e<.01&&(e=.01),y.fillStyle=`rgba(0,0,0,${e})`,y.fillRect(0,0,S,C);for(let e=0;e<x.length;e++)x[e].update(),x[e].draw();if(b.mode===`plexus`){let e=nt(b.color),t=x.length>Qe?Math.ceil(x.length/Qe):1;for(let n=0;n<x.length;n+=t)for(let r=n+t;r<x.length;r+=t){let t=x[n].x-x[r].x,i=x[n].y-x[r].y,a=Math.sqrt(t*t+i*i);a<120&&(y.beginPath(),y.strokeStyle=`rgba(${e.r},${e.g},${e.b},${1-a/120})`,y.lineWidth=1,y.moveTo(x[n].x,x[n].y),y.lineTo(x[r].x,x[r].y),y.stroke())}}w=requestAnimationFrame(at)}function O(e,t,n){let r=document.getElementById(`ctrl-${e}`),i=document.getElementById(`val-${e}`);r.addEventListener(`input`,()=>{b[t]=n?parseFloat(r.value):parseInt(r.value),i&&(i.textContent=String(b[t])),t===`amount`&&it()})}O(`amount`,`amount`),O(`size`,`size`),O(`speed`,`speed`,!0),O(`gravity`,`gravity`,!0),O(`trails`,`trails`,!0),O(`repel`,`repelStrength`,!0),document.getElementById(`ctrl-shape`).addEventListener(`change`,e=>{b.shape=e.target.value}),document.getElementById(`ctrl-colormode`).addEventListener(`change`,e=>{b.colormode=e.target.value,document.getElementById(`solid-color-group`).style.display=b.colormode===`solid`?`flex`:`none`}),document.getElementById(`ctrl-color`).addEventListener(`input`,e=>{b.color=e.target.value}),document.getElementById(`btn-explode`).addEventListener(`click`,()=>{let e=S/2,t=C/2;x.forEach(n=>{n.x=e,n.y=t;let r=D(0,Math.PI*2),i=D(5,20);n.vx=Math.cos(r)*i,n.vy=Math.sin(r)*i})});var k=document.getElementById(`btn-snow`),A=document.getElementById(`btn-vortex`),j=document.getElementById(`btn-plexus`),M=document.getElementById(`btn-liquid`);function N(e,t,n){b[e]=t;let r=document.getElementById(`ctrl-${e}`);if(r&&(r.value=String(t)),n!=null){let t=document.getElementById(`val-${e}`);t&&(t.textContent=String(n))}e===`amount`&&it()}function ot(e){b.mode=e,k.classList.remove(`active`),k.textContent=`Snow`,A.classList.remove(`active`),A.textContent=`Vortex`,j.classList.remove(`active`),j.textContent=`Plexus`,M.classList.remove(`active`),M.textContent=`Liquid`,v.classList.remove(`gooey-effect`);let t=document.getElementById(`ctrl-size`);t&&(t.disabled=!1);let n=document.getElementById(`ctrl-shape`),r=document.getElementById(`ctrl-colormode`),i=document.getElementById(`ctrl-color`),a=document.getElementById(`solid-color-group`);e===`snow`?(k.classList.add(`active`),k.textContent=`✓ Snow`,N(`shape`,`circle`),n.value=`circle`,N(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,N(`color`,`#ffffff`),i.value=`#ffffff`,N(`gravity`,0,`0`),N(`speed`,3,`3`),N(`trails`,.5,`0.5`)):e===`vortex`?(A.classList.add(`active`),A.textContent=`✓ Vortex`,N(`shape`,`triangle`),n.value=`triangle`,N(`colormode`,`velocity`),r.value=`velocity`,a.style.display=`none`,N(`gravity`,.5,`0.5`),N(`speed`,6,`6`),N(`trails`,.9,`0.9`)):e===`plexus`?(j.classList.add(`active`),j.textContent=`✓ Plexus`,N(`amount`,150,`150`),N(`shape`,`circle`),n.value=`circle`,N(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,N(`color`,`#00ffcc`),i.value=`#00ffcc`,N(`gravity`,0,`0`),N(`speed`,1.5,`1.5`),N(`trails`,0,`0`)):e===`liquid`?(M.classList.add(`active`),M.textContent=`✓ Liquid`,v.classList.add(`gooey-effect`),N(`amount`,100,`100`),N(`size`,20,`20`),N(`shape`,`circle`),n.value=`circle`,N(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,N(`color`,`#00aaff`),i.value=`#00aaff`,N(`gravity`,.5,`0.5`),N(`speed`,2,`2`),N(`trails`,0,`0`),t&&(t.disabled=!0)):(N(`shape`,`circle`),n.value=`circle`,N(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,N(`color`,`#00ffcc`),i.value=`#00ffcc`,N(`gravity`,0,`0`),N(`speed`,1.5,`1.5`),N(`trails`,0,`0`),N(`amount`,150,`150`),x.forEach(e=>{let t=D(0,Math.PI*2),n=D(b.speed*.2,b.speed);e.vx=Math.cos(t)*n,e.vy=Math.sin(t)*n}))}k.addEventListener(`click`,()=>ot(b.mode===`snow`?`normal`:`snow`)),A.addEventListener(`click`,()=>ot(b.mode===`vortex`?`normal`:`vortex`)),j.addEventListener(`click`,()=>ot(b.mode===`plexus`?`normal`:`plexus`)),M.addEventListener(`click`,()=>ot(b.mode===`liquid`?`normal`:`liquid`));var st=[],ct=document.getElementById(`ctrl-presets`);document.getElementById(`btn-save-preset`).addEventListener(`click`,()=>{st.push(JSON.parse(JSON.stringify(b)));let e=st.length-1;st.length===1&&(ct.innerHTML=``);let t=document.createElement(`option`);t.value=String(e),t.textContent=`Preset ${e+1}`,ct.appendChild(t),ct.value=String(e);let n=document.getElementById(`btn-save-preset`),r=n.textContent;n.textContent=`Saved!`,setTimeout(()=>n.textContent=r,1e3)}),document.getElementById(`btn-load-preset`).addEventListener(`click`,()=>{let e=parseInt(ct.value);e>=0&&st[e]&&(Object.assign(b,JSON.parse(JSON.stringify(st[e]))),N(`amount`,b.amount,b.amount),N(`size`,b.size,b.size),N(`speed`,b.speed,b.speed),N(`gravity`,b.gravity,b.gravity),N(`repel`,b.repelStrength,b.repelStrength),N(`trails`,b.trails,b.trails),document.getElementById(`ctrl-shape`).value=b.shape,document.getElementById(`ctrl-colormode`).value=b.colormode,document.getElementById(`ctrl-color`).value=b.color,document.getElementById(`solid-color-group`).style.display=b.colormode===`solid`?`flex`:`none`,[[`snow`,k],[`vortex`,A],[`plexus`,j],[`liquid`,M]].forEach(([e,t])=>{t.classList.toggle(`active`,b.mode===e),t.textContent=b.mode===e?`\u2713 ${e[0].toUpperCase()+e.slice(1)}`:e[0].toUpperCase()+e.slice(1)}),b.mode===`liquid`?(v.classList.add(`gooey-effect`),b.size=20,N(`size`,20,`20`),document.getElementById(`ctrl-size`).disabled=!0):(v.classList.remove(`gooey-effect`),document.getElementById(`ctrl-size`).disabled=!1))});var lt=[`> EXEC particle_lab.exe`,`> LOADING RENDER ENGINE... [OK]`,`> ALLOCATING PARTICLE BUFFER...`,`> LINKING PHYSICS SUBSYSTEM...`,`> DISPLAY READY.`];function ut(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-particle-lab`),Ke.style.display=`flex`,Ye.style.display=`none`,T&&=(T(),null),T=appBootAnimation(qe,Je,lt,()=>{T=null,Ye.style.display=`flex`,Xe=!0,b.mode===`liquid`&&v.classList.add(`gooey-effect`),requestAnimationFrame(()=>{$e(),it(),at()})})}function dt(){T&&=(T(),null),Xe=!1,w&&cancelAnimationFrame(w),w=null,Ke.style.display=`none`,v.classList.remove(`gooey-effect`),typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-particle-lab`)}function ft(){document.getElementById(`plab-controls`).classList.toggle(`collapsed`)}window.addEventListener(`resize`,()=>{Xe&&$e()}),document.addEventListener(`visibilitychange`,()=>{if(Xe){if(document.hidden){w&&cancelAnimationFrame(w),w=null;return}w||at()}}),window.launchParticleLab=ut,window.closeParticleLab=dt,window.togglePlabControls=ft;var P=null,pt=[`> EXEC resource_router.exe`,`> CONNECTING TO GLOBAL NETWORK...`,`> NO ROUTES CONFIGURED.`,`> AWAITING OPERATOR INPUT.`];function mt(){let e=document.getElementById(`layer-resource-router`),t=document.getElementById(`router-loading`),n=document.getElementById(`router-loading-text`),r=document.getElementById(`router-app`);typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-resource-router`),e.style.display=`flex`,r.style.display=`none`,P&&=(P(),null),P=appBootAnimation(t,n,pt,()=>{P=null,r.style.display=`flex`})}function ht(){P&&=(P(),null),document.getElementById(`layer-resource-router`).style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-resource-router`)}window.launchResourceRouter=mt,window.closeResourceRouter=ht;var F=document.getElementById(`beeSimCanvas`),I=F.getContext(`2d`),gt=document.getElementById(`beesim-canvas-wrap`),_t=document.getElementById(`layer-beesim`),vt=document.getElementById(`beesim-app`),yt=document.getElementById(`beesim-loading`),bt=document.getElementById(`beesim-loading-text`),xt=!1,L=null,R=null,St=75,z=13,B=5,Ct=Math.PI*.75,wt=4,V,H,U={};[`bee-cohesion`,`bee-alignment`,`bee-separation`,`bee-speed`,`bee-vision`].forEach(e=>{let t=document.getElementById(e),n=document.getElementById(e+`Val`),r=e.replace(`bee-`,``);U[r]={el:t,get value(){return+t.value}},t.addEventListener(`input`,()=>{n.textContent=t.value})});var Tt=document.getElementById(`bee-showVision`),W={x:-9999,y:-9999,active:!1,repel:!1};F.addEventListener(`mousemove`,e=>{let t=F.getBoundingClientRect();W.x=e.clientX-t.left,W.y=e.clientY-t.top}),F.addEventListener(`mousedown`,e=>{e.preventDefault(),W.active=!0,W.repel=e.button===2}),F.addEventListener(`mouseup`,()=>{W.active=!1}),F.addEventListener(`contextmenu`,e=>e.preventDefault()),F.addEventListener(`touchstart`,e=>{let t=e.touches[0],n=F.getBoundingClientRect();W.x=t.clientX-n.left,W.y=t.clientY-n.top,W.active=!0},{passive:!0}),F.addEventListener(`touchmove`,e=>{let t=e.touches[0],n=F.getBoundingClientRect();W.x=t.clientX-n.left,W.y=t.clientY-n.top},{passive:!0}),F.addEventListener(`touchend`,()=>{W.active=!1});function Et(e,t){let n=e.x-t.x,r=e.y-t.y;return n*n+r*r}function Dt(e,t){return Math.sqrt(Et(e,t))}var G=[];function Ot(e,t,n){G.length>400||G.push({x:e,y:t,vx:(Math.random()-.5)*1.5,vy:-Math.random()*1.2-.3,life:20+Math.random()*25,maxLife:45,size:1+Math.random()*2,type:n})}function kt(){for(let e=G.length-1;e>=0;e--){let t=G[e];t.x+=t.vx,t.y+=t.vy,t.vy-=.01,t.vx*=.98,--t.life<=0&&G.splice(e,1)}}function At(){for(let e of G){let t=e.life/e.maxLife;I.fillStyle=e.type===`honey`?`rgba(255,180,40,${t*.8})`:`rgba(255,220,60,${t*.7})`,I.beginPath(),I.arc(e.x,e.y,e.size*t,0,Math.PI*2),I.fill()}}var K=[],q={x:0,y:0},jt=0;function Mt(){K=[];for(let e=-B;e<=B;e++){let t=Math.max(-B,-e-B),n=Math.min(B,-e+B);for(let r=t;r<=n;r++)K.push({q:e,r,x:0,y:0,beeIndex:-1,honey:0})}K.sort((e,t)=>e.q*e.q+e.r*e.r+e.q*e.r-(t.q*t.q+t.r*t.r+t.q*t.r));for(let e=St;e<K.length;e++)K[e].honey=.4+Math.random()*.6}function Nt(){let e=z*B*1.8;V<600?(q.x=V/2,q.y=e+20):(q.x=V-e-35,q.y=e+45);for(let e of K)e.x=q.x+z*1.5*e.q,e.y=q.y+z*(Math.sqrt(3)/2*e.q+Math.sqrt(3)*e.r)}function Pt(e,t,n){I.beginPath();for(let r=0;r<6;r++){let i=Math.PI/3*r,a=e+n*Math.cos(i),o=t+n*Math.sin(i);r===0?I.moveTo(a,o):I.lineTo(a,o)}I.closePath()}function Ft(e){let t=z*(B+3)*1.7,n=I.createRadialGradient(q.x,q.y,t*.15,q.x,q.y,t);n.addColorStop(0,`rgba(255,170,40,0.12)`),n.addColorStop(.6,`rgba(255,140,20,0.04)`),n.addColorStop(1,`rgba(255,140,20,0)`),I.fillStyle=n,I.beginPath(),I.arc(q.x,q.y,t,0,Math.PI*2),I.fill(),jt=0;for(let t=0;t<K.length;t++){let n=K[t];jt+=n.honey;let r=n.beeIndex>=0?Y[n.beeIndex]:null,i=r&&r.state===`sleeping`;if(Pt(n.x,n.y,z-1.5),i)I.fillStyle=`rgba(50,35,8,0.95)`;else{let e=n.honey;I.fillStyle=`rgba(${Math.floor(38+e*185)},${Math.floor(26+e*135)},${Math.floor(8+e*28)},0.9)`}I.fill(),n.honey>.15&&!i&&(Pt(n.x-1.5,n.y-1.5,z*.4*n.honey),I.fillStyle=`rgba(255,235,140,${.06+n.honey*.12})`,I.fill()),n.honey>.85&&(Pt(n.x,n.y,z-2.5),I.fillStyle=`rgba(255,245,180,${.04+Math.sin(e*.05+t)*.025})`,I.fill()),Pt(n.x,n.y,z-.5),I.strokeStyle=`rgba(210,170,60,${.35+n.honey*.2})`,I.lineWidth=1.3,I.stroke(),i&&It(n.x,n.y,r,e)}let r=Y.filter(e=>e.state===`sleeping`).length,i=Y.filter(e=>e.state===`collecting`).length,a=Y.filter(e=>e.state===`returning`).length,o=St-r-i-a;I.fillStyle=`rgba(240,220,140,0.55)`,I.font=`11px Segoe UI, sans-serif`,I.textAlign=`center`;let s=q.y+z*B*Math.sqrt(3)+18;I.fillText(`Honey: ${jt.toFixed(1)} · Flying ${o} · Collecting ${i} · Returning ${a} · Sleeping ${r}`,q.x,s)}function It(e,t,n,r){I.save(),I.translate(e,t);let i=I.createLinearGradient(-4,0,4,0);i.addColorStop(0,`#b8860b`),i.addColorStop(.4,`#ffd700`),i.addColorStop(.55,`#2a1800`),i.addColorStop(.7,`#ffd700`),i.addColorStop(1,`#daa520`),I.beginPath(),I.ellipse(0,0,5,3.2,0,0,Math.PI*2),I.fillStyle=i,I.fill(),I.globalAlpha=.25,I.fillStyle=`rgba(190,210,255,1)`,I.beginPath(),I.ellipse(-1,-3,3,1.8,-.3,0,Math.PI*2),I.fill(),I.beginPath(),I.ellipse(-1,3,3,1.8,.3,0,Math.PI*2),I.fill(),I.globalAlpha=1,n.cargo>0&&(I.fillStyle=`rgba(255,200,40,0.6)`,I.beginPath(),I.ellipse(-1,-4.5,2,1.4,0,0,Math.PI*2),I.fill(),I.beginPath(),I.ellipse(-1,4.5,2,1.4,0,0,Math.PI*2),I.fill());let a=n.sleepTimer||0;I.fillStyle=`rgba(180,190,255,${.3+.25*Math.sin(a*.06)})`,I.font=`bold 8px sans-serif`,I.textAlign=`left`;let o=-6-Math.sin(a*.04)*2;I.fillText(`z`,3,o),I.font=`bold 6px sans-serif`,I.fillText(`z`,7,o-5);let s=n.stamina/n.maxStamina;I.beginPath(),I.arc(0,0,7,-Math.PI/2,-Math.PI/2+Math.PI*2*s),I.strokeStyle=`rgba(120,255,120,${.2+s*.15})`,I.lineWidth=1.2,I.stroke(),I.restore()}var J=[];function Lt(){J=[];let e=Math.max(7,Math.min(14,Math.floor(V*H/75e3)));for(let t=0;t<e;t++){let e,t,n=0;do e=40+Math.random()*(V-80),t=60+Math.random()*(H-120),n++;while(n<60&&Dt({x:e,y:t},q)<z*B*3);let r=5+Math.random()*5;J.push({x:e,y:t,nectar:r*(.4+Math.random()*.6),maxNectar:r,regen:.0025+Math.random()*.002,size:14+Math.random()*10,hue:[45,340,300,25,15,55,195][Math.floor(Math.random()*7)],petals:5+Math.floor(Math.random()*4),phase:Math.random()*Math.PI*2})}}function Rt(){for(let e of J)e.nectar<e.maxNectar&&(e.nectar=Math.min(e.maxNectar,e.nectar+e.regen))}function zt(e){for(let t of J){let n=t.nectar/t.maxNectar;if(I.save(),I.translate(t.x,t.y),I.rotate(Math.sin(e*.015+t.phase)*.04),n>.05){let e=t.size*2+n*t.size,r=I.createRadialGradient(0,0,2,0,0,e);r.addColorStop(0,`hsla(${t.hue},80%,60%,${n*.07})`),r.addColorStop(1,`hsla(${t.hue},80%,60%,0)`),I.fillStyle=r,I.beginPath(),I.arc(0,0,e,0,Math.PI*2),I.fill()}I.beginPath(),I.moveTo(0,t.size*.3),I.quadraticCurveTo(2,t.size*1.2,0,t.size*2),I.strokeStyle=`rgba(60,130,40,${.2+n*.2})`,I.lineWidth=2,I.stroke(),I.save(),I.translate(1,t.size*1.1),I.rotate(.3),I.beginPath(),I.ellipse(6,0,7,3,.2,0,Math.PI*2),I.fillStyle=`rgba(50,120,35,${.15+n*.1})`,I.fill(),I.restore();let r=t.size*(.38+n*.15),i=.18+n*.38;for(let a=0;a<t.petals;a++)I.save(),I.rotate(Math.PI*2/t.petals*a+Math.sin(e*.02+t.phase)*.02),I.beginPath(),I.ellipse(t.size*.55,0,r,r*.48,0,0,Math.PI*2),I.fillStyle=`hsla(${t.hue},75%,${48+n*15}%,${i})`,I.fill(),I.strokeStyle=`hsla(${t.hue},60%,38%,${i*.4})`,I.lineWidth=.5,I.stroke(),I.restore();I.beginPath(),I.arc(0,0,t.size*.25,0,Math.PI*2);let a=I.createRadialGradient(0,0,0,0,0,t.size*.25);a.addColorStop(0,`rgba(255,220,60,${.35+n*.35})`),a.addColorStop(1,`rgba(200,160,40,${.25+n*.25})`),I.fillStyle=a,I.fill(),I.beginPath(),I.arc(0,0,t.size*.35,-Math.PI/2,-Math.PI/2+Math.PI*2*n),I.strokeStyle=`rgba(255,230,100,${.15+n*.4})`,I.lineWidth=2,I.stroke(),I.restore()}}var Bt=class{index;x;y;vx;vy;wingPhase;wobble;stamina;maxStamina;drainRate;rechargeRate;tiredAt;wakeAt;state;cellIndex;sleepTimer;cargo;targetFlower;collectTimer;collectDuration;constructor(e){this.index=e,this.x=100+Math.random()*400,this.y=100+Math.random()*300;let t=Math.random()*Math.PI*2;this.vx=Math.cos(t)*2,this.vy=Math.sin(t)*2,this.wingPhase=Math.random()*Math.PI*2,this.wobble=Math.random()*Math.PI*2,this.stamina=50+Math.random()*50,this.maxStamina=100,this.drainRate=.02+Math.random()*.022,this.rechargeRate=.16+Math.random()*.1,this.tiredAt=15+Math.random()*10,this.wakeAt=82+Math.random()*18,this.state=`foraging`,this.cellIndex=-1,this.sleepTimer=0,this.cargo=0,this.targetFlower=null,this.collectTimer=0,this.collectDuration=65+Math.random()*50}get cell(){return this.cellIndex>=0?K[this.cellIndex]:null}canSee(e){let t=e.x-this.x,n=e.y-this.y,r=t*t+n*n,i=U.vision.value;if(r>i*i||r<.01)return!1;let a=Math.atan2(this.vy,this.vx),o=Math.atan2(n,t)-a;return o>Math.PI&&(o-=Math.PI*2),o<-Math.PI&&(o+=Math.PI*2),Math.abs(o)<Ct}update(e,t){if(this.state===`sleeping`){if(this.sleepTimer++,this.stamina=Math.min(this.maxStamina,this.stamina+this.rechargeRate),this.cargo>0){let e=Math.min(this.cargo,.008);this.cargo-=e;let n=this.cell;if(n&&(n.honey=Math.min(1,n.honey+e*.85)),this.cargo<.01&&(this.cargo=0,t%12==0)){let e=this.cell;e&&Ot(e.x+(Math.random()-.5)*6,e.y+(Math.random()-.5)*6,`honey`)}}if(this.stamina>=this.wakeAt&&this.cargo<=0){this.state=`foraging`;let e=this.cell;if(e){this.x=e.x,this.y=e.y;let t=Math.atan2(e.y-q.y,e.x-q.x)+(Math.random()-.5)*1;this.vx=Math.cos(t)*3,this.vy=Math.sin(t)*3}this.targetFlower=null}return}let n=U.speed.value/15;if(this.state===`collecting`){if(this.collectTimer--,this.stamina-=this.drainRate*.2,this.targetFlower){let e=this.targetFlower;this.x+=(e.x-this.x)*.1,this.y+=(e.y-this.y)*.1,this.x+=Math.sin(t*.08+this.index*2.3)*.7,this.y+=Math.cos(t*.08+this.index*2.3)*.7,t%7==0&&Ot(this.x+(Math.random()-.5)*8,this.y+(Math.random()-.5)*8,`pollen`)}if(this.collectTimer<=0||this.stamina<=this.tiredAt*.5){if(this.targetFlower&&this.targetFlower.nectar>.05){let e=Math.min(1,this.targetFlower.nectar);this.cargo=e,this.targetFlower.nectar-=e}this.state=`returning`,this.targetFlower=null;let e=this.cell;if(e){let t=e.x-this.x,r=e.y-this.y,i=Math.sqrt(t*t+r*r)||1;this.vx=t/i*n,this.vy=r/i*n}}this.wingPhase+=.25;return}if(this.state===`foraging`)if(this.stamina-=this.drainRate,this.stamina<=this.tiredAt)this.state=`returning`,this.targetFlower=null;else{this.applyBoids(e),this.applyMouse(),this.seekFlower();for(let t of J)if(!(t.nectar<.3)&&Dt(this,t)<18){let n=0;for(let r of e)r.state===`collecting`&&r.targetFlower===t&&n++;if(n<wt){this.state=`collecting`,this.targetFlower=t,this.collectTimer=this.collectDuration;break}}}if(this.state===`returning`){this.stamina-=this.drainRate*.35;let t=this.cell;if(t){let e=t.x-this.x,n=t.y-this.y,r=Math.sqrt(e*e+n*n);if(r<8){if(this.cargo>0)for(let e=0;e<3;e++)Ot(t.x+(Math.random()-.5)*8,t.y+(Math.random()-.5)*8,`honey`);this.state=`sleeping`,this.x=t.x,this.y=t.y,this.vx=0,this.vy=0,this.sleepTimer=0;return}this.vx+=e/r*.5,this.vy+=n/r*.5}this.applySep(e,.3)}let r=.3;this.x<40&&(this.vx+=r),this.x>V-40&&(this.vx-=r),this.y<40&&(this.vy+=r),this.y>H-40&&(this.vy-=r),this.wobble+=.08;let i=this.state===`returning`?.015:.04;this.vx+=Math.sin(this.wobble)*i,this.vy+=Math.cos(this.wobble*1.3)*i;let a=Math.sqrt(this.vx*this.vx+this.vy*this.vy),o=this.state===`returning`?n*1.25:n;a>o?(this.vx=this.vx/a*o,this.vy=this.vy/a*o):a<o*.2&&a>.01&&(this.vx=this.vx/a*o*.2,this.vy=this.vy/a*o*.2),this.x+=this.vx,this.y+=this.vy,this.wingPhase+=.5,this.stamina=Math.max(0,this.stamina)}seekFlower(){let e=null,t=-1/0;for(let n of J){if(n.nectar<.4)continue;let r=Dt(this,n);if(r>600)continue;let i=n.nectar/n.maxNectar*.6-r/500;i>t&&(t=i,e=n)}if(e){this.targetFlower=e;let t=e.x-this.x,n=e.y-this.y,r=Math.sqrt(t*t+n*n)||1;this.vx+=t/r*.13,this.vy+=n/r*.13}}applyBoids(e){let t=U.cohesion.value/1e3,n=U.alignment.value/1e3,r=U.separation.value/100,i=0,a=0,o=0,s=0,c=0,l=0,u=0;for(let t of e){if(t===this||t.state===`sleeping`||t.state===`collecting`||!this.canSee(t))continue;let e=t.x-this.x,n=t.y-this.y,r=Math.sqrt(e*e+n*n);u++,i+=t.x,a+=t.y,o+=t.vx,s+=t.vy,r<28&&r>.01&&(c-=e/r*(28-r),l-=n/r*(28-r))}u>0&&(this.vx+=(i/u-this.x)*t,this.vy+=(a/u-this.y)*t,this.vx+=(o/u-this.vx)*n,this.vy+=(s/u-this.vy)*n,this.vx+=c*r,this.vy+=l*r)}applySep(e,t){let n=U.separation.value/100*t,r=0,i=0;for(let t of e){if(t===this||t.state===`sleeping`)continue;let e=t.x-this.x,n=t.y-this.y,a=Math.sqrt(e*e+n*n);a<24&&a>.01&&(r-=e/a*(24-a),i-=n/a*(24-a))}this.vx+=r*n,this.vy+=i*n}applyMouse(){if(!W.active)return;let e=W.x-this.x,t=W.y-this.y,n=Math.sqrt(e*e+t*t);if(n<200&&n>1){let r=W.repel?-.9:.35;this.vx+=e/n*r,this.vy+=t/n*r}}draw(e){if(this.state===`sleeping`)return;let t=Math.atan2(this.vy,this.vx);Tt.checked&&this.state===`foraging`&&(I.save(),I.translate(this.x,this.y),I.rotate(t),I.beginPath(),I.moveTo(0,0),I.arc(0,0,U.vision.value,-Ct,Ct),I.closePath(),I.fillStyle=`rgba(240,230,140,0.03)`,I.fill(),I.restore()),I.save(),I.translate(this.x,this.y),this.state===`collecting`?I.rotate(t+Math.sin(e*.12)*.3):I.rotate(t);let n=Math.sin(this.wingPhase)*.5;I.fillStyle=`rgba(200,220,255,0.4)`,I.strokeStyle=`rgba(180,200,240,0.4)`,I.lineWidth=.4,I.beginPath(),I.ellipse(-2,-5,4,7,n-.3,0,Math.PI*2),I.fill(),I.stroke(),I.beginPath(),I.ellipse(-2,5,4,7,-n+.3,0,Math.PI*2),I.fill(),I.stroke();let r=I.createLinearGradient(-9,0,3,0);r.addColorStop(0,`#b8860b`),r.addColorStop(.3,`#ffd700`),r.addColorStop(.5,`#1a1000`),r.addColorStop(.7,`#ffd700`),r.addColorStop(1,`#daa520`),I.beginPath(),I.ellipse(-3,0,6,4,0,0,Math.PI*2),I.fillStyle=r,I.fill(),I.strokeStyle=`rgba(100,70,0,0.5)`,I.lineWidth=.4,I.stroke(),I.strokeStyle=`rgba(30,15,0,0.5)`,I.lineWidth=1.1;for(let e=-2;e<=3;e+=2.5)I.beginPath(),I.moveTo(-3+e,-3.5),I.lineTo(-3+e,3.5),I.stroke();if(I.beginPath(),I.ellipse(5,0,3,2.8,0,0,Math.PI*2),I.fillStyle=`#daa520`,I.fill(),I.fillStyle=`#1a1000`,I.beginPath(),I.arc(6.5,-1.5,1,0,Math.PI*2),I.fill(),I.beginPath(),I.arc(6.5,1.5,1,0,Math.PI*2),I.fill(),I.strokeStyle=`rgba(100,70,0,0.65)`,I.lineWidth=.6,I.beginPath(),I.moveTo(6,-2),I.quadraticCurveTo(10,-6,12,-5),I.stroke(),I.beginPath(),I.moveTo(6,2),I.quadraticCurveTo(10,6,12,5),I.stroke(),I.beginPath(),I.moveTo(-9,0),I.lineTo(-11,0),I.strokeStyle=`rgba(80,50,0,0.6)`,I.lineWidth=.8,I.stroke(),this.cargo>0){let e=.45+this.cargo*.4;I.fillStyle=`rgba(255,200,40,${e})`,I.beginPath(),I.ellipse(-1,-5.5,2.5,1.8,0,0,Math.PI*2),I.fill(),I.beginPath(),I.ellipse(-1,5.5,2.5,1.8,0,0,Math.PI*2),I.fill(),I.fillStyle=`rgba(255,220,60,${e*.3})`,I.beginPath(),I.ellipse(-1,-5.5,4,3,0,0,Math.PI*2),I.fill(),I.beginPath(),I.ellipse(-1,5.5,4,3,0,0,Math.PI*2),I.fill()}if(I.restore(),this.state!==`collecting`){let e=2.5,t=this.x-16/2,n=this.y-14,r=Math.max(0,this.stamina/this.maxStamina);I.fillStyle=`rgba(0,0,0,0.4)`,I.fillRect(t-.5,n-.5,17,e+1),I.fillStyle=`rgb(${r<.5?255:Math.floor(255*(1-r)*2)},${r>.5?210:Math.floor(210*r*2)},50)`,I.fillRect(t,n,16*r,e),this.state===`returning`&&(I.save(),I.translate(this.x,n-5),this.cargo>0?(I.fillStyle=`rgba(255,200,50,0.8)`,I.beginPath(),I.arc(0,0,2.5,0,Math.PI*2),I.fill()):(I.fillStyle=`rgba(255,200,80,0.6)`,I.beginPath(),I.moveTo(0,-3),I.lineTo(-3,0),I.lineTo(-2,0),I.lineTo(-2,2),I.lineTo(2,2),I.lineTo(2,0),I.lineTo(3,0),I.closePath(),I.fill()),I.restore())}}};function Vt(){let e=I.createRadialGradient(V*.3,H*.6,50,V*.5,H*.5,V*.8);e.addColorStop(0,`#1e3a1e`),e.addColorStop(.5,`#142814`),e.addColorStop(1,`#0a150a`),I.fillStyle=e,I.fillRect(0,0,V,H),I.globalAlpha=.03;for(let e=0;e<200;e++)I.fillStyle=`#4a8a3a`,I.fillRect(e*137.5%V,e*97.3%H,1,3+e%4);I.globalAlpha=1}var Y=[],X=0;function Ht(){V=F.width=gt.offsetWidth,H=F.height=gt.offsetHeight,Mt(),Y=[];for(let e=0;e<St;e++)Y.push(new Bt(e));for(let e=0;e<St&&e<K.length;e++)K[e].beeIndex=e,Y[e].cellIndex=e;Nt(),Lt();for(let e of Y){let t=e.cell;t&&(e.stamina>e.tiredAt+15?(e.x=40+V*.6*Math.random(),e.y=80+Math.random()*(H-160)):(e.state=`sleeping`,e.x=t.x,e.y=t.y,e.vx=0,e.vy=0))}G=[],X=0}function Ut(){V=F.width=gt.offsetWidth,H=F.height=gt.offsetHeight,Nt();for(let e of J)Dt(e,q)<z*B*3&&(e.x=40+V*.5*Math.random(),e.y=80+Math.random()*(H-160))}function Wt(){if(xt){Vt(),Rt(),zt(X),Ft(X),kt(),At(),W.active&&(I.beginPath(),I.arc(W.x,W.y,14+Math.sin(X*.12)*3,0,Math.PI*2),I.fillStyle=W.repel?`rgba(255,70,70,0.25)`:`rgba(255,230,100,0.25)`,I.fill());for(let e of Y)e.update(Y,X);for(let e of Y)e.draw(X);X++,L=requestAnimationFrame(Wt)}}var Gt=[`> EXEC bee_colony.exe`,`> SPAWNING AGENTS...`,`> GENERATING FLORA GRID...`,`> HIVE ONLINE.`];function Kt(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-beesim`),_t.style.display=`flex`,vt.style.display=`none`,R&&=(R(),null),R=appBootAnimation(yt,bt,Gt,()=>{R=null,vt.style.display=`flex`,xt=!0,requestAnimationFrame(()=>{Ht(),Wt()})})}function qt(){R&&=(R(),null),xt=!1,L&&cancelAnimationFrame(L),L=null,_t.style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-beesim`)}function Jt(){document.getElementById(`beesim-controls`).classList.toggle(`collapsed`)}window.addEventListener(`resize`,()=>{xt&&Ut()}),document.addEventListener(`visibilitychange`,()=>{if(xt){if(document.hidden){L&&cancelAnimationFrame(L),L=null;return}L||Wt()}}),window.launchBeeSim=Kt,window.closeBeeSim=qt,window.toggleBeeSimControls=Jt;var Z=null,Yt=[`> EXEC docs_viewer.exe`,`> INDEXING KNOWLEDGE BASE...`,`> DECRYPTING ARCHIVES...`,`> DOCS READY.`];function Q(e,t,n){return`
<div class="docs-code-block" data-code-block>
    <div class="docs-code-header">
        <span class="docs-code-title">${e}</span>
        <div class="docs-code-toggle">
            <button type="button" class="docs-code-toggle-btn active" data-toggle="actual">SOURCE</button>
            <button type="button" class="docs-code-toggle-btn" data-toggle="pseudo">PSEUDO</button>
        </div>
    </div>
    <pre class="docs-code-pre" data-actual>${t}</pre>
    <pre class="docs-code-pre" data-pseudo style="display:none;">${n}</pre>
</div>`}var Xt=[{id:`overview`,title:`SYSTEM OVERVIEW`,content:`
<p>Welcome to <code>SWARM_OS v7.0.4</code>, the Cyberdeck operating system built by <strong>Onyx Cybernetics</strong> for the <strong>Deck-MK IV</strong> platform.</p>
<p>This interface is a retro-futuristic cyberpunk terminal designed around swarm intelligence concepts. It features interactive simulations, system monitoring, resource routing, and a fully themed visual environment.</p>
<p>The system is powered by the Swarm Engine — a high-performance runtime built on zero-allocation memory arenas, SIMD-aligned data layouts, and lock-free concurrency primitives.</p>
<h3>Hardware Components</h3>
<p>The Deck-MK IV consists of three physical components:</p>
<ul>
<li><strong>Main Display</strong> — The primary CRT-style viewport where the OS and all applications render</li>
<li><strong>Mini Display</strong> — A thin status strip between the screen and console, showing protocol-driven animations</li>
<li><strong>Deck Console</strong> — The hardware control base with theme selector, protocol dial, and power switch</li>
</ul>
`},{id:`boot`,title:`BOOT SEQUENCE`,content:`
<p>Engage the <strong>PWR</strong> switch in the Deck Console to initialize the system. The boot process runs through three phases:</p>
<h3>Phase 1 — Terminal POST</h3>
<p>A BIOS-style terminal scrolls diagnostic output: CPU identification (Kiroshi Optic-Core 9.2GHz), memory test, neural interface init, core arena allocation, SIMD alignment enforcement, MPSC job queue setup, and VFS mount.</p>
<h3>Phase 2 — Swarm Deployment</h3>
<p>The terminal clears and displays <strong>"SWARM DEPLOYED"</strong> in large pulsing text. A swarm of 80 animated bee particles flies across the screen to visually represent the distributed agent deployment.</p>
<h3>Phase 3 — OS Desktop</h3>
<p>The desktop activates with the application grid, architecture specs, deployment targets, and the live system clock. The mini display begins its protocol-driven animation.</p>
`},{id:`themes`,title:`THEMES`,content:`
<p>Four color themes are available from the <strong>OS THEME</strong> dropdown in the Deck Console. Themes change the primary color, dim background, and border color across the entire interface.</p>
<ul>
<li><strong>Swarm Amber</strong> — Warm amber/gold tones (default)</li>
<li><strong>Neon Green</strong> — Terminal green, classic hacker aesthetic</li>
<li><strong>Cyber Blue</strong> — Cool blue, corporate net-runner</li>
<li><strong>Vaporwave Pink</strong> — Hot pink, retro-wave styling</li>
</ul>
<p>Theme changes apply instantly to all UI elements including open applications, the mini display, and the Deck Console itself.</p>
<h3>Light / Dark Mode</h3>
<p>A toggle button between the theme selector and protocol dial switches between <strong>dark mode</strong> (default) and <strong>light mode</strong>. Dark mode uses deep black backgrounds with bright neon accents. Light mode inverts the palette to warm cream/parchment backgrounds while keeping the same accent colors — giving each of the 4 themes an alternate visual identity. The toggle icon switches between a moon (dark) and sun (light).</p>
`},{id:`protocols`,title:`PROTOCOLS`,content:`
<p>The <strong>PROTOCOL</strong> selector in the Deck Console activates different operational modes. Each protocol changes the mini display animation and updates process status indicators in SYS MON.</p>
<h3>Standby</h3>
<p>Default mode. The mini display shows 30 animated mini bees drifting across the status bar. All non-essential processes remain in standby.</p>
<h3>Ice Burn</h3>
<p>Activates a layered flame animation in the mini display using 4 color gradient layers matched to the current theme. In SYS MON, <code>ice_breaker_auto.bat</code> shows as <strong>[ ACTIVE ]</strong> in red with a pulse effect.</p>
<h3>Sentinel</h3>
<p>Displays 20 pulsing radar dots in the mini display, representing active scan coverage. In SYS MON, <code>sentinel_watch.sys</code> shows as <strong>[ ACTIVE ]</strong> in blue.</p>
<h3>Ghost Mode</h3>
<p>Shows 12 horizontal drifting bars at low opacity in the mini display — a stealth visualization. In SYS MON, <code>stealth_cloak_v2.sys</code> shows as <strong>[ CLOAKED ]</strong> in purple.</p>
`},{id:`main-display`,title:`MAIN DISPLAY`,content:`
<p>The <strong>Main Display</strong> is the primary screen of the Deck-MK IV — the large CRT-style viewport that occupies the center of the interface. All system output and applications render here.</p>
<h3>Screen Layers</h3>
<p>The display uses a layered rendering stack. Multiple full-screen layers exist at different z-indices, shown and hidden as the system state changes:</p>
<ul>
<li><strong>OFF Layer</strong> — "SYSTEM OFFLINE" message, visible when the deck is powered down</li>
<li><strong>Terminal Layer</strong> — Scrolling BIOS/POST text during boot sequence</li>
<li><strong>Swarm Layer</strong> — The "SWARM DEPLOYED" animation with bee particle effects</li>
<li><strong>OS Desktop</strong> — The main workspace with application tiles, architecture specs, deployment targets, and the system clock</li>
<li><strong>App Overlays</strong> — Full-screen application layers (Particle Lab, Bee Sim, SYS MON, Resource Router, Docs) that stack on top of the desktop</li>
</ul>
<h3>Visual Effects</h3>
<p>A CRT scanline overlay is drawn across the entire display at all times, simulating the look of a cathode-ray tube monitor. The scanlines are purely cosmetic and do not affect interaction.</p>
<h3>Status Bar</h3>
<p>The top edge of the OS Desktop shows a persistent status bar with the system name (<code>SWARM_NET ACTIVE</code>), live system clock, hive connection status, and the current node location (<code>HIVE_NODE_01</code>).</p>
`},{id:`mini-display`,title:`MINI DISPLAY`,content:`
<p>The <strong>Mini Display</strong> is the thin hardware status strip positioned between the Main Display and the Deck Console. It serves as a secondary readout — a visual indicator of the deck's current operational mode.</p>
<h3>Behavior</h3>
<p>The mini display activates when the system powers on and remains active until shutdown. Its animation is driven entirely by the selected protocol, and its color palette adapts to the active theme.</p>
<h3>Protocol Animations</h3>
<ul>
<li><strong>Standby:</strong> 30 animated mini bees with flutter motion drifting across the strip</li>
<li><strong>Ice Burn:</strong> Multi-layer flame shards rising upward in 4 theme-matched color gradients</li>
<li><strong>Sentinel:</strong> 20 pulsing dots in a radar-like scanning array</li>
<li><strong>Ghost Mode:</strong> 12 horizontal drifting bars at 15% opacity — a stealth visualization</li>
</ul>
<p>Animations are generated dynamically as CSS keyframes by the protocol handler each time the protocol changes. Switching protocols instantly replaces the mini display content.</p>
`},{id:`deck-console`,title:`DECK CONSOLE`,content:`
<p>The <strong>Deck Console</strong> is the physical control base of the Deck-MK IV, located below the Mini Display. It houses the hardware controls that configure the system's operational state.</p>
<h3>Manufacturer Badge</h3>
<p>The console header reads <code>ONYX CYBERNETICS // DECK-MK IV</code> — identifying the hardware manufacturer and model designation.</p>
<h3>OS Theme Selector</h3>
<p>A dropdown labeled <strong>OS THEME</strong> that switches the entire interface color scheme. Four themes are available: Swarm Amber, Neon Green, Cyber Blue, and Vaporwave Pink. Changes apply instantly across all layers, open apps, and the mini display.</p>
<h3>Light / Dark Toggle</h3>
<p>A circular button between the theme and protocol selectors. Displays a moon icon in dark mode and a sun icon in light mode. Clicking it toggles the entire interface between dark (black backgrounds) and light (cream/parchment backgrounds). Works with all 4 color themes — effectively giving the system 8 visual configurations.</p>
<h3>Protocol Selector</h3>
<p>A dropdown labeled <strong>PROTOCOL</strong> that activates different operational modes. Each protocol changes the mini display animation and updates process statuses in SYS MON. Options: Standby, Ice Burn, Sentinel, Ghost Mode.</p>
<h3>Power Switch (PWR)</h3>
<p>The main power toggle on the right side of the console. Engaging the switch initiates the full boot sequence. Disengaging it immediately shuts down the system — closing all open applications, clearing all animations, and returning the Main Display to the "SYSTEM OFFLINE" state. The switch provides visual feedback with an up/down toggle position.</p>
`},{id:`architecture`,title:`ARCHITECTURE SPECS`,content:`
<p>The OS desktop displays three core architecture specification cards describing the Swarm Engine's design philosophy:</p>
<h3>ZERO_ALLOCATION</h3>
<p>Strict memory discipline with zero heap allocations in the hot path. All memory is pre-allocated into contiguous linear arenas at boot, eliminating garbage collection pauses.</p>
<h3>DATA_ORIENTED</h3>
<p>64-byte aligned SIMD data layouts using Structure of Arrays (SoA). Cache-line hygiene is enforced for maximum AVX-512 throughput, enabling efficient vector processing across large entity sets.</p>
<h3>CONCURRENCY</h3>
<p>Lock-free MPSC (Multi-Producer Single-Consumer) job queues provide thread-safe execution without mutex stalls or context-switching overhead, enabling smooth parallel task scheduling.</p>
`},{id:`deployment`,title:`DEPLOYMENT TARGETS`,content:`
<p>Three deployment target scenarios describe the intended use cases for the Swarm Engine:</p>
<h3>[TGT-01] Agent-Based Modeling (ALife)</h3>
<p>10,000+ autonomous entities via SoA Vector Flow Fields without GC stutter. This target covers large-scale simulations of autonomous agents — directly demonstrated by the Bee Sim and Particle Lab applications.</p>
<h3>[TGT-02] Live Audio-Visual (VJ) Decks</h3>
<p>Millions of particles to DX12 upload heap with hardware-accelerated fluid metaballs and CRT post-processing. Targets real-time visual performance and entertainment applications.</p>
<h3>[TGT-03] Diegetic AI Workspaces</h3>
<p>Terminal-based OS layer natively integrating local inference workflows. This target envisions AI model inference and agent execution within the terminal interface — the foundation of the Cyberdeck OS concept itself.</p>
`},{id:`apps`,title:`APPLICATIONS`,content:`
<p>Applications are launched from the desktop tile grid. The <strong>APPS</strong> folder contains interactive simulations, while system utilities are on the main grid.</p>

<h3>Particle Lab v1.6</h3>
<p>A real-time particle physics sandbox with multiple simulation modes.</p>
<ul>
<li><strong>Modes:</strong> Snow (falling drift), Vortex (orbital gravity), Plexus (network connections), Liquid (fluid physics)</li>
<li><strong>Controls:</strong> Amount, Size, Speed, Gravity, Repel, Trails</li>
<li><strong>Appearance:</strong> Shape (Square/Circle/Triangle/Star), Color Mode (Solid/Random Neon/Velocity)</li>
<li><strong>Presets:</strong> Save and load custom configurations to local storage</li>
<li><strong>Mouse:</strong> LMB to repel, RMB to attract (radius grows while held)</li>
</ul>

<h3>Bee Sim v1.0</h3>
<p>A honey bee colony simulation using boid flocking algorithms with nectar collection, honeycomb storage, and stamina management.</p>
<ul>
<li><strong>Swarm Sliders:</strong> Cohesion, Alignment, Separation, Speed, Vision range</li>
<li><strong>Bee States:</strong> Foraging (seeking flowers), Collecting (gathering nectar), Returning (heading to hive), Sleeping (resting in cells)</li>
<li><strong>Honeycomb:</strong> Hexagonal grid where bees deposit nectar as honey — cells fill and glow as honey accumulates</li>
<li><strong>Flowers:</strong> Nectar sources that regenerate over time, attracting foraging bees</li>
<li><strong>Mouse:</strong> LMB to attract bees, RMB to scatter them</li>
<li><strong>Vision Toggle:</strong> Check "Show field of vision" to visualize each bee's FOV cone</li>
</ul>

<h3>SYS MON v2.1</h3>
<p>A read-only system monitor displaying simulated hardware metrics and active process status.</p>
<ul>
<li><strong>Hardware Panel:</strong> CPU Load, Memory Usage, Thermals, GPU Utilization — each with animated progress bars</li>
<li><strong>Process Table:</strong> Shows daemon_watchdog.exe, stealth_cloak_v2.sys, packet_sniffer.sh, ice_breaker_auto.bat, sentinel_watch.sys</li>
<li><strong>Protocol Integration:</strong> Process statuses change dynamically based on the active protocol selection</li>
</ul>

<h3>Resource Router v2.0</h3>
<p>A charity resource routing interface connecting to real-world donation links through a cyberpunk network visualization.</p>
<ul>
<li><strong>9 Charity Nodes:</strong> Water for Good, Direct Relief, Village Enterprise, and 6 more organizations</li>
<li><strong>Manual Mode:</strong> Click individual nodes to select targets</li>
<li><strong>RNG Protocol:</strong> Randomized selection with accelerating animation cycle</li>
<li><strong>Load Balancer:</strong> Selects all 9 nodes for even resource distribution</li>
<li><strong>Transfer:</strong> Confirm uplink, then initiate transfer to open the charity's real donation page</li>
</ul>
`},{id:`keyboard`,title:`KEYBOARD SHORTCUTS`,content:`
<ul>
<li><code>ESC</code> — Close the topmost open application or overlay. Pressing Escape repeatedly will close layers in z-index order (highest first) until returning to the OS desktop.</li>
<li><code>TAB</code> — Cycle focus forward through interactive elements within the active overlay. Focus is trapped within the topmost visible layer to prevent navigating behind it.</li>
<li><code>SHIFT + TAB</code> — Cycle focus backward through interactive elements within the active overlay.</li>
</ul>
<p>All interactive elements (buttons, sliders, dropdowns) support keyboard navigation. Focus indicators use a themed outline with glow effect for visibility.</p>
`},{id:`concept`,title:`THE CONCEPT`,content:`
<p><strong>SWARM_OS</strong> is a fictional operating system interface that blends cyberpunk aesthetics with real interactive web technology.</p>
<p>The design draws from retro terminal interfaces, CRT displays, and the visual language of science fiction hacking — reimagined as a functional web portal with real applications running inside it.</p>
<h3>The Swarm Metaphor</h3>
<p>The system is built around the concept of swarm intelligence — distributed autonomous agents working collectively. This theme manifests in the boot animation (bee swarm deployment), the Bee Sim application (flocking algorithms), and the overall "hive protocol" system naming.</p>
<h3>Onyx Cybernetics</h3>
<p>The fictional hardware manufacturer behind the Deck-MK IV. The interface imagines a future where personal computing takes the form of dedicated cyberdeck hardware with specialized modules — each application tile representing an installed module in the deck.</p>
<h3>Design Language</h3>
<ul>
<li><strong>Typography:</strong> Share Tech Mono — a monospace font evoking terminal output</li>
<li><strong>Color:</strong> Theme-reactive neon primaries on deep black backgrounds</li>
<li><strong>Effects:</strong> CRT scanlines, glow borders, pulse animations</li>
<li><strong>Hardware:</strong> Physical deck console with power switch, theme selector, protocol dial</li>
</ul>
`}];function $(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var Zt=[{id:`plab-overview`,title:`OVERVIEW`,content:`
<p><strong>Particle Lab v1.6</strong> is a real-time particle physics sandbox running on HTML5 Canvas. It supports four simulation modes (Snow, Vortex, Plexus, Liquid), each applying different physics rules to a shared particle pool.</p>
<p>The simulation renders at 60fps using <code>requestAnimationFrame</code>. All physics, rendering, and user interaction is computed in a single animation loop. Particles are stored as class instances in a flat array, synced to the user-configured count each frame.</p>
<h3>Key Systems</h3>
<ul>
<li><strong>Particle Pool</strong> — Dynamic array of Particle objects, synced to the Amount slider</li>
<li><strong>Physics Update</strong> — Per-particle velocity/position integration with mode-specific forces</li>
<li><strong>Mouse Interaction</strong> — LMB repels, RMB attracts with growing radius</li>
<li><strong>Plexus Lines</strong> — Distance-based line connections between nearby particles</li>
<li><strong>Rendering</strong> — Shape drawing (circle, square, triangle, star) with color modes</li>
</ul>
`},{id:`plab-particle`,title:`PARTICLE CONSTRUCTOR`,content:`
<p>Each particle is created with a random position and velocity. The <code>boom</code> flag (used by the Explode button) gives particles a higher initial speed. The <code>da</code> and <code>ds</code> fields drive sinusoidal drift in Snow mode. The <code>w</code> weight affects fall speed.</p>
`+Q(`Particle Constructor`,$(`class Particle {
    constructor(x, y, boom) {
        this.x = x||rnd(0,pw); this.y = y||rnd(0,ph);
        const a = rnd(0,Math.PI*2);
        const sp = boom ? rnd(S.speed*2,S.speed*5)
                        : rnd(S.speed*0.2,S.speed);
        this.vx = Math.cos(a)*sp;
        this.vy = Math.sin(a)*sp;
        this.baseColor = rndNeon();
        this.da = rnd(0,Math.PI*2);
        this.ds = rnd(0.02,0.05);
        this.w = rnd(0.5,1.5);
    }
}`),$(`class Particle:
    constructor(x, y, isBoom):
        position = (x or random, y or random)
        angle = random 0..2PI
        speed = isBoom ? fast(2x-5x) : normal(0.2x-1x)
        velocity = (cos(angle)*speed, sin(angle)*speed)
        baseColor = pick random neon color
        driftAngle = random 0..2PI      // for Snow sine wave
        driftSpeed = random 0.02..0.05  // drift oscillation rate
        weight = random 0.5..1.5        // fall speed multiplier`))},{id:`plab-physics`,title:`PHYSICS UPDATE LOOP`,content:`
<p>The update method applies mode-specific physics each frame. Every mode first checks for mouse interaction (repel/attract), then applies its own forces:</p>
<ul>
<li><strong>Snow</strong> — Downward drift + sinusoidal horizontal sway. Wraps at screen edges.</li>
<li><strong>Vortex</strong> — Orbital motion around screen center. Gravity pulls inward, speed drives tangential orbit.</li>
<li><strong>Plexus</strong> — Free-floating with bounce off walls. Speed self-regulates toward the configured value.</li>
<li><strong>Liquid</strong> — Gravity + inter-particle forces: repulsion at close range, attraction at medium range.</li>
</ul>
`+Q(`Snow Mode Physics`,$(`// Snow mode: drift downward with sine-wave sway
if (S.mode === 'snow') {
    this.y += (S.speed * 0.5 * this.w) + S.gravity;
    this.x += Math.sin(this.da) * (S.speed * 0.5);
    this.da += this.ds;
    // Wrap at edges
    if (this.y > ph + S.size) {
        this.y = -S.size;
        this.x = rnd(0, pw);
    }
    if (this.x > pw + S.size) this.x = -S.size;
    if (this.x < -S.size) this.x = pw + S.size;
}`),$(`Snow mode update:
    y += (baseSpeed * weight) + gravity
    x += sin(driftAngle) * baseSpeed
    driftAngle += driftSpeed

    if particle below screen:
        reset to top at random x
    if particle off left/right:
        wrap to opposite side`))+Q(`Vortex Mode Physics`,$(`// Vortex: orbital motion around center
} else if (S.mode === 'vortex') {
    let cx=pw/2, cy=ph/2;
    let dx=cx-this.x, dy=cy-this.y;
    let d=Math.sqrt(dx*dx+dy*dy);
    let ac=Math.atan2(dy,dx), sp=ac+Math.PI/2;
    let pull=S.gravity, orb=S.speed*1.5;
    let tvx=Math.cos(sp)*orb + Math.cos(ac)*pull*5;
    let tvy=Math.sin(sp)*orb + Math.sin(ac)*pull*5;
    this.vx += (tvx-this.vx)*0.05;
    this.vy += (tvy-this.vy)*0.05;
    this.x += this.vx; this.y += this.vy;
}`),$(`Vortex mode update:
    center = screen midpoint
    distance = dist(particle, center)
    angle_to_center = atan2(dy, dx)
    tangent_angle = angle_to_center + 90 degrees

    target_vx = cos(tangent) * orbitSpeed
              + cos(toCenter) * gravity * 5
    target_vy = sin(tangent) * orbitSpeed
              + sin(toCenter) * gravity * 5

    velocity = lerp(velocity, target, 0.05)
    position += velocity`))+Q(`Liquid Mode Physics`,$(`// Liquid: gravity + inter-particle forces
} else if (S.mode === 'liquid') {
    this.vy += S.gravity;
    this.x += this.vx; this.y += this.vy;
    const neighborStep = particles.length > LIQUID_PAIR_SAMPLE_TARGET
        ? Math.ceil(particles.length / LIQUID_PAIR_SAMPLE_TARGET)
        : 1;
    for (let i=0; i<particles.length; i+=neighborStep) {
        let p2=particles[i]; if (p2===this) continue;
        let dx=p2.x-this.x, dy=p2.y-this.y;
        let d=Math.sqrt(dx*dx+dy*dy), th=S.size*4;
        if (d<th && d>0) {
            if (d < S.size*2) {          // too close: repel
                let f=(S.size*2-d)*0.05;
                this.vx -= (dx/d)*f;
                this.vy -= (dy/d)*f;
            } else {                      // medium range: attract
                let f=(d-S.size*2)*0.005;
                this.vx += (dx/d)*f;
                this.vy += (dy/d)*f;
            }
        }
    }
    this.vx *= 0.98; this.vy *= 0.99;  // damping
}`),$(`Liquid mode update:
    vy += gravity
    position += velocity

    for sampled neighbors (skip some for perf):
        distance = dist(this, neighbor)
        threshold = particleSize * 4

        if distance < threshold:
            if too close (< size*2):
                repel away from neighbor
            else:
                attract toward neighbor

    apply damping (vx*0.98, vy*0.99)`))},{id:`plab-mouse`,title:`MOUSE INTERACTION`,content:`
<p>Mouse forces are applied at the start of each particle's update. Left-click repels within a fixed 150px radius. Right-click attracts — and the attract radius grows continuously while held, resetting to 150px on release.</p>
`+Q(`Mouse Force Application`,$(`// Applied inside Particle.update()
if (pmouse.leftDown || pmouse.rightDown) {
    let dx = pmouse.x - this.x;
    let dy = pmouse.y - this.y;
    let d = Math.sqrt(dx*dx + dy*dy);
    let a = Math.atan2(dy, dx);
    if (pmouse.leftDown && d < 150) {
        let f = (150 - d) / 150;
        this.vx -= Math.cos(a) * f * S.repelStrength;
        this.vy -= Math.sin(a) * f * S.repelStrength;
    }
    if (pmouse.rightDown && d < pmouse.attractRadius) {
        let f = (pmouse.attractRadius - d) / pmouse.attractRadius;
        this.vx += Math.cos(a) * f * 0.8;
        this.vy += Math.sin(a) * f * 0.8;
    }
}

// In animation loop: grow attract radius while held
if (pmouse.rightDown)
    pmouse.attractRadius = Math.min(
        pmouse.attractRadius + 5,
        Math.max(pw, ph)
    );
else
    pmouse.attractRadius = 150;`),$(`Mouse force (per particle per frame):
    dx, dy = mouse - particle position
    distance = sqrt(dx^2 + dy^2)
    angle = atan2(dy, dx)

    if left button down AND distance < 150px:
        force = (150 - distance) / 150  // linear falloff
        push particle AWAY from mouse
        scale by repelStrength slider

    if right button down AND distance < attractRadius:
        force = (radius - distance) / radius
        pull particle TOWARD mouse (strength 0.8)

    attract radius grows +5px/frame while held
    resets to 150px on release`))},{id:`plab-plexus`,title:`PLEXUS LINE DRAWING`,content:`
<p>In Plexus mode, after all particles are updated and drawn, the engine draws semi-transparent lines between every pair of particles within 120px. A sampling step is used when particle counts are high to maintain performance.</p>
`+Q(`Plexus Connection Lines`,$(`// After particle draw loop, in plabAnimate()
if (S.mode === 'plexus') {
    let rgb = hex2rgb(S.color), mx = 120;
    const pairStep = particles.length > PLEXUS_SAMPLE_TARGET
        ? Math.ceil(particles.length / PLEXUS_SAMPLE_TARGET)
        : 1;
    for (let i=0; i<particles.length; i+=pairStep) {
        for (let j=i+pairStep; j<particles.length; j+=pairStep) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let d = Math.sqrt(dx*dx + dy*dy);
            if (d < mx) {
                ctx.beginPath();
                ctx.strokeStyle = \`rgba(\${rgb.r},\${rgb.g},\${rgb.b},\${1-d/mx})\`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}`),$(`Plexus line pass (after draw):
    maxDist = 120px
    sampleStep = ceil(count / 320) or 1

    for each sampled pair (i, j):
        distance = dist(particle[i], particle[j])
        if distance < maxDist:
            opacity = 1 - (distance / maxDist)
            draw line from particle[i] to particle[j]
            color = user color at calculated opacity`))},{id:`plab-render`,title:`SHAPE RENDERING`,content:`
<p>The draw method renders each particle as one of four shapes. Color is determined by the active color mode: Solid (user-picked), Random Neon (assigned at creation), or Velocity (HSL mapped to speed).</p>
`+Q(`Particle Draw Method`,$(`draw() {
    let c = S.color;
    let cs = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
    if (S.colormode === 'random') c = this.baseColor;
    else if (S.colormode === 'velocity') {
        let sp = S.mode==='snow' ? (S.speed*0.5*this.w) : cs;
        c = \`hsl(\${Math.min(280, sp*25)}, 100%, 50%)\`;
    }
    ctx.fillStyle = c;
    ctx.beginPath();
    let sz = S.size;

    if (S.shape === 'square')
        ctx.rect(this.x-sz/2, this.y-sz/2, sz, sz);
    else if (S.shape === 'circle')
        ctx.arc(this.x, this.y, sz/2, 0, Math.PI*2);
    else if (S.shape === 'triangle') {
        let a = Math.atan2(this.vy, this.vx);
        ctx.translate(this.x, this.y);
        ctx.rotate(a);
        ctx.moveTo(sz, 0);
        ctx.lineTo(-sz/2, sz/2);
        ctx.lineTo(-sz/2, -sz/2);
        ctx.rotate(-a);
        ctx.translate(-this.x, -this.y);
    } else if (S.shape === 'star') {
        // 5-pointed star with outer/inner radius
        let sp=5, oR=sz, iR=sz/2;
        let rot=Math.PI/2*3, step=Math.PI/sp;
        ctx.moveTo(this.x, this.y - oR);
        for (let i=0; i<sp; i++) {
            ctx.lineTo(this.x+Math.cos(rot)*oR,
                       this.y+Math.sin(rot)*oR);
            rot += step;
            ctx.lineTo(this.x+Math.cos(rot)*iR,
                       this.y+Math.sin(rot)*iR);
            rot += step;
        }
    }
    ctx.fill();
}`),$(`draw():
    determine color:
        if "solid"    -> user-picked hex color
        if "random"   -> neon color assigned at birth
        if "velocity" -> map speed to HSL hue (0-280)

    set fill color on canvas context

    switch shape:
        "square":   draw rect centered on position
        "circle":   draw arc centered on position
        "triangle": rotate to face velocity direction,
                    draw 3-point polygon
        "star":     draw 5-pointed star with alternating
                    outer/inner radius points

    fill the shape`))},{id:`plab-animation`,title:`ANIMATION LOOP`,content:`
<p>The main loop clears the canvas (with trail alpha for the Trails effect), updates and draws all particles, then draws plexus lines if in Plexus mode. Trail persistence is controlled by the Trails slider — a value of 0 fully clears each frame, while higher values leave fading afterimages.</p>
`+Q(`Main Animation Loop`,$(`function plabAnimate() {
    if (!plabActive) return;

    // Grow attract radius while right mouse held
    if (pmouse.rightDown)
        pmouse.attractRadius = Math.min(
            pmouse.attractRadius + 5, Math.max(pw, ph));
    else
        pmouse.attractRadius = 150;

    // Clear with trail alpha
    let t = 1 - S.trails;
    if (t < 0.01) t = 0.01;
    ctx.fillStyle = \`rgba(0,0,0,\${t})\`;
    ctx.fillRect(0, 0, pw, ph);

    // Update + draw all particles
    for (let i=0; i<particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    // Plexus lines (if mode active)
    if (S.mode === 'plexus') { /* ... line drawing ... */ }

    plabAnimId = requestAnimationFrame(plabAnimate);
}`),$(`animationLoop():
    if not active: return

    update attract radius (grow if RMB held)

    clear canvas with alpha (trails effect):
        alpha = 1 - trailsValue
        fill black rect at that alpha

    for each particle:
        particle.update()  // apply physics
        particle.draw()    // render shape

    if plexus mode:
        draw connection lines between nearby pairs

    request next frame`))}],Qt=[{id:`bee-overview`,title:`OVERVIEW`,content:`
<p><strong>Bee Sim v1.0</strong> is a honey bee colony simulation featuring boid flocking, nectar collection, honeycomb storage, and stamina management. It renders on HTML5 Canvas with 75 autonomous bee agents.</p>
<h3>Key Systems</h3>
<ul>
<li><strong>Boid Flocking</strong> — Cohesion, alignment, and separation forces with configurable sliders</li>
<li><strong>Field of Vision</strong> — Each bee has a limited FOV cone that constrains which neighbors it can see</li>
<li><strong>State Machine</strong> — Bees transition between Foraging, Collecting, Returning, and Sleeping states</li>
<li><strong>Honeycomb</strong> — Hexagonal grid storage where bees deposit collected nectar as honey</li>
<li><strong>Flowers</strong> — Nectar sources with individual regeneration rates</li>
<li><strong>Stamina</strong> — Energy system that forces bees to return home and sleep when depleted</li>
</ul>
`},{id:`bee-constructor`,title:`BEE CONSTRUCTOR`,content:`
<p>Each SimBee is initialized with random position, velocity, stamina parameters, and starts in the foraging state. The <code>tiredAt</code> and <code>wakeAt</code> thresholds create natural variation in when bees return home and when they wake up.</p>
`+Q(`SimBee Constructor`,$(`class SimBee {
    constructor(i) {
        this.index = i;
        this.x = 100 + Math.random() * 400;
        this.y = 100 + Math.random() * 300;
        const a = Math.random() * Math.PI * 2;
        this.vx = Math.cos(a) * 2;
        this.vy = Math.sin(a) * 2;
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
}`),$(`class SimBee:
    constructor(index):
        position = random within starting area
        velocity = random direction at speed 2
        wingPhase = random (for animation)
        wobble = random (for flight jitter)

        stamina = random 50-100
        maxStamina = 100
        drainRate = random 0.02-0.042 per frame
        rechargeRate = random 0.16-0.26 per frame
        tiredThreshold = random 15-25
        wakeThreshold = random 82-100

        state = "foraging"
        assignedCell = none
        cargo = 0 (nectar carried)
        collectDuration = random 65-115 frames`))},{id:`bee-fov`,title:`FIELD OF VISION`,content:`
<p>Before a bee can be influenced by a neighbor in flocking calculations, it must be able to "see" that neighbor. The <code>canSee()</code> method checks both distance (within vision slider range) and angle (within a 135-degree cone in the bee's heading direction).</p>
`+Q(`Field of Vision Check`,$(`canSee(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    const dd = dx * dx + dy * dy;
    const vr = beeSliders.vision.value;
    if (dd > vr * vr || dd < 0.01) return false;

    const h = Math.atan2(this.vy, this.vx);
    let diff = Math.atan2(dy, dx) - h;
    if (diff > Math.PI)  diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    return Math.abs(diff) < BEE_FOV_ANGLE; // 135 deg
}`),$(`canSee(other):
    dx, dy = other.position - this.position
    distSq = dx^2 + dy^2

    if distSq > visionRange^2: return false  // too far
    if distSq < 0.01: return false           // self-overlap

    heading = atan2(this.vy, this.vx)
    angleToOther = atan2(dy, dx)
    angleDiff = normalize(angleToOther - heading)

    return |angleDiff| < 135 degrees`))},{id:`bee-boids`,title:`BOID FLOCKING ALGORITHM`,content:`
<p>The core flocking behavior applies three forces to each foraging bee: <strong>Cohesion</strong> (steer toward average neighbor position), <strong>Alignment</strong> (match average neighbor velocity), and <strong>Separation</strong> (push away from very close neighbors). Only visible, active bees are considered.</p>
`+Q(`Boid Flocking Forces`,$(`applyBoids(all) {
    const cF = beeSliders.cohesion.value / 1000;
    const aF = beeSliders.alignment.value / 1000;
    const sF = beeSliders.separation.value / 100;
    let cx=0, cy=0, ax=0, ay=0, sx=0, sy=0, n=0;

    for (const o of all) {
        if (o === this) continue;
        if (o.state === 'sleeping' || o.state === 'collecting')
            continue;
        if (!this.canSee(o)) continue;

        const dx = o.x - this.x, dy = o.y - this.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        n++;
        cx += o.x; cy += o.y;       // cohesion accum
        ax += o.vx; ay += o.vy;     // alignment accum
        if (d < 28 && d > 0.01) {   // separation
            sx -= dx/d * (28-d);
            sy -= dy/d * (28-d);
        }
    }
    if (n > 0) {
        this.vx += (cx/n - this.x) * cF;  // cohesion
        this.vy += (cy/n - this.y) * cF;
        this.vx += (ax/n - this.vx) * aF;  // alignment
        this.vy += (ay/n - this.vy) * aF;
        this.vx += sx * sF;                // separation
        this.vy += sy * sF;
    }
}`),$(`applyBoids(allBees):
    cohesionStrength = slider / 1000
    alignmentStrength = slider / 1000
    separationStrength = slider / 100

    for each other bee:
        skip if self, sleeping, or collecting
        skip if not within field of vision

        add position to cohesion accumulator
        add velocity to alignment accumulator
        if closer than 28px:
            add repulsion vector to separation

    if any visible neighbors found:
        COHESION:    steer toward average position
        ALIGNMENT:   match average velocity
        SEPARATION:  push away from close neighbors

    each force scaled by its slider value`))},{id:`bee-states`,title:`STATE MACHINE`,content:`
<p>Each bee operates as a finite state machine with four states. Transitions are driven by stamina, proximity to flowers/hive, and timer expiration.</p>
<ul>
<li><strong>Foraging</strong> — Applies boids, seeks flowers. Transitions to Collecting on flower contact, or Returning when stamina drops below tiredAt.</li>
<li><strong>Collecting</strong> — Hovers near flower, drains nectar. Transitions to Returning when timer expires.</li>
<li><strong>Returning</strong> — Flies toward home cell. Transitions to Sleeping when close to cell.</li>
<li><strong>Sleeping</strong> — Deposits cargo as honey, recharges stamina. Transitions to Foraging when stamina reaches wakeAt.</li>
</ul>
`+Q(`State Transitions`,$(`update(all, time) {
    // ── SLEEPING ──
    if (this.state === 'sleeping') {
        this.stamina = Math.min(this.maxStamina,
            this.stamina + this.rechargeRate);
        if (this.cargo > 0) {
            const dep = Math.min(this.cargo, 0.008);
            this.cargo -= dep;
            if (this.cell)
                this.cell.honey = Math.min(1, this.cell.honey + dep*0.85);
        }
        if (this.stamina >= this.wakeAt && this.cargo <= 0) {
            this.state = 'foraging';
            // launch outward from hive
        }
        return;
    }

    // ── COLLECTING ──
    if (this.state === 'collecting') {
        this.collectTimer--;
        this.stamina -= this.drainRate * 0.2;
        // hover near flower with sine wobble
        if (this.collectTimer <= 0) {
            // take nectar from flower
            this.state = 'returning';
        }
        return;
    }

    // ── FORAGING ──
    if (this.state === 'foraging') {
        this.stamina -= this.drainRate;
        if (this.stamina <= this.tiredAt) {
            this.state = 'returning';
        } else {
            this.applyBoids(all);
            this.applyMouse();
            this.seekFlower();
            // check if touching a flower -> collecting
        }
    }

    // ── RETURNING ──
    if (this.state === 'returning') {
        this.stamina -= this.drainRate * 0.35;
        // steer toward home cell
        if (dist(this, cell) < 8) {
            this.state = 'sleeping';
        }
    }
}`),$(`update(allBees, time):

    SLEEPING:
        recharge stamina by rechargeRate
        if carrying cargo:
            deposit small amount as honey into cell
        if stamina >= wakeThreshold AND cargo empty:
            switch to FORAGING
            launch outward from hive
        return (skip movement)

    COLLECTING:
        decrement collectTimer
        drain stamina slowly (20% rate)
        hover near flower with sine wobble
        if timer expired:
            take nectar from flower into cargo
            switch to RETURNING
        return (skip normal movement)

    FORAGING:
        drain stamina at normal rate
        if stamina <= tiredThreshold:
            switch to RETURNING
        else:
            apply boid flocking forces
            apply mouse attraction/repulsion
            seek nearest good flower
            if touching flower with space:
                switch to COLLECTING

    RETURNING:
        drain stamina slowly (35% rate)
        steer toward assigned home cell
        if within 8px of cell:
            switch to SLEEPING`))},{id:`bee-seek`,title:`FLOWER SEEKING`,content:`
<p>Foraging bees evaluate visible flowers and steer toward the best one. The scoring function balances nectar richness (how full the flower is) against distance, creating natural spread across multiple flowers.</p>
`+Q(`Flower Seeking & Scoring`,$(`seekFlower() {
    let best = null, bestScore = -Infinity;
    for (const f of beeFlowers) {
        if (f.nectar < 0.4) continue;      // skip depleted
        const d = beeDst(this, f);
        if (d > 600) continue;              // too far
        const score = (f.nectar / f.maxNectar) * 0.6
                    - (d / 500);
        if (score > bestScore) {
            bestScore = score;
            best = f;
        }
    }
    if (best) {
        this.targetFlower = best;
        const dx = best.x - this.x;
        const dy = best.y - this.y;
        const d = Math.sqrt(dx*dx + dy*dy) || 1;
        this.vx += (dx / d) * 0.13;
        this.vy += (dy / d) * 0.13;
    }
}`),$(`seekFlower():
    bestFlower = null
    bestScore = -infinity

    for each flower:
        skip if nectar < 40% capacity
        skip if distance > 600px

        score = (nectarPercent * 0.6) - (distance / 500)
        // high nectar = good, far away = bad

        if score > bestScore:
            bestScore = score
            bestFlower = flower

    if found a target:
        steer gently toward it (force = 0.13)`))},{id:`bee-honeycomb`,title:`HONEYCOMB SYSTEM`,content:`
<p>The honeycomb is a hexagonal grid generated using axial coordinates (q, r). Each cell can hold one bee and stores a honey level from 0 to 1. Cells are sorted by distance from center — the innermost cells are assigned to bees, while outer cells start pre-filled with honey.</p>
`+Q(`Honeycomb Generation`,$(`function beeGenerateComb() {
    beeCells = [];
    for (let q = -BEE_HEX_RADIUS; q <= BEE_HEX_RADIUS; q++) {
        const r1 = Math.max(-BEE_HEX_RADIUS, -q - BEE_HEX_RADIUS);
        const r2 = Math.min(BEE_HEX_RADIUS, -q + BEE_HEX_RADIUS);
        for (let r = r1; r <= r2; r++) {
            beeCells.push({
                q, r, x: 0, y: 0,
                beeIndex: -1, honey: 0
            });
        }
    }
    // Sort by distance from center (inner cells first)
    beeCells.sort((a, b) =>
        (a.q*a.q + a.r*a.r + a.q*a.r) -
        (b.q*b.q + b.r*b.r + b.q*b.r)
    );
    // Pre-fill outer cells with honey
    for (let i = BEE_NUM; i < beeCells.length; i++)
        beeCells[i].honey = 0.4 + Math.random() * 0.6;
}`),$(`generateHoneycomb():
    for each axial coordinate (q, r) within radius:
        create cell with position, beeIndex=-1, honey=0

    sort cells by distance from center (closest first)

    first 75 cells: assigned to bees (1 bee per cell)
    remaining cells: pre-filled with random honey (40-100%)`))+Q(`Hex Cell Positioning`,$(`function beeUpdateCombPos() {
    // Place comb at right side (or centered on mobile)
    const span = BEE_HEX_SIZE * BEE_HEX_RADIUS * 1.8;
    if (beeW < 600) {
        beeCombCenter.x = beeW / 2;
        beeCombCenter.y = span + 20;
    } else {
        beeCombCenter.x = beeW - span - 35;
        beeCombCenter.y = span + 45;
    }
    // Convert axial to pixel coordinates
    for (const c of beeCells) {
        c.x = beeCombCenter.x + BEE_HEX_SIZE * 1.5 * c.q;
        c.y = beeCombCenter.y + BEE_HEX_SIZE *
              (Math.sqrt(3)/2 * c.q + Math.sqrt(3) * c.r);
    }
}`),$(`updateCombPositions():
    span = hexSize * radius * 1.8

    if mobile (width < 600):
        center comb horizontally, place near top
    else:
        place comb at right side of canvas

    for each cell:
        convert axial (q,r) to pixel (x,y):
            x = center.x + hexSize * 1.5 * q
            y = center.y + hexSize * (sqrt3/2*q + sqrt3*r)`))},{id:`bee-mouse`,title:`MOUSE INTERACTION`,content:`
<p>Bees respond to mouse input with a simple attract/repel force. Left-click attracts foraging bees within 200px, while right-click scatters them. The force is constant regardless of distance (within range).</p>
`+Q(`Mouse Force`,$(`applyMouse() {
    if (!beeMouse.active) return;
    const dx = beeMouse.x - this.x;
    const dy = beeMouse.y - this.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 200 && d > 1) {
        const f = beeMouse.repel ? -0.9 : 0.35;
        this.vx += dx/d * f;
        this.vy += dy/d * f;
    }
}`),$(`applyMouse():
    if mouse not active: return

    distance = dist(this, mouse)
    if distance < 200px:
        if right-click (repel):
            push away with force 0.9
        else (left-click attract):
            pull toward with force 0.35`))}],$t={overview:{title:`SYSTEM OVERVIEW`,version:`v1.0`,sections:Xt},"particle-lab":{title:`PARTICLE LAB`,version:`v1.6`,sections:Zt},"bee-sim":{title:`BEE SIM`,version:`v1.0`,sections:Qt}};function en(e){let t=document.getElementById(`docs-sidebar`),n=document.getElementById(`docs-content`);t.innerHTML=``,n.innerHTML=``;let r=$t[e];r&&(r.sections.forEach((e,r)=>{let i=document.createElement(`button`);i.className=`docs-sidebar-item`,i.textContent=e.title,i.type=`button`,r===0&&i.classList.add(`active`),i.addEventListener(`click`,()=>{document.getElementById(`docs-`+e.id).scrollIntoView({behavior:`smooth`}),t.querySelectorAll(`.docs-sidebar-item`).forEach(e=>e.classList.remove(`active`)),i.classList.add(`active`)}),t.appendChild(i);let a=document.createElement(`div`);a.className=`docs-section`,a.id=`docs-`+e.id,a.innerHTML=`<h2>`+e.title+`</h2>`+e.content,n.appendChild(a)}),n.querySelectorAll(`[data-code-block]`).forEach(e=>{let t=e.querySelector(`[data-actual]`),n=e.querySelector(`[data-pseudo]`),r=e.querySelector(`[data-toggle="actual"]`),i=e.querySelector(`[data-toggle="pseudo"]`);!t||!n||!r||!i||(r.addEventListener(`click`,()=>{t.style.display=``,n.style.display=`none`,r.classList.add(`active`),i.classList.remove(`active`)}),i.addEventListener(`click`,()=>{t.style.display=`none`,n.style.display=``,i.classList.add(`active`),r.classList.remove(`active`)}))}))}function tn(e){let t=e||`overview`,n=document.getElementById(`layer-docs-viewer`),r=document.getElementById(`docs-loading`),i=document.getElementById(`docs-loading-text`),a=document.getElementById(`docs-app`),o=document.getElementById(`docs-title`),s=$t[t];o&&s&&(o.innerHTML=s.title+` <span style="opacity:0.4">`+s.version+`</span>`),typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-docs-viewer`),n.style.display=`flex`,a.style.display=`none`,Z&&=(Z(),null),Z=appBootAnimation(r,i,Yt,()=>{Z=null,a.style.display=`flex`,en(t)})}function nn(){Z&&=(Z(),null),document.getElementById(`layer-docs-viewer`).style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-docs-viewer`)}window.launchDocsViewer=tn,window.closeDocsViewer=nn;