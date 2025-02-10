import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7777/user/usercount", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure token is passed
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUserCount(data.totalUsers);
        } else {
          console.error("Failed to fetch user count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Registered Users: {userCount}</p>

      <div>
        <button onClick={() => navigate("/admin/createblog")}>
          Create Blog Post
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/ViewAllBlogs")}>
          All Blogs
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/allUsers")}>All Users</button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/getprofile")}>
          Get Profile
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/currentuserpost")}>
          Separate User Posts
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
