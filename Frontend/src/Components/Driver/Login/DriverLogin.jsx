import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios";

const DriverLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/driver/driverlogin",
        {
          email,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      // Redirect to driverlocation page upon successful login
      navigate("/driverlocation");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Driver Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default DriverLogin;
