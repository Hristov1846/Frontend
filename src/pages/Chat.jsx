import React, { useState, useEffect } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [tempImage, setTempImage] = useState(null);
  const [showTempImage, setShowTempImage] = useState(false);

  // Изпращане на съобщение
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), text: input, type: "text" };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  // Качване на снимка
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newMessage = { id: Date.now(), text: reader.result, type: "image" };
      setMessages([...messages, newMessage]);
    };
    reader.readAsDataURL(file);
  };

  // Временна снимка (изчезва след 5 секунди)
  const sendTempImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setTempImage(reader.result);
      setShowTempImage(true);

      setTimeout(() => {
        setShowTempImage(false);
        setTempImage(null);
      }, 5000);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex flex-col">
      {/* Заглавие */}
      <div className="p-4 bg-black/50 text-center text-lg font-bold shadow">
        💬 Чат с приятели
      </div>

      {/* Съобщения */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-400 text-center">Все още няма съобщения...</p>
        ) : (
          messages.map((msg) =>
            msg.type === "text" ? (
              <div
                key={msg.id}
                className="bg-white/10 p-3 rounded-lg max-w-xs self-start"
              >
                {msg.text}
              </div>
            ) : (
              <div key={msg.id} className="self-start">
                <img
                  src={msg.text}
                  alt="chat-img"
                  className="w-40 h-40 rounded-lg shadow-lg"
                />
              </div>
            )
          )
        )}

        {/* Временна снимка */}
        {showTempImage && tempImage && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <img
              src={tempImage}
              alt="temp-img"
              className="max-w-xs rounded-xl shadow-2xl border-4 border-white"
            />
            <span className="absolute bottom-10 text-gray-300 text-sm">
              ⏳ Тази снимка ще изчезне след 5 секунди
            </span>
          </div>
        )}
      </div>

      {/* Въвеждане */}
      <div className="p-4 bg-black/70 flex gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напиши съобщение..."
          className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          ➤
        </button>
        <label className="cursor-pointer bg-green-500 px-3 py-2 rounded-lg hover:bg-green-600">
          📸
          <input type="file" className="hidden" onChange={uploadImage} />
        </label>
        <label className="cursor-pointer bg-pink-500 px-3 py-2 rounded-lg hover:bg-pink-600">
          ⏳
          <input type="file" className="hidden" onChange={sendTempImage} />
        </label>
      </div>
    </div>
  );
}

export default Chat;
