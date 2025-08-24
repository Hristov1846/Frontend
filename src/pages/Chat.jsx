import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const socket = io("https://your-backend.onrender.com"); // смени с твоя Render URL

const Chat = () => {
  const { id } = useParams(); // ID на потребителя, с когото чатим
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/chat/${id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error loading messages:", err.message);
      }
    };
    fetchMessages();

    socket.emit("joinChat", [user._id, id].sort().join("_")); // room id based on users

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [id, user._id]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg && !media) return;

    const formData = {
      receiver: id,
      text: newMsg,
      media: media ? URL.createObjectURL(media) : null,
    };

    try {
      const res = await API.post("/chat", formData);
      socket.emit("sendMessage", {
        ...res.data,
        room: [user._id, id].sort().join("_"),
      });
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
      setMedia(null);
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="border rounded-lg p-4 h-96 overflow-y-scroll bg-white">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-3 p-2 rounded-lg ${
              msg.sender === user._id
                ? "bg-purple-200 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            <p>{msg.text}</p>
            {msg.media && (
              <img
                src={msg.media}
                alt="media"
                className="mt-2 max-h-48 rounded-lg"
              />
            )}
            {msg.isTemporary && (
              <p className="text-xs text-red-500 mt-1">(Temporary message)</p>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="mt-4 flex gap-2 items-center"
      >
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
          className="border p-1 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
