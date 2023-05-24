const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const validator = require('validator');

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

//static register method
userSchema.statics.register = async function(userFirstname, userLastname, userRole, userEmail, userPassword) {

  // validation
  if (!userFirstname || !userLastname || !userRole || !userEmail || !userPassword) {
    throw Error('All fields must be filled')
  }
  if(!validator.isEmail(userEmail)) {
    throw Error('Email is not valid')
  }
  if(!validator.isStrongPassword(userPassword)) {
    throw Error('Password not strong enough')
  }

  // check if email exist
  const exists = await this.findOne({ userEmail })

  if (exists) {
    throw Error('Email already in use')
  }

  // hash password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(userPassword, salt)

  // create user
  const user = await this.create({ userFirstname, userLastname, userRole, userEmail, userPassword: hash})

  return user
}

//static login method
userSchema.statics.login = async function(userEmail, userPassword) {

  if (!userEmail || !userPassword) {
    throw Error('All fields must be filled')
  }

  // check if email exist
  const user = await this.findOne({ userEmail })

  if (!user) {
    throw Error('Invalid email')
  }

  const match = await bcrypt.compare(userPassword, user.userPassword)

  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('User', userSchema);