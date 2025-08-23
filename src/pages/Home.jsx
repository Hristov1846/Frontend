import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [lives, setLives] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const postsRes = await axios.get("http://localhost:5000/api/posts", config);
      const liveRes = await axios.get("http://localhost:5000/api/live", config);

      // Тук вместо статични новини по-късно ще вържем API
      const demoNews = [
        { id: 1, title: "🌍 Светът става все по-свързан чрез социалните мрежи" },
        { id: 2, title: "🚀 YouVibe расте с всеки изминал ден" },
        { id: 3, title: "📱 Най-новите тенденции в мобилните приложения" },
      ];

      setPosts(postsRes.data);
      setLives(liveRes.data);
      setNews(demoNews);
    } catch (err) {
      console.error("Грешка при зареждане:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-center text-2xl font-bold shadow-lg">
        YouVibe – Начало
      </header>

      {/* Live Streams */}
      <section className="p-4">
        <h2 className="text-xl font-bold mb-3">🔴 Лайф излъчвания</h2>
        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {lives.length > 0 ? (
            lives.map((live) => (
              <div
                key={live._id}
                className="w-48 h-32 bg-black text-white flex items-center justify-center rounded-lg cursor-pointer hover:scale-105 transition"
                onClick={() => navigate(`/live/${live._id}`)}
              >
                {live.title || "Live"}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Няма активни излъчвания.</p>
          )}
        </div>
      </section>

      {/* User Posts */}
      <section className="p-4">
        <h2 className="text-xl font-bold mb-3">📝 Публикации</h2>
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
              >
                <h3 className="font-semibold">{post.author?.firstName} {post.author?.lastName}</h3>
                <p className="text-gray-700 mt-2">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="mt-2 rounded-lg max-h-64 object-cover"
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Все още няма публикации.</p>
          )}
        </div>
      </section>

      {/* News Section */}
      <section className="p-4">
        <h2 className="text-xl font-bold mb-3">🌍 Новини от света</h2>
        <div className="space-y-2">
          {news.map((n) => (
            <div
              key={n.id}
              className="bg-white p-3 rounded-lg shadow hover:bg-gray-50 transition"
            >
              {n.title}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
