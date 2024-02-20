import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";

const DriverLocation = () => {
  const [error, setError] = useState(null);
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    const updateDriverLocation = async () => {
      try {
        const { coords } = await getCurrentPosition();
        const { latitude, longitude } = coords;
        const token = localStorage.getItem("token");
        if (token) {
          const driverInfo = decodeToken(token); // Decode token to get driver info
          const driverId = driverInfo.id;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          await axios.post(
            `http://localhost:5000/api/driver/driverlocation/${driverId}`,
            { latitude, longitude },
            config
          );
          setDriverDetails(driverInfo);
        } else {
          throw new Error("Token not found in local storage");
        }
      } catch (error) {
        setError("Error updating driver location: " + error.message);
      }
    };

    const getCurrentPosition = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
      });
    };

    // Function to decode JWT token
    const decodeToken = (token) => {
      return JSON.parse(atob(token.split(".")[1]));
    };

    // Update driver location on component mount
    updateDriverLocation();

    // Set up interval to update location periodically (every minute)
    const intervalId = setInterval(updateDriverLocation, 60000);

    // Clean up on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card style={{ width: "auto", margin: "auto", marginTop: 40 }}>
      {error ? (
        <p>{error}</p>
      ) : driverDetails ? (
        <div style={{ textAlign: "right" }}>
          <p>Username: {driverDetails.username}</p>
          <p>Email: {driverDetails.email}</p>
          <p>Driver ID: {driverDetails.id}</p>
          <p>Available: {driverDetails.available ? "Yes" : "No"}</p>
          <p>Driver location updated successfully.</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Card>
  );
};

export default DriverLocation;
