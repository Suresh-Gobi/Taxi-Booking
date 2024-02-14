const Booking = require('../Models/Booking.model');

exports.createBooking = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Verify the token
    const decodedToken = jwt.verify(token, 'your_secret_key_here');

    // Extract passenger details from the decoded token
    const { passengerId } = decodedToken;

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

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};