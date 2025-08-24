import React, { useState } from "react";
import API from "../api/axios";

const Assistant = () => {
  const [role, setRole] = useState("psychologist");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message) return;

    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);

    try {
      const res = await API.post("/ai/chat", { role, message });
      setChat([
        ...newChat,
        { sender: "ai", text: res.data.reply },
      ]);
      setMessage("");
    } catch (err) {
      setChat([
        ...newChat,
        { sender: "ai", text: "Error: could not connect to AI assistant." },
      ]);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🤖 AI Assistant</h2>

      {/* Role selector */}
      <div className="mb-4">
        <label className="mr-2 font-bold">Choose role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="psychologist">🧠 Psychologist</option>
          <option value="fitness">💪 Fitness Coach</option>
          <option value="diet">🥗 Dietologist</option>
        </select>
      </div>

      {/* Chat Window */}
      <div className="bg-white p-4 rounded-lg shadow-md h-96 overflow-y-scroll mb-4">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 ${
              msg.sender === "user"
                ? "text-right text-purple-700"
                : "text-left text-pink-600"
            }`}
          >
            <p
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-200"
                  : "bg-pink-200"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Assistant;
