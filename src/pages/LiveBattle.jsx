import React, { useState, useEffect } from "react";

function LiveBattle() {
  const [user1, setUser1] = useState({
    name: "Maria",
    score: 0,
    coins: 1000,
  });
  const [user2, setUser2] = useState({
    name: "Ivan",
    score: 0,
    coins: 1000,
  });

  const [timeLeft, setTimeLeft] = useState(60); // битка от 60 секунди
  const [gifts, setGifts] = useState([]);
  const [winner, setWinner] = useState(null);

  const availableGifts = [
    { id: 1, name: "🌹 Роза", price: 50 },
    { id: 2, name: "🐬 Делфин", price: 200 },
    { id: 3, name: "🐒 Маймуна", price: 500 },
    { id: 4, name: "🚂 Влак", price: 800 },
    { id: 5, name: "🦈 Акула", price: 1200 },
    { id: 6, name: "🐘 Слон", price: 2000 },
  ];

  // Таймер
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Когато свърши времето – изчислява победител
      if (user1.score > user2.score) {
        setWinner(user1.name);
      } else if (user2.score > user1.score) {
        setWinner(user2.name);
      } else {
        setWinner("Равенство 🤝");
      }
    }
  }, [timeLeft, user1, user2]);

  // Изпращане на подарък
  const sendGift = (sender, receiver, gift) => {
    if (sender.coins >= gift.price) {
      const updatedSender = {
        ...sender,
        coins: sender.coins - gift.price,
      };
      const updatedReceiver = {
        ...receiver,
        score: receiver.score + gift.price,
      };

      // Обновяване на правилния потребител
      if (sender.name === user1.name) {
        setUser1(updatedSender);
        setUser2(updatedReceiver);
      } else {
        setUser2(updatedSender);
        setUser1(updatedReceiver);
      }

      // Добавяне на анимация за подаръка
      setGifts([
        ...gifts,
        { sender: sender.name, receiver: receiver.name, name: gift.name },
      ]);
    } else {
      alert(`${sender.name} няма достатъчно V-Coins!`);
    }
  };

  // Премахване на подаръци след няколко секунди
  useEffect(() => {
    if (gifts.length > 0) {
      const timer = setTimeout(() => {
        setGifts([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [gifts]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-red-600 via-purple-700 to-blue-600 text-white">
      {/* Заглавие */}
      <header className="p-4 flex justify-between items-center bg-black/40">
        <h1 className="text-2xl font-bold">⚔️ Live Battle</h1>
        <span className="bg-white/20 px-3 py-1 rounded-full">
          ⏳ {timeLeft} сек.
        </span>
      </header>

      {/* Потребители */}
      <div className="flex-1 grid grid-cols-2 gap-4 p-4">
        {/* User 1 */}
        <div className="bg-black/40 rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold">{user1.name}</h2>
          <p className="text-3xl font-bold">{user1.score} точки</p>
          <p className="mt-2">💰 {user1.coins} V-Coins</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {availableGifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => sendGift(user1, user2, gift)}
                className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
              >
                {gift.name} ({gift.price})
              </button>
            ))}
          </div>
        </div>

        {/* User 2 */}
        <div className="bg-black/40 rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-xl font-bold">{user2.name}</h2>
          <p className="text-3xl font-bold">{user2.score} точки</p>
          <p className="mt-2">💰 {user2.coins} V-Coins</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {availableGifts.map((gift) => (
              <button
                key={gift.id}
                onClick={() => sendGift(user2, user1, gift)}
                className="bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
              >
                {gift.name} ({gift.price})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Анимация на подаръци */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 text-2xl">
        {gifts.map((gift, index) => (
          <div
            key={index}
            className="animate-bounce mb-2 bg-white/20 px-4 py-2 rounded-lg shadow-lg"
          >
            {gift.sender} изпрати {gift.name} на {gift.receiver} 🎁
          </div>
        ))}
      </div>

      {/* Победител */}
      {winner && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center text-3xl font-bold">
          Победител: {winner} 🎉
        </div>
      )}
    </div>
  );
}

export default LiveBattle;
