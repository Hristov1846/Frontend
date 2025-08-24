import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [targetUser, setTargetUser] = useState("");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await API.get("/wallet/balance");
        setBalance(res.data.balance);
      } catch (err) {
        console.error("Error loading balance:", err.message);
      }
    };
    fetchBalance();
  }, []);

  const handleDeposit = async () => {
    try {
      const res = await API.post("/wallet/deposit", { amount: Number(amount) });
      setBalance(res.data.balance);
      setAmount("");
      alert("Deposit successful!");
    } catch (err) {
      alert("Error depositing coins");
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await API.post("/wallet/withdraw", { amount: Number(amount) });
      setBalance(res.data.balance);
      setAmount("");
      alert("Withdrawal successful!");
    } catch (err) {
      alert("Error withdrawing coins");
    }
  };

  const handleTransfer = async () => {
    try {
      await API.post("/wallet/transfer", {
        targetUserId: targetUser,
        amount: Number(amount),
      });
      setAmount("");
      setTargetUser("");
      alert("Transfer successful!");
    } catch (err) {
      alert("Error transferring coins");
    }
  };

  const handleSendGift = async () => {
    try {
      await API.post("/wallet/gift", {
        targetUserId: targetUser,
        amount: Number(amount),
      });
      setAmount("");
      setTargetUser("");
      alert("Gift sent successfully!");
    } catch (err) {
      alert("Error sending gift");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">💰 Wallet</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-xl font-bold">
          Balance: <span className="text-purple-600">{balance} V-Coins</span>
        </p>
      </div>

      {/* Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-3">Deposit / Withdraw</h3>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleDeposit}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Deposit
            </button>
            <button
              onClick={handleWithdraw}
              className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="font-bold mb-3">Transfer / Gift</h3>
          <input
            type="text"
            placeholder="Target User ID"
            value={targetUser}
            onChange={(e) => setTargetUser(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded mb-3"
          />
          <div className="flex gap-2">
            <button
              onClick={handleTransfer}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Transfer
            </button>
            <button
              onClick={handleSendGift}
              className="flex-1 bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
            >
              Send Gift 🌹
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
