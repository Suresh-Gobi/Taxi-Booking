const UnRegistered = require('../Models/UnRegistered.model');
const { BookingConfirm } = require("../Utils/BookingConfirm");

exports.createUnRegisteredRecord = async (req, res) => {
  try {
    const {
      passengerName,
      email, // Include email field from the request body
      address,
      phone,
      pickupLocation,
      dropLocation,
      pickupTime,
      driver,
      driverName,
      driverNumberPlate
    } = req.body;

    // Create a new instance of the UnRegistered model
    const unRegisteredRecord = new UnRegistered({
      passengerName,
      email, // Include email field in the UnRegistered record
      address,
      phone,
      pickupLocation,
      dropLocation,
      pickupTime,
      driver,
      driverName,
      driverNumberPlate
    });

    // Save the new UnRegistered record to the database
    await unRegisteredRecord.save();

    // Send email with booking details
    const emailData = {
      passengerName,
      email,
      pickupLocation,
      dropLocation,
      pickupTime,
      driverName,
      driverNumberPlate
    };

    // Send email using your email service
    await BookingConfirm(emailData);

    res.status(201).json(unRegisteredRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
