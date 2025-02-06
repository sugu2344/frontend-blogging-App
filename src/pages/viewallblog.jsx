import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllBlog = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // Store comments by postId
  const [newComment, setNewComment] = useState(""); // For new comment input
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts and comments from the backend API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7777/post/get");
        setPosts(response.data);

        // Fetch comments for each post
        const commentsData = {};
        for (const post of response.data) {
          const commentsResponse = await axios.get(
            `http://127.0.0.1:7777/comment/getCommentsByPost/${post._id}`
          );
          commentsData[post._id] = commentsResponse.data;
        }
        setComments(commentsData);
      } catch (error) {
        setError("Error fetching posts or comments");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (postId) => {
    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      const response = await axios.post(
        "http://127.0.0.1:7777/comment/createComment",
        {
          postId,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add the new comment to the existing list of comments
      setComments((prevState) => ({
        ...prevState,
        [postId]: [...prevState[postId], response.data.comment],
      }));

      // Reset the new comment input field
      setNewComment("");
    } catch (error) {
      setError("Error posting comment");
    }
  };

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

                {/* Comments Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold">Comments:</h3>
                  <div className="mt-4">
                    {comments[post._id]?.length > 0 ? (
                      <ul>
                        {comments[post._id].map((comment) => (
                          <li key={comment._id} className="mb-4">
                            <div>
                              <strong>{comment.userId.username}</strong>{" "}
                              {comment.content}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(comment.createdAt).toLocaleString()}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No comments yet.</p>
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <div className="mt-4">
                    <textarea
                      value={newComment}
                      onChange={handleCommentChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Write a comment..."
                    ></textarea>
                    <button
                      onClick={() => handleSubmitComment(post._id)}
                      className="mt-2 p-2 bg-blue-500 text-white rounded-md"
                    >
                      Post Comment
                    </button>
                  </div>
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
