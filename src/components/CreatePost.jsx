import React, { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content && !file) return alert("Напиши нещо или избери файл!");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", content);
      if (file) formData.append("file", file);

      const res = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent("");
      setFile(null);
      if (onPostCreated) onPostCreated(res.data);
    } catch (err) {
      console.error("Грешка при публикуване:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Какво мислиш в момента?"
          className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring focus:border-purple-400"
          rows="3"
        ></textarea>

        <div className="flex items-center justify-between mt-2">
          <label className="cursor-pointer bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition">
            📷 Прикачи файл
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Публикуване..." : "Публикувай"}
          </button>
        </div>

        {file && <p className="mt-2 text-sm text-gray-600">📎 {file.name}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
