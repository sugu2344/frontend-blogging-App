import React from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Dashboard Page</h1>
      <button onClick={() => navigate("/user/createblog")}>
        Create Blog Post
      </button>
    </div>
  );
};

export default UserDashboard;
