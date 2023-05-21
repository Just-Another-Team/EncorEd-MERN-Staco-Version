const router = require('express').Router();
const fs = require('fs');
const path = require('path');
let Subject = require('../models/subject.model');

router.route('/').get((req, res) => {
    Subject.find({})
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post((req, res) => {
    // To be fixed:

    // console.log(req.body.subjectImg);

    // const subjectImg = {
    //         data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.subjectImg)),
    //         contentType: 'image/png'
    //     };

    const subjectName = req.body.subjectName;
    const subjectEDP = req.body.subjectEDP;
    const subjectRoomLocation = req.body.subjectRoomLocation;
    const subjectFloorLocation = req.body.subjectFloorLocation;
    const subjectStartTime = Date.parse(req.body.subjectStartTime);
    const subjectEndTime = Date.parse(req.body.subjectEndTime);
    // const subjectIsActive = req.body.subjectIsActive;
    const subjectAssignedWeek = req.body.subjectAssignedWeek;
    const subjectAssignedUser = req.body.subjectAssignedUser;

    const newSubject = new Subject({
        // subjectImg,
        subjectName,
        subjectEDP,
        subjectRoomLocation,
        subjectFloorLocation,
        subjectStartTime,
        subjectEndTime,
        // subjectIsActive,
        subjectAssignedWeek,
        subjectAssignedUser
    });

    console.log(newSubject);

    newSubject.save()
        .then(() => res.json('Subject added!'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router; 