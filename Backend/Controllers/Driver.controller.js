const Driver = require("../Models/Driver.model");
const { sendVerificationEmail } = require("../Utils/EmailVerification");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup driver with username, email, and password
exports.signupDriver = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if driver with the provided email already exists
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res
        .status(400)
        .json({ error: "Driver already exists with this email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new driver instance with the hashed password
    const newDriver = new Driver({ username, email, password: hashedPassword });

    // Save the new driver to the database
    await newDriver.save();

    // Send notification email containing username and password
    sendVerificationEmail(email, username, password);

    res.status(201).json(newDriver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login driver with email and password
exports.loginDriver = async (req, res) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email });
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, driver.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Define your secret key directly here
    const secretKey = "your_secret_key_here";
    // Generate JWT token
    const token = jwt.sign({ id: driver._id, email: driver.email }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllAvailableDrivers = async (req, res) => {
  try {
    // Find all drivers where the available field is true
    const availableDrivers = await Driver.find({ available: true });

    res.status(200).json(availableDrivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update driver location
exports.updateDriverLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
    const driverId = jwt.verify(token, "your_secret_key_here").id; // Verify token and extract driver ID

    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { latitude, longitude },
      { new: true }
    );
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update driver carModel and licensePlate
exports.updateDriverCarInfo = async (req, res) => {
  try {
    const { carModel, licensePlate } = req.body;
    const driverId = req.params.id; // Assuming driverId is passed as a parameter in the URL
    const driver = await Driver.findByIdAndUpdate(
      driverId,
      { carModel, licensePlate },
      { new: true }
    );
    if (!driver) {
      return res.status(404).json({ error: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
