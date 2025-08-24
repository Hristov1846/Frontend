import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [newPost, setNewPost] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRes = await API.get("/posts");
        setPosts(postsRes.data);

        const liveRes = await API.get("/live"); // опция за листинг на live
        setLiveSessions(liveRes.data || []);
      } catch (error) {
        console.error("Error loading data:", error.message);
      }
    };
    fetchData();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", { text: newPost });
      setNewPost("");
      const updated = await API.get("/posts");
      setPosts(updated.data);
    } catch (err) {
      console.error("Error creating post:", err.message);
    }
  };

  return (
    <div className="p-6">
      {/* Създаване на пост */}
      <form onSubmit={handlePostSubmit} className="mb-6">
        <textarea
          className="w-full border p-3 rounded-lg"
          placeholder="What's on your mind?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Post
        </button>
      </form>

      {/* Live Sessions */}
      <h2 className="text-xl font-bold mb-4">Live Sessions</h2>
      <div className="grid gap-4 mb-6">
        {liveSessions.length > 0 ? (
          liveSessions.map((live) => (
            <div
              key={live._id}
              className="p-4 bg-white shadow rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{live.title || "Live Session"}</p>
                <p className="text-gray-500">
                  Host: {live.host?.firstName} {live.host?.lastName}
                </p>
              </div>
              <Link
                to={`/live/${live._id}`}
                className="bg-pink-500 text-white px-4 py-1 rounded-lg hover:bg-pink-600"
              >
                Join
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No live sessions right now.</p>
        )}
      </div>

      {/* Posts */}
      <h2 className="text-xl font-bold mb-4">Feed</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className="p-4 bg-white shadow rounded-lg"
          >
            <p className="font-bold">
              {post.user?.firstName} {post.user?.lastName}
            </p>
            <p>{post.text}</p>
            {post.media && (
              <img
                src={post.media}
                alt="post"
                className="rounded mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
