import React, { useEffect, useState } from "react";
import API from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchProducts();
    fetchLiveSessions();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await API.get("/admin/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err.message);
    }
  };

  const fetchLiveSessions = async () => {
    try {
      const res = await API.get("/live");
      setLiveSessions(res.data);
    } catch (err) {
      console.error("Error fetching live sessions:", err.message);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      fetchUsers();
      alert("User deleted!");
    } catch (err) {
      alert("Error deleting user");
    }
  };

  const handleEndLive = async (id) => {
    try {
      await API.post(`/admin/live/end/${id}`);
      fetchLiveSessions();
      alert("Live session ended by admin!");
    } catch (err) {
      alert("Error ending live session");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">🛠️ Admin Dashboard</h2>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-bold">Users</h3>
          <p className="text-purple-600 text-2xl">{stats.usersCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-bold">Transactions</h3>
          <p className="text-green-600 text-2xl">{stats.transactionsCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-bold">Active Lives</h3>
          <p className="text-pink-600 text-2xl">{stats.liveSessionsCount || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="font-bold">Products</h3>
          <p className="text-blue-600 text-2xl">{stats.productsCount || 0}</p>
        </div>
      </div>

      {/* Users */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">👥 Users</h3>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="p-2 border">
                    {u.firstName} {u.lastName}
                  </td>
                  <td className="p-2 border">{u.email}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Sessions */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">🎥 Live Sessions</h3>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Host</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {liveSessions.map((s) => (
                <tr key={s._id}>
                  <td className="p-2 border">{s.title || "Live"}</td>
                  <td className="p-2 border">
                    {s.host?.firstName} {s.host?.lastName}
                  </td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEndLive(s._id)}
                      className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
                    >
                      End Live
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-3">🛍️ Products</h3>
        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Seller</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id}>
                  <td className="p-2 border">{p.title}</td>
                  <td className="p-2 border">{p.price} V-Coins</td>
                  <td className="p-2 border">
                    {p.user?.firstName} {p.user?.lastName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
