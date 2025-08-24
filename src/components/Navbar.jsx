import { Link } from "react-router-dom";

function Navbar({ user }) {
  return (
    <nav className="flex space-x-6 bg-gray-800 p-4">
      <Link to="/" className="text-white hover:underline">Home</Link>
      <Link to="/marketplace" className="text-white hover:underline">Marketplace</Link>
      <Link to="/wallet" className="text-white hover:underline">Wallet</Link>
      <Link to="/assistant" className="text-white hover:underline">AI Assistant</Link>

      {/* Примерен линк към Live — реално ID ще идва от backend */}
      <Link to="/live/123456" className="text-white hover:underline">Live</Link>

      {/* Примерен линк към Chat — реално ID ще е userId */}
      <Link to="/chat/123" className="text-white hover:underline">Chat</Link>

      {/* Само за админ */}
      {user?.isAdmin && (
        <Link to="/admin" className="text-white hover:underline">Admin</Link>
      )}
    </nav>
  );
}

export default Navbar;
