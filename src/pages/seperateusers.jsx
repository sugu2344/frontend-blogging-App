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
          "http://127.0.0.1:7777/post/currentuser",
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

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Tags</th>
              <th>Categories</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.content.substring(0, 50)}...</td>
                <td>{post.tags?.join(", ") || "N/A"}</td>
                <td>{post.categories?.join(", ") || "N/A"}</td>
                <td>{post.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SeparateUserPosts;
