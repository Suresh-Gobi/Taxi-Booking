import React, { useState, useEffect } from "react";
import { Card } from "antd";

const { Meta } = Card;

export default function Adminboard() {
  const [totalPassengerCount, setTotalPassengerCount] = useState(0);
  const [totalDriverCount, setTotalDriverCount] = useState(0);
  const [totalPaymentCount, setTotalPaymentCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const passengerResponse = await fetch(
          "http://localhost:5000/api/admin/passengercount"
        );
        const passengerData = await passengerResponse.json();
        console.log("Passenger Data:", passengerData); // Log passenger data
        const passengerCount = passengerData.count; // Assuming count is the key returned from backend
        setTotalPassengerCount(passengerCount);
  
        const driverResponse = await fetch(
          "http://localhost:5000/api/admin/drivercount"
        );
        const driverData = await driverResponse.json();
        console.log("Driver Data:", driverData); // Log driver data
        const driverCount = driverData.count; // Assuming count is the key returned from backend
        setTotalDriverCount(driverCount);
  
        const paymentResponse = await fetch(
          "http://localhost:5000/api/admin/paymentcount"
        );
        const paymentData = await paymentResponse.json();
        console.log("Payment Data:", paymentData); // Log payment data
        const paymentCount = paymentData.totalCount;
        setTotalPaymentCount(paymentCount);
  
        // Calculate the total count
        const total = passengerCount + driverCount + paymentCount;
        console.log("Total:", total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);
  

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <Card title="Total Registered Passengers" style={{ width: 300 }}>
        <Meta title={totalPassengerCount} />
      </Card>
      <Card title="Total Registered Drivers" style={{ width: 300 }}>
        <Meta title={totalDriverCount} />
      </Card>
      <Card title="Total Payments" style={{ width: 300 }}>
        <Meta title={totalPaymentCount} />
      </Card>
    </div>
  );
}
