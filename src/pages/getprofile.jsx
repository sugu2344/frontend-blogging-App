import React, { useEffect, useState } from "react";
import axios from "axios";

const GetProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
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
        console.log("User Profile:", response.data);
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
        console.log("Profile updated:", response.data);
        setUser(response.data);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error updating profile:", error));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>Profile Page</h2>

      {!isEditing ? (
        <>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </p>
          <p>
            <strong>Twitter:</strong>{" "}
            {user?.socialLinks?.twitter || "Not provided"}
          </p>
          <p>
            <strong>LinkedIn:</strong>{" "}
            {user?.socialLinks?.linkedin || "Not provided"}
          </p>
          <p>
            <strong>GitHub:</strong>{" "}
            {user?.socialLinks?.github || "Not provided"}
          </p>
          <button
            onClick={handleEdit}
            style={{
              padding: "8px 16px",
              background: "blue",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="bio"
            value={updatedUser.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
          <input
            type="text"
            name="socialLinks.twitter"
            value={updatedUser?.socialLinks?.twitter || ""}
            onChange={handleChange}
            placeholder="Twitter"
          />
          <input
            type="text"
            name="socialLinks.linkedin"
            value={updatedUser?.socialLinks?.linkedin || ""}
            onChange={handleChange}
            placeholder="LinkedIn"
          />
          <input
            type="text"
            name="socialLinks.github"
            value={updatedUser?.socialLinks?.github || ""}
            onChange={handleChange}
            placeholder="GitHub"
          />
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              background: "green",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Save
          </button>
        </>
      )}
    </div>
  );
};

export default GetProfile;
