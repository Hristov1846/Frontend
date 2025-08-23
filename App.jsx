import React from "react";
import { Routes, Route } from "react-router-dom";

// Страници
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Marketplace from "./pages/Marketplace";
import Wallet from "./pages/Wallet";

function App() {
  return (
    <div className="bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
