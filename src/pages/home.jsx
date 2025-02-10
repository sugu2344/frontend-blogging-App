import React from "react";
import { Laptop2 } from "lucide-react";

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-sm text-center p-6 border rounded-lg shadow-lg bg-white">
        <Laptop2 className="w-12 h-12 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Tech Blog</h2>
        <p className="text-gray-600">
          Stay updated with the latest in tech, coding, and innovation.
        </p>
      </div>
    </div>
  );
};

export default Home;
