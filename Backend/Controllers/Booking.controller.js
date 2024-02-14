const Booking = require('../Models/Booking.model');

exports.createBooking = async (req, res) => {
  try {
    const { distance, price, pickupLocation, dropLocation } = req.body;

    // Create a new booking document
    const newBooking = new Booking({
      distance,
      price,
      pickupLocation,
      dropLocation,
    });

    // Save the booking to the database
    const savedBooking = await newBooking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
