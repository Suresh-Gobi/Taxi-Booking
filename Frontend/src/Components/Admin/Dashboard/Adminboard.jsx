import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import Chart from 'chart.js/auto';
const { Meta } = Card;

export default function Adminboard() {
  const [totalPassengerCount, setTotalPassengerCount] = useState(0);
  const [totalDriverCount, setTotalDriverCount] = useState(0);
  const [totalPaymentCount, setTotalPaymentCount] = useState(0);
  const [totalBookingCount, setTotalBookingCount] = useState(0); // New state for total booking count

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch passenger count
        const passengerResponse = await fetch('http://localhost:5000/api/admin/passengercount');
        const passengerData = await passengerResponse.json();
        const passengerCount = passengerData.count;
        setTotalPassengerCount(passengerCount);

        // Fetch driver count
        const driverResponse = await fetch('http://localhost:5000/api/admin/drivercount');
        const driverData = await driverResponse.json();
        const driverCount = driverData.count;
        setTotalDriverCount(driverCount);

        // Fetch payment count
        const paymentResponse = await fetch('http://localhost:5000/api/admin/paymentcount');
        const paymentData = await paymentResponse.json();
        const paymentCount = paymentData.totalCount;
        setTotalPaymentCount(paymentCount);

        // Fetch total booking count
        const bookingResponse = await fetch('http://localhost:5000/api/admin/totalbook');
        const bookingData = await bookingResponse.json();
        const bookingCount = bookingData.totalCount;
        setTotalBookingCount(bookingCount);

        // Call createChart function with updated counts
        createChart(totalPassengerCount, totalDriverCount);
        createChart2(totalBookingCount); // Call createChart2 function
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [totalPassengerCount, totalDriverCount, totalPaymentCount, totalBookingCount]); // Update the chart whenever these values change

  // Function to create Chart.js chart
  const createChart = (passengerCount, driverCount) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Passengers', 'Drivers', 'Bookings'], // Add 'Bookings' label
        datasets: [
          {
            label: 'Total Registered',
            data: [passengerCount, driverCount, totalBookingCount], // Add totalBookingCount
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)', // Add color for Bookings
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)', // Add color for Bookings
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  // Function to create second Chart.js chart as a pie chart
  const createChart2 = (totalBookingCount) => {
    const ctx = document.getElementById('myChart2').getContext('2d');
    new Chart(ctx, {
      type: 'pie', // Set the chart type to 'pie' for pie chart
      data: {
        labels: ['Passengers', 'Drivers', 'Bookings'], // Labels for the pie chart
        datasets: [
          {
            label: 'Total Registered',
            data: [totalPassengerCount, totalDriverCount, totalBookingCount], // Add totalBookingCount
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)', // Add color for Bookings
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)', // Add color for Bookings
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card title="Total Registered Passengers" style={{ width: 300 }}>
          <Meta title={totalPassengerCount} />
        </Card>
        <Card title="Total Registered Drivers" style={{ width: 300 }}>
          <Meta title={totalDriverCount} />
        </Card>
        <Card title="Total Payments" style={{ width: 300 }}>
          <Meta title={totalPaymentCount} />
        </Card>
        <Card title="Total Bookings" style={{ width: 300 }}>
          <Meta title={totalBookingCount} />
        </Card>
      </div>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <canvas id="myChart" width="200" height="200"></canvas>
        </div>
      </Card>
      <Card>
        <div style={{ textAlign: 'center' }}>
          <canvas id="myChart2" width="200" height="200"></canvas>
        </div>
      </Card>
    </div>
  );
}
