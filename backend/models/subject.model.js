const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    // subjectImg: {
    //     data: Buffer,
    //     contentType: String
    // },
    subjectName: {
        type: String,
        required: true,
        minlength: 3
    },
    subjectEDP: {
        type: String,
        required: true,
        minlength: 3
    },
    subjectRoomLocation: {
        type: String,
        required: true,
        minlength: 3
    },
    subjectFloorLocation: {
        type: String,
        required: true,
        minlength: 1
    },
    subjectStartTime: {
        type: Date,
        required: true,
    },
    subjectEndTime: {
        type: Date,
        required: true,
    },
    // subjectIsActive: {
    //     type: Boolean
    // },
    subjectAssignedWeek: {
        type: [],
        required: true
    },
    subjectAssignedUser: {
        type: []
    },
    user_id: {
        type: String,
        required: true
    }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Subject', subjectSchema);