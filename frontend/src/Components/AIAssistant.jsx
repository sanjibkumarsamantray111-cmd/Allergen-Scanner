import React, { useState, useEffect, useRef } from "react";
import "./Aiassients.css";
import { FaPaperPlane } from "react-icons/fa";
import API from "../api/api.js";

function AIScreen() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I’m your AI allergen assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔽 Auto scroll to bottom on new message
  const chatEndRef = useRef(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ask", { question: input });

      const botMsg = {
        sender: "bot",
        text: res.data.answer || "⚠ No response received.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("AI Error:", error);
      const botMsg = {
        sender: "bot",
        text: "⚠ Sorry, I couldn’t get a response right now.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-layout">
      <div className="chat-section">
        <h2>AI Assistant</h2>
        <p className="subtitle">
          Get instant answers about allergens, foods, and safety.
        </p>

        <div className="chat-box">
          {messages.map((m, i) => (
            <div key={i} className={`chat-message ${m.sender}`}>
              <p>{m.text}</p>
            </div>
          ))}

          {loading && (
            <div className="chat-message bot">
              <p>🤖 Thinking...</p>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask about allergens..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            <FaPaperPlane size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIScreen;