const mongoose = require("mongoose");

const unRegisteredSchema = new mongoose.Schema({
  passengerName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  pickupTime: {
    type: Date,
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  driverNumberPlate: {
    type: String,
    required: true,
  },
});

const UnRegistered = mongoose.model("UnRegistered", unRegisteredSchema);

module.exports = UnRegistered;
