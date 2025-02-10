import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Laptop2 } from "lucide-react";
import { selectUser } from "../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
 console.log(user);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <Laptop2 className="w-8 h-8 text-blue-600" />
          </Link>
          {!user && (
            <>
              <Link to="/register" className="hover:text-blue-400">
                Register
              </Link>
              <Link to="/login" className="hover:text-blue-400">
                Login
              </Link>
            </>
          )}
        </div>

        {/* Right Section */}
        {user && (
          <div className="flex items-center gap-4">
            {user.role === "user" && (
              <>
                <Link to="user/userDashboard" className="hover:text-blue-400">
                  User Dashboard
                </Link>
                <Link to="user/currentuserpost" className="hover:text-blue-400">
                  My Blogs
                </Link>
                <Link to="user/ViewAllBlogs" className="hover:text-blue-400">
                  All Blogs
                </Link>
                <Link to="user/allUsers" className="hover:text-blue-400">
                  Bloggers
                </Link>
                <Link to="user/createblog" className="hover:text-blue-400">
                  Create Blog
                </Link>
                <Link to="user/getprofile" className="hover:text-blue-400">
                  Profile
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Link to="admin/adminDashboard" className="hover:text-blue-400">
                  Admin Dashboard
                </Link>
                <Link
                  to="admin/currentuserpost"
                  className="hover:text-blue-400"
                >
                  My Blogs
                </Link>
                <Link to="admin/ViewAllBlogs" className="hover:text-blue-400">
                  All Blogs
                </Link>
                <Link to="admin/allUsers" className="hover:text-blue-400">
                  Bloggers
                </Link>
                <Link to="admin/createblog" className="hover:text-blue-400">
                  Create Blog
                </Link>
                <Link to="admin/getprofile" className="hover:text-blue-400">
                  Profile
                </Link>
              </>
            )}

            <button
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={() => navigate("/logout", { replace: true })}
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
