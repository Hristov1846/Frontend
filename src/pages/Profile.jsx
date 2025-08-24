import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setProfile(res.data);
      } catch (err) {
        setError("Error loading profile");
      }
    };
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    try {
      await API.post(`/users/follow/${id}`);
      alert("Followed successfully!");
    } catch (err) {
      alert("Error following user");
    }
  };

  const handlePoke = async () => {
    try {
      await API.post(`/users/poke/${id}`);
      alert("You poked this user!");
    } catch (err) {
      alert("Error poking user");
    }
  };

  const handleLikeProfile = async () => {
    try {
      await API.post(`/users/like/${id}`);
      alert("You liked this profile ❤️");
    } catch (err) {
      alert("Error liking profile");
    }
  };

  const handleSendRose = async () => {
    try {
      await API.post(`/users/send-rose/${id}`);
      alert("You sent a rose 🌹");
    } catch (err) {
      alert("Error sending rose");
    }
  };

  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!profile) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="p-6">
      {/* Cover photo */}
      <div className="relative">
        <img
          src={profile.coverPhoto || "https://via.placeholder.com/900x200"}
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <img
          src={profile.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-12 left-6"
        />
      </div>

      {/* Info */}
      <div className="mt-16">
        <h1 className="text-2xl font-bold">
          {profile.firstName} {profile.lastName}
        </h1>
        <p className="text-gray-600">{profile.email}</p>
        <p className="text-gray-600">{profile.phone}</p>

        {/* Action Buttons */}
        {user && user._id !== id && (
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleFollow}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Follow
            </button>
            <button
              onClick={handlePoke}
              className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            >
              Poke
            </button>
            <button
              onClick={handleLikeProfile}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              ❤️ Like Profile
            </button>
            <button
              onClick={handleSendRose}
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
            >
              🌹 Send Rose
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
