import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Spin, Modal } from "antd";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

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
const handleAcceptBooking = async (bookingId, index) => {
  try {
    // Make a PUT request to your backend endpoint to update the booking status to "accepted"
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

    // Make a PUT request to update the booking status to "accepted"
    await axios.put(
      "http://localhost:5000/api/booking/updatebooking",
      { bookingId, status: "accepted" }, // Include the booking ID and status to update
      config
    );

    // Update the status of the booking in the local state
    const updatedBookings = [...bookings];
    updatedBookings[index].status = "accepted";
    setBookings(updatedBookings);
  } catch (error) {
    // Handle error
    console.error("Error accepting booking:", error);
  }
};


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

  // Function to handle showing map details in modal
  const handleShowMap = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  return (
    <div>
      <h1>Bookings</h1>
      {bookings.length === 0 && <Spin />}{" "}
      {/* Show spinner if bookings are loading */}
      {bookings.map((booking, index) => (
        <Card key={index} style={{ marginBottom: "16px", textAlign: "left" }}>
          <p>Booking ID: {booking._id}</p>
          <p>Distance: {booking.distance}</p>
          <p>Price: {booking.price}</p>
          <p>Status: {booking.status}</p>
          <p>
            Pickup Location: Latitude - {booking.pickupLocation.coordinates[1]},
            Longitude - {booking.pickupLocation.coordinates[0]}
          </p>
          <p>
            Drop Location: Latitude - {booking.dropLocation.coordinates[1]},
            Longitude - {booking.dropLocation.coordinates[0]}
          </p>
          {/* Conditional rendering for accept or complete button */}
          {booking.status === "pending" ? (
            <Button
              type="primary"
              onClick={() => handleAcceptBooking(booking._id, index)}
            >
              Accept
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleCompleteBooking(booking._id, index)}
              disabled={booking.status === "completed"}
            >
              Complete
            </Button>
          )}
          <Button onClick={() => handleShowMap(booking)}>Show in Map</Button>
        </Card>
      ))}
      {/* Modal for displaying map details */}
      <Modal
        title="Map Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {/* Render map details here */}
        {selectedBooking && (
          <div>
            <p>
              Pickup Location:{" "}
              {selectedBooking.pickupLocation.coordinates.join(", ")}
            </p>
            <p>
              Drop Location:{" "}
              {selectedBooking.dropLocation.coordinates.join(", ")}
            </p>
            {/* Add your map component here */}
            {/* For example: */}
            <iframe
              width="100%"
              height="400"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyA2pOk0aC3V-7hz_CXpUQn-IQWpbVmFAbw&origin=${selectedBooking.pickupLocation.coordinates[1]},${selectedBooking.pickupLocation.coordinates[0]}&destination=${selectedBooking.dropLocation.coordinates[1]},${selectedBooking.dropLocation.coordinates[0]}&mode=driving`}
            ></iframe>
          </div>
        )}
      </Modal>
    </div>
  );
}
