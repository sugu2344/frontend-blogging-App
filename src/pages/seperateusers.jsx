import React, { useEffect, useState } from "react";
import axios from "axios";

const SeparateUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "https://backend-blogging-platform.onrender.com/post/currentuser",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setPosts(response.data);
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">My Blogs</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Content</th>
                <th className="py-2 px-4 text-left">Tags</th>
                <th className="py-2 px-4 text-left">Categories</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{post.title}</td>
                  <td className="py-2 px-4">
                    {post.content.substring(0, 50)}...
                  </td>
                  <td className="py-2 px-4">
                    {post.tags?.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {post.categories?.join(", ") || "N/A"}
                  </td>
                  <td className="py-2 px-4">{post.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SeparateUserPosts;
