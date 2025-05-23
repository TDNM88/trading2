const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  tradingViewId: { type: String, required: true },    // or false if optional
  tradingStyle: { type: String, required: true },     // or false if optional
  capital: { type: String, required: true },           // Number since it’s capital amount
  experience: { type: String,required: true },        // could be string like "2 years", or number if you want
});

module.exports = mongoose.model('User', UserSchema);
