import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table, Spin, Alert, Button, Modal, List, message } from "antd";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    fetchSubscriptions();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:7777/user/getallusers",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://127.0.0.1:7777/subscription/getall",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const subscriptionMap = {};
      response.data.forEach((sub) => {
        subscriptionMap[sub.blogger] = sub._id;
      });
      setSubscriptions(subscriptionMap);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
    }
  };

  const fetchBlogs = async (userId, userName) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://127.0.0.1:7777/post/user/${userId}`
      );
      setBlogs(response.data);
      setSelectedUser(userName);
      setIsModalVisible(true);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (bloggerId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:7777/subscription/subscribe",
        { bloggerId, category: "General" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success("Subscribed successfully!");
      setSubscriptions((prev) => ({
        ...prev,
        [bloggerId]: response.data.subscription._id,
      }));
    } catch (err) {
      message.error("Failed to subscribe");
    }
  };

  const handleUnsubscribe = async (subscriptionId, bloggerId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://127.0.0.1:7777/subscription/unsubscribe/${subscriptionId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      message.success("Unsubscribed successfully!");
      setSubscriptions((prev) => {
        const updated = { ...prev };
        delete updated[bloggerId];
        return updated;
      });
    } catch (err) {
      message.error("Failed to unsubscribe");
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/postDetail/${postId}`);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          {text}{" "}
          <Button
            type="link"
            onClick={() => fetchBlogs(record._id, record.name)}
          >
            View Blogs
          </Button>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Subscription",
      key: "subscription",
      render: (record) => (
        <>
          {subscriptions[record._id] ? (
            <Button
              type="primary"
              danger
              onClick={() =>
                handleUnsubscribe(subscriptions[record._id], record._id)
              }
            >
              Unsubscribe
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleSubscribe(record._id)}>
              Subscribe
            </Button>
          )}
        </>
      ),
    },
  ];

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={false}
      />

      <Modal
        title={`Blogs by ${selectedUser}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {blogs.length > 0 ? (
          <List
            dataSource={blogs}
            renderItem={(blog) => (
              <List.Item
                onClick={() => handlePostClick(blog._id)}
                style={{ cursor: "pointer" }}
              >
                <List.Item.Meta
                  title={blog.title}
                  description={blog.content.substring(0, 100) + "..."}
                />
              </List.Item>
            )}
          />
        ) : (
          <Alert message="No blogs found for this user" type="info" showIcon />
        )}
      </Modal>
    </>
  );
};

export default AllUsers;
