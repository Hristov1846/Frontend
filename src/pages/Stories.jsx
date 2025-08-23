import React, { useState } from "react";

function Stories() {
  const [stories, setStories] = useState([
    {
      id: 1,
      user: "Ivan",
      media: "https://placekitten.com/400/600",
      viewers: ["Maria", "Petar"],
      closeFriends: false,
    },
    {
      id: 2,
      user: "Maria",
      media: "https://placekitten.com/401/601",
      viewers: ["Ivan"],
      closeFriends: true,
    },
  ]);

  const [activeStory, setActiveStory] = useState(null);
  const [reaction, setReaction] = useState("");

  // Добавяне на история
  const addStory = (closeFriends = false) => {
    const newStory = {
      id: Date.now(),
      user: "Ти",
      media: "https://placekitten.com/402/602", // тук ще е качена снимка/видео
      viewers: [],
      closeFriends,
    };
    setStories([newStory, ...stories]);
  };

  // Отваряне на история
  const openStory = (story) => {
    setActiveStory(story);
    if (!story.viewers.includes("Ти")) {
      story.viewers.push("Ти"); // добавяме като гледал
    }
  };

  // Изпращане на реакция
  const sendReaction = (emoji) => {
    setReaction(emoji);
    alert(`Изпрати реакция ${emoji} към ${activeStory.user}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">📸 Истории</h2>

      {/* Бутон за нова история */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => addStory(false)}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          ➕ Нова история
        </button>
        <button
          onClick={() => addStory(true)}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          🔒 Само за близки
        </button>
      </div>

      {/* Списък с истории */}
      <div className="flex gap-3 overflow-x-scroll">
        {stories.map((story) => (
          <div
            key={story.id}
            onClick={() => openStory(story)}
            className={`w-24 h-40 rounded-lg bg-cover bg-center cursor-pointer border-4 ${
              story.closeFriends ? "border-green-500" : "border-blue-500"
            }`}
            style={{ backgroundImage: `url(${story.media})` }}
          >
            <p className="bg-black/60 text-center">{story.user}</p>
          </div>
        ))}
      </div>

      {/* Активна история */}
      {activeStory && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50">
          <img
            src={activeStory.media}
            alt="story"
            className="max-h-[80vh] rounded-lg shadow-lg"
          />
          <p className="mt-2">{activeStory.user}</p>

          {/* Реакции */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => sendReaction("❤️")}
              className="text-2xl hover:scale-125"
            >
              ❤️
            </button>
            <button
              onClick={() => sendReaction("🔥")}
              className="text-2xl hover:scale-125"
            >
              🔥
            </button>
            <button
              onClick={() => sendReaction("😂")}
              className="text-2xl hover:scale-125"
            >
              😂
            </button>
            <button
              onClick={() => sendReaction("👏")}
              className="text-2xl hover:scale-125"
            >
              👏
            </button>
          </div>

          {/* Кой е гледал */}
          <div className="mt-6 bg-gray-800 p-3 rounded-lg w-64">
            <h3 className="font-bold">👁️ Видели:</h3>
            <ul className="text-sm text-gray-300">
              {activeStory.viewers.map((v, i) => (
                <li key={i}>• {v}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setActiveStory(null)}
            className="mt-6 bg-red-600 px-4 py-2 rounded-lg"
          >
            ✖️ Затвори
          </button>
        </div>
      )}
    </div>
  );
}

export default Stories;
