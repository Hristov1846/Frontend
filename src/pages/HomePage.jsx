import React, { useEffect, useState } from "react";
import api from "../api/axios";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await api.get("/posts"); // ⚡ бекенд route: /api/posts
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading posts", err);
      }
    };
    loadPosts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p._id} className="border p-2 mb-2">
              <h3 className="font-bold">{p.author?.name}</h3>
              <p>{p.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
