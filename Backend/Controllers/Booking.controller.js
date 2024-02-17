const Booking = require('../Models/Booking.model');
const Driver = require('../Models/Driver.model');
const Passenger = require('../Models/Passenger.model');
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key_here';

exports.createBooking = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Extract passenger ID from the decoded token
    const passengerId = decodedToken.id;

    // Check if the required parameters are present in the request body
    const { distance, price, pickupLocation, dropLocation, driverId, passenger } = req.body;
    if (!distance || !price || !pickupLocation || !dropLocation || !driverId || !passenger) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Create a new booking document with passenger and driver details
    const newBooking = new Booking({
      distance,
      price,
      pickupLocation,
      dropLocation,
      passenger: {
        _id: passenger.id,
        email: passenger.email,
        username: passenger.username,
      },
      driver: driverId, // Assign the selected driver ID to the booking
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    // Respond with the created booking and passenger details
    res.status(201).json({ booking: savedBooking, passenger });
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
exports.acceptBooking = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Extract driver ID from the decoded token
    const driverId = decodedToken.id;

    // Check if the required parameters are present in the request body
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking is already accepted or completed
    if (booking.status !== 'pending') {
      return res.status(400).json({ error: 'Booking is not pending' });
    }

    // Update the booking status to "accepted"
    booking.status = 'accepted';
    await booking.save();

    // Update the driver's availability to false
    const driver = await Driver.findByIdAndUpdate(driverId, { available: false }, { new: true });

    // Respond with success message
    res.status(200).json({ message: 'Booking accepted successfully', booking });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.completeBooking = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Extract driver ID from the decoded token
    const driverId = decodedToken.id;

    // Check if the required parameters are present in the request body
    const { bookingId } = req.body;
    if (!bookingId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if the booking is already completed
    if (booking.status === 'completed') {
      return res.status(400).json({ error: 'Booking is already completed' });
    }

    // Update the booking status to "completed"
    booking.status = 'completed';
    await booking.save();

    // Respond with success message
    res.status(200).json({ message: 'Booking completed successfully', booking });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(500).json({ error: error.message });
  }
};
