import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { FaEdit, FaTrash } from "react-icons/fa";
const ViewAllBlog = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

 
  const [editingPost, setEditingPost] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [updatedTags, setUpdatedTags] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

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
        setFilteredPosts(postsResponse.data);
        const extractedCategories = new Set();
        postsResponse.data.forEach((post) => {
          if (post.categories && Array.isArray(post.categories)) {
            post.categories.forEach((category) =>
              extractedCategories.add(category)
            );
          }
        });
        setCategories([...extractedCategories]);
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
  }, []);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:7777/post/post/categories")
      .then((response) => {
        console.log("Fetched Categories:", response.data);
        setCategories(response.data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);


  useEffect(() => {
    console.log("Posts Data:", posts);
    const categoriesSet = new Set(posts.flatMap((post) => post.category));
    console.log("Extracted Categories:", [...categoriesSet]);
    const tagsSet = new Set(posts.flatMap((post) => post.tags));

    setCategories([...categoriesSet]);
    setTags([...tagsSet]);
  }, [posts]);


  useEffect(() => {
    let filtered = posts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (post) => post.categories && post.categories.includes(selectedCategory)
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(
        (post) => post.tags && post.tags.includes(selectedTag)
      );
    }

    setFilteredPosts(filtered);
  }, [selectedCategory, selectedTag, posts]);

  // Handle comment submit
  const handleSubmitComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:7777/comment/createComment",
        { postId, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNewComment("");
      const updatedComments = await axios.get(
        `http://127.0.0.1:7777/comment/getCommentsByPost/${postId}`
      );
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: updatedComments.data,
      }));
    } catch (error) {
      setError("Error posting comment");
    }
  };

  // Handle delete post
  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:7777/post/delete/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      setError("Error deleting post");
    }
  };

  // Handle edit post
  const handleEditPost = (post) => {
    setEditingPost(post._id);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
    setUpdatedTags(post.tags || []);
  };

  // Handle updating the post
  const handleUpdatePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:7777/post/update/${postId}`,
        { title: updatedTitle, content: updatedContent, tags: updatedTags },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                title: updatedTitle,
                content: updatedContent,
                tags: updatedTags,
              }
            : post
        )
      );
      setEditingPost(null);
    } catch (error) {
      setError("Error updating post");
    }
  };

  // Handle edit comment
  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
    const commentToEdit = Object.values(comments)
      .flat()
      .find((comment) => comment._id === commentId);
    setEditedComment(commentToEdit.content);
  };

  // Handle updating the comment
  const handleUpdateComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://127.0.0.1:7777/comment/updateComment/${commentId}`,
        { content: editedComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the comment in the state after a successful update
      setComments((prevComments) => {
        const updatedComments = prevComments;
        Object.keys(updatedComments).forEach((postId) => {
          updatedComments[postId] = updatedComments[postId].map((comment) =>
            comment._id === commentId
              ? { ...comment, content: editedComment }
              : comment
          );
        });
        return { ...updatedComments };
      });

      setEditingCommentId(null); // Reset editing state
      setEditedComment(""); // Clear the edit comment field
    } catch (error) {
      setError("Error updating comment");
    }
  };

  // Handle delete comment
  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:7777/comment/deleteComment/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Remove the deleted comment from state
      setComments((prevComments) => {
        const updatedComments = { ...prevComments };
        Object.keys(updatedComments).forEach((postId) => {
          updatedComments[postId] = updatedComments[postId].filter(
            (comment) => comment._id !== commentId
          );
        });
        return updatedComments;
      });
    } catch (error) {
      setError("Error deleting comment");
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">View All Blogs</h1>

      {/* Filtering Options */}
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {/* <select
          className="p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.length > 0 ? (
            categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))
          ) : (
            <option disabled>No Categories Available</option>
          )}
        </select> */}

        <select
          className="p-2 border rounded"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {tags.length > 0 ? (
            tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))
          ) : (
            <option disabled>No Tags Available</option>
          )}
        </select>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-4"
            >
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
                  <input
                    type="text"
                    value={updatedTags.join(", ")} // Convert array to string
                    onChange={(e) =>
                      setUpdatedTags(
                        e.target.value.split(",").map((tag) => tag.trim())
                      )
                    }
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Edit tags (comma separated)..."
                  />

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
                    {post.content.substring(0, 2000)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Author:</strong> {post.author.name}
                  </p>
                  {/* <p className="text-sm text-gray-600">
                    <strong>Category:</strong>{" "}
                    {post.category || "Uncategorized"}
                  </p> */}
                  <p className="text-sm text-gray-600">
                    <strong>Tags:</strong>{" "}
                    {post.tags && post.tags.length > 0
                      ? post.tags.join(", ")
                      : "No tags"}
                  </p>
                  {/* Social Sharing Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <FacebookShareButton
                      url={`http://yourwebsite.com/post/${post._id}`}
                      quote={post.title}
                      className="hover:opacity-75"
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={`http://yourwebsite.com/post/${post._id}`}
                      title={post.title}
                      className="hover:opacity-75"
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                      url={`http://yourwebsite.com/post/${post._id}`}
                      title={post.title}
                      summary={post.content.substring(0, 100)}
                      source="YourWebsite"
                      className="hover:opacity-75"
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton
                      url={`http://yourwebsite.com/post/${post._id}`}
                      title={post.title}
                      separator=":: "
                      className="hover:opacity-75"
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                    <EmailShareButton
                      url={`http://yourwebsite.com/post/${post._id}`}
                      subject={post.title}
                      body={post.content.substring(0, 100)}
                      className="hover:opacity-75"
                    >
                      <EmailIcon size={32} round />
                    </EmailShareButton>
                  </div>

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
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Comments:</h3>
                <ul>
                  {comments[post._id]?.length > 0 ? (
                    comments[post._id].map((comment) => (
                      <li key={comment._id} className="mb-2">
                        {editingCommentId === comment._id ? (
                          <div>
                            <textarea
                              value={editedComment}
                              onChange={(e) => setEditedComment(e.target.value)}
                              className="w-full p-2 border rounded mt-2"
                              placeholder="Edit your comment..."
                            ></textarea>
                            <button
                              onClick={() => handleUpdateComment(comment._id)}
                              className="mt-2 p-2 bg-green-500 text-white rounded"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => setEditingCommentId(null)}
                              className="mt-2 p-2 bg-gray-500 text-white rounded ml-2"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <strong>{comment.userId.username}</strong>{" "}
                            {comment.content}
                          </>
                        )}
                        {user && user._id === comment.userId._id && (
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleEditComment(comment._id)}
                            >
                              <FaEdit
                                className="text-yellow-500 hover:text-yellow-700 cursor-pointer"
                                size={18}
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                            >
                              <FaTrash
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                                size={18}
                              />
                            </button>
                          </div>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>No comments yet.</p>
                  )}
                </ul>

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
                  Add Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default ViewAllBlog;
