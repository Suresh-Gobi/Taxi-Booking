import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Button, Input, message, Typography, Row, Col, Card } from "antd";
import {
  EnvironmentOutlined,
  LoadingOutlined,
  DollarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const socket = io.connect("http://localhost:5000");

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState("");
  const [currentLocationClicked, setCurrentLocationClicked] = useState(false);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const [nearbyDrivers, setNearbyDrivers] = useState([]); // State variable to hold nearby drivers
  const [destinationLatitude, setDestinationLatitude] = useState(null);
  const [destinationLongitude, setDestinationLongitude] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    // Other code remains the same
  }, [map, currentLocationClicked]);

  // Function to decode JWT token
  const decodeToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  const extractUserDataFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { username, id, email } = decodeToken(token);
      setLoggedInUserData({ username, id, email });
    }
  };

  // Call the function to extract user data from token
  useEffect(() => {
    extractUserDataFromToken();
  }, []);

  const handleBookNow = async (driverId) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      // Decode token to extract passenger details
      const { id: passengerId, email, username } = decodeToken(token);

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
            coordinates: [location.longitude, location.latitude],
          },
          dropLocation: {
            coordinates: [destinationLongitude, destinationLatitude],
          },
          driverId,
          passenger: {
            id: passengerId,
            email,
            username,
          },
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

  useEffect(() => {
    // Get user's initial location automatically
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // Send initial location to backend
          axios.post("http://localhost:5000/api/location/create", {
            latitude,
            longitude,
          });
          // Update map marker position if current location clicked
          if (map && currentLocationClicked) {
            const marker = new window.google.maps.Marker({
              position: { lat: latitude, lng: longitude },
              map: map,
            });
            // Center map on user's location
            map.setCenter({ lat: latitude, lng: longitude });
            setCurrentLocationClicked(false); // Reset flag
          }
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    };

    fetchLocation(); // Fetch location on component mount

    // Set up interval to update location periodically
    const intervalId = setInterval(fetchLocation, 60000); // Update every minute

    // Clean up on component unmount
    return () => {
      clearInterval(intervalId);
      socket.disconnect();
    };
  }, [map, currentLocationClicked]); // Re-run effect when map or currentLocationClicked changes

  useEffect(() => {
    // Load Google Maps API
    const loadGoogleMaps = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA2pOk0aC3V-7hz_CXpUQn-IQWpbVmFAbw&libraries=places`;
      googleMapsScript.onload = () => {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: { lat: 0, lng: 0 }, // Default center
          zoom: 12, // Default zoom
        });
        setMap(map);
      };
      document.body.appendChild(googleMapsScript);
    };

    loadGoogleMaps();

    // Clean up
    return () => {
      // Remove Google Maps script
      const googleMapsScript = document.querySelector(
        'script[src^="https://maps.googleapis.com/maps/api/js?key="]'
      );
      googleMapsScript &&
        googleMapsScript.parentNode.removeChild(googleMapsScript);
    };
  }, []);

  // Function to show route on map
  const showRoute = () => {
    if (map && location && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: new window.google.maps.LatLng(
            location.latitude,
            location.longitude
          ),
          destination: destination,
          travelMode: "DRIVING",
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
            // Calculate and display the distance of the route
            const route = response.routes[0];
            let totalDistance = 0;
            for (let i = 0; i < route.legs.length; i++) {
              totalDistance += route.legs[i].distance.value;
            }
            const distanceInKm = totalDistance / 1000; // Convert meters to kilometers
            setDistance(distanceInKm.toFixed(2));
            // Calculate price based on distance
            const calculatedPrice = calculatePrice(distanceInKm);
            setPrice(calculatedPrice);
            // Extract and set destination latitude and longitude
            const destinationLocation = route.legs[0].end_location;
            setDestinationLatitude(destinationLocation.lat());
            setDestinationLongitude(destinationLocation.lng());
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    }
  };

  // Function to handle current location button click
  const handleCurrentLocationClick = () => {
    setCurrentLocationClicked(true);
  };

  // Function to fetch nearby drivers and update state
  const fetchNearbyDrivers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/driver/driverget"
      );

      // Filter nearby drivers based on their distance from the user's location
      const nearbyDrivers = response.data.filter((driver) => {
        const driverLocation = {
          latitude: driver.latitude,
          longitude: driver.longitude,
        };
        const distanceFromUser = calculateDistance(location, driverLocation);
        return distanceFromUser <= 4; // Filter drivers within 4 kilometers
      });

      setNearbyDrivers(nearbyDrivers);
    } catch (error) {
      console.error("Error fetching nearby drivers:", error);
    }
  };

  const handleSearchClick = () => {
    setLoading(true);
    fetchNearbyDrivers().then(() => {
      setLoading(false);
    });
  };

  // Function to calculate distance between two locations using Haversine formula
  const calculateDistance = (location1, location2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(location2.latitude - location1.latitude);
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location1.latitude)) *
        Math.cos(deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Function to convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Function to calculate price based on distance
  const calculatePrice = (distanceInKm) => {
    let price = 0;
    if (distanceInKm > 0 && distanceInKm <= 100) {
      price = 50;
    } else if (distanceInKm > 100 && distanceInKm <= 200) {
      price = 100;
    } else if (distanceInKm > 200 && distanceInKm <= 300) {
      price = 150;
    } else if (distanceInKm > 300 && distanceInKm <= 400) {
      price = 200;
    } else if (distanceInKm > 400 && distanceInKm <= 500) {
      price = 250;
    } else if (distanceInKm > 500) {
      price = 300;
    }
    return price;
  };

  const handleViewLocation = (driver) => {
    setSelectedDriver(driver);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      {/* Logged-in user data */}
      <Card style={{textAlign: "right"}}>
        {loggedInUserData && (
          <div>
            <p>Username: {loggedInUserData.username}</p>
            <p>Email: {loggedInUserData.email}</p>
            <p>ID: {loggedInUserData.id}</p>
          </div>
        )}
      </Card>
      {/* Map */}
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      {/* Buttons and Inputs */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12}>
            <Button
              onClick={handleCurrentLocationClick}
              style={{ textAlign: "left" }}
              type="primary"
              ghost // Set ghost to true to remove hover effect
            >
              Fetch Current Location
            </Button>
            {/* Location information */}
            {location && (
              <p style={{ fontSize: "10px" }}>
                Latitude: {location.latitude}, Longitude: {location.longitude}
              </p>
            )}
          </Col>
          <Col xs={24} sm={12}>
            <div style={{ textAlign: "left", marginBottom: "8px" }}>
              Search for Destination
            </div>
            <Input.Search
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              onSearch={showRoute}
              enterButton="Search"
            />
          </Col>
        </Row>
      </Card>
      <br />
      {/* Distance and Price */}
      <Card style={{ textAlign: "left" }}>
        <Row gutter={[16, 16]}>
          {distance && (
            <Col span={24}>
              <Typography.Paragraph>
                <Typography.Text strong>
                  <FieldTimeOutlined /> Distance:
                </Typography.Text>{" "}
                <Typography.Text style={{ fontSize: "24px" }}>
                  {distance} km
                </Typography.Text>
              </Typography.Paragraph>
            </Col>
          )}
          {price && (
            <Col span={24}>
              <Typography.Paragraph>
                <Typography.Text strong>
                  <DollarOutlined /> Fixed Price:
                </Typography.Text>{" "}
                <Typography.Text style={{ fontSize: "24px" }}>
                  {price} /=
                </Typography.Text>
              </Typography.Paragraph>
            </Col>
          )}
          {destinationLatitude && destinationLongitude && (
            <Col span={24}>
              <Typography.Paragraph>
                <Typography.Text strong>
                  <EnvironmentOutlined /> Destination:
                </Typography.Text>{" "}
                Latitude: {destinationLatitude}, Longitude:{" "}
                {destinationLongitude}
              </Typography.Paragraph>
            </Col>
          )}
        </Row>

        {/* Centered Button */}
        <Row justify="center">
          <Button
            onClick={handleSearchClick}
            style={{
              fontSize: "20px",
              height: "50px",
              width: "500px",
              alignItems: "center",
            }}
            type="primary"
            ghost
            loading={loading}
          >
            Search For Car
          </Button>
        </Row>
      </Card>
      {/* Nearby Drivers */}
      <Card title="Nearby Drivers" style={{ textAlign: "left" }}>
        {nearbyDrivers.map((driver) => (
          <Card key={driver._id} style={{ marginBottom: "16px" }}>
            <Typography.Paragraph>
              <Typography.Text strong>Driver ID:</Typography.Text> {driver._id}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Driver:</Typography.Text>{" "}
              {driver.username}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Email:</Typography.Text> {driver.email}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Status:</Typography.Text>{" "}
              <span style={{ color: driver.available ? "green" : "red" }}>
                {driver.available ? "Available" : "Unavailable"}
              </span>
            </Typography.Paragraph>
            {/* <Typography.Paragraph>
              <Typography.Text strong>Latitude:</Typography.Text>{" "}
              {driver.latitude}
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>Longitude:</Typography.Text>{" "}
              {driver.longitude}
            </Typography.Paragraph> */}
            <Button
              type="primary"
              onClick={() => handleBookNow(driver._id)}
              ghost
              loading={loading}
            >
              Book Now
            </Button>
            <Button
              type="default"
              style={{ marginLeft: "8px" }}
              onClick={() => handleViewLocation()}
              icon={<EnvironmentOutlined />}
            >
              View Location
            </Button>
          </Card>
        ))}
      </Card>
      ;
    </div>
  );
};

export default LocationComponent;
