import React, { useState } from "react";
import axios from "axios";

export default function Book() {
  const [distance, setDistance] = useState("");
  const [price, setPrice] = useState("");
  const [pickupLatitude, setPickupLatitude] = useState("");
  const [pickupLongitude, setPickupLongitude] = useState("");
  const [dropLatitude, setDropLatitude] = useState("");
  const [dropLongitude, setDropLongitude] = useState("");
  const [driverId, setDriverId] = useState("");

  const handleBookNow = async () => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      // Decode token to extract passenger ID
      const passengerId = JSON.parse(atob(token.split(".")[1])).id;

      // Create config object with Authorization header
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send booking details to the backend API
      const response = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          distance,
          price,
          pickupLocation: {
            coordinates: [
              parseFloat(pickupLongitude),
              parseFloat(pickupLatitude),
            ],
          },
          dropLocation: {
            coordinates: [parseFloat(dropLongitude), parseFloat(dropLatitude)],
          },
          driverId,
          passengerId,
        },
        config
      );

      // Handle successful booking response
      console.log("Booking created:", response.data);
      // You can perform additional actions here, such as updating the UI or showing a success message.
    } catch (error) {
      // Handle booking error
      console.error("Error creating booking:", error.message);
      // You can display an error message to the user or perform other error handling actions.
    }
  };

  return (
    <div>
      <div>
        <label>Distance:</label>
        <input
          type="number"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Pickup Latitude:</label>
        <input
          type="number"
          value={pickupLatitude}
          onChange={(e) => setPickupLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Pickup Longitude:</label>
        <input
          type="number"
          value={pickupLongitude}
          onChange={(e) => setPickupLongitude(e.target.value)}
        />
      </div>
      <div>
        <label>Drop Latitude:</label>
        <input
          type="number"
          value={dropLatitude}
          onChange={(e) => setDropLatitude(e.target.value)}
        />
      </div>
      <div>
        <label>Drop Longitude:</label>
        <input
          type="number"
          value={dropLongitude}
          onChange={(e) => setDropLongitude(e.target.value)}
        />
      </div>
      <div>
        <label>Driver ID:</label>
        <input
          type="text"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
        />
      </div>
      <button onClick={handleBookNow}>Book Now</button>
    </div>
  );
}
