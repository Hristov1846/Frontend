import React, { useState, useEffect } from "react";

function LiveStream() {
  const [viewers, setViewers] = useState(128); // брой зрители
  const [messages, setMessages] = useState([
    { user: "Maria", text: "Успех! 🔥" },
    { user: "Ivan", text: "Изпращам сърце ❤️" },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [gifts, setGifts] = useState([]);
  const [coins, setCoins] = useState(1000); // налични V-Coins

  const availableGifts = [
    { id: 1, name: "🌹 Роза", price: 50 },
    { id: 2, name: "🐬 Делфин", price: 200 },
    { id: 3, name: "🐒 Маймуна", price: 500 },
    { id: 4, name: "🚂 Влак", price: 800 },
    { id: 5, name: "🦈 Акула", price: 1200 },
    { id: 6, name: "🐘 Слон", price: 2000 },
  ];

  // Изпращане на съобщение
  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { user: "Аз", text: inputMessage }]);
      setInputMessage("");
    }
  };

  // Изпращане на подарък
  const sendGift = (gift) => {
    if (coins >= gift.price) {
      setCoins(coins - gift.price);
      setGifts([...gifts, { ...gift, sender: "Аз" }]);
    } else {
      alert("Недостатъчно V-Coins!");
    }
  };

  // Анимация за подаръци
  useEffect(() => {
    if (gifts.length > 0) {
      const timer = setTimeout(() => {
        setGifts([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [gifts]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white">
      {/* Заглавие */}
      <header className="p-4 flex justify-between items-center bg-black/30">
        <h1 className="text-2xl font-bold">🔴 Live Излъчване</h1>
        <span className="bg-white/20 px-3 py-1 rounded-full">
          👥 {viewers} зрители
        </span>
      </header>

      {/* Видео секция (примерен контейнер) */}
      <div className="flex-1 flex items-center justify-center bg-black/40">
        <p className="text-lg">🎥 Видео на живо...</p>
      </div>

      {/* Подаръци */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-3xl">
        {gifts.map((gift, index) => (
          <div
            key={index}
            className="animate-bounce mb-2 bg-white/20 px-4 py-2 rounded-lg shadow-lg"
          >
            {gift.sender} изпрати {gift.name} ✨
          </div>
        ))}
      </div>

      {/* Чат */}
      <div className="bg-black/50 p-4 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.user}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Въвеждане на съобщение */}
      <div className="flex p-4 bg-black/60">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Напиши съобщение..."
          className="flex-1 px-3 py-2 rounded-lg text-black"
        />
        <button
          onClick={sendMessage}
          className="ml-2 bg-blue-500 px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Изпрати
        </button>
      </div>

      {/* Дарения */}
      <div className="bg-black/70 p-4">
        <h2 className="text-lg mb-2">🎁 Изпрати подарък</h2>
        <div className="flex flex-wrap gap-2">
          {availableGifts.map((gift) => (
            <button
              key={gift.id}
              onClick={() => sendGift(gift)}
              className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
            >
              {gift.name} ({gift.price} V-Coins)
            </button>
          ))}
        </div>
        <p className="mt-2">💰 Твоите монети: {coins} V-Coins</p>
      </div>
    </div>
  );
}

export default LiveStream;
