// ==========================================
// GLOBAL RESOURCE ROUTING (v2.0)
// ==========================================

const paymentGateways = {
    "Water for Good": "https://buy.stripe.com/your_link_1",
    "Direct Relief": "https://buy.stripe.com/your_link_2",
    "Village Enterprise": "https://buy.stripe.com/your_link_3",
    "Peoples Consultants": "https://buy.stripe.com/your_link_4",
    "Cancer Research Institute Inc.": "https://buy.stripe.com/your_link_5",
    "Crisis Aid International": "https://buy.stripe.com/your_link_6",
    "Upwardly Global": "https://buy.stripe.com/your_link_7",
    "Legal Aid Foundation of Los Angeles": "https://buy.stripe.com/your_link_8",
    "San Diego Humane Society": "https://buy.stripe.com/your_link_9"
};

// --- DOM REFERENCES ---
const routerNodes    = document.querySelectorAll('.charity-node');
const routerModeBtns = document.querySelectorAll('.routing-btn');
const btnManual      = document.getElementById('btn-manual');
const btnRng         = document.getElementById('btn-rng');
const btnSplit       = document.getElementById('btn-split');
const btnConfirm     = document.getElementById('btn-confirm');
const btnDonate      = document.getElementById('btn-donate');

// --- STATE ---
let routerLocked = false;
let routerActiveNodes = [];
let cancelRouterBoot = null;
const routerTimeouts = new Set();

function routerSetTimeout(fn, delay) {
    const id = setTimeout(() => {
        routerTimeouts.delete(id);
        fn();
    }, delay);
    routerTimeouts.add(id);
    return id;
}

function clearRouterTimeouts() {
    routerTimeouts.forEach(clearTimeout);
    routerTimeouts.clear();
}

function openExternalSafe(url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
}

// --- BOOT LINES ---
const routerBootLines = [
    "> EXEC resource_router.exe",
    "> CONNECTING TO GLOBAL NETWORK...",
    "> LOADING CHARITY ENDPOINTS...",
    "> PAYMENT GATEWAYS LINKED.",
    "> AWAITING OPERATOR INPUT."
];

// --- CORE FUNCTIONS ---
function updateRouterState() {
    if (routerLocked) return;
    routerActiveNodes = Array.from(routerNodes).filter(n => n.classList.contains('node-active'));
    btnConfirm.disabled = routerActiveNodes.length === 0;
}

function resetRouterNodes() {
    if (routerLocked) return;
    routerNodes.forEach(node => {
        node.classList.remove('node-active');
    });
    updateRouterState();
}

function setRouterActiveMode(selectedBtn) {
    if (routerLocked) return;
    clearRouterTimeouts();
    routerModeBtns.forEach(btn => btn.classList.remove('active-mode'));
    selectedBtn.classList.add('active-mode');
    resetRouterNodes();
}

// --- MANUAL MODE ---
routerNodes.forEach(node => {
    node.addEventListener('click', () => {
        if (routerLocked || !btnManual.classList.contains('active-mode')) return;
        node.classList.toggle('node-active');
        updateRouterState();
    });
});

btnManual.addEventListener('click', () => setRouterActiveMode(btnManual));

// --- RNG PROTOCOL ---
btnRng.addEventListener('click', () => {
    if (routerLocked) return;
    setRouterActiveMode(btnRng);

    routerModeBtns.forEach(b => b.disabled = true);

    let jumps = 0;
    const maxJumps = Math.floor(Math.random() * 15) + 20;
    let currentSpeed = 40;

    function rngTick() {
        resetRouterNodes();
        const randomIndex = Math.floor(Math.random() * routerNodes.length);
        routerNodes[randomIndex].classList.add('node-active');

        jumps++;
        if (jumps < maxJumps) {
            currentSpeed *= 1.12;
            routerSetTimeout(rngTick, currentSpeed);
        } else {
            routerModeBtns.forEach(b => b.disabled = false);
            updateRouterState();
        }
    }
    rngTick();
});

// --- LOAD BALANCER ---
btnSplit.addEventListener('click', () => {
    if (routerLocked) return;
    setRouterActiveMode(btnSplit);

    routerSetTimeout(() => {
        routerNodes.forEach(node => node.classList.add('node-active'));
        updateRouterState();
    }, 150);
});

// --- CONFIRM BUTTON ---
btnConfirm.addEventListener('click', () => {
    if (!routerLocked) {
        // Lock
        routerLocked = true;
        routerActiveNodes = Array.from(routerNodes).filter(n => n.classList.contains('node-active'));

        routerActiveNodes.forEach(node => {
            node.classList.remove('node-active');
            node.classList.add('node-locked');
        });

        routerModeBtns.forEach(btn => btn.disabled = true);
        btnConfirm.disabled = false;
        btnConfirm.innerText = "[ ABORT UPLINK ]";

        btnDonate.disabled = false;
        btnDonate.classList.add('btn-glow');
    } else {
        // Unlock
        routerLocked = false;

        document.querySelectorAll('.node-locked').forEach(node => {
            node.classList.remove('node-locked');
            node.classList.add('node-active');
        });

        routerModeBtns.forEach(btn => btn.disabled = false);
        btnConfirm.innerText = "[ CONFIRM UPLINK ]";
        btnDonate.disabled = true;
        btnDonate.classList.remove('btn-glow');
        btnDonate.innerText = "[ INITIATE TRANSFER ]";

        updateRouterState();
    }
});

// --- DONATE BUTTON ---
btnDonate.addEventListener('click', () => {
    btnDonate.innerText = "[ TRANSFERRING... ]";

    routerActiveNodes.forEach(node => {
        const charityName = node.innerText;
        if (paymentGateways[charityName]) {
            openExternalSafe(paymentGateways[charityName]);
        }
    });

    routerSetTimeout(() => {
        // Reset state instead of full page reload
        routerLocked = false;
        document.querySelectorAll('.node-locked').forEach(node => {
            node.classList.remove('node-locked');
        });
        routerNodes.forEach(node => node.classList.remove('node-active'));
        routerModeBtns.forEach(btn => btn.disabled = false);
        btnManual.classList.add('active-mode');
        btnRng.classList.remove('active-mode');
        btnSplit.classList.remove('active-mode');
        btnConfirm.disabled = true;
        btnConfirm.innerText = "[ CONFIRM UPLINK ]";
        btnDonate.disabled = true;
        btnDonate.classList.remove('btn-glow');
        btnDonate.innerText = "[ INITIATE TRANSFER ]";
    }, 3000);
});

// --- LAUNCH / CLOSE ---
function launchResourceRouter() {
    const layer = document.getElementById('layer-resource-router');
    const loading = document.getElementById('router-loading');
    const textEl = document.getElementById('router-loading-text');
    const app = document.getElementById('router-app');

    if (typeof rememberFocusForLayer === 'function') rememberFocusForLayer('layer-resource-router');
    layer.style.display = 'flex';
    app.style.display = 'none';

    clearRouterTimeouts();
    if (cancelRouterBoot) {
        cancelRouterBoot();
        cancelRouterBoot = null;
    }

    cancelRouterBoot = appBootAnimation(loading, textEl, routerBootLines, () => {
        cancelRouterBoot = null;
        app.style.display = 'flex';
    });
}

function closeResourceRouter() {
    clearRouterTimeouts();
    if (cancelRouterBoot) {
        cancelRouterBoot();
        cancelRouterBoot = null;
    }
    document.getElementById('layer-resource-router').style.display = 'none';

    // Reset state on close
    routerLocked = false;
    document.querySelectorAll('.node-locked').forEach(node => {
        node.classList.remove('node-locked');
    });
    routerNodes.forEach(node => node.classList.remove('node-active'));
    routerModeBtns.forEach(btn => btn.disabled = false);
    btnManual.classList.add('active-mode');
    btnRng.classList.remove('active-mode');
    btnSplit.classList.remove('active-mode');
    btnConfirm.disabled = true;
    btnConfirm.innerText = "[ CONFIRM UPLINK ]";
    btnDonate.disabled = true;
    btnDonate.classList.remove('btn-glow');
    btnDonate.innerText = "[ INITIATE TRANSFER ]";
    if (typeof restoreFocusForLayer === 'function') restoreFocusForLayer('layer-resource-router');
}
