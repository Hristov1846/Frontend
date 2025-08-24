import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };
    loadPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-6 space-y-4">
      <h2 className="text-2xl font-bold">Latest Posts</h2>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((p) => (
          <div key={p._id} className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-bold">{p.author?.name}</h3>
            <p>{p.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
