import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, message } from 'antd';
import { BASE_URL } from '../../../utils/config';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/users`, {
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setUsers(result.data);
      }
    } catch (error) {
      message.error('Failed to fetch users');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        message.success('User deleted successfully');
        fetchUsers();
      }
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="user-management">
      <h3>User Management</h3>
      <Table 
        columns={columns} 
        dataSource={users} 
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default UserManagement;