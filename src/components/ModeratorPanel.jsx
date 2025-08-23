// frontend/src/components/ModeratorPanel.jsx
import React, { useState } from "react";

export default function ModeratorPanel() {
  const [viewers, setViewers] = useState([
    { id: 1, name: "Иван", muted: false, banned: false },
    { id: 2, name: "Мария", muted: false, banned: false },
    { id: 3, name: "Петър", muted: false, banned: false },
  ]);

  const muteUser = (id) => {
    setViewers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, muted: !v.muted } : v
      )
    );
  };

  const banUser = (id) => {
    setViewers((prev) =>
      prev.map((v) =>
        v.id === id ? { ...v, banned: !v.banned } : v
      )
    );
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🛡️ Модераторски панел</h2>
      <p className="mb-4 text-gray-400">
        Изберете зрител и приложете действие (Mute / Ban).
      </p>

      <div className="space-y-3">
        {viewers.map((viewer) => (
          <div
            key={viewer.id}
            className="flex justify-between items-center bg-gray-800 p-3 rounded-lg"
          >
            <div>
              <p className="font-bold">{viewer.name}</p>
              {viewer.muted && (
                <p className="text-yellow-400 text-sm">🔇 Заглушен</p>
              )}
              {viewer.banned && (
                <p className="text-red-400 text-sm">⛔ Баннат</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => muteUser(viewer.id)}
                className={`px-4 py-2 rounded-lg ${
                  viewer.muted ? "bg-yellow-500" : "bg-yellow-700"
                }`}
              >
                {viewer.muted ? "🔊 Unmute" : "🔇 Mute"}
              </button>
              <button
                onClick={() => banUser(viewer.id)}
                className={`px-4 py-2 rounded-lg ${
                  viewer.banned ? "bg-red-500" : "bg-red-700"
                }`}
              >
                {viewer.banned ? "✅ Unban" : "⛔ Ban"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
