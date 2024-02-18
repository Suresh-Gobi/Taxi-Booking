import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in local storage');
        }

        // Decode token to extract necessary information
        const { id } = JSON.parse(atob(token.split('.')[1]));

        // Make a request using the extracted information
        const response = await axios.get(`http://localhost:5000/api/booking/dbooking/${id}`);
        // Assuming the response data is an array of objects with 'date' and 'value' properties
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  // Extracting dates and values from data for the chart
  const dates = data.map(item => item.date);
  const values = data.map(item => item.value);

  // Chart data
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Booking Data',
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day' // Adjust this as needed based on your data
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      <div style={{ height: '400px', width: '600px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
