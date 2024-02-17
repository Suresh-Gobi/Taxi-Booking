const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Passenger = require('../Models/Passenger.model');
const { sendVerificationEmail } = require('../Utils/EmailVerification');

const SECRET_CODE = 'your_secret_key_here';

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

    // Send notification email containing username and password
    sendVerificationEmail(email, username, password);

    // Generate JWT token using the secret code
    const token = jwt.sign({ id: newPassenger._id }, SECRET_CODE, { expiresIn: '1h' });

    // Respond with success and token
    res.status(201).json({ message: 'Passenger signed up successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.passengerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if a passenger with the given email exists
    const passenger = await Passenger.findOne({ email });
    if (!passenger) {
      return res.status(404).json({ error: 'Passenger not found' });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, passenger.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate JWT token including passenger's ID, username, and email
    const tokenPayload = {
      id: passenger._id,
      username: passenger.username,
      email: passenger.email
    };
    const token = jwt.sign(tokenPayload, SECRET_CODE, { expiresIn: '1h' });

    // Respond with success and token
    res.status(200).json({ message: 'Passenger logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
