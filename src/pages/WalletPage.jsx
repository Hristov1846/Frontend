import React, { useState } from "react";

const WalletPage = () => {
  const [balance, setBalance] = useState(1200);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "зареждане", amount: 500, date: "2025-08-15" },
    { id: 2, type: "дарение", amount: -200, date: "2025-08-16" },
  ]);

  const packages = [
    { id: 1, coins: 500, price: "1€" },
    { id: 2, coins: 1200, price: "2€" },
    { id: 3, coins: 2500, price: "4€" },
    { id: 4, coins: 7000, price: "10€" },
  ];

  const handleBuy = (pkg) => {
    setBalance(balance + pkg.coins);
    setTransactions([
      { id: transactions.length + 1, type: "зареждане", amount: pkg.coins, date: new Date().toISOString().split("T")[0] },
      ...transactions,
    ]);
  };

  const handleWithdraw = () => {
    if (balance >= 1000) {
      setBalance(balance - 1000);
      setTransactions([
        { id: transactions.length + 1, type: "теглене", amount: -1000, date: new Date().toISOString().split("T")[0] },
        ...transactions,
      ]);
      alert("Тегленето е заявено успешно!");
    } else {
      alert("Нямате достатъчно V-Coins за теглене.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-teal-500 min-h-screen text-white p-6">
      <h1 className="text-3xl font-bold mb-6">💰 Моето Портмоне</h1>

      {/* Баланс */}
      <div className="bg-black bg-opacity-30 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold">Текущ баланс</h2>
        <p className="text-4xl mt-2 font-bold">{balance} V-Coins</p>
        <button
          onClick={handleWithdraw}
          className="mt-4 px-4 py-2 bg-teal-600 rounded-lg"
        >
          Тегли 1000 V-Coins
        </button>
      </div>

      {/* Пакети */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Купи V-Coins</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-black bg-opacity-30 p-4 rounded-xl flex justify-between items-center"
            >
              <span className="text-lg">{pkg.coins} V-Coins</span>
              <div className="flex items-center gap-3">
                <span className="font-bold">{pkg.price}</span>
                <button
                  onClick={() => handleBuy(pkg)}
                  className="px-4 py-2 bg-yellow-500 rounded-lg"
                >
                  Купи
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* История */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">История на транзакциите</h2>
        <div className="bg-black bg-opacity-30 p-4 rounded-xl">
          {transactions.length === 0 ? (
            <p>Няма транзакции.</p>
          ) : (
            <ul className="space-y-2">
              {transactions.map((tx) => (
                <li
                  key={tx.id}
                  className="flex justify-between border-b border-gray-500 pb-2"
                >
                  <span>
                    {tx.type === "зареждане" && "⬆️"}
                    {tx.type === "дарение" && "🎁"}
                    {tx.type === "теглене" && "⬇️"} {tx.type}
                  </span>
                  <span
                    className={`${
                      tx.amount > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {tx.amount > 0 ? `+${tx.amount}` : tx.amount} V-Coins
                  </span>
                  <span className="text-sm">{tx.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
