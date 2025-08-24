import React from "react";
import { Routes, Route } from "react-router-dom";

// Страници
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Assistant from "./pages/Assistant";
import Live from "./pages/Live";
import Marketplace from "./pages/Marketplace";
import Chat from "./pages/Chat";
import AdminDashboard from "./pages/AdminDashboard";

// ProtectedRoute
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 min-h-screen text-white">
      <Routes>
        {/* Публични маршрути */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Защитени маршрути */}
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assistant"
          element={
            <ProtectedRoute>
              <Assistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live/:id"
          element={
            <ProtectedRoute>
              <Live />
            </ProtectedRoute>
          }
        />

        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
