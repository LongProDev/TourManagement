import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Popconfirm, Rate } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../utils/config';

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setReviews(result.data);
      }
    } catch (error) {
      message.error('Failed to fetch reviews');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      const res = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        message.success('Review deleted successfully');
        fetchReviews();
      }
    } catch (error) {
      message.error('Failed to delete review');
    }
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Review Text',
      dataIndex: 'reviewText',
      key: 'reviewText',
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: 'Tour',
      dataIndex: ['tour', 'title'],
      key: 'tour',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete this review?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="review-management">
      <h3>Review Management</h3>
      <Table 
        columns={columns} 
        dataSource={reviews} 
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default ReviewManagement;