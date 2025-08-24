import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        {user && (
          <>
            <Link to="/profile" className="hover:underline">Profile</Link>
            <Link to="/wallet" className="hover:underline">Wallet</Link>
            <Link to="/assistant" className="hover:underline">AI Assistant</Link>
            <Link to="/marketplace" className="hover:underline">Marketplace</Link>
            <Link to="/live/123456" className="hover:underline">Live</Link>
          </>
        )}
        {user?.isAdmin && (
          <Link to="/admin" className="hover:underline text-red-400">
            Admin
          </Link>
        )}
      </div>

      <div>
        {!user ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="ml-4 hover:underline">Register</Link>
          </>
        ) : (
          <span>Welcome, {user.username}</span>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
