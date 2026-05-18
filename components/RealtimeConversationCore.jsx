"use client";

import { motion } from "framer-motion";
import { buildVoiceSettings } from "../lib/voice/languageRouter";
import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "gathergenius-data-permissions";

function speakBrowser(text, onEnd) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const message = new SpeechSynthesisUtterance(text);
    const settings = buildVoiceSettings(text);
    message.lang = settings.language;
    message.rate = settings.rate;
    message.pitch = settings.pitch;
    message.volume = settings.volume;
    message.onend = onEnd;
    message.onerror = onEnd;
    window.speechSynthesis.speak(message);
    return;
  }
  setTimeout(onEnd, 2000);
}

export default function RealtimeConversationCore() {
  const [status, setStatus] = useState("Ready");
  const [input, setInput] = useState("GeniusGather, ask me what you need to create my experience");
  const [messages, setMessages] = useState([
    { role: "GeniusGather", text: "I’m here. I’ll ask a few simple questions and build the result for you." }
  ]);
  const [speaking, setSpeaking] = useState(false);
  const [sessionStatus, setSessionStatus] = useState("Not connected");
  const [currentLock, setCurrentLock] = useState(null);
  const [approvedPermissions, setApprovedPermissions] = useState({});

  const audioRef = useRef(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setApprovedPermissions(JSON.parse(saved));
    } catch {}
  }, []);

  async function createRealtimeSession() {
    setSessionStatus("Creating realtime session...");
    try {
      const response = await fetch("/api/voice/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvedContext: JSON.stringify(approvedPermissions), currentState: status })
      });
      const data = await response.json();

      if (!data.ok) {
        setSessionStatus(data.message || "Realtime session not available. Using browser voice fallback.");
        return;
      }

      setSessionStatus("Realtime session ready");
    } catch (error) {
      setSessionStatus("Realtime session failed. Browser voice fallback is active.");
    }
  }

  async function respond() {
    const text = input.trim();
    if (!text) return;

    setStatus("Thinking");
    setMessages((items) => [...items, { role: "You", text }]);

    try {
      const response = await fetch("/api/conversation/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          permissions: approvedPermissions,
          currentLock
        })
      });

      const data = await response.json();
      const answer = data.response || "I understand. I’ll keep this simple.";

      if (data.localAction?.eventLock) setCurrentLock(data.localAction.eventLock);

      setMessages((items) => [...items, { role: "GeniusGather", text: answer }]);
      setStatus(data.action === "build_experience" ? "Result produced" : "Ready");

      setSpeaking(true);
      speakBrowser(answer, () => setSpeaking(false));
    } catch (error) {
      const issue = "I had trouble responding. The safest next step is to check the API route or environment variables.";
      setMessages((items) => [...items, { role: "GeniusGather", text: issue }]);
      setStatus("Issue");
      setSpeaking(true);
      speakBrowser(issue, () => setSpeaking(false));
    }
  }

  function startBrowserDictation() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const msg = "Browser speech recognition is not available here. You can still type or connect the OpenAI Realtime session.";
      setMessages((items) => [...items, { role: "GeniusGather", text: msg }]);
      speakBrowser(msg, () => null);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setStatus("Listening");
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput(transcript);
      setStatus("Heard you");
    };

    recognition.onerror = () => {
      setStatus("Issue");
      const msg = "I could not hear clearly. Please try again or type it once.";
      setMessages((items) => [...items, { role: "GeniusGather", text: msg }]);
      speakBrowser(msg, () => null);
    };
  }

  return (
    <section className="gg-realtime-core">
      <motion.div
        className={`gg-realtime-spark ${speaking ? "speaking" : ""}`}
        animate={speaking ? { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] } : { scale: [1, 1.02, 1] }}
        transition={{ duration: speaking ? 1.2 : 3.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span />
      </motion.div>

      <div className="gg-realtime-main">
        <span className="gg-status good">{status}</span>
        <h2>Let GeniusGather guide you.</h2>
        <p className="gg-note">
          Answer one question at a time. GeniusGather will quietly use background intelligence to produce the result.
        </p>

        <div className="gg-realtime-input">
          <input value={input} onChange={(event) => setInput(event.target.value)} />
          <button className="gg-btn green" type="button" onClick={respond}>ANSWER</button>
        </div>

        <div className="gg-realtime-actions">
          <button className="gg-btn secondary" type="button" onClick={startBrowserDictation}>TALK</button>
          <button className="gg-btn secondary" type="button" onClick={createRealtimeSession}>ENABLE LIVE VOICE</button>
          <span>{sessionStatus}</span>
        </div>

        <div className="gg-realtime-thread">
          {messages.slice(-6).map((item, index) => (
            <div className={`gg-bubble ${item.role === "You" ? "you" : "ai"}`} key={`${item.role}-${index}`}>
              <b>{item.role}</b>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        {currentLock && (
          <div className="gg-realtime-result">
            <div className="gg-line"><span>Result</span><strong>{currentLock.name}</strong></div>
            <div className="gg-line"><span>Confidence</span><strong>{currentLock.confidenceScore}%</strong></div>
            <div className="gg-line"><span>Deposit</span><strong>${Number(currentLock.deposit || 0).toLocaleString()}</strong></div>
          </div>
        )}

        <audio ref={audioRef} hidden />
      </div>
    </section>
  );
}
