const Payment = require("../Models/Payment.model");

// Controller function to create a payment record
exports.createPayment = async (req, res) => {
  try {
    // Extract data from request body
    const { price, distance, bookingId } = req.body;

    // Create a new instance of the Payment model
    const payment = new Payment({
      price,
      distance,
      bookingId,
    });

    // Save the new payment record to the database
    await payment.save();

    // Respond with the created payment record
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    // Handle errors
    console.error("Error creating payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    // Fetch all payment records from the database
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    // If an error occurs, return a 500 status code and the error message
    res.status(500).json({ error: error.message });
  }
};
