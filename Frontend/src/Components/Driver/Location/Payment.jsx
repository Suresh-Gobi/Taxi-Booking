import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Card } from 'antd';

const { Title, Text } = Typography;

export default function Payment() {
  // Use the useLocation hook to access the query parameters
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const distance = queryParams.get('distance');
  const price = queryParams.get('price');
  const bookingId = queryParams.get('bookingId');

  // Function to handle payment completion
  const handlePaymentComplete = () => {
    // Logic to handle payment completion
    alert('Payment completed successfully!');
    // Redirect to the "/driver" page after payment completion
    window.location.href = '/driverdash';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Card title={<Title level={2}>Payment</Title>}>
        <Text strong>Distance:</Text>
        <p>{distance}</p>
        <Text strong>Price:</Text>
        <p>{price}</p>
        <Text strong>Booking ID:</Text>
        <p>{bookingId}</p>
        <Button type="primary" danger onClick={handlePaymentComplete}>
          Complete Payment
        </Button>
      </Card>
    </div>
  );
}
