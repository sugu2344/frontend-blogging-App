import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/userSlice";

const Layout = ({ children }) => {
  const { user } = useSelector(selectUser);
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          <Link to="/register" className="mr-4">
            Register
          </Link>
          <Link to="/login" className="mr-4">
            Login
          </Link>
          <Link to="/profile" className="mr-4">
            profile
          </Link>
        </div>
      </nav>

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
