import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [postCount, setPostCount] = useState(0); // State for post count

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7777/user/usercount", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    const fetchCommentCount = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:7777/comment/getTotalCommentCount",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setCommentCount(data.totalComments);
        } else {
          console.error("Failed to fetch comment count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    const fetchPostCount = async () => {
      try {
        const response = await fetch("http://127.0.0.1:7777/post/posts/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setPostCount(data.totalPosts);
        } else {
          console.error("Failed to fetch post count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching post count:", error);
      }
    };

    fetchUserCount();
    fetchCommentCount();
    fetchPostCount();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Registered Users: {userCount}</p>
      <p>Total Comments: {commentCount}</p>
      <p>Total Posts: {postCount}</p> {/* Display post count */}
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
