import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin, Alert, Button, Modal, List } from "antd";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
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
    fetchUsers();
  }, []);

  // Fetch user blogs
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

  // Table columns
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

      {/* Modal for displaying blogs */}
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
              <List.Item>
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
