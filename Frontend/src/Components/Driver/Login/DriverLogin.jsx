import React, { useState } from 'react';
import { Card, Form, Input, Button, Typography } from 'antd';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate hook
import axios from 'axios';

const { Title } = Typography;

const DriverLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/driver/driverlogin', values);
      const { token } = response.data;
      localStorage.setItem('token', token); // Save token in local storage
      // Redirect to driverlocation page upon successful login
      navigate('/driverdash');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: 400 }}>
        <Title level={2}>Driver Login</Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password />
          </Form.Item>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form.Item>
            <Button htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DriverLogin;
