const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  otp: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  },
  amount: {
    type: Number,
    default: 10000
  }
});

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;
