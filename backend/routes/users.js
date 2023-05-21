const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    const userFirstname = req.body.userFirstname;
    const userLastname = req.body.userLastname;
    const userRole = req.body.userRole;

    const newUser = new User({
        userFirstname,
        userLastname,
        userRole
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router; 