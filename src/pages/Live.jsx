import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const socket = io("https://your-backend.onrender.com"); // смени с Render URL

const Live = () => {
  const { id } = useParams(); // Live Session ID
  const { user } = useContext(AuthContext);

  const [session, setSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [giftAmount, setGiftAmount] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await API.get(`/live/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error("Error loading live session:", err.message);
      }
    };
    fetchSession();

    socket.emit("joinLiveRoom", id);

    socket.on("receiveLiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("viewerCountUpdate", (data) => {
      setSession((prev) => ({ ...prev, viewerCount: data.viewers }));
    });

    return () => {
      socket.off("receiveLiveMessage");
      socket.off("viewerCountUpdate");
    };
  }, [id]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMsg) return;

    const msg = {
      sender: user.firstName,
      text: newMsg,
      sessionId: id,
    };

    socket.emit("sendLiveMessage", msg);
    setMessages((prev) => [...prev, msg]);
    setNewMsg("");
  };

  const handleSendGift = async () => {
    try {
      await API.post(`/live/gift/${id}`, { amount: Number(giftAmount) });
      alert(`You sent a gift of ${giftAmount} V-Coins!`);
      setGiftAmount("");
    } catch (err) {
      alert("Error sending gift");
    }
  };

  if (!session) return <p className="p-6">Loading live session...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        🎥 {session.title || "Live Session"}
      </h2>
      <p className="mb-4 text-gray-600">
        Host: {session.host?.firstName} {session.host?.lastName}
      </p>
      <p className="mb-4 text-purple-600 font-bold">
        👀 Viewers: {session.viewerCount || session.viewers?.length || 0}
      </p>

      {/* Chat box */}
      <div className="bg-white p-4 rounded-lg shadow-md h-80 overflow-y-scroll mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Send message */}
      <form
        onSubmit={handleSendMessage}
        className="flex gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Send
        </button>
      </form>

      {/* Send gift */}
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Gift amount"
          value={giftAmount}
          onChange={(e) => setGiftAmount(e.target.value)}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleSendGift}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Send Gift 🌹
        </button>
      </div>
    </div>
  );
};

export default Live;
