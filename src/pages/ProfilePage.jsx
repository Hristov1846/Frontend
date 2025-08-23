import React, { useState } from "react";

const ProfilePage = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [roseSent, setRoseSent] = useState(false);

  const handleFriend = () => setIsFriend(!isFriend);
  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleRose = () => {
    setRoseSent(true);
    setTimeout(() => setRoseSent(false), 4000); // 4 секунди нотификация
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-pink-600 to-teal-500 min-h-screen text-white">
      {/* Cover */}
      <div className="relative">
        <img
          src="https://picsum.photos/800/250"
          alt="cover"
          className="w-full h-64 object-cover"
        />
        <div className="absolute -bottom-16 left-6">
          <img
            src="https://picsum.photos/150"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-20 p-6">
        <h1 className="text-3xl font-bold">Иван Иванов</h1>
        <p className="text-gray-200">🔥 Животът е вибрация – YouVibe!</p>

        {/* Action buttons */}
        <div className="flex gap-3 mt-4 flex-wrap">
          <button
            onClick={handleFriend}
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            {isFriend ? "Премахни приятел" : "Добави приятел"}
          </button>
          <button
            onClick={handleFollow}
            className="px-4 py-2 bg-green-600 rounded-lg"
          >
            {isFollowing ? "Откажи следване" : "Последвай"}
          </button>
          <button className="px-4 py-2 bg-yellow-500 rounded-lg">Сръчкай</button>
          <button className="px-4 py-2 bg-pink-600 rounded-lg">❤️ Харесай профил</button>
          <button
            onClick={handleRose}
            className="px-4 py-2 bg-red-500 rounded-lg"
          >
            🌹 Изпрати роза
          </button>
        </div>

        {/* Wallet Section */}
        <div className="mt-8 bg-black bg-opacity-30 p-4 rounded-xl">
          <h2 className="text-xl font-semibold">💰 Wallet</h2>
          <p className="mt-2">Баланс: <strong>1200 V-Coins</strong></p>
          <div className="flex gap-3 mt-3">
            <button className="px-4 py-2 bg-teal-600 rounded-lg">Зареди</button>
            <button className="px-4 py-2 bg-purple-600 rounded-lg">Тегли</button>
          </div>
        </div>

        {/* Settings */}
        <div className="mt-8 bg-black bg-opacity-30 p-4 rounded-xl">
          <h2 className="text-xl font-semibold">⚙️ Настройки</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Поверителност</li>
            <li>Общи условия</li>
            <li>Докладвай профил</li>
          </ul>
        </div>
      </div>

      {/* Rose Notification */}
      {roseSent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="text-center">
            <span className="text-6xl">🌹</span>
            <p className="mt-4 text-2xl font-bold">Получихте роза!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
