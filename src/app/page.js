"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { role: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage.text }),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    { role: "assistant", text: data.reply },
  ]);
};
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-black text-white text-center p-4 text-xl font-bold">
        AI-Powered Chat Application
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 && (
          <p className="text-center text-gray-500">
            Start chatting with AI...
          </p>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-3 rounded-lg max-w-md ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </main>

      <footer className="p-4 bg-white flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </footer>
    </div>
  );
}