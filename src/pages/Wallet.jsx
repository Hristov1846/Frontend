import React, { useState } from "react";

function Wallet() {
  const [balance, setBalance] = useState(1000); // стартови V-Coins
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Купуване", amount: 500, date: "2025-08-01" },
    { id: 2, type: "Изпращане", amount: -200, date: "2025-08-10" },
  ]);

  const [sendAmount, setSendAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");

  // Купуване на V-Coins
  const buyCoins = () => {
    const amount = parseInt(buyAmount);
    if (!amount || amount <= 0) return alert("Въведи валидна сума!");
    setBalance(balance + amount);
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        type: "Купуване",
        amount: amount,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setBuyAmount("");
  };

  // Изпращане на V-Coins
  const sendCoins = () => {
    const amount = parseInt(sendAmount);
    if (!amount || amount <= 0) return alert("Въведи валидна сума!");
    if (amount > balance) return alert("Нямаш достатъчно V-Coins!");
    setBalance(balance - amount);
    setTransactions([
      ...transactions,
      {
        id: transactions.length + 1,
        type: "Изпращане",
        amount: -amount,
        date: new Date().toLocaleDateString(),
      },
    ]);
    setSendAmount("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white p-6">
      {/* Заглавие */}
      <h1 className="text-3xl font-bold mb-6 text-center">💰 Моето портмоне</h1>

      {/* Баланс */}
      <div className="bg-black/40 rounded-lg p-6 text-center mb-6">
        <h2 className="text-xl">Текущ баланс</h2>
        <p className="text-4xl font-bold mt-2">{balance} V-Coins</p>
      </div>

      {/* Купуване */}
      <div className="bg-black/40 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Купи V-Coins</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={buyAmount}
            onChange={(e) => setBuyAmount(e.target.value)}
            placeholder="Сума"
            className="p-2 rounded-lg text-black flex-1"
          />
          <button
            onClick={buyCoins}
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Купи
          </button>
        </div>
      </div>

      {/* Изпращане */}
      <div className="bg-black/40 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-bold mb-2">Изпрати V-Coins</h2>
        <div className="flex gap-2">
          <input
            type="number"
            value={sendAmount}
            onChange={(e) => setSendAmount(e.target.value)}
            placeholder="Сума"
            className="p-2 rounded-lg text-black flex-1"
          />
          <button
            onClick={sendCoins}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Изпрати
          </button>
        </div>
      </div>

      {/* История */}
      <div className="bg-black/40 rounded-lg p-6">
        <h2 className="text-lg font-bold mb-4">История на транзакциите</h2>
        {transactions.length === 0 ? (
          <p>Все още няма транзакции.</p>
        ) : (
          <ul className="space-y-2">
            {transactions.map((t) => (
              <li
                key={t.id}
                className="flex justify-between bg-white/10 px-4 py-2 rounded-lg"
              >
                <span>{t.type}</span>
                <span
                  className={
                    t.amount > 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  {t.amount > 0 ? `+${t.amount}` : t.amount} V-Coins
                </span>
                <span className="text-sm">{t.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Wallet;
