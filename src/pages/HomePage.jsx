import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [lives, setLives] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    // TODO: fetch real data from backend
    setPosts([
      { id: 1, user: "Ivan", content: "Здравей YouVibe!", likes: 12 },
      { id: 2, user: "Maria", content: "Първия ми пост ❤️", likes: 30 },
    ]);

    setLives([
      { id: 1, user: "Petar", viewers: 122 },
      { id: 2, user: "Elena", viewers: 300 },
    ]);

    setNews([
      { id: 1, title: "Breaking News!", source: "BBC" },
      { id: 2, title: "AI революцията продължава", source: "TechCrunch" },
    ]);
  }, []);

  return (
    <div className="p-6 text-white bg-gradient-to-br from-purple-700 via-pink-600 to-teal-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Начало</h1>

      {/* LIVE Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">🔴 Live излъчвания</h2>
        <div className="grid grid-cols-2 gap-4">
          {lives.map((live) => (
            <div key={live.id} className="p-4 bg-black bg-opacity-30 rounded-xl">
              <h3 className="font-bold">{live.user}</h3>
              <p>👥 {live.viewers} зрители</p>
              <button className="mt-2 px-4 py-2 bg-red-500 rounded-lg">
                Влез
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">📝 Публикации</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-black bg-opacity-30 rounded-xl">
              <h3 className="font-bold">{post.user}</h3>
              <p>{post.content}</p>
              <div className="flex items-center gap-4 mt-2">
                <span>❤️ {post.likes}</span>
                <button className="px-3 py-1 bg-pink-500 rounded-lg">Харесай</button>
                <button className="px-3 py-1 bg-blue-500 rounded-lg">Коментар</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">🌍 Новини</h2>
        <ul>
          {news.map((n) => (
            <li key={n.id} className="p-2 border-b border-white border-opacity-30">
              <strong>{n.title}</strong> <span className="text-sm">({n.source})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
