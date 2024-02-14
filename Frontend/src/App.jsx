import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Location from "./Components/Location/Location";
import DriverLocation from "./Components/Driver/Location/DriverLocation";
import DriverLogin from "./Components/Driver/Login/DriverLogin";
import Signup from "./Components/Passenger/Signup/Signup";
import Login from "./Components/Passenger/Login/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/location" element={<Location />} />\
          <Route path="/driverlocation" element={<DriverLocation />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/passengersignup" element={<Signup />} />
          <Route path="/passengerlogin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
