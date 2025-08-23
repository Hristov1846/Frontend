import React, { useState } from "react";

function BattleLive() {
  const [timeLeft, setTimeLeft] = useState(120); // 2 минути
  const [user1, setUser1] = useState({ name: "Играч 1", score: 0 });
  const [user2, setUser2] = useState({ name: "Играч 2", score: 0 });
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Дарения
  const gifts = [
    { icon: "🌹", label: "Роза", points: 10 },
    { icon: "🐬", label: "Делфин", points: 50 },
    { icon: "🐘", label: "Слон", points: 100 },
    { icon: "🚂", label: "Влак", points: 200 },
  ];

  // Изпращане на подарък
  const handleSendGift = (player, gift) => {
    if (player === 1) {
      setUser1({ ...user1, score: user1.score + gift.points });
    } else {
      setUser2({ ...user2, score: user2.score + gift.points });
    }
    setMessages([
      ...messages,
      { user: "Система", text: `${gift.icon} ${gift.label} за ${player === 1 ? user1.name : user2.name}` },
    ]);
  };

  // Изпращане на съобщение
  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { user: "Ти", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white p-4">
      {/* Заглавие */}
      <h1 className="text-3xl font-bold mb-4">🔥 Битка на живо</h1>

      {/* Играчите */}
      <div className="flex justify-between items-center bg-white/10 rounded-xl p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">{user1.name}</h2>
          <p className="text-2xl">{user1.score} 🏆</p>
        </div>
        <div className="text-3xl font-bold">VS</div>
        <div className="text-center">
          <h2 className="text-xl font-bold">{user2.name}</h2>
          <p className="text-2xl">{user2.score} 🏆</p>
        </div>
      </div>

      {/* Таймер */}
      <div className="mt-4 text-center text-lg">
        ⏳ Остават: {timeLeft} сек.
      </div>

      {/* Подаръци */}
      <div className="flex gap-2 mt-4 flex-wrap justify-center">
        {gifts.map((gift, i) => (
          <div key={i} className="flex flex-col items-center">
            <button
              onClick={() => handleSendGift(1, gift)}
              className="bg-pink-500 px-3 py-2 rounded-xl shadow hover:bg-pink-600 mb-1"
            >
              {gift.icon} {gift.label} → {user1.name}
            </button>
            <button
              onClick={() => handleSendGift(2, gift)}
              className="bg-blue-500 px-3 py-2 rounded-xl shadow hover:bg-blue-600"
            >
              {gift.icon} {gift.label} → {user2.name}
            </button>
          </div>
        ))}
      </div>

      {/* Чат */}
      <div className="mt-6 bg-white/10 rounded-xl p-3 flex flex-col h-64">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, i) => (
            <p key={i}>
              <strong>{msg.user}: </strong>
              {msg.text}
            </p>
          ))}
        </div>

        {/* Въвеждане */}
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

export default BattleLive;
