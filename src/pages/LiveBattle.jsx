// frontend/src/pages/LiveBattle.jsx
import React, { useState } from "react";

export default function LiveBattle() {
  const [isBattle, setIsBattle] = useState(false);
  const [user1Points, setUser1Points] = useState(0);
  const [user2Points, setUser2Points] = useState(0);
  const [winner, setWinner] = useState(null);

  const donationItems = {
    rose: { label: "🌹 Роза", value: 100 },
    dolphin: { label: "🐬 Делфин", value: 300 },
    shark: { label: "🦈 Акула", value: 500 },
    elephant: { label: "🐘 Слон", value: 700 },
    monkey: { label: "🐒 Маймуна", value: 200 },
    train: { label: "🚂 Влак", value: 1000 },
  };

  const startBattle = () => {
    setIsBattle(true);
    setUser1Points(0);
    setUser2Points(0);
    setWinner(null);
  };

  const stopBattle = () => {
    setIsBattle(false);
    if (user1Points > user2Points) {
      setWinner("Потребител 1");
    } else if (user2Points > user1Points) {
      setWinner("Потребител 2");
    } else {
      setWinner("Равен резултат");
    }
  };

  const sendDonation = (user, type) => {
    const donation = donationItems[type].value;
    if (user === 1) {
      setUser1Points((prev) => prev + donation);
    } else {
      setUser2Points((prev) => prev + donation);
    }
  };

  // Автоматично изчисляване на печалбата
  const calcEarnings = (points) => {
    const userShare = (points * 0.75).toFixed(2);
    const platformShare = (points * 0.25).toFixed(2);
    return { userShare, platformShare };
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-red-600 to-purple-600 p-6 text-white flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-6">⚔️ Live Battle</h1>

      {!isBattle ? (
        <button
          onClick={startBattle}
          className="bg-green-500 px-6 py-3 rounded-xl text-lg font-bold hover:bg-green-600"
        >
          🚀 Стартирай битка
        </button>
      ) : (
        <div className="w-full max-w-4xl bg-black/70 rounded-2xl p-6 relative">
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Играч 1 */}
            <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2">Потребител 1</h2>
              <div className="bg-gray-900 h-40 w-full flex items-center justify-center rounded-xl mb-2">
                <p className="text-gray-400">🎥 Видео 1</p>
              </div>
              <p className="text-lg font-bold">🔥 Точки: {user1Points}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.keys(donationItems).map((key) => (
                  <button
                    key={key}
                    onClick={() => sendDonation(1, key)}
                    className="bg-blue-500 px-3 py-2 rounded-lg hover:bg-blue-600"
                  >
                    {donationItems[key].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Играч 2 */}
            <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center">
              <h2 className="text-xl font-bold mb-2">Потребител 2</h2>
              <div className="bg-gray-900 h-40 w-full flex items-center justify-center rounded-xl mb-2">
                <p className="text-gray-400">🎥 Видео 2</p>
              </div>
              <p className="text-lg font-bold">🔥 Точки: {user2Points}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {Object.keys(donationItems).map((key) => (
                  <button
                    key={key}
                    onClick={() => sendDonation(2, key)}
                    className="bg-pink-500 px-3 py-2 rounded-lg hover:bg-pink-600"
                  >
                    {donationItems[key].label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={stopBattle}
            className="bg-red-600 px-6 py-3 rounded-xl font-bold hover:bg-red-700"
          >
            ⏹ Приключи битката
          </button>

          {winner && (
            <div className="mt-6 bg-white text-black p-4 rounded-xl">
              <h2 className="text-2xl font-bold">🏆 {winner}</h2>
              <div className="mt-4">
                <p>
                  Печалба Потребител 1:{" "}
                  <span className="font-bold">
                    {calcEarnings(user1Points).userShare} V-Coins
                  </span>{" "}
                  (Платформа: {calcEarnings(user1Points).platformShare})
                </p>
                <p>
                  Печалба Потребител 2:{" "}
                  <span className="font-bold">
                    {calcEarnings(user2Points).userShare} V-Coins
                  </span>{" "}
                  (Платформа: {calcEarnings(user2Points).platformShare})
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
