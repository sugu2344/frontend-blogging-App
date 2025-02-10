import React, { useEffect, useState } from "react";
import axios from "axios";

const GetProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    email: "", 
    bio: "",
    socialLinks: { twitter: "", linkedin: "", github: "" },
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:7777/user/getprofile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setUpdatedUser(response.data);
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, [token]);

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("socialLinks.")) {
      const field = name.split(".")[1];
      setUpdatedUser((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [field]: value },
      }));
    } else {
      setUpdatedUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    axios
      .put("http://127.0.0.1:7777/user/updateProfile", updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  if (!user)
    return (
      <p className="text-center text-gray-500 animate-pulse">Loading...</p>
    );

  return (
    <div className="max-w-xl mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Profile
      </h2>

      {!isEditing ? (
        <>
          <div className="space-y-4">
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Name:</span>{" "}
              {user.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Bio:</span>{" "}
              {user.bio || "No bio available"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">Twitter:</span>{" "}
              {user?.socialLinks?.twitter || "Not provided"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">LinkedIn:</span>{" "}
              {user?.socialLinks?.linkedin || "Not provided"}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold text-gray-900">GitHub:</span>{" "}
              {user?.socialLinks?.github || "Not provided"}
            </p>
          </div>

          <button
            onClick={handleEdit}
            className="w-full mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={updatedUser.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />
            {/* Read-only email field */}
            <input
              type="text"
              name="email"
              value={updatedUser.email}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-200 cursor-not-allowed"
            />
            <input
              type="text"
              name="bio"
              value={updatedUser.bio}
              onChange={handleChange}
              placeholder="Bio"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />
            <input
              type="text"
              name="socialLinks.twitter"
              value={updatedUser?.socialLinks?.twitter || ""}
              onChange={handleChange}
              placeholder="Twitter"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />
            <input
              type="text"
              name="socialLinks.linkedin"
              value={updatedUser?.socialLinks?.linkedin || ""}
              onChange={handleChange}
              placeholder="LinkedIn"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />
            <input
              type="text"
              name="socialLinks.github"
              value={updatedUser?.socialLinks?.github || ""}
              onChange={handleChange}
              placeholder="GitHub"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GetProfile;
