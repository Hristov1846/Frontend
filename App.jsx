import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Страници
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Marketplace from "./pages/Marketplace.jsx";
import Wallet from "./pages/Wallet.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
