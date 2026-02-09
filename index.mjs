import React, {useEffect, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
const VoiceKioskController = () => {
  const [kioskId, setKioskId] = useState(null);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // 0. Activated by QR code: Extract Kiosk ID from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setKioskId(params.get('kioskId'));
  }, []);

  // 3. Deliver text to the servernpm i 
  const sendCommandToServer = async (text) => {
    try {
      await fetch('https://your-api-gateway.com/voice-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kioskId, phrase: text }),
      });
      console.log("Command sent:", text);
    } catch (error) {
      console.error("Delivery failed:", error);
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return "<span>Browser doesn't support speech recognition.</span>";
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Kiosk Remote {kioskId && `#${kioskId}`}</h1>
      
      {/* 1 & 2. Ask permission and start listening */}
      {!listening ? (
        <button onClick={SpeechRecognition.startListening}>
          🎤 Tap to Speak
        </button>
      ) : (
        <button onClick={SpeechRecognition.stopListening}>
          ⏹️ Stop & Send
        </button>
      )}

      <div style={{ marginTop: '20px' }}>
        <strong>You said:</strong>
        <p>{transcript}</p>
      </div>

      {transcript && !listening && (
        <button onClick={() => sendCommandToServer(transcript)}>
          Confirm & Play on Kiosk
        </button>
      )}
    </div>
  );
};

// export default VoiceKioskController;
