import React, { useState } from "react";

function UserProfile() {
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [likes, setLikes] = useState(128);

  // Харесване на профила
  const handleLike = () => {
    setLikes(likes + 1);
    setNotifications([
      ...notifications,
      { id: Date.now(), text: "❤️ Хареса твоя профил!" },
    ]);
  };

  // Сръчкване
  const handlePoke = () => {
    setNotifications([
      ...notifications,
      { id: Date.now(), text: "👉 Сръчка те!" },
    ]);
  };

  // Изпращане на роза
  const handleSendRose = () => {
    setNotifications([
      ...notifications,
      { id: Date.now(), text: "🌹 Изпрати ти роза! Приемаш ли?" },
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 to-black text-white">
      {/* Корицата */}
      <div className="relative w-full h-60 bg-gradient-to-r from-pink-500 to-purple-700">
        <button className="absolute bottom-2 right-2 bg-black/50 px-3 py-1 rounded-lg text-sm hover:bg-black/70">
          Смени корица
        </button>
      </div>

      {/* Профил секция */}
      <div className="relative -mt-16 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/120"
          alt="avatar"
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
        />
        <h1 className="text-2xl font-bold mt-2">Потребител123</h1>
        <p className="text-gray-300">🌍 София, България</p>

        {/* Бутоните */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleLike}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            ❤️ Харесай профил ({likes})
          </button>
          <button
            onClick={handlePoke}
            className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            👉 Сръчкай
          </button>
          <button
            onClick={handleSendRose}
            className="bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-600"
          >
            🌹 Изпрати роза
          </button>
        </div>

        {/* Приятел / Последвай */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setIsFriend(!isFriend)}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            {isFriend ? "✅ Приятели" : "➕ Добави приятел"}
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600"
          >
            {isFollowing ? "✔️ Следваш" : "👤 Последвай"}
          </button>
        </div>
      </div>

      {/* Известия */}
      <div className="mt-10 px-6">
        <h2 className="text-xl font-bold mb-4">🔔 Известия</h2>
        {notifications.length === 0 ? (
          <p className="text-gray-400">Все още няма известия...</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className="bg-white/10 p-3 rounded-lg text-sm flex justify-between"
              >
                <span>{n.text}</span>
                <button className="text-red-400 hover:underline">Затвори</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
