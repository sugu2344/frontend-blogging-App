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
                <Link to="/profile" className="mr-4">
                  Profile
                </Link>

                <Link to="user/userDashboard" className="mr-4">
                  user dashboard
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Link to="/profile" className="mr-4">
                  Profile
                </Link>
                <Link to="admin/adminDashboard" className="mr-4">
                  admin dashboard
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
