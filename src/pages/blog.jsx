import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingPost = location.state?.post || null;

  const [title, setTitle] = useState(existingPost ? existingPost.title : "");
  const [content, setContent] = useState(
    existingPost ? existingPost.content : ""
  );
  const [tags, setTags] = useState(
    existingPost ? existingPost.tags.join(", ") : ""
  );
  const [categories, setCategories] = useState(
    existingPost ? existingPost.categories.join(", ") : ""
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setTags(existingPost.tags.join(", "));
      setCategories(existingPost.categories.join(", "));
    }
  }, [existingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create or update a post.");
      return;
    }

    const postData = {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      categories: categories.split(",").map((category) => category.trim()),
    };

    try {
      if (existingPost) {
        await axios.put(
          `http://127.0.0.1:7777/post/update/${existingPost._id}`,
          postData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post("http://127.0.0.1:7777/post/create", postData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/viewblogs"); // Redirect to blog list
    } catch (error) {
      setError("Error submitting post");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {existingPost ? "Edit Blog" : "Create Blog"}
      </h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="w-full p-2 border rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categories (comma separated)"
          className="w-full p-2 border rounded"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {existingPost ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
