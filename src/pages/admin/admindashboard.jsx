import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { selectUser } from "../../redux/features/auth/userSlice";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const user = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setter(data.totalUsers || data.totalComments || data.totalPosts);
        } else {
          console.error(`Failed to fetch data from ${url}:`, data.message);
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };

    fetchData("http://127.0.0.1:7777/user/usercount", setUserCount);
    fetchData(
      "http://127.0.0.1:7777/comment/getTotalCommentCount",
      setCommentCount
    );
    fetchData("http://127.0.0.1:7777/post/posts/count", setPostCount);
  }, []);

  return (
    <div className="min-h-screen bg-[#DAEDBD] flex flex-col items-center py-10 text-white">
      <h1 className="text-4xl font-bold mb-10 text-black">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: "Users", value: userCount, color: "#4CAF50" },
          { label: "Comments", value: commentCount, color: "#FF9800" },
          { label: "Posts", value: postCount, color: "#2196F3" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center bg-gray-800 p-6 rounded-2xl shadow-lg w-64"
          >
            <CircularProgressbar
              value={item.value || 0}
              text={`${item.value || 0}`}
              styles={buildStyles({
                textSize: "16px",
                pathColor: item.color,
                textColor: "#fff",
                trailColor: "#333",
              })}
            />
            <p className="mt-4 text-xl font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hi, {user?.user.name || "Guest"} 👋
        </h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
