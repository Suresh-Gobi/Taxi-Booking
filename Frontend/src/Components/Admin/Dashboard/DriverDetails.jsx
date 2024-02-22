import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';

const DriverDetails = () => {
  const [drivers, setDrivers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch all driver details
    const fetchDrivers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/admindrget');
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };
    fetchDrivers();
  }, []);

  const handleUpdate = (record) => {
    setVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/admindrdelete/${id}`);
      message.success('Driver deleted successfully');
      // Refresh driver list after deletion
      const response = await axios.get('http://localhost:5000/api/admin/driverget');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error deleting driver:', error);
      message.error('Failed to delete driver');
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await axios.put(`http://localhost:5000/api/admin/admindrupdate/${values._id}`, values);
      message.success('Driver updated successfully');
      setVisible(false);
      // Refresh driver list after update
      const response = await axios.get('http://localhost:5000/api/driver/driverget');
      setDrivers(response.data);
    } catch (error) {
      console.error('Error updating driver:', error);
      message.error('Failed to update driver');
    }
  };

  const handleCancel = () => {
    setVisible(false);
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
      title: 'Car Model',
      dataIndex: 'carModel',
      key: 'carModel',
    },
    {
      title: 'License Plate',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record)}>Update</Button>
          <Button type="danger" onClick={() => handleDelete(record._id)} style={{ marginLeft: 8 }}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Driver Details</h1>
      <Table dataSource={drivers} columns={columns} rowKey="_id" />

      <Modal
        title="Update Driver"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="carModel" label="Car Model">
            <Input />
          </Form.Item>
          <Form.Item name="licensePlate" label="License Plate">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DriverDetails;
