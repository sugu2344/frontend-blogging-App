import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Dashboard Page</h1>
      <div>
        <button onClick={() => navigate("/user/createblog")}>
          Create Blog Post
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/user/ViewAllBlogs")}>
          All Blogs
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/user/allUsers")}>
          All users page
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
