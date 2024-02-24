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
import AdminDash from "./Components/AdminDash";
import Payment from "./Components/Driver/Location/Payment";
import Adminsignup from "./Components/Admin/Dashboard/Signup";
import AdminLogin from "./Components/Admin/Dashboard/Login";
import Unreg from "./Components/Admin/Dashboard/unreg";
import DriverDetails from "./Components/Admin/Dashboard/DriverDetails";
import PayPassenger from "./Components/Passenger/Payment";
import Rate from "./Components/Passenger/Rate";
import Home from "./Components/Home/home";
import Food from "./Components/Passenger/Food";
import UserProfile from "./Components/Passenger/Profile";
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
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/adminsignup" element={<Adminsignup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/unreg" element={<Unreg />} />
          <Route path="/driverdet" element={<DriverDetails />} />
          <Route path="/payhere" element={<PayPassenger />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/" element={<Home />} />
          <Route path="/food" element={<Food />} />
          <Route path="/userpprofile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
