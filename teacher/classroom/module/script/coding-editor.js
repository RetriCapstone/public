// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    const codeEditor = document.getElementById('codeEditor');

    // Add event listeners
    codeEditor.addEventListener('scroll', syncScroll);

    // Initialize line numbers on load
    updateLineNumbers();
    initWebSocket();

    const btnSubmit = document.querySelector('#btn-submit');
    btnSubmit.addEventListener('click', () => {
        executeCode();
    });

    const btnCompiler = document.querySelector('#btn-compiler-code');
    const ideCompiler = document.querySelector('#code-compiler-ide');

    const btnInput = document.querySelector('#btn-input-code');
    const ideInput = document.querySelector('#code-input-ide');

    const btnOutput = document.querySelector('#btn-output-code');
    const ideOutput = document.querySelector('#code-output-ide');

    btnCompiler.addEventListener('click', () => {
        activeButton(btnCompiler, btnInput, btnOutput);
        activeContainer(ideCompiler, ideInput, ideOutput);
    });

    btnInput.addEventListener('click', () => {
        activeButton(btnInput, btnCompiler, btnOutput);
        activeContainer(ideInput, ideCompiler, ideOutput);
    });

    btnOutput.addEventListener('click', () => {
        activeButton(btnOutput, btnCompiler, btnInput);
        activeContainer(ideOutput, ideInput, ideCompiler);
    });
});
let socket;
let isSocketOpen = false; // Track the connection state

// Initialize WebSocket
function initWebSocket() {
    socket = new WebSocket('ws://localhost:8080');

    socket.onopen = function () {
        console.log("WebSocket connection established.");
        isSocketOpen = true; // Set the connection state to open
    };

    socket.onmessage = function (event) {
        const message = event.data;
        const parsedMessage = JSON.parse(message);

        if (parsedMessage.type === 'output') {
            document.getElementById('codeOutput').innerText += parsedMessage.data + "\n";
        }

        if (parsedMessage.data.includes("Waiting for input...")) {
            // Switch to input tab
            activeButton(document.querySelector('#btn-input-code'), document.querySelector('#btn-compiler-code'), document.querySelector('#btn-output-code'));
            activeContainer(document.querySelector('#code-input-ide'), document.querySelector('#code-compiler-ide'), document.querySelector('#code-output-ide'));
            const userInput = document.getElementById('codeInput').value; // Get input from input textarea
            socket.send(JSON.stringify({ type: 'input', input: userInput }));
            document.getElementById('codeInput').value = ""; // Clear the input field after sending
        }
    };

    socket.onerror = function (error) {
        document.getElementById('codeOutput').innerText += "WebSocket Error: " + error + "\n";
    };
}

// Send code to server for execution
function executeCode() {
    const code = document.getElementById('codeEditor').value;
    document.getElementById('codeOutput').innerText = ""; // Clear console output

    // Only send the code if the socket is open
    if (isSocketOpen) {
        socket.send(JSON.stringify({ type: 'execute', code: code }));
    } else {
        console.log("WebSocket is not open. Please try again later.");
    }
}


async function activeButton(activeBtn, notActiveBtn1, notActiveBtn2) {
    activeBtn.classList.add('code-active-btn');
    notActiveBtn1.classList.remove('code-active-btn');
    notActiveBtn2.classList.remove('code-active-btn');
}

async function activeContainer(activeCon, notActive1, notActive2) {
    activeCon.style.display = 'flex';
    notActive1.style.display = 'none';
    notActive2.style.display = 'none';
}

function updateLineNumbers() {
    const codeEditor = document.getElementById('codeEditor');
    const numberOfLines = codeEditor.value.split('\n').length;
}

function syncScroll() {
    const codeEditor = document.getElementById('codeEditor');
    const lineNumbers = document.getElementById('lineNumbers');
    lineNumbers.scrollTop = codeEditor.scrollTop;
}
