const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Passenger = require('../Models/Passenger.model');

exports.passengerSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if passenger with the given email already exists
    const existingPassenger = await Passenger.findOne({ email });
    if (existingPassenger) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new passenger document
    const newPassenger = new Passenger({
      username,
      email,
      password: hashedPassword
    });

    // Save the new passenger
    await newPassenger.save();

    // Generate JWT token
    const token = jwt.sign({ id: newPassenger._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with success and token
    res.status(201).json({ message: 'Passenger signed up successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
