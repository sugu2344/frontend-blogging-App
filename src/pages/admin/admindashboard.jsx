import React from "react";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>admin dashboard Page</p>
      <button onClick={() => navigate("/admin/createblog")}>
        Create Blog Post
      </button>
    </div>
  );
};

export default AdminDashboard;
