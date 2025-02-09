import React from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/userSlice";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

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
      <div>
        <button onClick={() => navigate("/user/getprofile")}>
          get profile
        </button>
      </div>
      <div>
        <h1>Welcome {user?.user.name || "Guest"}</h1>
      </div>
      <div>
        <button onClick={() => navigate("/user/currentuserpost")}>
          seperate user
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
