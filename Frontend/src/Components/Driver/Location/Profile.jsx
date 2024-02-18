import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [carModel, setCarModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in local storage");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/driver/driverdetails",
          config
        );

        const { username, email, carModel, licensePlate } = response.data;
        setUsername(username);
        setEmail(email);
        setCarModel(carModel);
        setLicensePlate(licensePlate);
      } catch (error) {
        setError("Error fetching profile details: " + error.message);
      }
    };

    fetchDriverDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(
        "http://localhost:5000/api/driver/updatedetails",
        { username, email, carModel, licensePlate },
        config
      );

      setUsername("");
      setEmail("");
      setCarModel("");
      setLicensePlate("");
      setSuccessMessage("Profile details updated successfully");
    } catch (error) {
      setError("Error updating profile: " + error.message);
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Car Model:</label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          />
        </div>
        <div>
          <label>License Plate:</label>
          <input
            type="text"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
