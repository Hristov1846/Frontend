import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-2xl font-bold">
        YouVibe
      </Link>
      {user ? (
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to={`/profile/${user._id}`} className="text-white hover:underline">
            Profile
          </Link>
          <Link to="/wallet" className="text-white hover:underline">
            Wallet
          </Link>
          <Link to="/marketplace" className="text-white hover:underline">
            Marketplace
          </Link>
          <button
            onClick={handleLogout}
            className="bg-white text-purple-600 px-4 py-1 rounded-lg hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/register" className="text-white hover:underline">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
