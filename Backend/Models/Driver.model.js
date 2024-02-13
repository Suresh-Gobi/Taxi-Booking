const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  carModel: {
    type: String,
  },
  licensePlate: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
