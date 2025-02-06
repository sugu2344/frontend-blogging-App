import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllBlog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7777/post/get");
        setPosts(response.data); // Set posts data to state
      } catch (error) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">View All Blogs</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">
                  {post.content.substring(0, 150)}...
                </p>
                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Author:</strong> {post.author.name}
                  </p>
                  <p>
                    <strong>Tags:</strong> {post.tags.join(", ")}
                  </p>
                  <p>
                    <strong>Categories:</strong> {post.categories.join(", ")}
                  </p>
                  <p>
                    <strong>Status:</strong> {post.status}
                  </p>
                  <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(post.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No posts available</p>
      )}
    </div>
  );
};

export default ViewAllBlog;
