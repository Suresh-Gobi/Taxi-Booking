const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fareSchema = new Schema({
  distance: Number,
  price: Number
});

const Fare = mongoose.model('Fare', fareSchema);

module.exports = Fare;