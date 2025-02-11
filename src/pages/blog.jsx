import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/auth/userSlice";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("draft");

  const navigate = useNavigate();
  const { user } = useSelector(selectUser); 

  const userRole = user?.role || "guest"; 

  const handleTagsChange = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const handleCategoriesChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      tags,
      categories,
      status,
      userId: user?.id,
    };

    try {
      await axios.post(
        "https://backend-blogging-platform.onrender.com/post/create",
        postData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      alert("Post created successfully!");

      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin/ViewAllBlogs");
        } else if (userRole === "user") {
          navigate("/user/ViewAllBlogs");
        } else {
          navigate("/");
        }
      }, 500); 

      setTitle("");
      setContent("");
      setTags([]);
      setCategories([]);
      setStatus("draft");
    } catch (error) {
      console.error("Error creating post", error);
      alert(
        error.response ? error.response.data.message : "Error creating post"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Content:
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="mt-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Tags:
            </label>
            <input
              type="text"
              value={tags.join(", ")}
              onChange={handleTagsChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">
              Categories:
            </label>
            <input
              type="text"
              value={categories.join(", ")}
              onChange={handleCategoriesChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700">
              Status:
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
