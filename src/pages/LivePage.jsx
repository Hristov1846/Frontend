import React, { useState } from "react";

function LivePage() {
  const [viewers, setViewers] = useState(152); // примерен брой зрители
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [gifts, setGifts] = useState([]);

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { user: "Ти", text: input }]);
      setInput("");
    }
  };

  const handleSendGift = (gift) => {
    setGifts([...gifts, gift]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 text-white p-4">
      {/* Заглавие */}
      <h1 className="text-3xl font-bold mb-4">🎥 Live Stream</h1>

      {/* Видео секция */}
      <div className="flex-1 bg-black rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-gray-400">[ Видео излъчване тук ]</p>
      </div>

      {/* Брой зрители */}
      <div className="mt-2 text-right text-sm">
        👀 {viewers} зрители
      </div>

      {/* Подаръци */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => handleSendGift("🌹 Роза")}
          className="bg-pink-500 px-3 py-2 rounded-xl shadow hover:bg-pink-600"
        >
          🌹 Роза
        </button>
        <button
          onClick={() => handleSendGift("🐬 Делфин")}
          className="bg-blue-500 px-3 py-2 rounded-xl shadow hover:bg-blue-600"
        >
          🐬 Делфин
        </button>
        <button
          onClick={() => handleSendGift("🐘 Слон")}
          className="bg-gray-500 px-3 py-2 rounded-xl shadow hover:bg-gray-600"
        >
          🐘 Слон
        </button>
        <button
          onClick={() => handleSendGift("🚂 Влак")}
          className="bg-red-500 px-3 py-2 rounded-xl shadow hover:bg-red-600"
        >
          🚂 Влак
        </button>
      </div>

      {/* Визуализация на подаръци */}
      <div className="mt-4 h-16 flex items-center gap-2 overflow-x-auto">
        {gifts.map((gift, i) => (
          <span
            key={i}
            className="bg-white text-black px-3 py-1 rounded-full shadow-lg"
          >
            {gift}
          </span>
        ))}
      </div>

      {/* Чат секция */}
      <div className="mt-4 bg-white/10 rounded-xl p-3 flex flex-col h-64">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <p key={i}>
              <strong>{msg.user}: </strong>
              {msg.text}
            </p>
          ))}
        </div>

        {/* Въвеждане на съобщение */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Напиши съобщение..."
            className="flex-1 px-3 py-2 rounded-xl text-black"
          />
          <button
            onClick={handleSendMessage}
            className="bg-green-500 px-4 py-2 rounded-xl shadow hover:bg-green-600"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

export default LivePage;
