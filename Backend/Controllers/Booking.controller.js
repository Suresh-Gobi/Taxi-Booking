const Booking = require('../Models/Booking.model');
const Passenger = require('../Models/Passenger.model');
const jwt = require('jsonwebtoken');

exports.createBooking = async (req, res) => {
  try {
    // Define the secret key
    const secretKey = 'your_secret_key_here';

    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Extract passenger ID from the decoded token
    const passengerId = decodedToken.passengerId;

    // Check if the required parameters are present in the request body
    const { distance, price, pickupLocation, dropLocation, driverId } = req.body;
    if (!distance || !price || !pickupLocation || !dropLocation || !driverId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create a new booking document with passenger and driver details
    const newBooking = new Booking({
      distance,
      price,
      pickupLocation,
      dropLocation,
      passenger: passengerId, // Assign the passenger ID to the booking
      driver: driverId, // Assign the selected driver ID to the booking
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Respond with the created booking
    res.status(201).json({ booking: savedBooking, passenger: decodedToken });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: error.message });
  }
};

// show bookings related to logged in drivers (extract driver details from token)
exports.showBooking = async (req, res) => {
  try {
    // Specify JWT secret key here
    const secretKey = 'your_secret_key_here';

    // Extract token from authorization header
    const token = req.headers.authorization.split(' ')[1];
    // Decode token to extract driver ID
    const decodedToken = jwt.verify(token, secretKey);
    const driverId = decodedToken.id;
    // Find bookings related to the logged-in driver
    const bookings = await Booking.find({ driver: driverId });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/*write me backend function for that driver can accepted the 
booking, and in the bookings the status should be updated to accepted. and in driver their available should be updated as false. extract the token to get driver details.*/

/* And accpeting the  */