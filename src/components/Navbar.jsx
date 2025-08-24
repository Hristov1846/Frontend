import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Лого */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          YouVibe
        </Link>

        {/* Търсачка */}
        <div className="hidden md:block flex-1 mx-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Линкове */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-indigo-600 font-medium">
            Home
          </Link>
          <Link to="/messages" className="hover:text-indigo-600 font-medium">
            Messages
          </Link>
          <Link to="/profile" className="hover:text-indigo-600 font-medium">
            Profile
          </Link>
          <Link to="/login" className="hover:text-indigo-600 font-medium">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
