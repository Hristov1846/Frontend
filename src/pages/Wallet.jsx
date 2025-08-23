import React, { useState } from "react";

function Wallet() {
  const [balance, setBalance] = useState(1200); // текущи V-Coins
  const [history, setHistory] = useState([
    { type: "received", amount: 500, desc: "Подарък от приятел", date: "2025-08-21" },
    { type: "sent", amount: 200, desc: "Дарение на лайф", date: "2025-08-20" },
    { type: "purchase", amount: 1000, desc: "Купени V-Coins", date: "2025-08-18" },
  ]);

  const [buyAmount, setBuyAmount] = useState(0);

  // Добавяне на нова покупка
  const handleBuy = () => {
    if (buyAmount > 0) {
      const newHistory = [
        { type: "purchase", amount: buyAmount, desc: "Закупени V-Coins", date: new Date().toLocaleDateString() },
        ...history,
      ];
      setHistory(newHistory);
      setBalance(balance + buyAmount);
      setBuyAmount(0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white p-4">
      {/* Заглавие */}
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Моето портмоне</h1>

      {/* Баланс */}
      <div className="bg-white/10 rounded-xl shadow p-6 mb-6 text-center">
        <h2 className="text-lg">Текущ баланс</h2>
        <p className="text-4xl font-bold">{balance} V-Coins</p>
      </div>

      {/* Покупка на монети */}
      <div className="bg-white/10 rounded-xl p-4 mb-6">
        <h2 className="text-lg mb-3">Купи V-Coins</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(Number(e.target.value))}
            placeholder="Въведи количество..."
            className="flex-1 px-3 py-2 rounded-lg text-black"
          />
          <button
            onClick={handleBuy}
            className="bg-green-500 px-4 py-2 rounded-lg shadow hover:bg-green-600"
          >
            Купи
          </button>
        </div>
      </div>

      {/* История */}
      <div className="bg-white/10 rounded-xl p-4 flex-1">
        <h2 className="text-lg mb-3">История</h2>
        <div className="max-h-72 overflow-y-auto">
          {history.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-2 border-b border-white/20 ${
                item.type === "received"
                  ? "text-green-300"
                  : item.type === "sent"
                  ? "text-red-300"
                  : "text-yellow-300"
              }`}
            >
              <span>
                {item.desc} - {item.date}
              </span>
              <span>
                {item.type === "sent" ? "-" : "+"}
                {item.amount} V-Coins
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallet;
