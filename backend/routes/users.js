const router = require('express').Router();
//let User = require('../models/user.model');

/*router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});
*/

//controller functions
const { registerUser, loginUser} = require('../controllers/userController')

//login route
router.get('/login', loginUser)

//register route
router.get('/register', registerUser)

/*router.route('/register', (req, res) => {
    const userFirstname = req.body.userFirstname;
    const userLastname = req.body.userLastname;
    const userRole = req.body.userRole;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    const newUser = new User({
        userFirstname,
        userLastname,
        userRole,
        userEmail,
        userPassword
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error:' + err));
});*/

module.exports = router;