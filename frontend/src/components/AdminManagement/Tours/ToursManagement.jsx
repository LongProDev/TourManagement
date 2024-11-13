import React, { useState, useEffect } from 'react';
import { Table, Space, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BASE_URL } from '../../../utils/config';
import { useNavigate } from 'react-router-dom';

const TourManagement = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/tours`, {
        credentials: 'include'
      });
      const result = await res.json();
      if (result.success) {
        setTours(result.data);
      }
    } catch (error) {
      message.error('Failed to fetch tours');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleEdit = (tour) => {
    setEditingTour(tour);
    form.setFieldsValue(tour);
    setIsModalVisible(true);
  };

  const handleDelete = async (tourId) => {
    try {
      const res = await fetch(`${BASE_URL}/tours/${tourId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const result = await res.json();
      
      if (result.success) {
        message.success('Tour deleted successfully');
        fetchTours();
      } else {
        message.error(result.message || 'Failed to delete tour');
        if (res.status === 401) {
          navigate('/home');
        }
      }
    } catch (error) {
      message.error('Failed to delete tour');
    }
  };

  const handleSubmit = async (values) => {
    try {
      const url = editingTour
        ? `${BASE_URL}/tours/${editingTour._id}`
        : `${BASE_URL}/tours`;
      const method = editingTour ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(values),
      });

      const result = await res.json();
      if (result.success) {
        message.success(`Tour ${editingTour ? 'updated' : 'created'} successfully`);
        setIsModalVisible(false);
        form.resetFields();
        setEditingTour(null);
        fetchTours();
      }
    } catch (error) {
      message.error(`Failed to ${editingTour ? 'update' : 'create'} tour`);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Max Group Size',
      dataIndex: 'maxGroupSize',
      key: 'maxGroupSize',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this tour?"
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
    <div className="tour-management">
      <div className="management-header">
        <h3>Tour Management</h3>
        <Button type="primary" onClick={() => {
          setEditingTour(null);
          form.resetFields();
          setIsModalVisible(true);
        }}>
          Add New Tour
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={tours} 
        loading={loading}
        rowKey="_id"
      />

      <Modal
        title={editingTour ? 'Edit Tour' : 'Add New Tour'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input tour title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please input city!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input price!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="maxGroupSize"
            label="Max Group Size"
            rules={[{ required: true, message: 'Please input max group size!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                {editingTour ? 'Update' : 'Create'}
              </Button>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TourManagement;