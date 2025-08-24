import React, { useEffect, useState } from "react";
import API from "../api/axios";

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/marketplace");
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err.message);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/marketplace", form);
      setForm({ title: "", description: "", price: "", image: "", category: "" });
      fetchProducts();
      alert("Product created!");
    } catch (err) {
      alert("Error creating product");
    }
  };

  const handleBuy = async (id) => {
    try {
      await API.post(`/marketplace/buy/${id}`);
      fetchProducts();
      alert("Product bought successfully!");
    } catch (err) {
      alert("Error buying product");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🛍️ Marketplace</h2>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h3 className="font-bold mb-4">Create a Product</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Publish
        </button>
      </form>

      {/* Products List */}
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <img
              src={p.image || "https://via.placeholder.com/150"}
              alt={p.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="font-bold">{p.title}</h3>
            <p className="text-gray-600">{p.description}</p>
            <p className="text-purple-600 font-bold mt-2">{p.price} V-Coins</p>
            <p className="text-sm text-gray-500">Category: {p.category}</p>
            <button
              onClick={() => handleBuy(p._id)}
              className="mt-3 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Buy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
