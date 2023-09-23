const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    courseCode:{
        type: String,
         required: true,
        trim: true
    },
    faculty:{
        type: String,
        trim: true,
        required: true
    },
    semester:{
        type: Number,
        min: 1,
        required: true
    },
    subjectName:{
        type: String,
        required: true,
        trim: true
    },
    creditHour:{
        type: Number,
        min: true,
        required: true
    }
});


module.exports = mongoose.model('Subject',subjectSchema);