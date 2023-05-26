const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

//token creation
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// login user
const loginUser = async (req, res) => {

    // const {userEmailBody, userPasswordBody} = req.body
    try{
        const user = await User.login(req.body.userEmail, req.body.userPassword)

        //create token
        const token = createToken(user._id)

        //You lack these
        const userEmail = user.userEmail;
        const userRole = user.userRole;


        res.status(200).json({userEmail, userRole, token})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// register user
const registerUser = async (req, res) => {
    const {userFirstname, userLastname, userRole, userEmail, userPassword} = req.body
    
    try{
        const user = await User.register(userFirstname, userLastname, userRole, userEmail, userPassword)

        //create token
        const token = createToken(user._id)

        console.log("Register Successful");
        res.status(200).json({userEmail, userRole})
    } catch (error) {
        console.log("Register Error");
        res.status(400).json({error: error.message})
    }
}

module.exports = { registerUser, loginUser };