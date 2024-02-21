// Import required modules
const mongoose = require('mongoose');

// Define Payment schema
const paymentSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking', // Assuming there's a Booking model to reference
    required: true
  }
});

// Create Payment model
const Payment = mongoose.model('Payment', paymentSchema);

// Export Payment model
module.exports = Payment;