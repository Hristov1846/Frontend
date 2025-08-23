import React from "react";
import { Routes, Route } from "react-router-dom";

// Страници
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";   // <- правилното име
import Marketplace from "./pages/Marketplace.jsx";
import Wallet from "./pages/Wallet.jsx";

function App() {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/wallet" element={<Wallet />} />
      </Routes>
    </div>
  );
}

export default App;
