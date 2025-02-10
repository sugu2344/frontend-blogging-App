import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector(selectUser);
  console.log(user);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          {!user && (
            <>
              <Link to="/register" className="mr-4">
                Register
              </Link>
              <Link to="/login" className="mr-4">
                Login
              </Link>
            </>
          )}
        </div>

        {user && (
          <div>
            {user.role === "user" && (
              <>
                {/* <Link to="/profile" className="mr-4">
                  Profile
                </Link> */}

                <Link to="user/userDashboard" className="mr-4">
                  user dashboard
                </Link>
                <Link to="user/currentuserpost" className="mr-4">
                  my Blogs
                </Link>
                <Link to="user/ViewAllBlogs" className="mr-4">
                  All Blogs
                </Link>
                <Link to="user/allUsers" className="mr-4">
                  Bloggers
                </Link>
                <Link to="user/createblog" className="mr-4">
                  create Blog
                </Link>
                <Link to="user/getprofile" className="mr-4">
                  profile
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <>
                {/* <Link to="/profile" className="mr-4">
                  Profile
                </Link> */}
                <Link to="admin/adminDashboard" className="mr-4">
                  admin dashboard
                </Link>
                <Link to="admin/currentuserpost" className="mr-4">
                  my Blogs
                </Link>
                <Link to="admin/ViewAllBlogs" className="mr-4">
                  All Blogs
                </Link>
                <Link to="admin/allUsers" className="mr-4">
                  Bloggers
                </Link>
                <Link to="admin/createblog" className="mr-4">
                  create Blog
                </Link>
                <Link to="admin/getprofile" className="mr-4">
                  profile
                </Link>
              </>
            )}

            <button
              className="bg-red-500 px-3 py-1 rounded"
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
