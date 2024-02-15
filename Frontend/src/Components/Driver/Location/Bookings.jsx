import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings related to the logged-in driver
    const fetchBookings = async () => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        // Create config object with Authorization header
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Make a GET request to the backend API endpoint with token in headers
        const response = await axios.get(
          "http://localhost:5000/api/booking/dbooking",
          config
        );

        // Set the fetched bookings in the state
        setBookings(response.data);
      } catch (error) {
        // Handle error
        console.error("Error fetching bookings:", error);
      }
    };

    // Call the fetchBookings function when the component mounts
    fetchBookings();
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  // Function to handle accepting a booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      // Make a POST request to your backend endpoint to accept the booking
      // You need to implement the logic in your backend to handle accepting bookings
      // You can pass the bookingId as a parameter to your backend API
    } catch (error) {
      // Handle error
      console.error("Error accepting booking:", error);
    }
  };

  return (
    <div>
      <h1>Bookings</h1>
      <ul>
        {/* Map through the bookings array and display booking details */}
        {bookings.map((booking, index) => (
          <li key={index}>
            {/* Display booking details */}
            <p>Booking ID: {booking._id}</p>
            <p>Distance: {booking.distance}</p>
            <p>Price: {booking.price}</p>
            <p>Status: {booking.status}</p>
            <p>
              Pickup Location: Latitude -{" "}
              {booking.pickupLocation.coordinates[1]}, Longitude -{" "}
              {booking.pickupLocation.coordinates[0]}
            </p>
            <p>
              Drop Location: Latitude - {booking.dropLocation.coordinates[1]},
              Longitude - {booking.dropLocation.coordinates[0]}
            </p>
            {/* Add accept button */}
            {booking.status === "pending" && (
              <button onClick={() => handleAcceptBooking(booking._id)}>
                Accept
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
