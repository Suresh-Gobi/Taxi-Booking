import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function Pending() {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        // Extract token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }

        // Create config object with Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make a GET request to the API endpoint with token in headers
        console.log('Fetching pending bookings...');
        const response = await axios.get('http://localhost:5000/api/booking/bookingstatus', config);

        // Filter out only the pending bookings
        const pendingBookingsData = response.data.filter(booking => booking.status === 'pending');

        // Set the pending bookings in state
        console.log('Pending bookings:', pendingBookingsData);
        setPendingBookings(pendingBookingsData);
        setLoading(false);

        // Redirect after 10 seconds
        setTimeout(() => {
          console.log('Redirecting to /driver...');
          setRedirect(true);
        }, 10000);
      } catch (error) {
        console.error('Error fetching pending bookings:', error);
        setLoading(false);
      }
    };

    // Call the fetchPendingBookings function when the component mounts
    fetchPendingBookings();
  }, []);

  useEffect(() => {
    if (redirect) {
      console.log('Redirecting...');
      navigate('/driver');
    }
  }, [redirect, navigate]);

  return (
    <div>
      <h1>Pending Bookings</h1>
      <Spin tip="Wait for Driver Acceptance!" spinning={loading} size="large">
        <ul>
          {pendingBookings.map(booking => (
            <li key={booking._id}>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      </Spin>
    </div>
  );
}
