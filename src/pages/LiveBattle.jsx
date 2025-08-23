// frontend/src/pages/LiveBattle.jsx
import React, { useState } from "react";
import ModeratorPanel from "../components/ModeratorPanel";

export default function LiveBattle() {
  const [showModeratorPanel, setShowModeratorPanel] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">⚔️ Live Battle</h1>

      {/* Зона за видео */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-black h-64 flex items-center justify-center rounded-xl shadow-lg">
          <p className="text-gray-400">🎥 Видео на Играч 1</p>
        </div>
        <div className="bg-black h-64 flex items-center justify-center rounded-xl shadow-lg">
          <p className="text-gray-400">🎥 Видео на Играч 2</p>
        </div>
      </div>

      {/* Контроли */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setShowModeratorPanel(!showModeratorPanel)}
          className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-lg"
        >
          {showModeratorPanel ? "❌ Затвори Модераторски Панел" : "🛡️ Отвори Модераторски Панел"}
        </button>
      </div>

      {/* Модераторски Панел */}
      {showModeratorPanel && (
        <div className="mt-6">
          <ModeratorPanel />
        </div>
      )}

      {/* Зрители / Чат */}
      <div className="bg-gray-800 p-6 rounded-xl mt-8 shadow-lg">
        <h2 className="text-xl font-bold mb-4">💬 Чат на битката</h2>
        <p className="text-gray-400">Зрителите ще могат да пишат тук...</p>
      </div>
    </div>
  );
}
