import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Input, Button, Typography, notification } from "antd";

const { Title } = Typography;

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/passenger/usercreate",
        formData
      );
      console.log(response.data); // You can handle success response here
      notification.success({
        message: "Signup Successful",
        description: "You have successfully signed up!",
      });
    } catch (error) {
      console.error("Error:", error.response.data); // You can handle error response here
      notification.error({
        message: "Signup Failed",
        description:
          error.response.data.message || "An error occurred while signing up.",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Card style={{ width: 400 }}>
        <Title level={2}>Signup</Title>
        <Form onSubmit={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }} onClick={handleSubmit}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
