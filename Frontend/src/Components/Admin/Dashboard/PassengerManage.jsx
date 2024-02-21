import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";

const PassengerManagement = () => {
  const [passengers, setPassengers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch all passenger details
    const fetchPassengers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/passenger/passengerdetails"
        );
        setPassengers(response.data);
      } catch (error) {
        console.error("Error fetching passengers:", error);
      }
    };
    fetchPassengers();
  }, []);

  const handleUpdate = (record) => {
    setVisible(true);
    // Set form fields with record data including _id
    form.setFieldsValue({
      _id: record._id,
      username: record.username,
      email: record.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/passenger/passengerdelete/${id}`
      );
      message.success("Passenger deleted successfully");
      // Refresh passenger list after deletion
      const response = await axios.get(
        "http://localhost:5000/api/passenger/passengerdetails"
      );
      setPassengers(response.data);
    } catch (error) {
      console.error("Error deleting passenger:", error);
      message.error("Failed to delete passenger");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (!values?._id) {
        throw new Error("Passenger ID is missing");
      }
      await axios.put(
        `http://localhost:5000/api/passenger/passengerupdate/${values._id}`,
        values
      );
      message.success("Passenger updated successfully");
      setVisible(false);
      // Refresh passenger list after update
      const response = await axios.get(
        "http://localhost:5000/api/passenger/passengerdetails"
      );
      setPassengers(response.data);
    } catch (error) {
      console.error("Error updating passenger:", error);
      message.error("Failed to update passenger");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredPassengers = passengers.filter((passenger) =>
    passenger.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Passenger ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="primary" onClick={() => handleUpdate(record)}>
            Update
          </Button>
          <Button
            type="danger"
            onClick={() => handleDelete(record._id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Passenger Management</h1>
      <Input.Search
        placeholder="Search by username"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />
      <Table dataSource={filteredPassengers} columns={columns} rowKey="_id" />

      <Modal
        title="Update Passenger"
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
        </Form>
      </Modal>
    </div>
  );
};

export default PassengerManagement;
