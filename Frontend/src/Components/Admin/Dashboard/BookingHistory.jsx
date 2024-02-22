import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:5000/api/admin/bookdet");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    }

    fetchBookings();
  }, []);

  const columns = [
    {
      title: 'Distance',
      dataIndex: 'distance',
      key: 'distance',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Pickup Location',
      dataIndex: 'pickupLocation',
      key: 'pickupLocation',
    },
    {
      title: 'Drop Location',
      dataIndex: 'dropLocation',
      key: 'dropLocation',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  return (
    <div>
      <h1>Booking History</h1>
      <Table dataSource={bookings} columns={columns} />
    </div>
  );
}
