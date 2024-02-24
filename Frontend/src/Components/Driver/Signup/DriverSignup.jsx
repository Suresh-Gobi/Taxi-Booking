import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, notification } from "antd";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

export default function DriverSignup() {
  const [error, setError] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/driversignup",
        values
      );
      console.log("Driver signed up successfully:", response.data);
      // Handle successful signup (e.g., redirect to dashboard)
      notification.success({
        message: "Driver Signup Successful",
        description: "You have successfully signed up as a driver!",
      });
    } catch (error) {
      console.error("Error signing up driver:", error.response.data.error);
      setError(error.response.data.error);
      notification.error({
        message: "Driver Signup Failed",
        description: error.response.data.error,
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
        <Title level={2}>Driver Signup</Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }} onClick={handleSubmit}>
              <Link to="/driverlogin">Sign Up</Link>
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
