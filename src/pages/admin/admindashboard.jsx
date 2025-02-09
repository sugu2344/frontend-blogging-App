import React from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>admin dashboard Page</p>
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
        <button onClick={() => navigate("/admin/allUsers")}>
          All users page
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/getprofile")}>
          get profile
        </button>
      </div>
      <div>
        <button onClick={() => navigate("/admin/currentuserpost")}>
        seperate user 
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
