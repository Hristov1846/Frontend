// frontend/src/pages/Wallet.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

  const fetchWallet = async () => {
    try {
      const { data } = await axios.get("/api/wallet/balance");
      setBalance(data.balance);
    } catch (err) {
      console.error("Error fetching wallet:", err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get("/api/wallet/transactions");
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  const handleDeposit = async () => {
    try {
      await axios.post("/api/wallet/deposit", { amount });
      setAmount("");
      fetchWallet();
      fetchTransactions();
    } catch (err) {
      console.error("Deposit error:", err);
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post("/api/wallet/withdraw", { amount });
      setAmount("");
      fetchWallet();
      fetchTransactions();
    } catch (err) {
      console.error("Withdraw error:", err);
    }
  };

  const handleSend = async () => {
    try {
      await axios.post("/api/wallet/send", { recipient, amount });
      setRecipient("");
      setAmount("");
      fetchWallet();
      fetchTransactions();
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-white mb-6">💰 V-Coins Wallet</h1>

      {/* Баланс */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-bold text-gray-800">Баланс</h2>
        <p className="text-3xl font-extrabold text-green-600 mt-2">{balance} V-Coins</p>
      </div>

      {/* Действия */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800">Управление</h2>

        <input
          type="number"
          placeholder="Сума"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex gap-3">
          <button
            onClick={handleDeposit}
            className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            🔼 Зареди
          </button>
          <button
            onClick={handleWithdraw}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            🔽 Изтегли
          </button>
        </div>

        <input
          type="text"
          placeholder="Потребител ID за изпращане"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSend}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          📤 Изпрати V-Coins
        </button>
      </div>

      {/* История */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">История на транзакции</h2>
        <ul className="space-y-2 max-h-60 overflow-y-auto">
          {transactions.length > 0 ? (
            transactions.map((t, i) => (
              <li key={i} className="p-3 border rounded-lg flex justify-between">
                <span>{t.type} → {t.details}</span>
                <span className={t.type === "deposit" ? "text-green-600" : "text-red-600"}>
                  {t.amount} V-Coins
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Няма транзакции</p>
          )}
        </ul>
      </div>
    </div>
  );
}
