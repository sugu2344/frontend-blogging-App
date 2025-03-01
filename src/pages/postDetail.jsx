import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin, Alert, Card } from "antd";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postId]); 

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `https://backend-blogging-platform.onrender.com/post/get/${postId}` 
      );
      setPost(response.data);
    } catch (err) {
      console.error("Error fetching post:", err); 
      setError(
        err.response?.data?.message || err.message || "Error fetching post"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <Card title={post?.title} style={{ maxWidth: 800, margin: "20px auto" }}>
      <p>{post?.content}</p>
    </Card>
  );
};

export default PostDetail;
