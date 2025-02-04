import React from "react";

const Login = () => {
  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <form className="flex flex-col space-y-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
        />
        <button className="bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
