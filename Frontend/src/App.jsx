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
import DriverSignup from "./Components/Driver/Signup/DriverSignup";
import Book from "./Components/Location/book";
import Bookings from "./Components/Driver/Location/Bookings";
import Profile from "./Components/Driver/Location/Profile";
import Report from "./Components/Driver/Location/Report";
import PassengerDash from "./Components/PassengerDash";
import Pending from "./Components/Passenger/Pending";
import DriverDash from "./Components/DriverDash";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/location" element={<Location />} />\
          <Route path="/driverlocation" element={<DriverLocation />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
          <Route path="/driverSignup" element={<DriverSignup />} />
          <Route path="/passengersignup" element={<Signup />} />
          <Route path="/passengerlogin" element={<Login />} />
          <Route path="/book" element={<Book />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/driverprofile" element={<Profile />} />
          <Route path="/driverreport" element={<Report />} />
          <Route path="/passengerdash" element={<PassengerDash />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/driverdash" element={<DriverDash />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
