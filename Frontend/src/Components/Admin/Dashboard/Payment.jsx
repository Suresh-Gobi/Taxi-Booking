import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Alert } from 'antd';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/payment/getpay');
        setPayments(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching payment history');
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const columns = [
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Booking ID',
      dataIndex: 'bookingId',
      key: 'bookingId',
    },
  ];

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      <h1>Payment History</h1>
      <Table dataSource={payments} columns={columns} rowKey="_id" />
    </div>
  );
};

export default PaymentHistory;
