import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Typography, Button, Card } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

export default function Payment() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const distance = queryParams.get('distance');
  const price = queryParams.get('price');
  const bookingId = queryParams.get('bookingId');
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePaymentComplete = async () => {
    try {
      // Send a POST request to the payment API endpoint
      const response = await axios.post('http://localhost:5000/api/payment/pay', {
        distance,
        price,
        bookingId
      });
      console.log('Payment response:', response.data);
      // Set payment completion flag to true
      setPaymentCompleted(true);
    } catch (error) {
      console.error('Error completing payment:', error);
      // Handle payment error
      // For example, show an error message to the user
    }
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
        {/* Display "Complete Payment" button only if payment is not completed */}
        {!paymentCompleted && (
          <Button type="primary" danger onClick={handlePaymentComplete}>
            Complete Payment
          </Button>
        )}
        {/* Display message if payment is completed */}
        {paymentCompleted && (
          <Text type="success">Payment completed successfully!</Text>
        )}<br/><br/>
        <Button>
          <Link to="/driverdash">Go Back to Dashboard</Link>
        </Button>
      </Card>
    </div>
  );
}
