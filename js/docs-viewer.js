// ── Docs Viewer ──

let cancelDocsViewerBoot = null;
let currentDocKey = 'overview';

const docsBootLines = [
    "> EXEC docs_viewer.exe",
    "> INDEXING KNOWLEDGE BASE...",
    "> DECRYPTING ARCHIVES...",
    "> DOCS READY."
];

// ── Helper: build a code block with actual/pseudo toggle ──
function makeCodeBlock(title, actualCode, pseudoCode) {
    return `
<div class="docs-code-block" data-code-block>
    <div class="docs-code-header">
        <span class="docs-code-title">${title}</span>
        <div class="docs-code-toggle">
            <button type="button" class="docs-code-toggle-btn active" data-toggle="actual">SOURCE</button>
            <button type="button" class="docs-code-toggle-btn" data-toggle="pseudo">PSEUDO</button>
        </div>
    </div>
    <pre class="docs-code-pre" data-actual>${actualCode}</pre>
    <pre class="docs-code-pre" data-pseudo style="display:none;">${pseudoCode}</pre>
</div>`;
}

// ══════════════════════════════════════════
// DOCUMENT: System Overview
// ══════════════════════════════════════════
const overviewSections = [
    {
        id: 'overview',
        title: 'SYSTEM OVERVIEW',
        content: `
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
`
    },
    {
        id: 'boot',
        title: 'BOOT SEQUENCE',
        content: `
<p>Engage the <strong>PWR</strong> switch in the Deck Console to initialize the system. The boot process runs through three phases:</p>
<h3>Phase 1 — Terminal POST</h3>
<p>A BIOS-style terminal scrolls diagnostic output: CPU identification (Kiroshi Optic-Core 9.2GHz), memory test, neural interface init, core arena allocation, SIMD alignment enforcement, MPSC job queue setup, and VFS mount.</p>
<h3>Phase 2 — Swarm Deployment</h3>
<p>The terminal clears and displays <strong>"SWARM DEPLOYED"</strong> in large pulsing text. A swarm of 80 animated bee particles flies across the screen to visually represent the distributed agent deployment.</p>
<h3>Phase 3 — OS Desktop</h3>
<p>The desktop activates with the application grid, architecture specs, deployment targets, and the live system clock. The mini display begins its protocol-driven animation.</p>
`
    },
    {
        id: 'themes',
        title: 'THEMES',
        content: `
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
`
    },
    {
        id: 'protocols',
        title: 'PROTOCOLS',
        content: `
<p>The <strong>PROTOCOL</strong> selector in the Deck Console activates different operational modes. Each protocol changes the mini display animation and updates process status indicators in SYS MON.</p>
<h3>Standby</h3>
<p>Default mode. The mini display shows 30 animated mini bees drifting across the status bar. All non-essential processes remain in standby.</p>
<h3>Ice Burn</h3>
<p>Activates a layered flame animation in the mini display using 4 color gradient layers matched to the current theme. In SYS MON, <code>ice_breaker_auto.bat</code> shows as <strong>[ ACTIVE ]</strong> in red with a pulse effect.</p>
<h3>Sentinel</h3>
<p>Displays 20 pulsing radar dots in the mini display, representing active scan coverage. In SYS MON, <code>sentinel_watch.sys</code> shows as <strong>[ ACTIVE ]</strong> in blue.</p>
<h3>Ghost Mode</h3>
<p>Shows 12 horizontal drifting bars at low opacity in the mini display — a stealth visualization. In SYS MON, <code>stealth_cloak_v2.sys</code> shows as <strong>[ CLOAKED ]</strong> in purple.</p>
`
    },
    {
        id: 'main-display',
        title: 'MAIN DISPLAY',
        content: `
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
`
    },
    {
        id: 'mini-display',
        title: 'MINI DISPLAY',
        content: `
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
`
    },
    {
        id: 'deck-console',
        title: 'DECK CONSOLE',
        content: `
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
`
    },
    {
        id: 'architecture',
        title: 'ARCHITECTURE SPECS',
        content: `
<p>The OS desktop displays three core architecture specification cards describing the Swarm Engine's design philosophy:</p>
<h3>ZERO_ALLOCATION</h3>
<p>Strict memory discipline with zero heap allocations in the hot path. All memory is pre-allocated into contiguous linear arenas at boot, eliminating garbage collection pauses.</p>
<h3>DATA_ORIENTED</h3>
<p>64-byte aligned SIMD data layouts using Structure of Arrays (SoA). Cache-line hygiene is enforced for maximum AVX-512 throughput, enabling efficient vector processing across large entity sets.</p>
<h3>CONCURRENCY</h3>
<p>Lock-free MPSC (Multi-Producer Single-Consumer) job queues provide thread-safe execution without mutex stalls or context-switching overhead, enabling smooth parallel task scheduling.</p>
`
    },
    {
        id: 'deployment',
        title: 'DEPLOYMENT TARGETS',
        content: `
<p>Three deployment target scenarios describe the intended use cases for the Swarm Engine:</p>
<h3>[TGT-01] Agent-Based Modeling (ALife)</h3>
<p>10,000+ autonomous entities via SoA Vector Flow Fields without GC stutter. This target covers large-scale simulations of autonomous agents — directly demonstrated by the Bee Sim and Particle Lab applications.</p>
<h3>[TGT-02] Live Audio-Visual (VJ) Decks</h3>
<p>Millions of particles to DX12 upload heap with hardware-accelerated fluid metaballs and CRT post-processing. Targets real-time visual performance and entertainment applications.</p>
<h3>[TGT-03] Diegetic AI Workspaces</h3>
<p>Terminal-based OS layer natively integrating local inference workflows. This target envisions AI model inference and agent execution within the terminal interface — the foundation of the Cyberdeck OS concept itself.</p>
`
    },
    {
        id: 'apps',
        title: 'APPLICATIONS',
        content: `
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
`
    },
    {
        id: 'keyboard',
        title: 'KEYBOARD SHORTCUTS',
        content: `
<ul>
<li><code>ESC</code> — Close the topmost open application or overlay. Pressing Escape repeatedly will close layers in z-index order (highest first) until returning to the OS desktop.</li>
<li><code>TAB</code> — Cycle focus forward through interactive elements within the active overlay. Focus is trapped within the topmost visible layer to prevent navigating behind it.</li>
<li><code>SHIFT + TAB</code> — Cycle focus backward through interactive elements within the active overlay.</li>
</ul>
<p>All interactive elements (buttons, sliders, dropdowns) support keyboard navigation. Focus indicators use a themed outline with glow effect for visibility.</p>
`
    },
    {
        id: 'concept',
        title: 'THE CONCEPT',
        content: `
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
`
    }
];

// ══════════════════════════════════════════
// DOCUMENT: Particle Lab
// ══════════════════════════════════════════
function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const particleLabSections = [
    {
        id: 'plab-overview',
        title: 'OVERVIEW',
        content: `
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
`
    },
    {
        id: 'plab-particle',
        title: 'PARTICLE CONSTRUCTOR',
        content: `
<p>Each particle is created with a random position and velocity. The <code>boom</code> flag (used by the Explode button) gives particles a higher initial speed. The <code>da</code> and <code>ds</code> fields drive sinusoidal drift in Snow mode. The <code>w</code> weight affects fall speed.</p>
` + makeCodeBlock('Particle Constructor',
esc(`class Particle {
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
}`),
esc(`class Particle:
    constructor(x, y, isBoom):
        position = (x or random, y or random)
        angle = random 0..2PI
        speed = isBoom ? fast(2x-5x) : normal(0.2x-1x)
        velocity = (cos(angle)*speed, sin(angle)*speed)
        baseColor = pick random neon color
        driftAngle = random 0..2PI      // for Snow sine wave
        driftSpeed = random 0.02..0.05  // drift oscillation rate
        weight = random 0.5..1.5        // fall speed multiplier`))
    },
    {
        id: 'plab-physics',
        title: 'PHYSICS UPDATE LOOP',
        content: `
<p>The update method applies mode-specific physics each frame. Every mode first checks for mouse interaction (repel/attract), then applies its own forces:</p>
<ul>
<li><strong>Snow</strong> — Downward drift + sinusoidal horizontal sway. Wraps at screen edges.</li>
<li><strong>Vortex</strong> — Orbital motion around screen center. Gravity pulls inward, speed drives tangential orbit.</li>
<li><strong>Plexus</strong> — Free-floating with bounce off walls. Speed self-regulates toward the configured value.</li>
<li><strong>Liquid</strong> — Gravity + inter-particle forces: repulsion at close range, attraction at medium range.</li>
</ul>
` + makeCodeBlock('Snow Mode Physics',
esc(`// Snow mode: drift downward with sine-wave sway
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
}`),
esc(`Snow mode update:
    y += (baseSpeed * weight) + gravity
    x += sin(driftAngle) * baseSpeed
    driftAngle += driftSpeed

    if particle below screen:
        reset to top at random x
    if particle off left/right:
        wrap to opposite side`))
+ makeCodeBlock('Vortex Mode Physics',
esc(`// Vortex: orbital motion around center
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
}`),
esc(`Vortex mode update:
    center = screen midpoint
    distance = dist(particle, center)
    angle_to_center = atan2(dy, dx)
    tangent_angle = angle_to_center + 90 degrees

    target_vx = cos(tangent) * orbitSpeed
              + cos(toCenter) * gravity * 5
    target_vy = sin(tangent) * orbitSpeed
              + sin(toCenter) * gravity * 5

    velocity = lerp(velocity, target, 0.05)
    position += velocity`))
+ makeCodeBlock('Liquid Mode Physics',
esc(`// Liquid: gravity + inter-particle forces
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
}`),
esc(`Liquid mode update:
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

    apply damping (vx*0.98, vy*0.99)`))
    },
    {
        id: 'plab-mouse',
        title: 'MOUSE INTERACTION',
        content: `
<p>Mouse forces are applied at the start of each particle's update. Left-click repels within a fixed 150px radius. Right-click attracts — and the attract radius grows continuously while held, resetting to 150px on release.</p>
` + makeCodeBlock('Mouse Force Application',
esc(`// Applied inside Particle.update()
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
    pmouse.attractRadius = 150;`),
esc(`Mouse force (per particle per frame):
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
    resets to 150px on release`))
    },
    {
        id: 'plab-plexus',
        title: 'PLEXUS LINE DRAWING',
        content: `
<p>In Plexus mode, after all particles are updated and drawn, the engine draws semi-transparent lines between every pair of particles within 120px. A sampling step is used when particle counts are high to maintain performance.</p>
` + makeCodeBlock('Plexus Connection Lines',
esc(`// After particle draw loop, in plabAnimate()
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
}`),
esc(`Plexus line pass (after draw):
    maxDist = 120px
    sampleStep = ceil(count / 320) or 1

    for each sampled pair (i, j):
        distance = dist(particle[i], particle[j])
        if distance < maxDist:
            opacity = 1 - (distance / maxDist)
            draw line from particle[i] to particle[j]
            color = user color at calculated opacity`))
    },
    {
        id: 'plab-render',
        title: 'SHAPE RENDERING',
        content: `
<p>The draw method renders each particle as one of four shapes. Color is determined by the active color mode: Solid (user-picked), Random Neon (assigned at creation), or Velocity (HSL mapped to speed).</p>
` + makeCodeBlock('Particle Draw Method',
esc(`draw() {
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
}`),
esc(`draw():
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

    fill the shape`))
    },
    {
        id: 'plab-animation',
        title: 'ANIMATION LOOP',
        content: `
<p>The main loop clears the canvas (with trail alpha for the Trails effect), updates and draws all particles, then draws plexus lines if in Plexus mode. Trail persistence is controlled by the Trails slider — a value of 0 fully clears each frame, while higher values leave fading afterimages.</p>
` + makeCodeBlock('Main Animation Loop',
esc(`function plabAnimate() {
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
}`),
esc(`animationLoop():
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

    request next frame`))
    }
];

// ══════════════════════════════════════════
// DOCUMENT: Bee Sim
// ══════════════════════════════════════════
const beeSimSections = [
    {
        id: 'bee-overview',
        title: 'OVERVIEW',
        content: `
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
`
    },
    {
        id: 'bee-constructor',
        title: 'BEE CONSTRUCTOR',
        content: `
<p>Each SimBee is initialized with random position, velocity, stamina parameters, and starts in the foraging state. The <code>tiredAt</code> and <code>wakeAt</code> thresholds create natural variation in when bees return home and when they wake up.</p>
` + makeCodeBlock('SimBee Constructor',
esc(`class SimBee {
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
}`),
esc(`class SimBee:
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
        collectDuration = random 65-115 frames`))
    },
    {
        id: 'bee-fov',
        title: 'FIELD OF VISION',
        content: `
<p>Before a bee can be influenced by a neighbor in flocking calculations, it must be able to "see" that neighbor. The <code>canSee()</code> method checks both distance (within vision slider range) and angle (within a 135-degree cone in the bee's heading direction).</p>
` + makeCodeBlock('Field of Vision Check',
esc(`canSee(other) {
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
}`),
esc(`canSee(other):
    dx, dy = other.position - this.position
    distSq = dx^2 + dy^2

    if distSq > visionRange^2: return false  // too far
    if distSq < 0.01: return false           // self-overlap

    heading = atan2(this.vy, this.vx)
    angleToOther = atan2(dy, dx)
    angleDiff = normalize(angleToOther - heading)

    return |angleDiff| < 135 degrees`))
    },
    {
        id: 'bee-boids',
        title: 'BOID FLOCKING ALGORITHM',
        content: `
<p>The core flocking behavior applies three forces to each foraging bee: <strong>Cohesion</strong> (steer toward average neighbor position), <strong>Alignment</strong> (match average neighbor velocity), and <strong>Separation</strong> (push away from very close neighbors). Only visible, active bees are considered.</p>
` + makeCodeBlock('Boid Flocking Forces',
esc(`applyBoids(all) {
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
}`),
esc(`applyBoids(allBees):
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

    each force scaled by its slider value`))
    },
    {
        id: 'bee-states',
        title: 'STATE MACHINE',
        content: `
<p>Each bee operates as a finite state machine with four states. Transitions are driven by stamina, proximity to flowers/hive, and timer expiration.</p>
<ul>
<li><strong>Foraging</strong> — Applies boids, seeks flowers. Transitions to Collecting on flower contact, or Returning when stamina drops below tiredAt.</li>
<li><strong>Collecting</strong> — Hovers near flower, drains nectar. Transitions to Returning when timer expires.</li>
<li><strong>Returning</strong> — Flies toward home cell. Transitions to Sleeping when close to cell.</li>
<li><strong>Sleeping</strong> — Deposits cargo as honey, recharges stamina. Transitions to Foraging when stamina reaches wakeAt.</li>
</ul>
` + makeCodeBlock('State Transitions',
esc(`update(all, time) {
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
}`),
esc(`update(allBees, time):

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
            switch to SLEEPING`))
    },
    {
        id: 'bee-seek',
        title: 'FLOWER SEEKING',
        content: `
<p>Foraging bees evaluate visible flowers and steer toward the best one. The scoring function balances nectar richness (how full the flower is) against distance, creating natural spread across multiple flowers.</p>
` + makeCodeBlock('Flower Seeking & Scoring',
esc(`seekFlower() {
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
}`),
esc(`seekFlower():
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
        steer gently toward it (force = 0.13)`))
    },
    {
        id: 'bee-honeycomb',
        title: 'HONEYCOMB SYSTEM',
        content: `
<p>The honeycomb is a hexagonal grid generated using axial coordinates (q, r). Each cell can hold one bee and stores a honey level from 0 to 1. Cells are sorted by distance from center — the innermost cells are assigned to bees, while outer cells start pre-filled with honey.</p>
` + makeCodeBlock('Honeycomb Generation',
esc(`function beeGenerateComb() {
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
}`),
esc(`generateHoneycomb():
    for each axial coordinate (q, r) within radius:
        create cell with position, beeIndex=-1, honey=0

    sort cells by distance from center (closest first)

    first 75 cells: assigned to bees (1 bee per cell)
    remaining cells: pre-filled with random honey (40-100%)`))
+ makeCodeBlock('Hex Cell Positioning',
esc(`function beeUpdateCombPos() {
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
}`),
esc(`updateCombPositions():
    span = hexSize * radius * 1.8

    if mobile (width < 600):
        center comb horizontally, place near top
    else:
        place comb at right side of canvas

    for each cell:
        convert axial (q,r) to pixel (x,y):
            x = center.x + hexSize * 1.5 * q
            y = center.y + hexSize * (sqrt3/2*q + sqrt3*r)`))
    },
    {
        id: 'bee-mouse',
        title: 'MOUSE INTERACTION',
        content: `
<p>Bees respond to mouse input with a simple attract/repel force. Left-click attracts foraging bees within 200px, while right-click scatters them. The force is constant regardless of distance (within range).</p>
` + makeCodeBlock('Mouse Force',
esc(`applyMouse() {
    if (!beeMouse.active) return;
    const dx = beeMouse.x - this.x;
    const dy = beeMouse.y - this.y;
    const d = Math.sqrt(dx*dx + dy*dy);
    if (d < 200 && d > 1) {
        const f = beeMouse.repel ? -0.9 : 0.35;
        this.vx += dx/d * f;
        this.vy += dy/d * f;
    }
}`),
esc(`applyMouse():
    if mouse not active: return

    distance = dist(this, mouse)
    if distance < 200px:
        if right-click (repel):
            push away with force 0.9
        else (left-click attract):
            pull toward with force 0.35`))
    }
];

// ══════════════════════════════════════════
// Document registry
// ══════════════════════════════════════════
const docsRegistry = {
    'overview':      { title: 'SYSTEM OVERVIEW', version: 'v1.0', sections: overviewSections },
    'particle-lab':  { title: 'PARTICLE LAB',    version: 'v1.6', sections: particleLabSections },
    'bee-sim':       { title: 'BEE SIM',         version: 'v1.0', sections: beeSimSections }
};

// ══════════════════════════════════════════
// Build & Launch
// ══════════════════════════════════════════
function buildDocsContent(docKey) {
    const sidebar = document.getElementById('docs-sidebar');
    const content = document.getElementById('docs-content');
    sidebar.innerHTML = '';
    content.innerHTML = '';

    const doc = docsRegistry[docKey];
    if (!doc) return;

    const sections = doc.sections;

    sections.forEach((section, i) => {
        const btn = document.createElement('button');
        btn.className = 'docs-sidebar-item';
        btn.textContent = section.title;
        btn.type = 'button';
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => {
            document.getElementById('docs-' + section.id).scrollIntoView({ behavior: 'smooth' });
            sidebar.querySelectorAll('.docs-sidebar-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        sidebar.appendChild(btn);

        const div = document.createElement('div');
        div.className = 'docs-section';
        div.id = 'docs-' + section.id;
        div.innerHTML = '<h2>' + section.title + '</h2>' + section.content;
        content.appendChild(div);
    });

    // Wire up code block toggles
    content.querySelectorAll('[data-code-block]').forEach(block => {
        const actualPre = block.querySelector('[data-actual]');
        const pseudoPre = block.querySelector('[data-pseudo]');
        const btnActual = block.querySelector('[data-toggle="actual"]');
        const btnPseudo = block.querySelector('[data-toggle="pseudo"]');
        if (!actualPre || !pseudoPre || !btnActual || !btnPseudo) return;

        btnActual.addEventListener('click', () => {
            actualPre.style.display = '';
            pseudoPre.style.display = 'none';
            btnActual.classList.add('active');
            btnPseudo.classList.remove('active');
        });
        btnPseudo.addEventListener('click', () => {
            actualPre.style.display = 'none';
            pseudoPre.style.display = '';
            btnPseudo.classList.add('active');
            btnActual.classList.remove('active');
        });
    });
}

function launchDocsViewer(docKey) {
    docKey = docKey || 'overview';
    currentDocKey = docKey;

    const layer = document.getElementById('layer-docs-viewer');
    const loading = document.getElementById('docs-loading');
    const textEl = document.getElementById('docs-loading-text');
    const app = document.getElementById('docs-app');
    const titleEl = document.getElementById('docs-title');

    const doc = docsRegistry[docKey];
    if (titleEl && doc) {
        titleEl.innerHTML = doc.title + ' <span style="opacity:0.4">' + doc.version + '</span>';
    }

    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-docs-viewer');
    layer.style.display = 'flex';
    app.style.display = 'none';

    if (cancelDocsViewerBoot) {
        cancelDocsViewerBoot();
        cancelDocsViewerBoot = null;
    }

    cancelDocsViewerBoot = appBootAnimation(loading, textEl, docsBootLines, () => {
        cancelDocsViewerBoot = null;
        app.style.display = 'flex';
        buildDocsContent(docKey);
    });
}

function closeDocsViewer() {
    if (cancelDocsViewerBoot) {
        cancelDocsViewerBoot();
        cancelDocsViewerBoot = null;
    }
    document.getElementById('layer-docs-viewer').style.display = 'none';
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-docs-viewer');
}
