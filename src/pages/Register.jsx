import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Грешка при регистрация!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-teal-600">
          Регистрация в YouVibe
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="Име"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
        <input
          type="text"
          name="middleName"
          placeholder="Презиме"
          value={formData.middleName}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Фамилия"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Имейл"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Парола"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition"
        >
          Регистрация
        </button>
        <p className="text-center text-sm mt-4">
          Имаш акаунт?{" "}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Влез
          </span>
        </p>
      </form>
    </div>
  );
}

export default Register;
