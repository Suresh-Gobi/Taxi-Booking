const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin.model');
const Driver = require('../Models/Driver.model');
const Passenger = require('../Models/Passenger.model');
const Payment = require('../Models/Payment.model');
const Booking = require('../Models/Booking.model');

// Controller for admin signup
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin with given username or email already exists
    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin instance
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for admin login
const jwtSecret = 'your_secret_key_here'; // Define your secret key here

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token using the secret key directly
    const token = jwt.sign({ id: admin._id }, jwtSecret, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriverDetails = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    // Fetch all booking records from the database
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching booking details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getPassengerCount = async (req, res) => {
  try {
    const count = await Passenger.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDriverCount = async (req, res) => {
  try {
    const count = await Driver.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalBookingCount = async (req, res) => {
  try {
    const totalCount = await Booking.countDocuments();
    res.status(200).json({ totalCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPaymentCount = async (req, res) => {
  try {
    const count = await Payment.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDriverDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDriver = await Driver.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDriverDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDriver = await Driver.findByIdAndDelete(id);
    if (!deletedDriver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
