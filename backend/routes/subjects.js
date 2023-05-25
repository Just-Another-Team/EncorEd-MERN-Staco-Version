/*const router = require('express').Router();
const multer = require('multer')
const fs = require('fs');
const path = require("path");
let Subject = require('../models/subject.model');

const requireAuth = require('../middleware/requireAuth')

// require authorization before access
router.use(requireAuth)

const storageTest = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const fileFilterTest = (req, file, cb) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png']

    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage: storageTest });

router.route('/').get((req, res) => {
    Subject.find({})
        .then(subjects => res.json(subjects))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/add').post(upload.single('subjectImg'), (req, res) => {

    console.log("FileName from Backend: " + req.file.filename)

    const subjectImg = {
        data: fs.readFileSync("images/" + req.file.filename),
        contentType: "image/jpg"
    }
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
        subjectImg,
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

    newSubject.save()
        .then(() => res.json('Subject added!'))
        .catch(err => res.status(400).json('Error:' + err));
});
*/

//Modified

const router = require('express').Router();

//controller functions
const { addSubject, viewAllSubs } = require('../controllers/subjectController')
const Subject = require('../models/subject.model')

//create new subjects
router.post('/addsubs', addSubject)

//get all subjects
router.get('/viewsubs', viewAllSubs)

module.exports = router; 