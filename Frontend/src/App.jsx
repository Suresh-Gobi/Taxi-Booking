import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Location from "./Components/Location/Location";
import DriverLocation from "./Components/Driver/Location/DriverLocation";
import DriverLogin from "./Components/Driver/Login/DriverLogin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Location />} />\
          <Route path="/driverlocation" element={<DriverLocation />} />
          <Route path="/driverlogin" element={<DriverLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
