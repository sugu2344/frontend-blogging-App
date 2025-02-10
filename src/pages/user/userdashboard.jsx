import React from "react";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/features/auth/userSlice";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#DAEDBD]">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tech Blog</h1>
        <p className="text-gray-600">Your personalized blogging space</p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi, {user?.user.name || "Guest"} 👋
          </h2>
        </div>

        <button
          onClick={() => navigate("/user/ViewAllBlogs")}
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-all duration-300"
        >
          view all Blogs
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
