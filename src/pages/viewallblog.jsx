import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewAllBlog = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // State for editing
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axios.get(
            "http://127.0.0.1:7777/user/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setUser(userResponse.data);
        }

        const postsResponse = await axios.get("http://127.0.0.1:7777/post/get");
        setPosts(postsResponse.data);

        const commentsData = {};
        await Promise.all(
          postsResponse.data.map(async (post) => {
            const commentsResponse = await axios.get(
              `http://127.0.0.1:7777/comment/getCommentsByPost/${post._id}`
            );
            commentsData[post._id] = commentsResponse.data;
          })
        );
        setComments(commentsData);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // ✅ No dependency on `posts`

const handleSubmitComment = async (postId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://127.0.0.1:7777/comment/createComment",
      { postId, content: newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Reset the comment input field
    setNewComment("");

    // Fetch updated comments for this post
    const updatedComments = await axios.get(
      `http://127.0.0.1:7777/comment/getCommentsByPost/${postId}`
    );

    setComments((prevComments) => ({
      ...prevComments,
      [postId]: updatedComments.data, // Update comments for the specific post
    }));
  } catch (error) {
    setError("Error posting comment");
  }
};


  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:7777/post/delete/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError("Error deleting post");
    }
  };

  // Handle Edit Mode
  const handleEditPost = (post) => {
    setEditingPost(post._id);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
  };

  // Handle Updating the Post
  const handleUpdatePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://127.0.0.1:7777/post/update/${postId}`,
        { title: updatedTitle, content: updatedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Update response:", response.data);

      // ✅ Update state correctly
     setPosts((prevPosts) =>
       prevPosts.map((post) =>
         post._id === postId
           ? { ...post, title: updatedTitle, content: updatedContent }
           : post
       )
     );


      // ✅ Reset editing state
      setEditingPost(null);
    } catch (error) {
      setError("Error updating post");
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
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4"
            >
              {/* If in Edit Mode */}
              {editingPost === post._id ? (
                <div>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Edit title..."
                  />
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Edit content..."
                  ></textarea>
                  <button
                    onClick={() => handleUpdatePost(post._id)}
                    className="mt-2 p-2 bg-green-500 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingPost(null)}
                    className="mt-2 p-2 bg-gray-500 text-white rounded ml-2"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                  <p className="text-gray-600">
                    {post.content.substring(0, 150)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Author:</strong> {post.author.name}
                  </p>

                  {user && user._id === post.author._id && (
                    <div className="flex space-x-2 mt-3">
                      <button
                        className="bg-yellow-500 text-white px-4 py-1 rounded"
                        onClick={() => handleEditPost(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Comments Section */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Comments:</h3>
                <ul>
                  {comments[post._id]?.length > 0 ? (
                    comments[post._id].map((comment) => (
                      <li key={comment._id} className="mb-2">
                        <strong>{comment.userId.username}</strong>:{" "}
                        {comment.content}
                      </li>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </ul>

                {/* Add Comment Form */}
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2 border rounded mt-2"
                  placeholder="Write a comment..."
                ></textarea>
                <button
                  onClick={() => handleSubmitComment(post._id)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                  Post Comment
                </button>
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
