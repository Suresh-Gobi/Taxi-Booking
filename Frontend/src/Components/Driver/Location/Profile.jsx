import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Input, Button, message } from "antd";

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/driver/driverdetails",
          config
        );

        const { username, email, carModel, licensePlate } = response.data;
        form.setFieldsValue({
          username,
          email,
          carModel,
          licensePlate,
        });
      } catch (error) {
        message.error("Error fetching profile details: " + error.message);
      }
    };

    fetchDriverDetails();
  }, [form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        "http://localhost:5000/api/driver/updatedetails",
        values,
        config
      );

      form.resetFields();
      message.success("Profile details updated successfully");
    } catch (error) {
      message.error("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", display: "flex", justifyContent: "center" }}>
      <Card title="Profile" style={{ width: 400 }}>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Car Model" name="carModel">
            <Input />
          </Form.Item>
          <Form.Item label="License Plate" name="licensePlate">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Profile;
