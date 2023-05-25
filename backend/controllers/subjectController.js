const Subject = require('../models/subject.model')
const jwt = require('jsonwebtoken')


// create new subject
const addSubject = async (req, res) => {

    const {subjectName, subjectEDP, subjectRoomLocation, 
            subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
            subjectAssignedUser} = req.body
    

    let emptyFields = []

    if(!subjectName) {
        emptyFields.push('name')
    }
    if(!subjectEDP) {
        emptyFields.push('edp')
    }
    if(!subjectRoomLocation) {
        emptyFields.push('roomLoc')
    }
    if(!subjectFloorLocation) {
        emptyFields.push('floorLoc')
    }
    if(!subjectStartTime) {
        emptyFields.push('startTime')
    }
    if(!subjectEndTime) {
        emptyFields.push('endTime')
    }
    if(!subjectAssignedWeek) {
        emptyFields.push('assgnWeek')
    }
    if(!subjectAssignedUser) {
        emptyFields.push('assgnUser')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
    
    try{
        const subjects = await Subject.create({subjectName, subjectEDP, subjectRoomLocation, 
                                                subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
                                                subjectAssignedUser})


        res.status(200).json({subjects})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// view all subjects
const viewAllSubs = async (req, res) => {
    const subjects = await Subject.find({}).sort({createdAt: -1})

    res.status(200).json(subjects)
}

module.exports = { addSubject, viewAllSubs }