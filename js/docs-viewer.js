// ── Docs Viewer ──

let cancelDocsViewerBoot = null;

const docsBootLines = [
    "> EXEC docs_viewer.exe",
    "> INDEXING KNOWLEDGE BASE...",
    "> DECRYPTING ARCHIVES...",
    "> DOCS READY."
];

const docsSections = [
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

function buildDocsContent() {
    const sidebar = document.getElementById('docs-sidebar');
    const content = document.getElementById('docs-content');
    sidebar.innerHTML = '';
    content.innerHTML = '';

    docsSections.forEach((section, i) => {
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
}

function launchDocsViewer() {
    const layer = document.getElementById('layer-docs-viewer');
    const loading = document.getElementById('docs-loading');
    const textEl = document.getElementById('docs-loading-text');
    const app = document.getElementById('docs-app');

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
        buildDocsContent();
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
