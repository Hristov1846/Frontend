// frontend/src/pages/ModeratorSettings.jsx
import React, { useState } from "react";

export default function ModeratorSettings() {
  const [moderators, setModerators] = useState([]);
  const [username, setUsername] = useState("");

  const addModerator = () => {
    if (username.trim() === "") return;
    setModerators([...moderators, { name: username }]);
    setUsername("");
  };

  const removeModerator = (name) => {
    setModerators(moderators.filter((mod) => mod.name !== name));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-purple-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🛡️ Настройки на Модератори</h1>

      {/* Добавяне на модератор */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">➕ Добави Модератор</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Въведи потребителско име..."
            className="flex-1 p-2 rounded-lg text-black"
          />
          <button
            onClick={addModerator}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Добави
          </button>
        </div>
      </div>

      {/* Списък с модератори */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">👥 Мои Модератори</h2>
        {moderators.length === 0 ? (
          <p className="text-gray-400">Нямаш добавени модератори.</p>
        ) : (
          <ul className="space-y-3">
            {moderators.map((mod, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-lg"
              >
                <span>{mod.name}</span>
                <button
                  onClick={() => removeModerator(mod.name)}
                  className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg"
                >
                  Премахни
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
