// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for Admin
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create and export the Admin model
module.exports = mongoose.model('Admin', adminSchema);
