import React, { useState, lazy, Suspense } from "react";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

// Lazy-loaded dummy components
const Ride = lazy(() => import("../Components/Admin/Dashboard/Adminboard"));
const Unreg = lazy(() => import("../Components/Admin/Dashboard/unreg"));
const PassDetails = lazy(() =>
  import("../Components/Admin/Dashboard/PassengerManage")
);
const DrDetails = lazy(() =>
  import("../Components/Admin/Dashboard/DriverDetails")
);

const PaymentDetails = lazy(() =>
  import("../Components/Admin/Dashboard/Payment")
);

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("DashBoard", "1", <MailOutlined />),
  getItem("Create Booking", "2", <MailOutlined />),
  getItem("Passenger Details", "3", <MailOutlined />),
  getItem("Driver Details", "4", <MailOutlined />),
  getItem("Payment Details", "5", <MailOutlined />),
  getItem("Manage Route", "sub2", <AppstoreOutlined />, [
    getItem("Routes", "2"),
  ]),
  {
    type: "divider",
  },
  getItem("Manage Profile", "2", <SettingOutlined />, [
    getItem("Option 9", "9"),
  ]),
];

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const onClick = (e) => {
    console.log("click ", e);
    setSelectedMenuItem(e.key);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        style={{
          width: "100%", // Set the width to 100%
          display: "flex", // Use flexbox to arrange items horizontally
          justifyContent: "space-between", // Add space between items
        }}
        defaultSelectedKeys={["1"]}
        mode="horizontal" // Set mode to horizontal
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
      {/* Conditionally render the content based on the selected menu item */}
      <Suspense fallback={<div>Loading...</div>}>
        {selectedMenuItem === "1" && <Ride />}
        {selectedMenuItem === "2" && <Unreg />}
        {selectedMenuItem === "3" && <PassDetails />}
        {selectedMenuItem === "4" && <DrDetails />}
        {selectedMenuItem === "5" && <PaymentDetails />}
      </Suspense>
    </>
  );
};

export default App;
