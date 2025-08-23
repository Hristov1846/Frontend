// frontend/src/pages/Marketplace.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("/api/marketplace");
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post("/api/marketplace", { title, description, price });
      setTitle("");
      setDescription("");
      setPrice("");
      fetchItems();
    } catch (err) {
      console.error("Error adding item:", err);
    }
  };

  const handleBuyItem = async (itemId) => {
    try {
      await axios.post(`/api/marketplace/buy/${itemId}`);
      fetchItems();
    } catch (err) {
      console.error("Error buying item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-600 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-white mb-6">🛒 Marketplace</h1>

      {/* Добавяне на продукт */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Добави продукт/услуга</h2>
        <input
          type="text"
          placeholder="Заглавие"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg mb-2"
        />
        <input
          type="number"
          placeholder="Цена (V-Coins)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 border rounded-lg mb-3"
        />
        <button
          onClick={handleAddItem}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          ➕ Добави продукт
        </button>
      </div>

      {/* Листа с продукти */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Налични продукти</h2>
        {items.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item._id}
                className="p-4 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-yellow-600 font-bold mt-1">{item.price} V-Coins</p>
                </div>
                <button
                  onClick={() => handleBuyItem(item._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Купи
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Няма налични продукти</p>
        )}
      </div>
    </div>
  );
}
