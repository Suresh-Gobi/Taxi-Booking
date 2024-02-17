// Import useState and useEffect from React
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

  // Function to handle completing a booking
  const handleCompleteBooking = async (bookingId, index) => {
    try {
      // Make a POST request to your backend endpoint to complete the booking
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

      // Make a POST request to update the booking status to "complete"
      await axios.put(
        "http://localhost:5000/api/booking/completebooking",
        { bookingId },
        config
      );

      // Update the status of the booking in the local state
      const updatedBookings = [...bookings];
      updatedBookings[index].status = "completed";
      setBookings(updatedBookings);
    } catch (error) {
      // Handle error
      console.error("Error completing booking:", error);
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
            {/* Conditional rendering for accept or complete button */}
            {booking.status === "pending" ? (
              <button onClick={() => handleAcceptBooking(booking._id, index)}>
                Accept
              </button>
            ) : (
              <button
                onClick={() => handleCompleteBooking(booking._id, index)}
                disabled={booking.status === "completed"}
              >
                Complete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
