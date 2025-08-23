// frontend/src/pages/LiveStream.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [viewers, setViewers] = useState(0);
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [donations, setDonations] = useState([]);

  // Симулация за брояч на зрители
  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 3)); 
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const startLive = () => {
    setIsLive(true);
    setViewers(1);
    setMessages([]);
    setDonations([]);
  };

  const stopLive = () => {
    setIsLive(false);
    setViewers(0);
  };

  const sendMessage = () => {
    if (chatInput.trim() !== "") {
      setMessages([...messages, { sender: "Потребител", text: chatInput }]);
      setChatInput("");
    }
  };

  const sendDonation = (type) => {
    const donationItems = {
      rose: "🌹 Роза",
      dolphin: "🐬 Делфин",
      shark: "🦈 Акула",
      elephant: "🐘 Слон",
      monkey: "🐒 Маймуна",
      train: "🚂 Влак",
    };
    setDonations([...donations, donationItems[type]]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-600 to-pink-500 p-6 flex flex-col items-center text-white">
      <h1 className="text-4xl font-extrabold mb-6">📺 Live Streaming</h1>

      {!isLive ? (
        <button
          onClick={startLive}
          className="bg-green-500 px-6 py-3 rounded-xl text-lg font-bold hover:bg-green-600"
        >
          🚀 Стартирай лайф
        </button>
      ) : (
        <div className="w-full max-w-3xl bg-black/70 rounded-2xl p-4 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">🔴 На живо</h2>
            <span className="bg-red-500 px-4 py-1 rounded-full">
              👀 {viewers} зрители
            </span>
          </div>

          {/* Видео секция (тук ще влезе реалното видео по-късно) */}
          <div className="bg-gray-800 h-64 flex items-center justify-center rounded-xl mb-4">
            <p className="text-gray-300">🎥 Видеото върви тук...</p>
          </div>

          {/* Дарения */}
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => sendDonation("rose")}
              className="bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-600"
            >
              🌹 Роза
            </button>
            <button
              onClick={() => sendDonation("dolphin")}
              className="bg-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              🐬 Делфин
            </button>
            <button
              onClick={() => sendDonation("shark")}
              className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              🦈 Акула
            </button>
            <button
              onClick={() => sendDonation("elephant")}
              className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-700"
            >
              🐘 Слон
            </button>
            <button
              onClick={() => sendDonation("monkey")}
              className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
            >
              🐒 Маймуна
            </button>
            <button
              onClick={() => sendDonation("train")}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
            >
              🚂 Влак
            </button>
          </div>

          {/* Чат */}
          <div className="bg-gray-900 rounded-xl p-3 h-48 overflow-y-auto mb-3">
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <p key={i} className="text-sm mb-1">
                  <span className="font-bold">{msg.sender}: </span>
                  {msg.text}
                </p>
              ))
            ) : (
              <p className="text-gray-400">Няма съобщения в чата...</p>
            )}
          </div>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Напиши съобщение..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-2 rounded-lg text-black"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              ➤
            </button>
          </div>

          {/* Дарения, визуализирани на екрана */}
          {donations.length > 0 && (
            <div className="absolute top-4 right-4 bg-white text-black px-3 py-2 rounded-lg shadow-lg animate-bounce">
              {donations[donations.length - 1]}
            </div>
          )}

          <button
            onClick={stopLive}
            className="mt-6 bg-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-700"
          >
            ⏹ Спри лайфа
          </button>
        </div>
      )}
    </div>
  );
}
