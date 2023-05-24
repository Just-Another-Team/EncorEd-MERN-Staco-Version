const User = require('../models/user.model')


// login user
const loginUser = async (req, res) => {
    res.json({message: 'login user'})
}

// register user
const registerUser = async (req, res) => {
    res.json({message: 'register user'})
}

module.exports = { registerUser, loginUser };