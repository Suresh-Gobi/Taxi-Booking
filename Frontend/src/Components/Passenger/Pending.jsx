import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spin } from "antd";

const BookingStatus = () => {
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [passengerDetails, setPassengerDetails] = useState(null);

  useEffect(() => {
    const fetchBookingStatus = async () => {
      try {
        // Retrieve passenger details from local storage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        // Extract passenger ID from the token
        const passengerId = token.split(".")[1];

        // Make API call to fetch booking status
        const response = await axios.get(
          `http://localhost:5000/api/booking/bookingstatus/${passengerId}`
        );
        setBookingStatus(response.data.status);
        setPassengerDetails({
          id: passengerId,
          // You might need to decode other information from the token if required
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking status:", error);
        setLoading(false);
      }
    };

    fetchBookingStatus();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <h2>Passenger Details</h2>
      <p>ID: {passengerDetails && passengerDetails._id}</p>
      {/* Render other passenger details as needed */}
      <h2>Booking Status</h2>
      {bookingStatus === "pending" && <div>Pending</div>}
      {bookingStatus === "accepted" && <div>Accepted</div>}
      {bookingStatus === "completed" && <div>Completed</div>}
    </div>
  );
};

export default BookingStatus;
