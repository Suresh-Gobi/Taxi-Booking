import React, { useState } from 'react';
import axios from 'axios';
import { Card, Form, Input, Button, Typography, notification } from 'antd';

const { Title } = Typography;

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/passenger/userlogin', formData);
      console.log(response.data); // You can handle success response here
      // Save token to localStorage
      localStorage.setItem('token', response.data.token);
      // Redirect to "/"
      window.location.href = "/passengerdash";
    } catch (error) {
      console.error('Error:', error.response.data); // You can handle error response here
      notification.error({
        message: 'Login Failed',
        description: error.response.data.message || 'An error occurred while logging in.'
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: 400 }}>
        <Title level={2}>Passenger Login</Title>
        <Form onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password name="password" value={formData.password} onChange={handleChange} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ width: '100%' }} onClick={handleSubmit}>Login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
