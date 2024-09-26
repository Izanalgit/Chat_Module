const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pswd: {
    type: String,
    required: true,
  },
  blockedUsers:[{
    type : mongoose.ObjectId,
    ref: 'User'
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;