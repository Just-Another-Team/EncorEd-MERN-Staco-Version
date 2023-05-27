const Subject = require('../models/subject.model')
const jwt = require('jsonwebtoken')


function getUserRole() {
    const token = req.headers['authorization']

    const decodedToken = jwt.decode(token, process.env.SECRET)

    return decodedToken.userRole
}

const deleteSubject = async (req, res) => {
    Subject.deleteOne({ _id: `${req.params.id}` })
        .then(() => {
		    res.status(200).json(`Deleted: ${req.params.id}`);
		    console.log(`Successfully deleted ${req.params.id}`); // Success
	    })
        .catch(function(error){
		    res.status(400).json("Failure in deletion.");
		    console.log(error); // Failure
	    });
}

// create new subject
const addSubject = async (req, res) => {

    const {subjectName, subjectEDP, subjectRoomLocation, 
            subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
            subjectAssignedUser, token} = req.body
    
    console.log(jwt.decode(req.body.token, process.env.SECRET));

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
        const user_id = jwt.decode(token, process.env.SECRET)

        const subjects = await Subject.create({
            subjectName,
            subjectEDP,
            subjectRoomLocation, 
            subjectFloorLocation,
            subjectStartTime,
            subjectEndTime,
            subjectAssignedWeek, 
            subjectAssignedUser,
            user_id
        })

        res.status(200).json({subjects})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// view all subjects
const viewAllSubs = async (req, res) => {
    const subjects = await Subject.find({}).sort({createdAt: 1})
    try {
        res.status(200).json(subjects)
    } catch (err) {
        res.status(400).json(err.data)
    }
}

const viewSub = async (req, res) => {
    const subjects = await Subject.find({_id: `${req.params.id}`}).sort({createdAt: 1})
    try {
        res.status(200).json(subjects)
    } catch (err) {
        res.status(400).json(err.data)
    }
}

//update subject
const updateSubject = async (req, res) => {

    const subjectId = req.params.id;

    const {subjectName, subjectEDP, subjectRoomLocation, 
        subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
        subjectAssignedUser, token} = req.body

    //const user_id = jwt.decode(token, process.env.SECRET)

    // Set Image

    const updatedSubject = {
        $set:
        {
            //subjectImage
            subjectName: subjectName,
            subjectEDP: subjectEDP,
            subjectRoomLocation: subjectRoomLocation,
            subjectFloorLocation: subjectFloorLocation,
            subjectStartTime: subjectStartTime,
            subjectEndTime: subjectEndTime,
            subjectAssignedWeek: subjectAssignedWeek,
            subjectAssignedUser: subjectAssignedUser,
            user_id: jwt.decode(token, process.env.SECRET)
        }
    }

    Subject.updateOne({ _id: `${subjectId}`, }, updatedSubject)
        .then(() => {
		    res.status(200).json(`Updated: ${req.params.id}`);
		    console.log(`Successfully updated! ${req.params.id}`); // Success
	    })
        .catch(function(error){
		    res.status(400).json("Failure in Updating.");
		    console.log(error); // Failure
	    });

    // const {subjectId, subjectName, subjectEDP, subjectRoomLocation, 
    //     subjectFloorLocation, subjectStartTime, subjectEndTime, subjectAssignedWeek, 
    //     subjectAssignedUser, token} = req.body

    // console.log(jwt.decode(req.body.token, process.env.SECRET));

    // let emptyFields = []

    // if(!subjectName) {
    //     emptyFields.push('name')
    // }
    // if(!subjectEDP) {
    //     emptyFields.push('edp')
    // }
    // if(!subjectRoomLocation) {
    //     emptyFields.push('roomLoc')
    // }
    // if(!subjectFloorLocation) {
    //     emptyFields.push('floorLoc')
    // }
    // if(!subjectStartTime) {
    //     emptyFields.push('startTime')
    // }
    // if(!subjectEndTime) {
    //     emptyFields.push('endTime')
    // }
    // if(!subjectAssignedWeek) {
    //     emptyFields.push('assgnWeek')
    // }
    // if(!subjectAssignedUser) {
    //     emptyFields.push('assgnUser')
    // }
    // if(emptyFields.length > 0) {
    //     return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    // }
}

module.exports = { addSubject, viewAllSubs, deleteSubject, updateSubject, viewSub }