// --- MODULE: GLOBAL RESOURCE ROUTING (v2.0) ---

const paymentGateways = {
    "Water for Good": "https://buy.stripe.com/your_link_1",
    "Direct Relief": "https://buy.stripe.com/your_link_2",
    "Village Enterprise": "https://buy.stripe.com/your_link_3",
    "Peoples Consultants": "https://buy.stripe.com/your_link_4",
    "Colorectal Cancer Alliance": "https://buy.stripe.com/your_link_5",
    "Crisis Aid International": "https://buy.stripe.com/your_link_6",
    "Upwardly Global": "https://buy.stripe.com/your_link_7",
    "Legal Aid Foundation of Los Angeles": "https://buy.stripe.com/your_link_8",
    "San Diego Humane Society": "https://buy.stripe.com/your_link_9"
};

// DOM Elements
const nodes = document.querySelectorAll('.charity-node');
const modeBtns = document.querySelectorAll('.mode-btn');
const btnManual = document.getElementById('btn-manual');
const btnRng = document.getElementById('btn-rng');
const btnSplit = document.getElementById('btn-split');
const btnConfirm = document.getElementById('btn-confirm');
const btnDonate = document.getElementById('btn-donate');

// System State
let systemLocked = false;
let activeNodes = [];

// --- CORE SYSTEM FUNCTIONS ---

function updateSystemState() {
    if (systemLocked) return;
    
    // Check how many nodes are currently active
    activeNodes = Array.from(nodes).filter(n => n.classList.contains('node-active'));
    
    // Enable CONFIRM button only if at least 1 node is selected
    btnConfirm.disabled = activeNodes.length === 0;
}

function resetNodes() {
    if (systemLocked) return;
    nodes.forEach(node => {
        node.classList.remove('node-active');
        node.style.opacity = '0.7';
        node.style.backgroundColor = 'transparent';
        node.style.color = 'var(--color-phosphor)';
    });
    updateSystemState();
}

function setActiveMode(selectedBtn) {
    if (systemLocked) return;
    modeBtns.forEach(btn => btn.classList.remove('active-mode'));
    selectedBtn.classList.add('active-mode');
    resetNodes();
}

// --- SELECTION MODES ---

// 1. MANUAL MODE (Default)
nodes.forEach(node => {
    node.addEventListener('click', () => {
        if (systemLocked || !btnManual.classList.contains('active-mode')) return;
        
        // Toggle the node on or off
        node.classList.toggle('node-active');
        updateSystemState();
    });
});

btnManual.addEventListener('click', () => setActiveMode(btnManual));

// 2. RNG PROTOCOL
btnRng.addEventListener('click', () => {
    if (systemLocked) return;
    setActiveMode(btnRng);
    
    // Disable buttons during the animation
    modeBtns.forEach(b => b.disabled = true);
    
    let jumps = 0;
    const maxJumps = Math.floor(Math.random() * 15) + 20; 
    let currentSpeed = 40;

    function rngTick() {
        resetNodes();
        const randomIndex = Math.floor(Math.random() * nodes.length);
        nodes[randomIndex].classList.add('node-active');

        jumps++;
        if (jumps < maxJumps) {
            currentSpeed *= 1.12; 
            setTimeout(rngTick, currentSpeed);
        } else {
            // Sequence complete
            modeBtns.forEach(b => b.disabled = false);
            updateSystemState();
        }
    }
    rngTick();
});

// 3. LOAD BALANCER (Split All)
btnSplit.addEventListener('click', () => {
    if (systemLocked) return;
    setActiveMode(btnSplit);
    
    setTimeout(() => {
        nodes.forEach(node => node.classList.add('node-active'));
        updateSystemState();
    }, 150);
});

// --- ACTION TRIGGERS ---

// THE CONFIRM BUTTON
btnConfirm.addEventListener('click', () => {
    if (!systemLocked) {
        // Locking state
        systemLocked = true;

        // Visually lock the currently active nodes
        activeNodes.forEach(node => {
            node.classList.remove('node-active');
            node.classList.add('node-locked');
        });

        // Disable mode buttons, but keep confirm enabled so it can abort/unlock
        modeBtns.forEach(btn => btn.disabled = true);
        btnConfirm.disabled = false;
        btnConfirm.innerText = "[ ABORT UPLINK ]";

        // Enable the Donate button
        btnDonate.disabled = false;
        btnDonate.classList.add('amber-glow');

        console.log("[SYSTEM LOCKED]: Ready for data transfer.");
    } else {
        // Unlocking state
        systemLocked = false;

        // Restore locked nodes back to active selection
        document.querySelectorAll('.node-locked').forEach(node => {
            node.classList.remove('node-locked');
            node.classList.add('node-active');
        });

        // Re-enable controls and return labels/styles to default
        modeBtns.forEach(btn => btn.disabled = false);
        btnConfirm.innerText = "[ CONFIRM UPLINK ]";
        btnDonate.disabled = true;
        btnDonate.classList.remove('amber-glow');
        btnDonate.innerText = "[ INITIATE TRANSFER ]";

        // Recompute activeNodes now that system is unlocked
        updateSystemState();

        console.log("[SYSTEM UNLOCKED]: Uplink aborted by operator.");
    }
});

// THE DONATE BUTTON
btnDonate.addEventListener('click', () => {
    btnDonate.innerText = "[ TRANSFERRING... ]";
    
    activeNodes.forEach(node => {
        const charityName = node.innerText;
        if(paymentGateways[charityName]) {
            // Note: Browsers may block multiple popups if "Load Balancer" is used. 
            // The user will need to allow popups for this site.
            window.open(paymentGateways[charityName], '_blank');
        }
    });

    // Optional: Reset the system after 3 seconds
    setTimeout(() => {
        location.reload(); // Reboots the terminal UI
    }, 3000);
});