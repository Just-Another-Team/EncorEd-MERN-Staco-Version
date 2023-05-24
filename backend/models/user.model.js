const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userFirstname: {
    type: String,
    required: true,
    minlength: 3
  },
  userLastname: {
    type: String,
    required: true,
    minlength: 3
  },
  userRole: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;