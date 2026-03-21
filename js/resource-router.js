// --- MODULE: GLOBAL RESOURCE ROUTING ---

// 1. Target the DOM Elements
const nodes = document.querySelectorAll('.charity-node');
// Grab the buttons (assuming Load Balancer is first, RNG is second in the HTML)
const buttons = document.querySelectorAll('.mechanical-btn');
const btnLoadBalancer = buttons[0];
const btnRng = buttons[1];

// 2. Helper Function: Reset the Grid
function systemReset() {
    nodes.forEach(node => {
        node.classList.remove('node-active');
        node.style.borderColor = 'var(--color-phosphor)';
        node.style.color = 'var(--color-phosphor)';
    });
}

// 3. Mode: DIRECT OVERRIDE (Clicking a specific node)
nodes.forEach(node => {
    node.addEventListener('click', () => {
        systemReset(); // Clear previous selections
        node.classList.add('node-active');
        console.log(`[DIRECT OVERRIDE]: Data-pipe opened to ${node.innerText}`);
        
        // TODO: In Phase 4, we will trigger the Stripe redirect here
    });
});

// 4. Mode: LOAD BALANCER (Split evenly)
btnLoadBalancer.addEventListener('click', () => {
    systemReset();
    
    // Slight delay for dramatic hardware effect
    setTimeout(() => {
        nodes.forEach(node => {
            // We keep them phosphor green instead of amber to indicate a "split"
            node.classList.add('node-active');
            node.style.borderColor = 'var(--color-phosphor)';
            node.style.color = 'var(--color-phosphor)';
            node.style.boxShadow = 'inset 0 0 15px rgba(0, 255, 65, 0.2)';
        });
        console.log("[LOAD BALANCER]: Resources distributed evenly across all nodes.");
    }, 200);
});

// 5. Mode: RNG PROTOCOL (Randomizer)
btnRng.addEventListener('click', () => {
    // Prevent clicking multiple times while it's already running
    if(btnRng.disabled) return; 
    btnRng.disabled = true;
    systemReset();

    let jumps = 0;
    // Randomize how many times it flashes before stopping (between 20 and 35)
    const maxJumps = Math.floor(Math.random() * 15) + 20; 
    let currentSpeed = 40; // Starts blazingly fast in milliseconds

    function rngTick() {
        systemReset();
        
        // Pick a random node and flash it green
        const randomIndex = Math.floor(Math.random() * nodes.length);
        nodes[randomIndex].style.opacity = '1';
        nodes[randomIndex].style.backgroundColor = 'var(--color-phosphor)';
        nodes[randomIndex].style.color = 'var(--bg-void)';

        jumps++;

        if (jumps < maxJumps) {
            // Exponentially slow down the flashes as it gets closer to the end
            currentSpeed *= 1.12; 
            setTimeout(rngTick, currentSpeed);
        } else {
            // SEQUENCE COMPLETE: Lock onto the final target
            systemReset();
            nodes[randomIndex].classList.add('node-active');
            console.log(`[RNG PROTOCOL LOCKED]: Target acquired -> ${nodes[randomIndex].innerText}`);
            
            // Re-enable the button
            btnRng.disabled = false;
        }
    }
    
    // Initialize the sequence
    rngTick();
});