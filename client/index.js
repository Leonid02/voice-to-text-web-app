// Check for browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false; // Stops after the user finishes the phrase
recognition.lang = 'en-US';     // You can change this to any language

const startBtn = document.getElementById('start-btn');

startBtn.onclick = () => {
    recognition.start();
    console.log("Listening...");
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("User said: ", transcript);
    
    // Send to your server
    sendToServer(transcript);
};

async function sendToServer(phrase) {
    try {
        const response = await fetch('https://your-api-url.com/receive-phrase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phrase: phrase })
        });
        const data = await response.json();
        alert("Server received: " + data.message);
    } catch (error) {
        console.error("Error sending to server:", error);
    }
}