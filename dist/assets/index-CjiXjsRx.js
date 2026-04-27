(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`7.0.4`,t=`v${e}`,n={amber:{ui:`#f59e0b`,uiDim:`rgba(245,158,11,0.2)`,uiBorder:`#78350f`,flames:[`#78350f`,`#b45309`,`#f59e0b`,`#fef3c7`]},green:{ui:`#22c55e`,uiDim:`rgba(34,197,94,0.2)`,uiBorder:`#14532d`,flames:[`#14532d`,`#16a34a`,`#22c55e`,`#bbf7d0`]},blue:{ui:`#3b82f6`,uiDim:`rgba(59,130,246,0.2)`,uiBorder:`#1e3a8a`,flames:[`#1e3a8a`,`#2563eb`,`#60a5fa`,`#ffffff`]},pink:{ui:`#ec4899`,uiDim:`rgba(236,72,153,0.2)`,uiBorder:`#831843`,flames:[`#831843`,`#be185d`,`#ec4899`,`#fce7f3`]}},r=`amber`,i=`standby`,a=!1,o=!1,s=[];function c(e){let t=document.getElementById(e);if(!t)throw Error(`Missing required element: ${e}`);return t}var l=c(`layer-off`),u=c(`layer-terminal`),d=c(`layer-swarm`),f=c(`layer-os`),ee=c(`terminal-text`),p=c(`loading-bar-container`),te=c(`swarm-container`),m=c(`mini-display`),h=document.getElementById(`power-switch`),ne=c(`ascii-logo`),re=new Map;function ie(e){e===`apps-folder`?ae():e===`docs-folder`?se():e===`docs-viewer`?launchDocsViewer():e===`particle-lab`?launchParticleLab():e===`sysmon`?Xe():e===`resource-router`?launchResourceRouter():e===`bee-sim`?launchBeeSim():e===`ring-buffer`?launchRingBuffer():e===`hex-life`?launchHexLife():e===`crypt-vault`?Qe(`CRYPT_VAULT`):e===`jack-in`&&Qe(`JACK_IN`)}function ae(){ue(`layer-apps-folder`),document.getElementById(`layer-apps-folder`).style.display=`block`}function oe(){document.getElementById(`layer-apps-folder`).style.display=`none`,fe(`layer-apps-folder`)}function se(){ue(`layer-docs-folder`),document.getElementById(`layer-docs-folder`).style.display=`block`}function ce(){document.getElementById(`layer-docs-folder`).style.display=`none`,fe(`layer-docs-folder`)}function le(){h&&h.addEventListener(`click`,Be),f&&f.addEventListener(`click`,e=>{let t=e.target.closest(`[data-app-action]`);t&&ie(t.dataset.appAction)});let e=document.getElementById(`layer-apps-folder`);e&&e.addEventListener(`click`,e=>{let t=e.target.closest(`[data-folder-app]`);if(!t)return;let n=t.dataset.folderApp;oe(),ie(n)});let t=document.getElementById(`layer-docs-folder`);t&&t.addEventListener(`click`,e=>{let t=e.target.closest(`[data-folder-doc]`);if(!t)return;let n=t.dataset.folderDoc;ce(),launchDocsViewer(n)}),document.addEventListener(`keydown`,ge)}function ue(e){let t=document.activeElement;t instanceof HTMLElement&&t!==document.body?re.set(e,t):re.delete(e)}function de(e){if(!(e instanceof HTMLElement)||!document.contains(e)||e.hasAttribute(`disabled`)||e.hasAttribute(`hidden`))return!1;let t=window.getComputedStyle(e);return t.display===`none`||t.visibility===`hidden`?!1:e.getClientRects().length>0}function fe(e){let t=re.get(e);re.delete(e),de(t)&&t.focus({preventScroll:!0})}function g(e){let t=document.getElementById(e);return t?window.getComputedStyle(t).display!==`none`:!1}function pe(){for(let e of[`layer-placeholder`,`layer-docs-viewer`,`layer-resource-router`,`layer-sysmon`,`layer-beesim`,`layer-particle-lab`,`layer-docs-folder`,`layer-apps-folder`])if(g(e))return document.getElementById(e);return null}function me(e){let t=[`a[href]`,`area[href]`,`button:not([disabled])`,`input:not([disabled]):not([type="hidden"])`,`select:not([disabled])`,`textarea:not([disabled])`,`[tabindex]:not([tabindex="-1"])`].join(`,`);return Array.from(e.querySelectorAll(t)).filter(e=>{if(e.hasAttribute(`hidden`))return!1;let t=window.getComputedStyle(e);return t.display===`none`||t.visibility===`hidden`?!1:e.getClientRects().length>0})}function he(e){if(e.key!==`Tab`)return!1;let t=pe();if(!t)return!1;let n=me(t);if(n.length===0)return t.hasAttribute(`tabindex`)||t.setAttribute(`tabindex`,`-1`),t.focus(),e.preventDefault(),!0;let r=n[0],i=n[n.length-1],a=document.activeElement;return!t.contains(a)||!e.shiftKey&&a===i?(r.focus(),e.preventDefault(),!0):e.shiftKey&&a===r?(i.focus(),e.preventDefault(),!0):!1}function ge(e){if(!he(e)&&e.key===`Escape`){if(Ce){ke(),e.preventDefault();return}if(g(`layer-placeholder`)){$e(),e.preventDefault();return}if(g(`layer-docs-viewer`)&&typeof closeDocsViewer==`function`){closeDocsViewer(),e.preventDefault();return}if(g(`layer-resource-router`)&&typeof closeResourceRouter==`function`){closeResourceRouter(),e.preventDefault();return}if(g(`layer-sysmon`)){Ze(),e.preventDefault();return}if(g(`layer-beesim`)&&typeof closeBeeSim==`function`){closeBeeSim(),e.preventDefault();return}if(g(`layer-particle-lab`)&&typeof closeParticleLab==`function`){closeParticleLab(),e.preventDefault();return}if(g(`layer-docs-folder`)){ce(),e.preventDefault();return}g(`layer-apps-folder`)&&(oe(),e.preventDefault())}}var _e=[`BIOS Date 04/12/2077 14:32:01 Ver ${e}`,`CPU: Kiroshi Optic-Core 9.2GHz`,`Memory Test: 1048576K OK`,`Initializing Neural Interface...`,`Allocating Core Arena... [64MB OK]`,`Enforcing 64-Byte SIMD Alignment... [STRICT]`,`Initializing MPSC Job Queues... [LOCK-FREE]`,`Mounting VFS... [OK]`,`Loading Subroutines... [OK]`,`<span style='color:#eab308;font-weight:bold;'>HIVE PROTOCOL INITIATED.</span>`,`Deploying Swarm OS...`,`Initiating visual payload...`];function ve(){s.forEach(clearTimeout),s=[]}function ye(e,t){let n=setTimeout(e,t);return s.push(n),n}function be(e){let t=n[e];t&&(r=e,document.documentElement.style.setProperty(`--primary`,t.ui),document.documentElement.style.setProperty(`--primary-dim`,t.uiDim),document.documentElement.style.setProperty(`--primary-border`,t.uiBorder),o&&a&&Ge())}var xe=!1;function Se(){xe=!xe,document.body.classList.toggle(`light-mode`,xe);let e=document.getElementById(`mode-icon`);e&&(e.innerHTML=xe?`&#9788;`:`&#9790;`)}var Ce=!1,we=!1;async function Te(e,t,n){let r=new AbortController,i=setTimeout(()=>r.abort(),n);try{return await fetch(e,{...t,signal:r.signal})}finally{clearTimeout(i)}}function Ee(){let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`);return e!=null&&e.value.length>0||t!=null&&t.value.length>0}function De(){if(Ce)return;let e=document.getElementById(`plab-controls`);e&&!e.classList.contains(`collapsed`)&&e.classList.add(`collapsed`);let t=document.getElementById(`beesim-controls`);t&&!t.classList.contains(`collapsed`)&&t.classList.add(`collapsed`);let n=document.getElementById(`bug-report-panel`),r=document.getElementById(`bug-report-btn`);n&&(n.style.display=`flex`,n.offsetHeight,n.classList.add(`open`),r&&r.classList.add(`active`),Ce=!0,Me(`bug-report-title`,`bug-title-count`,60),Me(`bug-report-desc`,`bug-desc-count`,250))}function Oe(){let e=document.getElementById(`bug-report-panel`),t=document.getElementById(`bug-report-btn`);if(!e)return;let n=e.querySelector(`.bug-report-confirm`);n&&n.remove(),e.classList.remove(`open`),t&&t.classList.remove(`active`),Ce=!1;let r=document.getElementById(`bug-report-title`),i=document.getElementById(`bug-report-desc`);r&&(r.value=``),i&&(i.value=``),Me(`bug-report-title`,`bug-title-count`,60),Me(`bug-report-desc`,`bug-desc-count`,250),setTimeout(()=>{Ce||(e.style.display=`none`)},350)}function ke(){Ee()?Ae():Oe()}function Ae(){let e=document.getElementById(`bug-report-panel`);if(!e||e.querySelector(`.bug-report-confirm`))return;let t=document.createElement(`div`);t.className=`bug-report-confirm`,t.innerHTML=`
        <div class="bug-report-confirm-text">Discard unsaved changes?</div>
        <div class="bug-report-confirm-actions">
            <button type="button" class="plab-topbar-btn" id="bug-confirm-discard">DISCARD</button>
            <button type="button" class="plab-topbar-btn" id="bug-confirm-keep">KEEP EDITING</button>
        </div>
    `,e.appendChild(t),t.querySelector(`#bug-confirm-discard`).addEventListener(`click`,()=>{Oe()}),t.querySelector(`#bug-confirm-keep`).addEventListener(`click`,()=>{t.remove()})}function je(){!o||!a||(Ce?ke():De())}function Me(e,t,n){let r=document.getElementById(e),i=document.getElementById(t);r&&i&&(i.textContent=r.value.length+` / `+n)}function Ne(){let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`);e&&e.addEventListener(`input`,()=>Me(`bug-report-title`,`bug-title-count`,60)),t&&t.addEventListener(`input`,()=>Me(`bug-report-desc`,`bug-desc-count`,250))}function Pe(){let e=document.createElement(`canvas`),t=e.getContext(`webgl2`)??e.getContext(`webgl`);if(!t)return`Unknown (WebGL unavailable)`;let n=t.getExtension(`WEBGL_debug_renderer_info`);return n?t.getParameter(n.UNMASKED_RENDERER_WEBGL)||`Unknown`:`Unknown (renderer info unavailable)`}function Fe(){let e=document.getElementById(`swarm-version`);e&&(e.textContent=`> SWARM_OS ${t}`)}function Ie(e){let t=`═`.repeat(36),n=e=>`║`+e.padEnd(36)+`║`;return[`╔`+t+`╗`,n(`      BUG REPORT UPLINKED`),`╠`+t+`╣`,n(``),n(`   »» TICKET: `+e.toUpperCase()+` ««`),n(``),n(`      STATUS: ACKNOWLEDGED`),n(`      ROUTE:  SWARM CENTRAL`),`╚`+t+`╝`].join(`
`)}function Le(e){let t=()=>{e.value=``,e.removeEventListener(`focus`,t),e.removeEventListener(`keydown`,t)};e.addEventListener(`focus`,t,{once:!0}),e.addEventListener(`keydown`,t,{once:!0})}async function Re(){if(we)return;let e=document.getElementById(`bug-report-title`),t=document.getElementById(`bug-report-desc`),n=document.getElementById(`bug-report-send`),r=document.getElementById(`telemetry-toggle`);if(!e||!t||!n||!e.value.trim()||!t.value.trim())return;we=!0,n.textContent=`UPLINKING...`,n.disabled=!0;let i=!!r?.checked,a={title:e.value.trim(),description:t.value.trim(),includeTelemetry:i};i&&(a.gpuInfo=Pe());try{let n=await Te(`/api/report-bug`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(a)},1e4);if(!n.ok){let e=await n.json().catch(()=>null);throw Error(e?.error||`Uplink failed`)}let r=await n.json();e.value=``,t.value=Ie(r.id??`UNKNOWN`),Le(t)}catch(e){t.value=`[ ERR :: UPLINK FAILED ]
> Transmission interrupted.
> Details: `+(e instanceof Error&&e.name===`AbortError`?`Uplink timed out`:e instanceof Error?e.message:typeof e==`string`?e:`Unknown error`)}finally{we=!1,n.textContent=`SEND`,n.disabled=!1}}function ze(e){i=e;let t=document.getElementById(`ice-status`),n=document.getElementById(`sentinel-status`),r=document.getElementById(`stealth-status`);t&&(t.textContent=`STANDBY`,t.className=`status-standby`),n&&(n.textContent=`STANDBY`,n.className=`status-standby`),r&&(r.textContent=`STANDBY`,r.className=`status-standby`),e===`iceburn`&&t?(t.textContent=`[ ACTIVE ]`,t.className=`status-iceburn-pulse`):e===`sentinel`&&n?(n.textContent=`[ ACTIVE ]`,n.className=`status-sentinel`):e===`ghost`&&r&&(r.textContent=`[ CLOAKED ]`,r.className=`status-ghost`),o&&a&&Ge()}function Be(){o=!o,h&&h.setAttribute(`aria-pressed`,o?`true`:`false`),o?(h.classList.add(`on`),He()):(h.classList.remove(`on`),typeof closeParticleLab==`function`&&closeParticleLab(),typeof closeResourceRouter==`function`&&closeResourceRouter(),typeof closeBeeSim==`function`&&closeBeeSim(),typeof closeRingBuffer==`function`&&closeRingBuffer(),typeof closeDocsViewer==`function`&&closeDocsViewer(),Ce&&Oe(),ce(),oe(),Ze(),$e(),Ve())}function Ve(){ve(),a=!1,h&&h.setAttribute(`aria-pressed`,`false`),l.style.display=`flex`,u.style.display=`none`,d.style.display=`none`,f.style.display=`none`,m.classList.remove(`active`),ee.innerHTML=``,p.style.display=`none`,te.innerHTML=``,m.innerHTML=``,ne.style.display=`none`,document.getElementById(`protocol-selector`).value=`standby`,i=`standby`}function He(){l.style.display=`none`,u.style.display=`flex`,ye(()=>{ne.style.display=`block`},200);let e=600;_e.forEach((t,n)=>{ye(()=>{let e=document.createElement(`div`);e.innerHTML=t,ee.appendChild(e),n===8&&(p.style.display=`block`)},e),e+=250}),ye(()=>{u.style.display=`none`,We()},e+800)}function Ue(e,t,n,r,i,a,o){for(let s=0;s<t;s++){let t=document.createElement(`div`);t.className=`flame-shard`,t.style.backgroundColor=n,t.style.left=`${Math.random()*100}%`,t.style.width=`${2+Math.random()*10}%`,t.style.height=`${a+Math.random()*(o-a)}%`,t.style.zIndex=i,t.style.animationDuration=`${r+Math.random()}s`,t.style.animationDelay=`${Math.random()*2}s`,e.appendChild(t)}}function We(){d.style.display=`block`,te.innerHTML=``;for(let e=0;e<80;e++){let e=document.createElement(`div`);e.className=`bee`,e.style.top=`${Math.random()*100}%`,e.style.animationDuration=`${2+Math.random()*3}s, ${.1+Math.random()*.3}s`,e.style.animationDelay=`${Math.random()*3}s, 0s`,e.style.transform=`scale(${.5+Math.random()})`,te.appendChild(e)}ye(()=>{d.style.display=`none`,Ke()},5e3)}function Ge(){if(m.innerHTML=``,i===`iceburn`){let e=n[r].flames;Ue(m,20,e[0],1.5,1,60,100),Ue(m,25,e[1],1.2,2,40,80),Ue(m,30,e[2],.8,3,20,60),Ue(m,15,e[3],.5,4,10,40)}else if(i===`sentinel`)for(let e=0;e<20;e++){let e=document.createElement(`div`);e.className=`sentinel-dot`,e.style.left=`${5+Math.random()*90}%`,e.style.top=`${10+Math.random()*70}%`,e.style.animationDuration=`${.8+Math.random()*1.5}s`,e.style.animationDelay=`${Math.random()*2}s`,m.appendChild(e)}else if(i===`ghost`)for(let e=0;e<12;e++){let e=document.createElement(`div`);e.className=`ghost-bar`,e.style.top=`${Math.random()*100}%`,e.style.width=`${10+Math.random()*30}%`,e.style.animationDuration=`${1.5+Math.random()*3}s`,e.style.animationDelay=`${Math.random()*3}s`,m.appendChild(e)}else{let e=document.createElement(`div`);e.className=`mini-standby-label`,e.textContent=`STANDBY`,m.appendChild(e)}}function Ke(){a=!0,f.style.display=`flex`,m.classList.add(`active`),ze(i),Ge()}setInterval(()=>{let e=document.getElementById(`sys-time`);e&&(e.innerText=`SYS.TIME: ${new Date().toLocaleTimeString()}`)},1e3);var qe=null;function Je(e,t,n,r){let i=!1,a=[],o=(e,t)=>{let n=setTimeout(()=>{i||e()},t);return a.push(n),n};e.style.display=`flex`,t.innerHTML=``;let s=150;return n.forEach((e,r)=>{o(()=>{let i=document.createElement(`div`);if(i.textContent=e,i.classList.add(`visible`),t.appendChild(i),r===n.length-1){let e=document.createElement(`div`);e.className=`plab-load-bar`,t.appendChild(e)}},s),s+=250}),o(()=>{e.style.display=`none`,r()},s+600),()=>{i=!0,a.forEach(clearTimeout),a.length=0,e.style.display=`none`}}var Ye=[`> EXEC sys_monitor.exe`,`> POLLING HARDWARE INTERFACES...`,`> LOADING PROCESS TABLE...`,`> SENSORS ONLINE.`];function Xe(){let e=document.getElementById(`layer-sysmon`),t=document.getElementById(`sysmon-loading`),n=document.getElementById(`sysmon-loading-text`),r=document.getElementById(`sysmon-app`);ue(`layer-sysmon`),e.style.display=`flex`,r.style.display=`none`,qe&&=(qe(),null),qe=Je(t,n,Ye,()=>{qe=null,r.style.display=`flex`,ze(i)})}function Ze(){qe&&=(qe(),null),document.getElementById(`layer-sysmon`).style.display=`none`,fe(`layer-sysmon`)}function Qe(e){ue(`layer-placeholder`),document.getElementById(`placeholder-name`).textContent=e,document.getElementById(`layer-placeholder`).style.display=`block`}function $e(){document.getElementById(`layer-placeholder`).style.display=`none`,fe(`layer-placeholder`)}Fe(),le(),Ne(),window.rememberFocusForLayer=ue,window.restoreFocusForLayer=fe,window.appBootAnimation=Je,window.changeTheme=be,window.toggleLightMode=Se,window.changeProtocol=ze,window.toggleBugReport=je,window.cancelBugReport=ke,window.closeSysMon=Ze,window.closeAppsFolder=oe,window.closeDocsFolder=ce,window.closePlaceholder=$e,document.getElementById(`bug-report-send`)?.addEventListener(`click`,Re);var _=document.getElementById(`particleCanvas`),v=_.getContext(`2d`),et=document.getElementById(`plab-canvas-wrap`),tt=document.getElementById(`layer-particle-lab`),nt=document.getElementById(`plab-loading`),rt=document.getElementById(`plab-loading-text`),it=document.getElementById(`plab-app`),y={mode:`plexus`,amount:150,size:3,speed:1.5,gravity:0,repelStrength:1.5,trails:0,shape:`circle`,colormode:`solid`,color:`#00ffcc`},b=[],x=100,S=100,at=!1,ot=null,st=null,ct=null,lt=null,ut=320,dt=320,C={x:-1e3,y:-1e3,leftDown:!1,rightDown:!1,attractRadius:150};_.addEventListener(`mousedown`,e=>{e.button===0&&(C.leftDown=!0),e.button===2&&(C.rightDown=!0)}),_.addEventListener(`mouseup`,e=>{e.button===0&&(C.leftDown=!1),e.button===2&&(C.rightDown=!1)}),_.addEventListener(`mousemove`,e=>{let t=_.getBoundingClientRect();C.x=e.clientX-t.left,C.y=e.clientY-t.top}),_.addEventListener(`mouseleave`,()=>{C.leftDown=!1,C.rightDown=!1,C.x=-1e3}),_.addEventListener(`contextmenu`,e=>e.preventDefault());function ft(){x=et.clientWidth,S=et.clientHeight,_.width=x,_.height=S}function w(e,t){return Math.random()*(t-e)+e}var pt=[`#00ffcc`,`#ff00ff`,`#00ff00`,`#ffff00`,`#ff3300`,`#0066ff`];function mt(){return pt[Math.floor(Math.random()*pt.length)]}function ht(e){let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:{r:0,g:255,b:204}}var gt=class{x;y;vx;vy;baseColor;da;ds;w;constructor(e,t,n){this.x=e||w(0,x),this.y=t||w(0,S);let r=w(0,Math.PI*2),i=n?w(y.speed*2,y.speed*5):w(y.speed*.2,y.speed);this.vx=Math.cos(r)*i,this.vy=Math.sin(r)*i,this.baseColor=mt(),this.da=w(0,Math.PI*2),this.ds=w(.02,.05),this.w=w(.5,1.5)}update(){if(C.leftDown||C.rightDown){let e=C.x-this.x,t=C.y-this.y,n=Math.sqrt(e*e+t*t),r=Math.atan2(t,e);if(C.leftDown&&n<150){let e=(150-n)/150;this.vx-=Math.cos(r)*e*y.repelStrength,this.vy-=Math.sin(r)*e*y.repelStrength}if(C.rightDown&&n<C.attractRadius){let e=(C.attractRadius-n)/C.attractRadius;this.vx+=Math.cos(r)*e*.8,this.vy+=Math.sin(r)*e*.8}}if(y.mode===`snow`)this.y+=y.speed*.5*this.w+y.gravity,this.x+=Math.sin(this.da)*(y.speed*.5),this.da+=this.ds,this.y>S+y.size?(this.y=-y.size,this.x=w(0,x)):this.y<-y.size&&y.gravity<0&&(this.y=S+y.size,this.x=w(0,x)),this.x>x+y.size&&(this.x=-y.size),this.x<-y.size&&(this.x=x+y.size);else if(y.mode===`vortex`){let e=x/2,t=S/2,n=e-this.x,r=t-this.y,i=Math.sqrt(n*n+r*r),a=Math.atan2(r,n),o=a+Math.PI/2,s=y.gravity,c=y.speed*1.5,l=Math.cos(o)*c+Math.cos(a)*s*5,u=Math.sin(o)*c+Math.sin(a)*s*5;if(this.vx+=(l-this.vx)*.05,this.vy+=(u-this.vy)*.05,this.x+=this.vx,this.y+=this.vy,i<10&&s>0){let n=w(0,Math.PI*2),r=Math.max(x,S)/1.5;this.x=e+Math.cos(n)*r,this.y=t+Math.sin(n)*r}else if(i>Math.max(x,S)&&s<0){let n=w(0,Math.PI*2);this.x=e+Math.cos(n)*20,this.y=t+Math.sin(n)*20}}else if(y.mode===`liquid`){this.vy+=y.gravity,this.x+=this.vx,this.y+=this.vy;let e=b.length>ut?Math.ceil(b.length/ut):1;for(let t=0;t<b.length;t+=e){let e=b[t];if(e===this)continue;let n=e.x-this.x,r=e.y-this.y,i=Math.sqrt(n*n+r*r);if(i<y.size*4&&i>0)if(i<y.size*2){let e=(y.size*2-i)*.05;this.vx-=n/i*e,this.vy-=r/i*e}else{let e=(i-y.size*2)*.005;this.vx+=n/i*e,this.vy+=r/i*e}}this.vx*=.98,this.vy*=.99,this.x<0&&(this.x=0,this.vx*=-.5),this.x>x&&(this.x=x,this.vx*=-.5),this.y<0&&(this.y=0,this.vy*=-.5),this.y>S&&(this.y=S,this.vy*=-.3,this.vx*=.8)}else{this.vy+=y.gravity,this.x+=this.vx,this.y+=this.vy;let e=Math.sqrt(this.vx*this.vx+this.vy*this.vy);e>y.speed*2&&y.gravity===0&&!C.leftDown&&!C.rightDown?(this.vx*=.95,this.vy*=.95):e<y.speed*.5&&y.gravity===0&&y.speed>0&&(this.vx*=1.05,this.vy*=1.05),this.x<0&&(this.x=0,this.vx*=-1),this.x>x&&(this.x=x,this.vx*=-1),this.y<0&&(this.y=0,this.vy*=-1),this.y>S&&(this.y=S,this.vy*=-.8,y.gravity>0&&(this.vx*=.98))}}draw(){let e=y.color,t=Math.sqrt(this.vx*this.vx+this.vy*this.vy);if(y.colormode===`random`)e=this.baseColor;else if(y.colormode===`velocity`){let n=y.mode===`snow`?y.speed*.5*this.w:t;e=`hsl(${Math.min(280,n*25)},100%,50%)`}v.fillStyle=e,v.beginPath();let n=y.size;if(y.shape===`square`)v.rect(this.x-n/2,this.y-n/2,n,n);else if(y.shape===`circle`)v.arc(this.x,this.y,n/2,0,Math.PI*2);else if(y.shape===`triangle`){let e=Math.atan2(this.vy,this.vx);v.translate(this.x,this.y),v.rotate(e),v.moveTo(n,0),v.lineTo(-n/2,n/2),v.lineTo(-n/2,-n/2),v.rotate(-e),v.translate(-this.x,-this.y)}else if(y.shape===`star`){let e=n,t=n/2,r=Math.PI/2*3,i=Math.PI/5;v.moveTo(this.x,this.y-e);for(let n=0;n<5;n++)v.lineTo(this.x+Math.cos(r)*e,this.y+Math.sin(r)*e),r+=i,v.lineTo(this.x+Math.cos(r)*t,this.y+Math.sin(r)*t),r+=i}v.fill()}};function _t(){for(;b.length<y.amount;)b.push(new gt);b.length>y.amount&&b.splice(y.amount)}function vt(){if(!at)return;C.rightDown?C.attractRadius=Math.min(C.attractRadius+5,Math.max(x,S)):C.attractRadius=150;let e=1-y.trails;e<.01&&(e=.01),v.fillStyle=`rgba(0,0,0,${e})`,v.fillRect(0,0,x,S);for(let e=0;e<b.length;e++)b[e].update(),b[e].draw();if(y.mode===`plexus`){let e=ht(y.color),t=b.length>dt?Math.ceil(b.length/dt):1;for(let n=0;n<b.length;n+=t)for(let r=n+t;r<b.length;r+=t){let t=b[n].x-b[r].x,i=b[n].y-b[r].y,a=Math.sqrt(t*t+i*i);a<120&&(v.beginPath(),v.strokeStyle=`rgba(${e.r},${e.g},${e.b},${1-a/120})`,v.lineWidth=1,v.moveTo(b[n].x,b[n].y),v.lineTo(b[r].x,b[r].y),v.stroke())}}ot=requestAnimationFrame(vt)}function yt(e,t,n){let r=document.getElementById(`ctrl-${e}`),i=document.getElementById(`val-${e}`);r.addEventListener(`input`,()=>{let e=n?parseFloat(r.value):parseInt(r.value,10);Number.isNaN(e)||(y[t]=e,i&&(i.textContent=String(y[t])),t===`amount`&&_t())})}yt(`amount`,`amount`),yt(`size`,`size`),yt(`speed`,`speed`,!0),yt(`gravity`,`gravity`,!0),yt(`trails`,`trails`,!0),yt(`repel`,`repelStrength`,!0),document.getElementById(`ctrl-shape`).addEventListener(`change`,e=>{y.shape=e.target.value}),document.getElementById(`ctrl-colormode`).addEventListener(`change`,e=>{y.colormode=e.target.value,document.getElementById(`solid-color-group`).style.display=y.colormode===`solid`?`flex`:`none`}),document.getElementById(`ctrl-color`).addEventListener(`input`,e=>{y.color=e.target.value}),document.getElementById(`btn-explode`).addEventListener(`click`,()=>{let e=x/2,t=S/2;b.forEach(n=>{n.x=e,n.y=t;let r=w(0,Math.PI*2),i=w(5,20);n.vx=Math.cos(r)*i,n.vy=Math.sin(r)*i})});var bt=document.getElementById(`btn-snow`),xt=document.getElementById(`btn-vortex`),St=document.getElementById(`btn-plexus`),Ct=document.getElementById(`btn-liquid`);function T(e,t,n){y[e]=t;let r=document.getElementById(`ctrl-${e}`);if(r&&(r.value=String(t)),n!=null){let t=document.getElementById(`val-${e}`);t&&(t.textContent=String(n))}e===`amount`&&_t()}function wt(e){y.mode=e,bt.classList.remove(`active`),bt.textContent=`Snow`,xt.classList.remove(`active`),xt.textContent=`Vortex`,St.classList.remove(`active`),St.textContent=`Plexus`,Ct.classList.remove(`active`),Ct.textContent=`Liquid`,_.classList.remove(`gooey-effect`);let t=document.getElementById(`ctrl-size`);t&&(t.disabled=!1);let n=document.getElementById(`ctrl-shape`),r=document.getElementById(`ctrl-colormode`),i=document.getElementById(`ctrl-color`),a=document.getElementById(`solid-color-group`);e===`snow`?(bt.classList.add(`active`),bt.textContent=`✓ Snow`,T(`shape`,`circle`),n.value=`circle`,T(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,T(`color`,`#ffffff`),i.value=`#ffffff`,T(`gravity`,0,`0`),T(`speed`,3,`3`),T(`trails`,.5,`0.5`)):e===`vortex`?(xt.classList.add(`active`),xt.textContent=`✓ Vortex`,T(`shape`,`triangle`),n.value=`triangle`,T(`colormode`,`velocity`),r.value=`velocity`,a.style.display=`none`,T(`gravity`,.5,`0.5`),T(`speed`,6,`6`),T(`trails`,.9,`0.9`)):e===`plexus`?(St.classList.add(`active`),St.textContent=`✓ Plexus`,T(`amount`,150,`150`),T(`shape`,`circle`),n.value=`circle`,T(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,T(`color`,`#00ffcc`),i.value=`#00ffcc`,T(`gravity`,0,`0`),T(`speed`,1.5,`1.5`),T(`trails`,0,`0`)):e===`liquid`?(Ct.classList.add(`active`),Ct.textContent=`✓ Liquid`,_.classList.add(`gooey-effect`),T(`amount`,100,`100`),T(`size`,20,`20`),T(`shape`,`circle`),n.value=`circle`,T(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,T(`color`,`#00aaff`),i.value=`#00aaff`,T(`gravity`,.5,`0.5`),T(`speed`,2,`2`),T(`trails`,0,`0`),t&&(t.disabled=!0)):(T(`shape`,`circle`),n.value=`circle`,T(`colormode`,`solid`),r.value=`solid`,a.style.display=`flex`,T(`color`,`#00ffcc`),i.value=`#00ffcc`,T(`gravity`,0,`0`),T(`speed`,1.5,`1.5`),T(`trails`,0,`0`),T(`amount`,150,`150`),b.forEach(e=>{let t=w(0,Math.PI*2),n=w(y.speed*.2,y.speed);e.vx=Math.cos(t)*n,e.vy=Math.sin(t)*n}))}bt.addEventListener(`click`,()=>wt(y.mode===`snow`?`normal`:`snow`)),xt.addEventListener(`click`,()=>wt(y.mode===`vortex`?`normal`:`vortex`)),St.addEventListener(`click`,()=>wt(y.mode===`plexus`?`normal`:`plexus`)),Ct.addEventListener(`click`,()=>wt(y.mode===`liquid`?`normal`:`liquid`));var Tt=[],Et=document.getElementById(`ctrl-presets`);document.getElementById(`btn-save-preset`).addEventListener(`click`,()=>{Tt.push(JSON.parse(JSON.stringify(y)));let e=Tt.length-1;Tt.length===1&&(Et.innerHTML=``);let t=document.createElement(`option`);t.value=String(e),t.textContent=`Preset ${e+1}`,Et.appendChild(t),Et.value=String(e);let n=document.getElementById(`btn-save-preset`),r=n.textContent;n.textContent=`Saved!`,setTimeout(()=>n.textContent=r,1e3)}),document.getElementById(`btn-load-preset`).addEventListener(`click`,()=>{let e=parseInt(Et.value,10);!Number.isNaN(e)&&e>=0&&e<Tt.length&&Tt[e]&&(Object.assign(y,JSON.parse(JSON.stringify(Tt[e]))),T(`amount`,y.amount,y.amount),T(`size`,y.size,y.size),T(`speed`,y.speed,y.speed),T(`gravity`,y.gravity,y.gravity),T(`repel`,y.repelStrength,y.repelStrength),T(`trails`,y.trails,y.trails),document.getElementById(`ctrl-shape`).value=y.shape,document.getElementById(`ctrl-colormode`).value=y.colormode,document.getElementById(`ctrl-color`).value=y.color,document.getElementById(`solid-color-group`).style.display=y.colormode===`solid`?`flex`:`none`,[[`snow`,bt],[`vortex`,xt],[`plexus`,St],[`liquid`,Ct]].forEach(([e,t])=>{t.classList.toggle(`active`,y.mode===e),t.textContent=y.mode===e?`\u2713 ${e[0].toUpperCase()+e.slice(1)}`:e[0].toUpperCase()+e.slice(1)}),y.mode===`liquid`?(_.classList.add(`gooey-effect`),y.size=20,T(`size`,20,`20`),document.getElementById(`ctrl-size`).disabled=!0):(_.classList.remove(`gooey-effect`),document.getElementById(`ctrl-size`).disabled=!1))});var Dt=[`> EXEC particle_lab.exe`,`> LOADING RENDER ENGINE... [OK]`,`> ALLOCATING PARTICLE BUFFER...`,`> LINKING PHYSICS SUBSYSTEM...`,`> DISPLAY READY.`];function Ot(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-particle-lab`),tt.style.display=`flex`,it.style.display=`none`,st&&=(st(),null),ct||(ct=()=>{at&&ft()},window.addEventListener(`resize`,ct)),lt||(lt=()=>{if(at){if(document.hidden){ot&&cancelAnimationFrame(ot),ot=null;return}ot||vt()}},document.addEventListener(`visibilitychange`,lt)),st=appBootAnimation(nt,rt,Dt,()=>{st=null,it.style.display=`flex`,at=!0,y.mode===`liquid`&&_.classList.add(`gooey-effect`),requestAnimationFrame(()=>{ft(),_t(),vt()})})}function kt(){try{st&&=(st(),null),tt.style.display=`none`,_.classList.remove(`gooey-effect`),typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-particle-lab`)}finally{at=!1,ot&&cancelAnimationFrame(ot),ot=null,ct&&=(window.removeEventListener(`resize`,ct),null),lt&&=(document.removeEventListener(`visibilitychange`,lt),null)}}function At(){document.getElementById(`plab-controls`).classList.toggle(`collapsed`)}window.launchParticleLab=Ot,window.closeParticleLab=kt,window.togglePlabControls=At;var jt=null,Mt=[`> EXEC resource_router.exe`,`> CONNECTING TO GLOBAL NETWORK...`,`> NO ROUTES CONFIGURED.`,`> AWAITING OPERATOR INPUT.`];function Nt(){let e=document.getElementById(`layer-resource-router`),t=document.getElementById(`router-loading`),n=document.getElementById(`router-loading-text`),r=document.getElementById(`router-app`);typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-resource-router`),e.style.display=`flex`,r.style.display=`none`,jt&&=(jt(),null),jt=appBootAnimation(t,n,Mt,()=>{jt=null,r.style.display=`flex`})}function Pt(){jt&&=(jt(),null),document.getElementById(`layer-resource-router`).style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-resource-router`)}window.launchResourceRouter=Nt,window.closeResourceRouter=Pt;var E=document.getElementById(`beeSimCanvas`),D=E.getContext(`2d`),Ft=document.getElementById(`beesim-canvas-wrap`),It=document.getElementById(`layer-beesim`),Lt=document.getElementById(`beesim-app`),Rt=document.getElementById(`beesim-loading`),zt=document.getElementById(`beesim-loading-text`),Bt=!1,O=null,Vt=null,Ht=null,Ut=null,Wt=75,k=13,A=5,Gt=Math.PI*.75,Kt=4,j,M,N={};[`bee-cohesion`,`bee-alignment`,`bee-separation`,`bee-speed`,`bee-vision`].forEach(e=>{let t=document.getElementById(e),n=document.getElementById(e+`Val`),r=e.replace(`bee-`,``);N[r]={el:t,get value(){return+t.value}},t.addEventListener(`input`,()=>{n.textContent=t.value})});var qt=document.getElementById(`bee-showVision`),P={x:-9999,y:-9999,active:!1,repel:!1};E.addEventListener(`mousemove`,e=>{let t=E.getBoundingClientRect();P.x=e.clientX-t.left,P.y=e.clientY-t.top}),E.addEventListener(`mousedown`,e=>{e.preventDefault(),P.active=!0,P.repel=e.button===2}),E.addEventListener(`mouseup`,()=>{P.active=!1}),E.addEventListener(`contextmenu`,e=>e.preventDefault()),E.addEventListener(`touchstart`,e=>{let t=e.touches[0],n=E.getBoundingClientRect();P.x=t.clientX-n.left,P.y=t.clientY-n.top,P.active=!0},{passive:!0}),E.addEventListener(`touchmove`,e=>{let t=e.touches[0],n=E.getBoundingClientRect();P.x=t.clientX-n.left,P.y=t.clientY-n.top},{passive:!0}),E.addEventListener(`touchend`,()=>{P.active=!1});function Jt(e,t){let n=e.x-t.x,r=e.y-t.y;return n*n+r*r}function Yt(e,t){let n=Jt(e,t);return n===0?0:Math.sqrt(n)}var Xt=[];function Zt(e,t,n){Xt.length>400||Xt.push({x:e,y:t,vx:(Math.random()-.5)*1.5,vy:-Math.random()*1.2-.3,life:20+Math.random()*25,maxLife:45,size:1+Math.random()*2,type:n})}function Qt(){for(let e=Xt.length-1;e>=0;e--){let t=Xt[e];t.x+=t.vx,t.y+=t.vy,t.vy-=.01,t.vx*=.98,--t.life<=0&&Xt.splice(e,1)}}function $t(){for(let e of Xt){let t=e.life/e.maxLife;D.fillStyle=e.type===`honey`?`rgba(255,180,40,${t*.8})`:`rgba(255,220,60,${t*.7})`,D.beginPath(),D.arc(e.x,e.y,e.size*t,0,Math.PI*2),D.fill()}}var F=[],I={x:0,y:0},en=0;function tn(){F=[];for(let e=-A;e<=A;e++){let t=Math.max(-A,-e-A),n=Math.min(A,-e+A);for(let r=t;r<=n;r++)F.push({q:e,r,x:0,y:0,beeIndex:-1,honey:0})}F.sort((e,t)=>e.q*e.q+e.r*e.r+e.q*e.r-(t.q*t.q+t.r*t.r+t.q*t.r));for(let e=Wt;e<F.length;e++)F[e].honey=.4+Math.random()*.6}function nn(){let e=k*A*1.8;j<600?(I.x=j/2,I.y=e+20):(I.x=j-e-35,I.y=e+45);for(let e of F)e.x=I.x+k*1.5*e.q,e.y=I.y+k*(Math.sqrt(3)/2*e.q+Math.sqrt(3)*e.r)}function rn(e,t,n){D.beginPath();for(let r=0;r<6;r++){let i=Math.PI/3*r,a=e+n*Math.cos(i),o=t+n*Math.sin(i);r===0?D.moveTo(a,o):D.lineTo(a,o)}D.closePath()}function an(e){let t=k*(A+3)*1.7,n=D.createRadialGradient(I.x,I.y,t*.15,I.x,I.y,t);n.addColorStop(0,`rgba(255,170,40,0.12)`),n.addColorStop(.6,`rgba(255,140,20,0.04)`),n.addColorStop(1,`rgba(255,140,20,0)`),D.fillStyle=n,D.beginPath(),D.arc(I.x,I.y,t,0,Math.PI*2),D.fill(),en=0;for(let t=0;t<F.length;t++){let n=F[t];en+=n.honey;let r=n.beeIndex>=0?L[n.beeIndex]:null,i=r&&r.state===`sleeping`;if(rn(n.x,n.y,k-1.5),i)D.fillStyle=`rgba(50,35,8,0.95)`;else{let e=n.honey;D.fillStyle=`rgba(${Math.floor(38+e*185)},${Math.floor(26+e*135)},${Math.floor(8+e*28)},0.9)`}D.fill(),n.honey>.15&&!i&&(rn(n.x-1.5,n.y-1.5,k*.4*n.honey),D.fillStyle=`rgba(255,235,140,${.06+n.honey*.12})`,D.fill()),n.honey>.85&&(rn(n.x,n.y,k-2.5),D.fillStyle=`rgba(255,245,180,${.04+Math.sin(e*.05+t)*.025})`,D.fill()),rn(n.x,n.y,k-.5),D.strokeStyle=`rgba(210,170,60,${.35+n.honey*.2})`,D.lineWidth=1.3,D.stroke(),i&&on(n.x,n.y,r,e)}let r=L.filter(e=>e.state===`sleeping`).length,i=L.filter(e=>e.state===`collecting`).length,a=L.filter(e=>e.state===`returning`).length,o=Wt-r-i-a;D.fillStyle=`rgba(240,220,140,0.55)`,D.font=`11px Segoe UI, sans-serif`,D.textAlign=`center`;let s=I.y+k*A*Math.sqrt(3)+18;D.fillText(`Honey: ${en.toFixed(1)} · Flying ${o} · Collecting ${i} · Returning ${a} · Sleeping ${r}`,I.x,s)}function on(e,t,n,r){D.save(),D.translate(e,t);let i=D.createLinearGradient(-4,0,4,0);i.addColorStop(0,`#b8860b`),i.addColorStop(.4,`#ffd700`),i.addColorStop(.55,`#2a1800`),i.addColorStop(.7,`#ffd700`),i.addColorStop(1,`#daa520`),D.beginPath(),D.ellipse(0,0,5,3.2,0,0,Math.PI*2),D.fillStyle=i,D.fill(),D.globalAlpha=.25,D.fillStyle=`rgba(190,210,255,1)`,D.beginPath(),D.ellipse(-1,-3,3,1.8,-.3,0,Math.PI*2),D.fill(),D.beginPath(),D.ellipse(-1,3,3,1.8,.3,0,Math.PI*2),D.fill(),D.globalAlpha=1,n.cargo>0&&(D.fillStyle=`rgba(255,200,40,0.6)`,D.beginPath(),D.ellipse(-1,-4.5,2,1.4,0,0,Math.PI*2),D.fill(),D.beginPath(),D.ellipse(-1,4.5,2,1.4,0,0,Math.PI*2),D.fill());let a=n.sleepTimer||0;D.fillStyle=`rgba(180,190,255,${.3+.25*Math.sin(a*.06)})`,D.font=`bold 8px sans-serif`,D.textAlign=`left`;let o=-6-Math.sin(a*.04)*2;D.fillText(`z`,3,o),D.font=`bold 6px sans-serif`,D.fillText(`z`,7,o-5);let s=n.stamina/n.maxStamina;D.beginPath(),D.arc(0,0,7,-Math.PI/2,-Math.PI/2+Math.PI*2*s),D.strokeStyle=`rgba(120,255,120,${.2+s*.15})`,D.lineWidth=1.2,D.stroke(),D.restore()}var sn=[];function cn(){sn=[];let e=Math.max(7,Math.min(14,Math.floor(j*M/75e3)));for(let t=0;t<e;t++){let e,t,n=0;do e=40+Math.random()*(j-80),t=60+Math.random()*(M-120),n++;while(n<60&&Yt({x:e,y:t},I)<k*A*3);let r=5+Math.random()*5;sn.push({x:e,y:t,nectar:r*(.4+Math.random()*.6),maxNectar:r,regen:.0025+Math.random()*.002,size:14+Math.random()*10,hue:[45,340,300,25,15,55,195][Math.floor(Math.random()*7)],petals:5+Math.floor(Math.random()*4),phase:Math.random()*Math.PI*2})}}function ln(){for(let e of sn)e.nectar<e.maxNectar&&(e.nectar=Math.min(e.maxNectar,e.nectar+e.regen))}function un(e){for(let t of sn){let n=t.nectar/t.maxNectar;if(D.save(),D.translate(t.x,t.y),D.rotate(Math.sin(e*.015+t.phase)*.04),n>.05){let e=t.size*2+n*t.size,r=D.createRadialGradient(0,0,2,0,0,e);r.addColorStop(0,`hsla(${t.hue},80%,60%,${n*.07})`),r.addColorStop(1,`hsla(${t.hue},80%,60%,0)`),D.fillStyle=r,D.beginPath(),D.arc(0,0,e,0,Math.PI*2),D.fill()}D.beginPath(),D.moveTo(0,t.size*.3),D.quadraticCurveTo(2,t.size*1.2,0,t.size*2),D.strokeStyle=`rgba(60,130,40,${.2+n*.2})`,D.lineWidth=2,D.stroke(),D.save(),D.translate(1,t.size*1.1),D.rotate(.3),D.beginPath(),D.ellipse(6,0,7,3,.2,0,Math.PI*2),D.fillStyle=`rgba(50,120,35,${.15+n*.1})`,D.fill(),D.restore();let r=t.size*(.38+n*.15),i=.18+n*.38;for(let a=0;a<t.petals;a++)D.save(),D.rotate(Math.PI*2/t.petals*a+Math.sin(e*.02+t.phase)*.02),D.beginPath(),D.ellipse(t.size*.55,0,r,r*.48,0,0,Math.PI*2),D.fillStyle=`hsla(${t.hue},75%,${48+n*15}%,${i})`,D.fill(),D.strokeStyle=`hsla(${t.hue},60%,38%,${i*.4})`,D.lineWidth=.5,D.stroke(),D.restore();D.beginPath(),D.arc(0,0,t.size*.25,0,Math.PI*2);let a=D.createRadialGradient(0,0,0,0,0,t.size*.25);a.addColorStop(0,`rgba(255,220,60,${.35+n*.35})`),a.addColorStop(1,`rgba(200,160,40,${.25+n*.25})`),D.fillStyle=a,D.fill(),D.beginPath(),D.arc(0,0,t.size*.35,-Math.PI/2,-Math.PI/2+Math.PI*2*n),D.strokeStyle=`rgba(255,230,100,${.15+n*.4})`,D.lineWidth=2,D.stroke(),D.restore()}}var dn=class{index;x;y;vx;vy;wingPhase;wobble;stamina;maxStamina;drainRate;rechargeRate;tiredAt;wakeAt;state;cellIndex;sleepTimer;cargo;targetFlower;collectTimer;collectDuration;constructor(e){this.index=e,this.x=100+Math.random()*400,this.y=100+Math.random()*300;let t=Math.random()*Math.PI*2;this.vx=Math.cos(t)*2,this.vy=Math.sin(t)*2,this.wingPhase=Math.random()*Math.PI*2,this.wobble=Math.random()*Math.PI*2,this.stamina=50+Math.random()*50,this.maxStamina=100,this.drainRate=.02+Math.random()*.022,this.rechargeRate=.16+Math.random()*.1,this.tiredAt=15+Math.random()*10,this.wakeAt=82+Math.random()*18,this.state=`foraging`,this.cellIndex=-1,this.sleepTimer=0,this.cargo=0,this.targetFlower=null,this.collectTimer=0,this.collectDuration=65+Math.random()*50}get cell(){return this.cellIndex>=0?F[this.cellIndex]:null}canSee(e){let t=e.x-this.x,n=e.y-this.y,r=t*t+n*n,i=N.vision.value;if(r>i*i||r<.01)return!1;let a=Math.atan2(this.vy,this.vx),o=Math.atan2(n,t)-a;return o>Math.PI&&(o-=Math.PI*2),o<-Math.PI&&(o+=Math.PI*2),Math.abs(o)<Gt}update(e,t){if(this.state===`sleeping`){if(this.sleepTimer++,this.stamina=Math.min(this.maxStamina,this.stamina+this.rechargeRate),this.cargo>0){let e=Math.min(this.cargo,.008);this.cargo-=e;let n=this.cell;if(n&&(n.honey=Math.min(1,n.honey+e*.85)),this.cargo<.01&&(this.cargo=0,t%12==0)){let e=this.cell;e&&Zt(e.x+(Math.random()-.5)*6,e.y+(Math.random()-.5)*6,`honey`)}}if(this.stamina>=this.wakeAt&&this.cargo<=0){this.state=`foraging`;let e=this.cell;if(e){this.x=e.x,this.y=e.y;let t=Math.atan2(e.y-I.y,e.x-I.x)+(Math.random()-.5)*1;this.vx=Math.cos(t)*3,this.vy=Math.sin(t)*3}this.targetFlower=null}return}let n=N.speed.value/15;if(this.state===`collecting`){if(this.collectTimer--,this.stamina-=this.drainRate*.2,this.targetFlower){let e=this.targetFlower;this.x+=(e.x-this.x)*.1,this.y+=(e.y-this.y)*.1,this.x+=Math.sin(t*.08+this.index*2.3)*.7,this.y+=Math.cos(t*.08+this.index*2.3)*.7,t%7==0&&Zt(this.x+(Math.random()-.5)*8,this.y+(Math.random()-.5)*8,`pollen`)}if(this.collectTimer<=0||this.stamina<=this.tiredAt*.5){if(this.targetFlower&&this.targetFlower.nectar>.05){let e=Math.min(1,this.targetFlower.nectar);this.cargo=e,this.targetFlower.nectar-=e}this.state=`returning`,this.targetFlower=null;let e=this.cell;if(e){let t=e.x-this.x,r=e.y-this.y,i=Math.sqrt(t*t+r*r)||1;this.vx=t/i*n,this.vy=r/i*n}}this.wingPhase+=.25;return}if(this.state===`foraging`)if(this.stamina-=this.drainRate,this.stamina<=this.tiredAt)this.state=`returning`,this.targetFlower=null;else{this.applyBoids(e),this.applyMouse(),this.seekFlower();for(let t of sn)if(!(t.nectar<.3)&&Yt(this,t)<18){let n=0;for(let r of e)r.state===`collecting`&&r.targetFlower===t&&n++;if(n<Kt){this.state=`collecting`,this.targetFlower=t,this.collectTimer=this.collectDuration;break}}}if(this.state===`returning`){this.stamina-=this.drainRate*.35;let t=this.cell;if(t){let e=t.x-this.x,n=t.y-this.y,r=Math.sqrt(e*e+n*n);if(r<8){if(this.cargo>0)for(let e=0;e<3;e++)Zt(t.x+(Math.random()-.5)*8,t.y+(Math.random()-.5)*8,`honey`);this.state=`sleeping`,this.x=t.x,this.y=t.y,this.vx=0,this.vy=0,this.sleepTimer=0;return}this.vx+=e/r*.5,this.vy+=n/r*.5}this.applySep(e,.3)}let r=.3;this.x<40&&(this.vx+=r),this.x>j-40&&(this.vx-=r),this.y<40&&(this.vy+=r),this.y>M-40&&(this.vy-=r),this.wobble+=.08;let i=this.state===`returning`?.015:.04;this.vx+=Math.sin(this.wobble)*i,this.vy+=Math.cos(this.wobble*1.3)*i;let a=Math.sqrt(this.vx*this.vx+this.vy*this.vy),o=this.state===`returning`?n*1.25:n;a>o?(this.vx=this.vx/a*o,this.vy=this.vy/a*o):a<o*.2&&a>.01&&(this.vx=this.vx/a*o*.2,this.vy=this.vy/a*o*.2),this.x+=this.vx,this.y+=this.vy,this.wingPhase+=.5,this.stamina=Math.max(0,this.stamina)}seekFlower(){let e=null,t=-1/0;for(let n of sn){if(n.nectar<.4)continue;let r=Yt(this,n);if(r>600)continue;let i=n.nectar/n.maxNectar*.6-r/500;i>t&&(t=i,e=n)}if(e){this.targetFlower=e;let t=e.x-this.x,n=e.y-this.y,r=Math.sqrt(t*t+n*n)||1;this.vx+=t/r*.13,this.vy+=n/r*.13}}applyBoids(e){let t=N.cohesion.value/1e3,n=N.alignment.value/1e3,r=N.separation.value/100,i=0,a=0,o=0,s=0,c=0,l=0,u=0;for(let t of e){if(t===this||t.state===`sleeping`||t.state===`collecting`||!this.canSee(t))continue;let e=t.x-this.x,n=t.y-this.y,r=Math.sqrt(e*e+n*n);u++,i+=t.x,a+=t.y,o+=t.vx,s+=t.vy,r<28&&r>.01&&(c-=e/r*(28-r),l-=n/r*(28-r))}u>0&&(this.vx+=(i/u-this.x)*t,this.vy+=(a/u-this.y)*t,this.vx+=(o/u-this.vx)*n,this.vy+=(s/u-this.vy)*n,this.vx+=c*r,this.vy+=l*r)}applySep(e,t){let n=N.separation.value/100*t,r=0,i=0;for(let t of e){if(t===this||t.state===`sleeping`)continue;let e=t.x-this.x,n=t.y-this.y,a=Math.sqrt(e*e+n*n);a<24&&a>.01&&(r-=e/a*(24-a),i-=n/a*(24-a))}this.vx+=r*n,this.vy+=i*n}applyMouse(){if(!P.active)return;let e=P.x-this.x,t=P.y-this.y,n=Math.sqrt(e*e+t*t);if(n<200&&n>1){let r=P.repel?-.9:.35;this.vx+=e/n*r,this.vy+=t/n*r}}draw(e){if(this.state===`sleeping`)return;let t=Math.atan2(this.vy,this.vx);qt.checked&&this.state===`foraging`&&(D.save(),D.translate(this.x,this.y),D.rotate(t),D.beginPath(),D.moveTo(0,0),D.arc(0,0,N.vision.value,-Gt,Gt),D.closePath(),D.fillStyle=`rgba(240,230,140,0.03)`,D.fill(),D.restore()),D.save(),D.translate(this.x,this.y),this.state===`collecting`?D.rotate(t+Math.sin(e*.12)*.3):D.rotate(t);let n=Math.sin(this.wingPhase)*.5;D.fillStyle=`rgba(200,220,255,0.4)`,D.strokeStyle=`rgba(180,200,240,0.4)`,D.lineWidth=.4,D.beginPath(),D.ellipse(-2,-5,4,7,n-.3,0,Math.PI*2),D.fill(),D.stroke(),D.beginPath(),D.ellipse(-2,5,4,7,-n+.3,0,Math.PI*2),D.fill(),D.stroke();let r=D.createLinearGradient(-9,0,3,0);r.addColorStop(0,`#b8860b`),r.addColorStop(.3,`#ffd700`),r.addColorStop(.5,`#1a1000`),r.addColorStop(.7,`#ffd700`),r.addColorStop(1,`#daa520`),D.beginPath(),D.ellipse(-3,0,6,4,0,0,Math.PI*2),D.fillStyle=r,D.fill(),D.strokeStyle=`rgba(100,70,0,0.5)`,D.lineWidth=.4,D.stroke(),D.strokeStyle=`rgba(30,15,0,0.5)`,D.lineWidth=1.1;for(let e=-2;e<=3;e+=2.5)D.beginPath(),D.moveTo(-3+e,-3.5),D.lineTo(-3+e,3.5),D.stroke();if(D.beginPath(),D.ellipse(5,0,3,2.8,0,0,Math.PI*2),D.fillStyle=`#daa520`,D.fill(),D.fillStyle=`#1a1000`,D.beginPath(),D.arc(6.5,-1.5,1,0,Math.PI*2),D.fill(),D.beginPath(),D.arc(6.5,1.5,1,0,Math.PI*2),D.fill(),D.strokeStyle=`rgba(100,70,0,0.65)`,D.lineWidth=.6,D.beginPath(),D.moveTo(6,-2),D.quadraticCurveTo(10,-6,12,-5),D.stroke(),D.beginPath(),D.moveTo(6,2),D.quadraticCurveTo(10,6,12,5),D.stroke(),D.beginPath(),D.moveTo(-9,0),D.lineTo(-11,0),D.strokeStyle=`rgba(80,50,0,0.6)`,D.lineWidth=.8,D.stroke(),this.cargo>0){let e=.45+this.cargo*.4;D.fillStyle=`rgba(255,200,40,${e})`,D.beginPath(),D.ellipse(-1,-5.5,2.5,1.8,0,0,Math.PI*2),D.fill(),D.beginPath(),D.ellipse(-1,5.5,2.5,1.8,0,0,Math.PI*2),D.fill(),D.fillStyle=`rgba(255,220,60,${e*.3})`,D.beginPath(),D.ellipse(-1,-5.5,4,3,0,0,Math.PI*2),D.fill(),D.beginPath(),D.ellipse(-1,5.5,4,3,0,0,Math.PI*2),D.fill()}if(D.restore(),this.state!==`collecting`){let e=2.5,t=this.x-16/2,n=this.y-14,r=Math.max(0,this.stamina/this.maxStamina);D.fillStyle=`rgba(0,0,0,0.4)`,D.fillRect(t-.5,n-.5,17,e+1),D.fillStyle=`rgb(${r<.5?255:Math.floor(255*(1-r)*2)},${r>.5?210:Math.floor(210*r*2)},50)`,D.fillRect(t,n,16*r,e),this.state===`returning`&&(D.save(),D.translate(this.x,n-5),this.cargo>0?(D.fillStyle=`rgba(255,200,50,0.8)`,D.beginPath(),D.arc(0,0,2.5,0,Math.PI*2),D.fill()):(D.fillStyle=`rgba(255,200,80,0.6)`,D.beginPath(),D.moveTo(0,-3),D.lineTo(-3,0),D.lineTo(-2,0),D.lineTo(-2,2),D.lineTo(2,2),D.lineTo(2,0),D.lineTo(3,0),D.closePath(),D.fill()),D.restore())}}};function fn(){let e=D.createRadialGradient(j*.3,M*.6,50,j*.5,M*.5,j*.8);e.addColorStop(0,`#1e3a1e`),e.addColorStop(.5,`#142814`),e.addColorStop(1,`#0a150a`),D.fillStyle=e,D.fillRect(0,0,j,M),D.globalAlpha=.03;for(let e=0;e<200;e++)D.fillStyle=`#4a8a3a`,D.fillRect(e*137.5%j,e*97.3%M,1,3+e%4);D.globalAlpha=1}var L=[],pn=0;function mn(){j=E.width=Ft.offsetWidth,M=E.height=Ft.offsetHeight,tn(),L=[];for(let e=0;e<Wt;e++)L.push(new dn(e));for(let e=0;e<Wt&&e<F.length;e++)F[e].beeIndex=e,L[e].cellIndex=e;nn(),cn();for(let e of L){let t=e.cell;t&&(e.stamina>e.tiredAt+15?(e.x=40+j*.6*Math.random(),e.y=80+Math.random()*(M-160)):(e.state=`sleeping`,e.x=t.x,e.y=t.y,e.vx=0,e.vy=0))}Xt=[],pn=0}function hn(){j=E.width=Ft.offsetWidth,M=E.height=Ft.offsetHeight,nn();for(let e of sn)Yt(e,I)<k*A*3&&(e.x=40+j*.5*Math.random(),e.y=80+Math.random()*(M-160))}function gn(){if(Bt){fn(),ln(),un(pn),an(pn),Qt(),$t(),P.active&&(D.beginPath(),D.arc(P.x,P.y,14+Math.sin(pn*.12)*3,0,Math.PI*2),D.fillStyle=P.repel?`rgba(255,70,70,0.25)`:`rgba(255,230,100,0.25)`,D.fill());for(let e of L)e.update(L,pn);for(let e of L)e.draw(pn);pn++,O=requestAnimationFrame(gn)}}var _n=[`> EXEC bee_colony.exe`,`> SPAWNING AGENTS...`,`> GENERATING FLORA GRID...`,`> HIVE ONLINE.`];function vn(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-beesim`),It.style.display=`flex`,Lt.style.display=`none`,Vt&&=(Vt(),null),Ht||(Ht=()=>{Bt&&hn()},window.addEventListener(`resize`,Ht)),Ut||(Ut=()=>{if(Bt){if(document.hidden){O&&cancelAnimationFrame(O),O=null;return}O||gn()}},document.addEventListener(`visibilitychange`,Ut)),Vt=appBootAnimation(Rt,zt,_n,()=>{Vt=null,Lt.style.display=`flex`,Bt=!0,requestAnimationFrame(()=>{mn(),gn()})})}function yn(){try{Vt&&=(Vt(),null),It.style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-beesim`)}finally{Bt=!1,O&&cancelAnimationFrame(O),O=null,Ht&&=(window.removeEventListener(`resize`,Ht),null),Ut&&=(document.removeEventListener(`visibilitychange`,Ut),null)}}function bn(){document.getElementById(`beesim-controls`).classList.toggle(`collapsed`)}window.launchBeeSim=vn,window.closeBeeSim=yn,window.toggleBeeSimControls=bn;var xn=null,Sn=[`> EXEC docs_viewer.exe`,`> INDEXING KNOWLEDGE BASE...`,`> DECRYPTING ARCHIVES...`,`> DOCS READY.`];function R(e,t,n){return`
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
</div>`}var Cn=[{id:`overview`,title:`SYSTEM OVERVIEW`,content:`
<p>Welcome to <code>SWARM_OS ${t}</code>, the Cyberdeck operating system built by <strong>Onyx Cybernetics</strong> for the <strong>Deck-MK IV</strong> platform.</p>
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
`}];function z(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`)}var wn=[{id:`plab-overview`,title:`OVERVIEW`,content:`
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
`+R(`Particle Constructor`,z(`class Particle {
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
}`),z(`class Particle:
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
`+R(`Snow Mode Physics`,z(`// Snow mode: drift downward with sine-wave sway
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
}`),z(`Snow mode update:
    y += (baseSpeed * weight) + gravity
    x += sin(driftAngle) * baseSpeed
    driftAngle += driftSpeed

    if particle below screen:
        reset to top at random x
    if particle off left/right:
        wrap to opposite side`))+R(`Vortex Mode Physics`,z(`// Vortex: orbital motion around center
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
}`),z(`Vortex mode update:
    center = screen midpoint
    distance = dist(particle, center)
    angle_to_center = atan2(dy, dx)
    tangent_angle = angle_to_center + 90 degrees

    target_vx = cos(tangent) * orbitSpeed
              + cos(toCenter) * gravity * 5
    target_vy = sin(tangent) * orbitSpeed
              + sin(toCenter) * gravity * 5

    velocity = lerp(velocity, target, 0.05)
    position += velocity`))+R(`Liquid Mode Physics`,z(`// Liquid: gravity + inter-particle forces
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
}`),z(`Liquid mode update:
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
`+R(`Mouse Force Application`,z(`// Applied inside Particle.update()
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
    pmouse.attractRadius = 150;`),z(`Mouse force (per particle per frame):
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
`+R(`Plexus Connection Lines`,z(`// After particle draw loop, in plabAnimate()
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
}`),z(`Plexus line pass (after draw):
    maxDist = 120px
    sampleStep = ceil(count / 320) or 1

    for each sampled pair (i, j):
        distance = dist(particle[i], particle[j])
        if distance < maxDist:
            opacity = 1 - (distance / maxDist)
            draw line from particle[i] to particle[j]
            color = user color at calculated opacity`))},{id:`plab-render`,title:`SHAPE RENDERING`,content:`
<p>The draw method renders each particle as one of four shapes. Color is determined by the active color mode: Solid (user-picked), Random Neon (assigned at creation), or Velocity (HSL mapped to speed).</p>
`+R(`Particle Draw Method`,z(`draw() {
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
}`),z(`draw():
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
`+R(`Main Animation Loop`,z(`function plabAnimate() {
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
}`),z(`animationLoop():
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

    request next frame`))}],Tn=[{id:`bee-overview`,title:`OVERVIEW`,content:`
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
`+R(`SimBee Constructor`,z(`class SimBee {
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
}`),z(`class SimBee:
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
`+R(`Field of Vision Check`,z(`canSee(other) {
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
}`),z(`canSee(other):
    dx, dy = other.position - this.position
    distSq = dx^2 + dy^2

    if distSq > visionRange^2: return false  // too far
    if distSq < 0.01: return false           // self-overlap

    heading = atan2(this.vy, this.vx)
    angleToOther = atan2(dy, dx)
    angleDiff = normalize(angleToOther - heading)

    return |angleDiff| < 135 degrees`))},{id:`bee-boids`,title:`BOID FLOCKING ALGORITHM`,content:`
<p>The core flocking behavior applies three forces to each foraging bee: <strong>Cohesion</strong> (steer toward average neighbor position), <strong>Alignment</strong> (match average neighbor velocity), and <strong>Separation</strong> (push away from very close neighbors). Only visible, active bees are considered.</p>
`+R(`Boid Flocking Forces`,z(`applyBoids(all) {
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
}`),z(`applyBoids(allBees):
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
`+R(`State Transitions`,z(`update(all, time) {
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
}`),z(`update(allBees, time):

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
`+R(`Flower Seeking & Scoring`,z(`seekFlower() {
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
}`),z(`seekFlower():
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
`+R(`Honeycomb Generation`,z(`function beeGenerateComb() {
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
}`),z(`generateHoneycomb():
    for each axial coordinate (q, r) within radius:
        create cell with position, beeIndex=-1, honey=0

    sort cells by distance from center (closest first)

    first 75 cells: assigned to bees (1 bee per cell)
    remaining cells: pre-filled with random honey (40-100%)`))+R(`Hex Cell Positioning`,z(`function beeUpdateCombPos() {
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
}`),z(`updateCombPositions():
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
`+R(`Mouse Force`,z(`applyMouse() {
    if (!beeMouse.active) return;
    const dx = beeMouse.x - this.x;
    const dy = beeMouse.y - this.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 200 && d > 1) {
        const f = beeMouse.repel ? -0.9 : 0.35;
        this.vx += dx/d * f;
        this.vy += dy/d * f;
    }
}`),z(`applyMouse():
    if mouse not active: return

    distance = dist(this, mouse)
    if distance < 200px:
        if right-click (repel):
            push away with force 0.9
        else (left-click attract):
            pull toward with force 0.35`))}],En=[{id:`overview`,title:`OVERVIEW`,content:`
<p>A <strong>ring buffer</strong> (a.k.a. circular buffer or circular queue) is a fixed-size FIFO data structure where the storage logically wraps around — the end of the array is treated as adjacent to the beginning. It's the workhorse of audio DSP, serial I/O, lock-free producer/consumer queues, and any place where you need O(1) enqueue/dequeue without ever shifting elements.</p>
<p>Conceptually it's a flat array plus two pointers:</p>
<ul>
<li><strong>head</strong> — where the next <em>write</em> goes (also called <code>write</code> or <code>in</code>)</li>
<li><strong>tail</strong> — where the next <em>read</em> comes from (also called <code>read</code> or <code>out</code>)</li>
</ul>
<p>Both pointers monotonically advance and wrap modulo the buffer's capacity. This visualizer arranges the slots around a circle so that "wrap-around" is literally visual: the head pointer chases the tail around the ring.</p>
`},{id:`pointer-math`,title:`POINTER MATH`,content:`
<p>The whole trick of a ring buffer fits in two lines. After every operation the affected pointer advances by one and wraps using the modulo operator:</p>
`+R(`Pointer Advance`,z(`head = (head + 1) % capacity;   // after a write
tail = (tail + 1) % capacity;   // after a read`),z(`after enqueue: head = (head + 1) mod N
after dequeue: tail = (tail + 1) mod N`))+`
<p>That's it. There are no shifts, no allocations, and no resizes — every operation is pure O(1). On hardware where the capacity is a power of two, the modulo can be replaced by a bitwise AND (<code>head &amp; (capacity - 1)</code>), which is even cheaper.</p>
`},{id:`enqueue-dequeue`,title:`ENQUEUE / DEQUEUE`,content:`
<p>This visualizer's <strong>WRITE</strong> button calls <code>enqueue</code> and the <strong>READ</strong> button calls <code>dequeue</code>. Both operations check a guard, mutate the slot, advance the pointer, and update the count.</p>
`+R(`Enqueue (Write)`,z(`function enqueue(value: T): void {
    if (count >= capacity) {
        // Buffer FULL — caller decides: drop, overwrite, or block
        return;
    }
    slots[head] = value;
    head = (head + 1) % capacity;
    count++;
}`),z(`enqueue(value):
    if count == capacity: error (full)
    slots[head] = value
    head = (head + 1) mod capacity
    count = count + 1`))+`
`+R(`Dequeue (Read)`,z(`function dequeue(): T | undefined {
    if (count <= 0) {
        // Buffer EMPTY — caller decides: return null, block, or throw
        return undefined;
    }
    const value = slots[tail];
    slots[tail] = null;          // optional: drop the GC reference
    tail = (tail + 1) % capacity;
    count--;
    return value;
}`),z(`dequeue():
    if count == 0: error (empty)
    value = slots[tail]
    tail = (tail + 1) mod capacity
    count = count - 1
    return value`))+`
<p>In production code the FULL/EMPTY guards are often replaced by overwrite-oldest (drop the tail when writing into a full buffer — common in audio scopes) or by blocking semantics (block the producer until the consumer makes room — common in IPC).</p>
`},{id:`full-vs-empty`,title:`FULL VS EMPTY`,content:`
<p>The classic ring-buffer puzzle: when the buffer is empty <code>head == tail</code>, but when the buffer is <em>full</em> after wrapping all the way around, <code>head == tail</code> is <em>also</em> true. Two completely different states, identical pointers. There are three standard fixes:</p>
<ol>
<li><strong>Track count separately</strong> — keep an integer <code>count</code> alongside head/tail. <code>count == 0</code> means empty, <code>count == capacity</code> means full. This is what this visualizer does, and what you see in the COUNT badge.</li>
<li><strong>Leave one slot unused</strong> — declare the buffer full when <code>(head + 1) % capacity == tail</code>. You sacrifice one slot of usable capacity in exchange for not needing a separate counter — useful in lock-free designs where atomic updates of two variables are expensive.</li>
<li><strong>Use unbounded indices</strong> — let head and tail grow without wrapping; only wrap when indexing into the array (<code>slots[head % capacity]</code>). Then <code>count = head - tail</code>. This is the trick used in many lock-free SPSC queues, but assumes head/tail can grow forever (or wrap so far apart in the integer space that aliasing is impossible).</li>
</ol>
<p>Each approach has cache and concurrency tradeoffs; "which is best" depends entirely on whether you have one writer/one reader, multiple of either, and whether you can afford a counter.</p>
`},{id:`visualization`,title:`VISUALIZATION NOTES`,content:`
<p>The on-screen mapping intentionally makes the abstraction physical:</p>
<ul>
<li><strong>Slots are arranged on a circle</strong>, indexed 0..7 starting from the top. Modulo wrap-around becomes literal motion around the ring.</li>
<li><strong>Head pointer (W, green)</strong> sits on the outside of the ring; <strong>tail pointer (R, blue)</strong> sits on the inside, so they never visually collide even when they refer to the same slot.</li>
<li><strong>Used arc</strong> — a faint green band traces the slots between tail and head, growing as the buffer fills and shrinking as it drains.</li>
<li><strong>Particle bursts</strong> fire at the active slot on every write/read, color-matched to the operation.</li>
<li><strong>Shake animation</strong> plays on FULL-write or EMPTY-read attempts, so you can't miss the guard-clause rejection.</li>
<li><strong>Center readout</strong> shows <code>count / capacity</code> and one of EMPTY / used / FULL.</li>
</ul>
<p>The four operation buttons map directly to the four states a real producer/consumer system uses: WRITE (enqueue), READ (dequeue), AUTO DEMO (random producer/consumer at 60/40 weighting), and CLEAR (reset all state).</p>
`}],Dn=[{id:`overview`,title:`OVERVIEW`,content:`
<p>The <strong>Game of Life</strong> is John Conway's 1970 cellular automaton — a universe of cells that live, die, and reproduce according to a handful of dead-simple rules. From a random seed it produces gliders, oscillators, blinkers, and stable structures, all from purely local interactions. It's been studied for half a century not for what it does but for what emerges from it.</p>
<p>This visualizer ships with two grid topologies, switchable at runtime:</p>
<ul>
<li><strong>Hex grid (B2 / S3,4)</strong> — the rule popularised by Carter Bays in 2005 as the closest hexagonal analogue of Conway's original. Each cell has six equidistant neighbours.</li>
<li><strong>Square grid (B3 / S2,3)</strong> — Conway's classic rule on the standard 8-neighbour Moore neighbourhood.</li>
</ul>
<p>Switching modes preserves the cell array and the generation counter; only the topology and rule change. The grid is always toroidal — edges wrap on both axes.</p>
`},{id:`conway-rule`,title:`CONWAY RULE — B3/S2,3`,content:`
<p>In square mode, every cell looks at its <strong>8 Moore neighbours</strong> (orthogonal + diagonal) and applies these rules simultaneously across the whole grid:</p>
<ul>
<li><strong>Birth (B3)</strong> — a dead cell becomes alive iff it has exactly <strong>3</strong> live neighbours.</li>
<li><strong>Survival (S2,3)</strong> — a live cell stays alive iff it has <strong>2 or 3</strong> live neighbours; otherwise it dies (under-population if &lt; 2, over-population if &gt; 3).</li>
</ul>
`+R(`Conway Tick`,z(`for each cell (col, row):
    n = count of live cells among the 8 Moore neighbours
    if cell is alive:
        next[col][row] = (n === 2 || n === 3) ? 1 : 0
    else:
        next[col][row] = (n === 3) ? 1 : 0
swap(grid, next)`),z(`for every cell:
    n ← live neighbours of cell (out of 8)
    if alive: stay alive only when n ∈ {2, 3}
    if dead:  come alive only when n = 3
apply all updates simultaneously`))+`
<p>This is the most-studied cellular automaton ever. The four-line rule is enough to produce <em>Turing-complete</em> behaviour: in B3/S2,3 you can encode logic gates, registers, and a working universal computer entirely out of glider streams.</p>
`},{id:`hex-rule`,title:`HEX-LIFE RULE — B2/S3,4`,content:`
<p>In hex mode, every cell looks at its <strong>6 hex neighbours</strong> and applies a different threshold pair:</p>
<ul>
<li><strong>Birth (B2)</strong> — a dead cell becomes alive iff it has exactly <strong>2</strong> live neighbours.</li>
<li><strong>Survival (S3,4)</strong> — a live cell stays alive iff it has <strong>3 or 4</strong> live neighbours; otherwise it dies.</li>
</ul>
`+R(`Hex-Life Tick`,z(`for each cell (q, r):
    n = count of live cells among the 6 neighbours
    if cell is alive:
        next[q][r] = (n === 3 || n === 4) ? 1 : 0
    else:
        next[q][r] = (n === 2) ? 1 : 0
swap(grid, next)`),z(`for every cell:
    n ← live neighbours of cell (out of 6)
    if alive: stay alive only when n ∈ {3, 4}
    if dead:  come alive only when n = 2`))+`
<p>Bays surveyed every reasonable hex rule and found B2/S3,4 to be the closest match to Conway's behaviour: it supports gliders, oscillators, and a similar mix of mortal and immortal patterns. Other hex rules either die out instantly or explode into solid live regions.</p>
<p>Both rules use simultaneous updates — births and deaths are computed against the previous generation's state and committed only after every cell has been evaluated. The implementation writes into a second buffer and swaps pointers at the end of each tick.</p>
`},{id:`topology`,title:`GRIDS & TOROIDAL WRAP`,content:`
<p>The default grid is 32 columns wide × 28 rows tall (896 cells), with an optional 2× resolution mode that doubles each dimension to 64 × 56 (3584 cells — four times as many in the same canvas area). In both resolutions the grid wraps toroidally — cells at the right edge are neighbours of cells at the left edge, and cells at the bottom are neighbours of cells at the top. There are no special edge cases; a glider launched in any direction eventually returns to its starting cell.</p>
`+R(`Toroidal Neighbour`,z(`const nc = (col + dc + COLS) % COLS;
const nr = (row + dr + ROWS) % ROWS;
if (cells[nc * ROWS + nr]) alive++;`),z(`neighbour col = (col + dc + COLS) mod COLS
neighbour row = (row + dr + ROWS) mod ROWS`))+`
<p>The "<code>+ COLS</code>" before the modulo guards against negative deltas — JavaScript's <code>%</code> preserves sign, so <code>(-1) % 32</code> is <code>-1</code> rather than <code>31</code>. Adding the dimension first keeps the operand positive.</p>
<p><strong>Why two topologies?</strong> Square grids have an awkward asymmetry: orthogonal neighbours sit at distance 1, but diagonal neighbours sit at distance √2. The Moore neighbourhood treats all eight as equivalent anyway, so information propagates faster diagonally than orthogonally and patterns develop a faint preferred axis. Hex grids have no such bias — all six neighbours are equidistant and the three axes are related by 60° rotation. Switching modes lets you watch the same starting configuration evolve under both geometries.</p>
<p>The hex grid uses <strong>odd-q offset coordinates</strong> — a flat-top hex with odd-numbered columns shifted down half a row, stored in a plain rectangular array. The square grid is the same array drawn as a regular Cartesian lattice; only the geometry math and the neighbour table change between modes.</p>
`},{id:`controls`,title:`CONTROLS`,content:`
<p>The right-hand panel exposes the full simulation interface:</p>
<ul>
<li><strong>Hex / Square</strong> — switch grid topology and rule on the fly. Cell array and generation counter are preserved across the switch.</li>
<li><strong>1× / 2×</strong> — switch grid resolution between 32×28 (default, 896 cells) and 64×56 (3584 cells, four times as many in the same canvas area). Switching resolution discards the current cell state and re-seeds at the current density slider value.</li>
<li><strong>Pause / Play</strong> — toggle the tick loop. While paused you can edit cells; while running the grid advances at the configured speed.</li>
<li><strong>Step</strong> — advance exactly one generation. Pauses the simulation if it was running, so you can inspect each tick.</li>
<li><strong>Randomize</strong> — re-seed the entire grid at the current density slider value, and reset the generation counter to 0.</li>
<li><strong>Clear</strong> — empty the grid (all cells dead) and reset the generation counter.</li>
<li><strong>Generations / sec</strong> — speed slider. The render loop runs at the display's refresh rate; the simulation tick is decoupled and fires at <code>1000 / speed</code> millisecond intervals.</li>
<li><strong>Density %</strong> — used by Randomize. Each cell becomes alive independently with this probability.</li>
</ul>
<p>While paused, the canvas accepts mouse input:</p>
<ul>
<li><strong>Left-click + drag</strong> — paint cells alive.</li>
<li><strong>Right-click + drag</strong> — erase cells (paint dead). The browser's context menu is suppressed over the canvas while paused.</li>
<li>The cell under the cursor is highlighted with a thin outline so you can see what's about to be painted.</li>
</ul>
<p>The two badges at the top of the panel show the current <strong>GEN</strong> (generation count since the last clear/randomize) and <strong>POP</strong> (total live cells right now).</p>
`},{id:`patterns`,title:`PATTERN ZOO`,content:`
<p><strong>Conway / B3/S2,3 patterns to try:</strong></p>
<ul>
<li><strong>Glider</strong> — five cells in a small L-shape that translate diagonally one cell every four generations. The icon of cellular automata.</li>
<li><strong>Blinker</strong> — three cells in a row that rotate 90° each tick. A two-state oscillator.</li>
<li><strong>Block</strong> — a 2×2 square. The simplest still life: nothing changes.</li>
<li><strong>Beacon</strong>, <strong>toad</strong>, <strong>pulsar</strong> — period-2 and period-3 oscillators.</li>
<li>Random seeds settle within a few hundred ticks into a debris field of still lifes, blinkers, and the occasional escaping glider.</li>
</ul>
<p><strong>Hex-Life / B2/S3,4 patterns to try:</strong></p>
<ul>
<li><strong>Pulsing blobs</strong> — small clusters that oscillate with period 2, easy to spot anywhere two cells flicker in lockstep.</li>
<li><strong>Hex gliders</strong> — small mobile patterns that translate one cell per generation along one of the three axis-pairs.</li>
<li><strong>Rotors</strong> — short oscillators with rotational symmetry that the hex topology enables but the square grid cannot.</li>
<li><strong>Smoke clouds</strong> — random regions settle into slowly evolving "ash" of small oscillators and the occasional glider, similar to Conway but visibly hexier.</li>
</ul>
<p>Try this: clear the grid, paint a small cluster of 3-5 adjacent cells, hit Step a few times, then switch grid mode without clearing — the same cells will evolve very differently under the two rules.</p>
`}],On={overview:{title:`SYSTEM OVERVIEW`,version:`v1.0`,sections:Cn},"particle-lab":{title:`PARTICLE LAB`,version:`v1.6`,sections:wn},"bee-sim":{title:`BEE SIM`,version:`v1.0`,sections:Tn},"ring-buffer":{title:`RING BUFFER`,version:`v1.0`,sections:En},"hex-life":{title:`GAME OF LIFE`,version:`v1.2`,sections:Dn}};function kn(e){let t=document.getElementById(`docs-sidebar`),n=document.getElementById(`docs-content`);t.innerHTML=``,n.innerHTML=``;let r=On[e];r&&(r.sections.forEach((e,r)=>{let i=document.createElement(`button`);i.className=`docs-sidebar-item`,i.textContent=e.title,i.type=`button`,r===0&&i.classList.add(`active`),i.addEventListener(`click`,()=>{document.getElementById(`docs-`+e.id).scrollIntoView({behavior:`smooth`}),t.querySelectorAll(`.docs-sidebar-item`).forEach(e=>e.classList.remove(`active`)),i.classList.add(`active`)}),t.appendChild(i);let a=document.createElement(`div`);a.className=`docs-section`,a.id=`docs-`+e.id,a.innerHTML=`<h2>`+e.title+`</h2>`+e.content,n.appendChild(a)}),n.querySelectorAll(`[data-code-block]`).forEach(e=>{let t=e.querySelector(`[data-actual]`),n=e.querySelector(`[data-pseudo]`),r=e.querySelector(`[data-toggle="actual"]`),i=e.querySelector(`[data-toggle="pseudo"]`);!t||!n||!r||!i||(r.addEventListener(`click`,()=>{t.style.display=``,n.style.display=`none`,r.classList.add(`active`),i.classList.remove(`active`)}),i.addEventListener(`click`,()=>{t.style.display=`none`,n.style.display=``,i.classList.add(`active`),r.classList.remove(`active`)}))}))}function An(e){let t=e||`overview`,n=document.getElementById(`layer-docs-viewer`),r=document.getElementById(`docs-loading`),i=document.getElementById(`docs-loading-text`),a=document.getElementById(`docs-app`),o=document.getElementById(`docs-title`),s=On[t];o&&s&&(o.innerHTML=s.title+` <span style="opacity:0.4">`+s.version+`</span>`),typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-docs-viewer`),n.style.display=`flex`,a.style.display=`none`,xn&&=(xn(),null),xn=appBootAnimation(r,i,Sn,()=>{xn=null,a.style.display=`flex`,kn(t)})}function jn(){xn&&=(xn(),null),document.getElementById(`layer-docs-viewer`).style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-docs-viewer`)}window.launchDocsViewer=An,window.closeDocsViewer=jn;var Mn=8,Nn=document.getElementById(`ringbufferCanvas`),B=Nn.getContext(`2d`),Pn=document.getElementById(`ringbuf-canvas-wrap`),Fn=document.getElementById(`layer-ring-buffer`),In=document.getElementById(`ringbuf-loading`),Ln=document.getElementById(`ringbuf-loading-text`),Rn=document.getElementById(`ringbuf-app`),zn=document.getElementById(`ringbuf-log`),Bn=document.getElementById(`ringbuf-btn-auto`),Vn=document.getElementById(`ringbuf-info-size`),Hn=document.getElementById(`ringbuf-info-count`),Un=document.getElementById(`ringbuf-info-head`),Wn=document.getElementById(`ringbuf-info-tail`),V={capacity:Mn,slots:Array(Mn).fill(null),head:0,tail:0,count:0,nextValue:1},H=[],Gn=[],Kn=!1,qn=null,Jn=!1,Yn=null,Xn=null,Zn=null,Qn=null,$n=null,er=0,tr=100,nr=100;function rr(){let e=Math.max(64,Math.min(Pn.clientWidth,Pn.clientHeight));e!==tr&&(tr=e,nr=e,Nn.width=e,Nn.height=e,Nn.style.width=e+`px`,Nn.style.height=e+`px`)}function ir(e){return Math.PI*2*e/V.capacity-Math.PI/2}function ar(e,t){let n=tr/2,r=nr/2,i=Math.min(n,r)*.38,a=ir(e),o=n+Math.cos(a)*i,s=r+Math.sin(a)*i;for(let e=0;e<10;e++){let e=Math.random()*Math.PI*2,n=1+Math.random()*2.5;Gn.push({x:o,y:s,vx:Math.cos(e)*n,vy:Math.sin(e)*n,life:1,color:t})}}function or(){H.push({type:`shake`,index:-1,progress:0})}function sr(){Vn.textContent=String(V.capacity),Hn.textContent=String(V.count),Un.textContent=String(V.head),Wn.textContent=String(V.tail)}function cr(e,t){let n=document.createElement(`div`);for(n.className=`ringbuf-log-${t}`,n.textContent=`> `+e,zn.appendChild(n),zn.scrollTop=zn.scrollHeight;zn.children.length>50;)zn.removeChild(zn.firstChild)}function lr(){if(V.count>=V.capacity){cr(`Buffer FULL — cannot write!`,`error`),or();return}let e=V.nextValue++;V.slots[V.head]=e,H.push({type:`write`,index:V.head,progress:0}),ar(V.head,`#4ade80`),cr(`Write [${V.head}] ← ${e}`,`write`),V.head=(V.head+1)%V.capacity,V.count++,sr()}function ur(){if(V.count<=0){cr(`Buffer EMPTY — nothing to read!`,`error`),or();return}let e=V.slots[V.tail];H.push({type:`read`,index:V.tail,progress:0}),ar(V.tail,`#60a5fa`),cr(`Read  [${V.tail}] → ${e}`,`read`),V.slots[V.tail]=null,V.tail=(V.tail+1)%V.capacity,V.count--,sr()}function dr(){V.slots.fill(null),V.head=0,V.tail=0,V.count=0,V.nextValue=1,H=[],Gn=[],cr(`Buffer cleared.`,`info`),sr()}function fr(){Jn=!Jn,Bn.innerHTML=Jn?`⏸ Stop Demo`:`▶ Auto Demo`,Jn?(cr(`Auto demo started.`,`info`),pr()):(Yn!==null&&(clearTimeout(Yn),Yn=null),cr(`Auto demo stopped.`,`info`))}function pr(){Jn&&(V.count===0||Math.random()<.6&&V.count<V.capacity?lr():ur(),Yn=window.setTimeout(pr,900))}function mr(){er+=.016;let e=tr,t=nr,n=e/2,r=t/2,i=Math.min(n,r)*.38,a=Math.min(n,r)*.09;B.clearRect(0,0,e,t);let o=B.createRadialGradient(n,r,0,n,r,i*2);o.addColorStop(0,`#14162005`),o.addColorStop(.5,`#0f111700`),B.fillStyle=o,B.fillRect(0,0,e,t),B.beginPath(),B.arc(n,r,i,0,Math.PI*2),B.strokeStyle=`#2a2d3a`,B.lineWidth=a*2+6,B.stroke(),B.save(),B.beginPath(),B.arc(n,r,i+a+16,-Math.PI*.35,Math.PI*.8),B.strokeStyle=`rgba(126,184,255,0.12)`,B.lineWidth=2,B.setLineDash([6,8]),B.stroke(),B.setLineDash([]);let s=Math.PI*.8,c=i+a+16,l=n+Math.cos(s)*c,u=r+Math.sin(s)*c;B.beginPath(),B.moveTo(l,u),B.lineTo(l+Math.cos(s-.5)*10,u+Math.sin(s-.5)*10),B.moveTo(l,u),B.lineTo(l+Math.cos(s+1.2)*10,u+Math.sin(s+1.2)*10),B.strokeStyle=`rgba(126,184,255,0.25)`,B.lineWidth=2,B.stroke(),B.restore();for(let e=0;e<V.capacity;e++){let t=ir(e),a=ir((e+1)%V.capacity),o=n+Math.cos(t)*i,s=r+Math.sin(t)*i,c=n+Math.cos(a)*i,l=r+Math.sin(a)*i;B.beginPath(),B.moveTo(o,s),B.lineTo(c,l),B.strokeStyle=`#1e2130`,B.lineWidth=2,B.stroke()}if(V.count>0){B.save();let e=ir(V.tail)-.01,t;V.count===V.capacity?t=e+Math.PI*2:(t=ir((V.tail+V.count-1)%V.capacity)+.01,t<e&&(t+=Math.PI*2)),B.beginPath(),B.arc(n,r,i,e,t),B.strokeStyle=`rgba(74, 222, 128, 0.12)`,B.lineWidth=a*2+2,B.stroke(),B.restore()}let d={x:0,y:0};for(let e of H)if(e.type===`shake`&&e.progress<1){let t=(1-e.progress)*5;d.x=Math.sin(e.progress*30)*t,d.y=Math.cos(e.progress*25)*t}for(let e=0;e<V.capacity;e++){let t=ir(e),o=n+Math.cos(t)*i+d.x,s=r+Math.sin(t)*i+d.y,c=1,l=null;for(let t of H)t.index===e&&t.progress<1&&(t.type===`write`?(c=1+.25*Math.sin(t.progress*Math.PI),l=`#4ade80`):t.type===`read`&&(c=1+.2*Math.sin(t.progress*Math.PI),l=`#60a5fa`));let u=a*c;l&&(B.save(),B.shadowColor=l,B.shadowBlur=25,B.beginPath(),B.arc(o,s,u+3,0,Math.PI*2),B.fillStyle=l+`33`,B.fill(),B.restore());let f=V.slots[e]!==null,ee=`#1a1d27`;f&&(ee=`hsl(${V.slots[e]*37%360}, 55%, 22%)`),B.beginPath(),B.arc(o,s,u,0,Math.PI*2),B.fillStyle=ee,B.fill(),B.strokeStyle=f?`rgba(74,222,128,0.5)`:`#333`,B.lineWidth=2,B.stroke(),B.fillStyle=`#555`,B.font=`${Math.round(a*.5)}px 'Segoe UI', sans-serif`,B.textAlign=`center`,B.textBaseline=`middle`;let p=i+a+12,te=n+Math.cos(t)*p,m=r+Math.sin(t)*p;B.fillText(String(e),te,m),f&&(B.fillStyle=`#fff`,B.font=`bold ${Math.round(a*.7)}px 'Segoe UI', sans-serif`,B.textAlign=`center`,B.textBaseline=`middle`,B.fillText(String(V.slots[e]),o,s))}hr(n,r,i,a,V.head,`#4ade80`,`W`,1),hr(n,r,i,a,V.tail,`#60a5fa`,`R`,-1),B.fillStyle=`#555`,B.font=`${Math.round(a*.65)}px 'Segoe UI', sans-serif`,B.textAlign=`center`,B.textBaseline=`middle`,B.fillText(`${V.count} / ${V.capacity}`,n,r-8),B.fillStyle=`#444`,B.font=`${Math.round(a*.45)}px 'Segoe UI', sans-serif`,B.fillText(V.count===V.capacity?`FULL`:V.count===0?`EMPTY`:`used`,n,r+12);for(let e=Gn.length-1;e>=0;e--){let t=Gn[e];if(t.x+=t.vx,t.y+=t.vy,t.vx*=.97,t.vy*=.97,t.life-=.025,t.life<=0){Gn.splice(e,1);continue}B.beginPath(),B.arc(t.x,t.y,2.5*t.life,0,Math.PI*2),B.fillStyle=t.color+Math.round(t.life*200).toString(16).padStart(2,`0`),B.fill()}for(let e=H.length-1;e>=0;e--)H[e].progress+=.03,H[e].progress>=1&&H.splice(e,1)}function hr(e,t,n,r,i,a,o,s){let c=ir(i),l=n+(s===1?r+30:-(r+20)),u=e+Math.cos(c)*l,d=t+Math.sin(c)*l,f=Math.sin(er*3+(s===1?0:2))*3,ee=u+Math.cos(c)*f*s,p=d+Math.sin(c)*f*s,te=n+(s===1?r+8:-(r+6)),m=e+Math.cos(c)*te,h=t+Math.sin(c)*te;B.beginPath(),B.moveTo(ee,p),B.lineTo(m,h),B.strokeStyle=a+`aa`,B.lineWidth=2.5,B.stroke();let ne=Math.atan2(h-p,m-ee);B.beginPath(),B.moveTo(m,h),B.lineTo(m-Math.cos(ne-.4)*8,h-Math.sin(ne-.4)*8),B.moveTo(m,h),B.lineTo(m-Math.cos(ne+.4)*8,h-Math.sin(ne+.4)*8),B.strokeStyle=a,B.lineWidth=2.5,B.stroke(),B.beginPath(),B.arc(ee,p,12,0,Math.PI*2),B.fillStyle=a+`33`,B.fill(),B.strokeStyle=a,B.lineWidth=1.5,B.stroke(),B.fillStyle=a,B.font=`bold 11px 'Segoe UI', sans-serif`,B.textAlign=`center`,B.textBaseline=`middle`,B.fillText(o,ee,p)}function gr(){Kn&&(rr(),mr(),qn=requestAnimationFrame(gr))}document.getElementById(`ringbuf-btn-write`).addEventListener(`click`,lr),document.getElementById(`ringbuf-btn-read`).addEventListener(`click`,ur),document.getElementById(`ringbuf-btn-clear`).addEventListener(`click`,dr),Bn.addEventListener(`click`,fr);var _r=[`> EXEC ring_buffer.exe`,`> ALLOC SLOT ARRAY [8]... [OK]`,`> INIT HEAD/TAIL POINTERS...`,`> DISPLAY READY.`];function vr(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-ring-buffer`),Fn.style.display=`flex`,Rn.style.display=`none`,Xn&&=(Xn(),null),Zn||(Zn=()=>{Kn&&rr()},window.addEventListener(`resize`,Zn)),!$n&&typeof ResizeObserver<`u`&&($n=new ResizeObserver(()=>{Kn&&rr()}),$n.observe(Pn)),Qn||(Qn=()=>{if(Kn){if(document.hidden){qn&&cancelAnimationFrame(qn),qn=null;return}qn||gr()}},document.addEventListener(`visibilitychange`,Qn)),Xn=appBootAnimation(In,Ln,_r,()=>{Xn=null,Rn.style.display=`flex`,Kn=!0,sr(),gr()})}function yr(){try{Xn&&=(Xn(),null),Jn&&(Jn=!1,Bn.innerHTML=`▶ Auto Demo`),Yn!==null&&(clearTimeout(Yn),Yn=null),Fn.style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-ring-buffer`)}finally{Kn=!1,qn&&cancelAnimationFrame(qn),qn=null,Zn&&=(window.removeEventListener(`resize`,Zn),null),Qn&&=(document.removeEventListener(`visibilitychange`,Qn),null),$n&&=($n.disconnect(),null)}}function br(){document.getElementById(`ringbuf-controls`).classList.toggle(`collapsed`)}window.launchRingBuffer=vr,window.closeRingBuffer=yr,window.toggleRingBufferControls=br;var xr=32,Sr=28,U=xr,W=Sr,Cr=Math.sqrt(3),wr=[[1,0],[1,-1],[0,-1],[0,1],[-1,0],[-1,-1]],Tr=[[1,1],[1,0],[0,-1],[0,1],[-1,1],[-1,0]],Er=[[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]],G=document.getElementById(`hexLifeCanvas`),K=G.getContext(`2d`),Dr=document.getElementById(`hexlife-canvas-wrap`),Or=document.getElementById(`layer-hex-life`),kr=document.getElementById(`hexlife-loading`),Ar=document.getElementById(`hexlife-loading-text`),jr=document.getElementById(`hexlife-app`),Mr=document.getElementById(`hexlife-btn-play`),Nr=document.getElementById(`hexlife-btn-step`),Pr=document.getElementById(`hexlife-btn-rand`),Fr=document.getElementById(`hexlife-btn-clear`),Ir=document.getElementById(`hexlife-mode-hex`),Lr=document.getElementById(`hexlife-mode-square`),Rr=document.getElementById(`hexlife-res-1x`),zr=document.getElementById(`hexlife-res-2x`),Br=document.getElementById(`hexlife-rule-label`),Vr=document.getElementById(`hexlife-speed`),Hr=document.getElementById(`hexlife-speed-val`),Ur=document.getElementById(`hexlife-density`),Wr=document.getElementById(`hexlife-density-val`),Gr=document.getElementById(`hexlife-info-gen`),Kr=document.getElementById(`hexlife-info-pop`),q=new Uint8Array(U*W),qr=new Uint8Array(U*W),J=new Uint8Array(U*W),Jr=0,Yr=0,Y=!0,X=`hex`,Xr=1,Zr=null,Qr=-1,$r=-1,Z=!1,ei=null,ti=0,ni=null,ri=null,ii=null,ai=null,oi=null,si=0,ci=0,Q=14,$=14,li=0,ui=0;function di(e,t){return e*W+t}function fi(){let e=Math.max(64,Dr.clientWidth),t=Math.max(64,Dr.clientHeight);if(!(e===si&&t===ci))if(si=e,ci=t,G.width=e,G.height=t,G.style.width=e+`px`,G.style.height=t+`px`,X===`hex`){let n=(e-8)/(1.5*(U-1)+2),r=(t-8)/(Cr*(W+.5));Q=Math.max(4,Math.min(n,r));let i=1.5*Q*(U-1)+2*Q,a=Cr*Q*(W+.5);li=(e-i)/2+Q,ui=(t-a)/2+Q*Cr/2}else{$=Math.max(4,Math.min((e-8)/U,(t-8)/W));let n=U*$,r=W*$;li=(e-n)/2,ui=(t-r)/2}}function pi(e,t){if(X===`hex`){let n=li+1.5*Q*e,r=e&1?Cr*Q*.5:0;return{x:n,y:ui+Cr*Q*t+r}}return{x:li+(e+.5)*$,y:ui+(t+.5)*$}}function mi(e,t,n){K.beginPath();for(let r=0;r<6;r++){let i=Math.PI/3*r,a=e+n*Math.cos(i),o=t+n*Math.sin(i);r===0?K.moveTo(a,o):K.lineTo(a,o)}K.closePath()}function hi(e,t){if(X===`square`){let n=Math.floor((e-li)/$),r=Math.floor((t-ui)/$);return n<0||n>=U||r<0||r>=W?-1:di(n,r)}let n=Math.round((e-li)/(1.5*Q)),r=Math.max(0,n-1),i=Math.min(U-1,n+1),a=-1,o=Q*Q*1.21;for(let n=r;n<=i;n++){let r=n&1?Cr*Q*.5:0,i=Math.round((t-ui-r)/(Cr*Q)),s=Math.max(0,i-1),c=Math.min(W-1,i+1);for(let r=s;r<=c;r++){let i=pi(n,r),s=e-i.x,c=t-i.y,l=s*s+c*c;l<o&&(o=l,a=di(n,r))}}return a}function gi(){Gr.textContent=String(Jr),Kr.textContent=String(Yr)}function _i(){let e=0;for(let t=0;t<q.length;t++)q[t]&&e++;Yr=e}function vi(){let e=0;if(X===`hex`)for(let t=0;t<U;t++){let n=t&1?Tr:wr;for(let r=0;r<W;r++){let i=0;for(let e=0;e<6;e++){let a=n[e][0],o=n[e][1],s=(t+a+U)%U,c=(r+o+W)%W;q[s*W+c]&&i++}let a=t*W+r,o=q[a]===1?i===3||i===4:i===2;qr[a]=o?1:0,o&&e++,o?J[a]=Math.min(255,J[a]+14):J[a]=J[a]>28?J[a]-28:0}}else for(let t=0;t<U;t++)for(let n=0;n<W;n++){let r=0;for(let e=0;e<8;e++){let i=Er[e][0],a=Er[e][1],o=(t+i+U)%U,s=(n+a+W)%W;q[o*W+s]&&r++}let i=t*W+n,a=q[i]===1&&r===2||r===3;qr[i]=a?1:0,a&&e++,a?J[i]=Math.min(255,J[i]+14):J[i]=J[i]>28?J[i]-28:0}let t=q;q=qr,qr=t,Jr++,Yr=e,gi()}function yi(){let e=Math.max(.05,Math.min(.7,parseFloat(Ur.value)/100)),t=0;for(let n=0;n<q.length;n++){let r=Math.random()<e?1:0;q[n]=r,J[n]=r?200:0,r&&t++}Jr=0,Yr=t,gi()}function bi(){q.fill(0),J.fill(0),Jr=0,Yr=0,gi()}function xi(e){Y=e,Mr.innerHTML=`${Y?`⏸ Pause`:`▶ Play`} <span class="hexlife-kbd">[Space]</span>`,Mr.classList.toggle(`hexlife-btn-play`,!Y),Mr.classList.toggle(`hexlife-btn-pause`,Y),ti=performance.now(),Y?$r=-1:Zr=null}function Si(){xi(!Y)}function Ci(){Y&&xi(!1),vi()}function wi(e){if(!(e instanceof HTMLElement))return!1;let t=e.tagName;return!!(t===`INPUT`||t===`TEXTAREA`||t===`SELECT`||e.isContentEditable)}function Ti(e){let t=parseInt(Vr.min||`1`,10),n=parseInt(Vr.max||`10`,10),r=parseInt(Vr.value||`1`,10),i=Math.max(t,Math.min(n,r+e));i!==r&&(Vr.value=String(i),Vr.dispatchEvent(new Event(`input`,{bubbles:!0})))}function Ei(e){if(!Z||wi(e.target)||e.metaKey||e.ctrlKey||e.altKey)return;let t=e.key;if(t===` `||t===`Spacebar`){e.preventDefault(),Si();return}if(t===`ArrowRight`){e.preventDefault(),Ci();return}if(t.toLowerCase()===`r`){e.preventDefault(),yi();return}if(t===`Backspace`&&e.shiftKey){e.preventDefault(),bi();return}if(t===`ArrowUp`){e.preventDefault(),Ti(1);return}if(t===`ArrowDown`){e.preventDefault(),Ti(-1);return}}function Di(){Ir.classList.toggle(`active`,X===`hex`),Lr.classList.toggle(`active`,X===`square`),Rr.classList.toggle(`active`,Xr===1),zr.classList.toggle(`active`,Xr===2),Br.textContent=`${X===`hex`?`Hex-Life · B2 / S3,4`:`Conway · B3 / S2,3`} · ${U}×${W}`}function Oi(e){X!==e&&(X=e,Di(),si=0,ci=0,fi(),ti=performance.now(),Z&&ji())}function ki(e){Xr!==e&&(Xr=e,U=xr*e,W=Sr*e,q=new Uint8Array(U*W),qr=new Uint8Array(U*W),J=new Uint8Array(U*W),Jr=0,Yr=0,Zr=null,Qr=-1,$r=-1,si=0,ci=0,fi(),Di(),yi(),ti=performance.now(),Z&&ji())}function Ai(){return getComputedStyle(document.documentElement).getPropertyValue(`--primary`).trim()||`#f59e0b`}function ji(){K.fillStyle=`#05060a`,K.fillRect(0,0,si,ci);let e=Ai(),t=!Y&&$r>=0;if(X===`hex`){for(let n=0;n<U;n++)for(let r=0;r<W;r++){let i=n*W+r,a=pi(n,r),o=q[i]===1,s=J[i]/255;mi(a.x,a.y,Q-1),o?(K.fillStyle=e,K.globalAlpha=.85,K.fill(),K.globalAlpha=1):s>.04?(K.fillStyle=e,K.globalAlpha=s*.18,K.fill(),K.globalAlpha=1):(K.fillStyle=`rgba(20,22,30,0.55)`,K.fill()),t&&i===$r&&(mi(a.x,a.y,Q-1.5),K.strokeStyle=`rgba(255,255,255,0.7)`,K.lineWidth=1.5,K.stroke()),mi(a.x,a.y,Q-.5),K.strokeStyle=o?e:`rgba(120,130,160,0.18)`,K.lineWidth=o?1:.6,K.globalAlpha=o?.9:1,K.stroke(),K.globalAlpha=1}return}let n=$;for(let r=0;r<U;r++)for(let i=0;i<W;i++){let a=r*W+i,o=li+r*n,s=ui+i*n,c=q[a]===1,l=J[a]/255;c?(K.fillStyle=e,K.globalAlpha=.85,K.fillRect(o+.5,s+.5,n-1,n-1),K.globalAlpha=1):l>.04?(K.fillStyle=e,K.globalAlpha=l*.18,K.fillRect(o+.5,s+.5,n-1,n-1),K.globalAlpha=1):(K.fillStyle=`rgba(20,22,30,0.55)`,K.fillRect(o+.5,s+.5,n-1,n-1)),t&&a===$r&&(K.strokeStyle=`rgba(255,255,255,0.7)`,K.lineWidth=1.5,K.strokeRect(o+1,s+1,n-2,n-2)),K.strokeStyle=c?e:`rgba(120,130,160,0.18)`,K.lineWidth=c?1:.6,K.globalAlpha=c?.9:1,K.strokeRect(o+.5,s+.5,n-1,n-1),K.globalAlpha=1}}function Mi(){if(Z){if(fi(),Y){let e=performance.now(),t=parseFloat(Vr.value),n=1e3/Math.max(1,t);if(e-ti>=n){let t=e-ti,r=Math.min(4,Math.max(1,Math.floor(t/n)));for(let e=0;e<r;e++)vi();ti=e}}ji(),ei=requestAnimationFrame(Mi)}}function Ni(e){if(e===Qr)return;Qr=e;let t=Zr===`alive`?1:0;q[e]!==t&&(q[e]=t,J[e]=t?200:0,_i(),gi())}function Pi(e){if(Y)return;e.preventDefault();let t=G.getBoundingClientRect(),n=hi(e.clientX-t.left,e.clientY-t.top);n<0||(Zr=e.button===2?`dead`:`alive`,Qr=-1,Ni(n))}function Fi(e){let t=G.getBoundingClientRect(),n=hi(e.clientX-t.left,e.clientY-t.top);$r=n,Zr&&n>=0&&Ni(n)}function Ii(){Zr=null,Qr=-1}function Li(){Zr=null,$r=-1,Qr=-1}Mr.addEventListener(`click`,Si),Nr.addEventListener(`click`,Ci),Pr.addEventListener(`click`,yi),Fr.addEventListener(`click`,bi),Ir.addEventListener(`click`,()=>Oi(`hex`)),Lr.addEventListener(`click`,()=>Oi(`square`)),Rr.addEventListener(`click`,()=>ki(1)),zr.addEventListener(`click`,()=>ki(2)),Vr.addEventListener(`input`,()=>{Hr.textContent=Vr.value,ti=performance.now()}),Ur.addEventListener(`input`,()=>{Wr.textContent=Ur.value}),G.addEventListener(`mousedown`,Pi),G.addEventListener(`mousemove`,Fi),G.addEventListener(`mouseup`,Ii),G.addEventListener(`mouseleave`,Li),G.addEventListener(`contextmenu`,e=>{Y||e.preventDefault()});var Ri=[`> EXEC game_of_life.exe`,`> ALLOC GRID 1× / 2× (32×28 / 64×56)... [OK]`,`> RULES: HEX B2/S3,4 | SQUARE B3/S2,3`,`> WRAP: TOROIDAL`,`> DISPLAY READY.`];function zi(){typeof rememberFocusForLayer==`function`&&rememberFocusForLayer(`layer-hex-life`),Or.style.display=`flex`,jr.style.display=`none`,ni&&=(ni(),null),ri||(ri=()=>{Z&&fi()},window.addEventListener(`resize`,ri)),!oi&&typeof ResizeObserver<`u`&&(oi=new ResizeObserver(()=>{Z&&fi()}),oi.observe(Dr)),ii||(ii=()=>{if(Z){if(document.hidden){ei&&cancelAnimationFrame(ei),ei=null;return}ei||(ti=performance.now(),Mi())}},document.addEventListener(`visibilitychange`,ii)),ai||(ai=Ei,document.addEventListener(`keydown`,ai)),ni=appBootAnimation(kr,Ar,Ri,()=>{ni=null,jr.style.display=`flex`,Z=!0,Di(),yi(),xi(!0),Mi()})}function Bi(){try{ni&&=(ni(),null),Or.style.display=`none`,typeof restoreFocusForLayer==`function`&&restoreFocusForLayer(`layer-hex-life`)}finally{Z=!1,ei&&cancelAnimationFrame(ei),ei=null,ri&&=(window.removeEventListener(`resize`,ri),null),ii&&=(document.removeEventListener(`visibilitychange`,ii),null),ai&&=(document.removeEventListener(`keydown`,ai),null),oi&&=(oi.disconnect(),null),Zr=null,$r=-1,Qr=-1}}function Vi(){document.getElementById(`hexlife-controls`).classList.toggle(`collapsed`)}window.launchHexLife=zi,window.closeHexLife=Bi,window.toggleHexLifeControls=Vi;