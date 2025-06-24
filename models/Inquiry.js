const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postal: String
});

const inquirySchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  eventStyle: String,
  eventType: String,
  eventDate: String,
  startTime: String,
  endTime: String,
  guestCount: Number,
  dropOffTime: String,
  pickUpTime: String,
  address: addressSchema,
  additionalInfo: String,
  referralSource: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
