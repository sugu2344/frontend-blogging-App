import React from "react";
import { Link } from "react-router";

const Layout = ({ children }) => {
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
        </div>
      </nav>

      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
