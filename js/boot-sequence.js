// The sequence of commands to type out
const bootText = [
    "> ALLOCATING CORE_ARENA... [64MB OK]",
    "> ALLOCATING OS_ARENA... [256MB OK]",
    "> ENFORCING 64-BYTE SIMD ALIGNMENT... [STRICT]",
    "> INITIALIZING MPSC JOB QUEUES... [LOCK-FREE]",
    "> MOUNTING SWARM_OS v6.0...",
    "> SYSTEM READY. AWAITING OPERATOR INPUT."
];

const typingElement = document.getElementById('typing-text');
let lineIndex = 0;
let charIndex = 0;

// Clear the hardcoded HTML placeholder text immediately
typingElement.innerHTML = '';

function typeLine() {
    // If we still have lines left to type
    if (lineIndex < bootText.length) {
        
        // If this is the first character of a new line, create a div for it
        if (charIndex === 0) {
            const lineDiv = document.createElement('div');
            lineDiv.id = `line-${lineIndex}`;
            // Optional: Make the final line amber for emphasis
            if (lineIndex === bootText.length - 1) {
                lineDiv.classList.add('amber-glow');
            }
            typingElement.appendChild(lineDiv);
        }

        // Grab the current line div and append the next character
        const currentLine = document.getElementById(`line-${lineIndex}`);
        currentLine.innerHTML += bootText[lineIndex].charAt(charIndex);
        charIndex++;

        // If the line isn't finished, keep typing
        if (charIndex < bootText[lineIndex].length) {
            // Randomize typing speed between 10ms and 50ms for realism
            let typeSpeed = Math.random() * 40 + 10;
            setTimeout(typeLine, typeSpeed);
        } else {
            // Line is finished! Reset char index, move to next line, and pause
            charIndex = 0;
            lineIndex++;
            setTimeout(typeLine, 400); // 400ms pause between lines
        }
    } else {
        // The entire boot sequence is finished. Add the blinking cursor.
        const cursor = document.createElement('span');
        cursor.className = 'blinking-cursor';
        cursor.innerHTML = ' _';
        document.getElementById(`line-${lineIndex - 1}`).appendChild(cursor);
    }
}

// Start the sequence 500ms after the window loads
window.onload = () => {
    setTimeout(typeLine, 500);
};