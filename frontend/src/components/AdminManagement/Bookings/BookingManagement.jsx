import React, { useState, useEffect } from 'react';
import { Table, Space, Button, message, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../utils/config';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setBookings(result.data);
      }
    } catch (error) {
      message.error('Failed to fetch bookings');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        message.success('Booking deleted successfully');
        fetchBookings();
      }
    } catch (error) {
      message.error('Failed to delete booking');
    }
  };

  const columns = [
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Guest Size',
      dataIndex: 'guestSize',
      key: 'guestSize',
    },
    {
      title: 'Booking Date',
      dataIndex: 'bookAt',
      key: 'bookAt',
      render: (date) => new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Are you sure you want to delete this booking?"
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
    <div className="booking-management">
      <h3>Booking Management</h3>
      <Table 
        columns={columns} 
        dataSource={bookings} 
        loading={loading}
        rowKey="_id"
      />
    </div>
  );
};

export default BookingManagement;