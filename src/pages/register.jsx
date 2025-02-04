import React from "react";

const Register = () => {
  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Candidate Registration</h2>
      <form className="flex flex-col space-y-3">
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
        />
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
        <button className="bg-blue-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
