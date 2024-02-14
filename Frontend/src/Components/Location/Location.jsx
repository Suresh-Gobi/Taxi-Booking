import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

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
  const [passengerId, setPassengerId] = useState(null);

  // Modify the book now, with post the API with get passenger details by decoding the token which was saved in the local storage.

  useEffect(() => {
    // Other code remains the same
  }, [map, currentLocationClicked]);

  // Function to decode JWT token
  const decodeToken = (token) => {
    return JSON.parse(atob(token.split(".")[1]));
  };

  const handleBookNow = async (driverId) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      // Create config object with Authorization header
      const passengerId = decodeToken(token).id;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Send booking details to the backend API with the config
      const response = await axios.post(
        "http://localhost:5000/api/booking/book",
        {
          distance,
          price,
          pickupLocation: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          dropLocation: {
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          },
          passengerId,
          driverId,
        },
        config
      );
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
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
      setNearbyDrivers(response.data);
    } catch (error) {
      console.error("Error fetching nearby drivers:", error);
    }
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

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <button onClick={handleCurrentLocationClick}>
          Fetch Current Location
        </button>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
        />
        <button onClick={showRoute}>Show Route</button>
      </div>
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}

      {/* Display the distance in kilometers */}
      {distance && <p>Distance: {distance} km</p>}
      {price && <p>Fixed Price: {price} /=</p>}
      {destinationLatitude && destinationLongitude && (
        <p>
          Destination Latitude: {destinationLatitude}, Destination Longitude:{" "}
          {destinationLongitude}
        </p>
      )}
      {/* Display nearby drivers */}
      <div>
        <h3>Nearby Drivers</h3>
        {nearbyDrivers.map((driver) => (
          <div key={driver._id}>
            <p>Driver ID: {driver._id}</p>
            <p>Driver: {driver.username}</p>
            <p>Email: {driver.email}</p>
            <p>Status: {driver.available}</p>
            <p>Latitude: {driver.latitude}</p>
            <p>Longitude: {driver.longitude}</p>
            <button onClick={() => handleBookNow(driver._id)}>Book Now</button>
          </div>
        ))}
      </div>

      {/* Car card */}
      <div
        style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}
      >
        <h3>Car</h3>
        <button onClick={fetchNearbyDrivers}>Search For Car</button>
      </div>
    </div>
  );
};

export default LocationComponent;
