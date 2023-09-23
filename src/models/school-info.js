const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schoolInfoSchema = new Schema({
    rollNumber:{
        type: String,
        trim: true,
        unique: true,
        require: true
    },
    secondaryLevelBoard:{
        type: String,
        trim: true
    },
    schoolYear:{
        type: String,
        trim: true
    },
    schoolSymbolNumber:{
        type: String,
        trim: true
    },
    schoolTotalMarks:{
        type: Number
    },
    schoolObtainedMarks:{
        type: Number
    },
    schoolDivision:{
        type: String,
        trim: true
    },
    highSchoolBoard: {
        type: String,
        trim: true
    },
    highSchoolYear:{
        type: String,
        trim: true
    },
    highSchoolSymbolNumber:{
        type: String,
        trim: true
    },
    highSchoolTotalMarks:{
        type: Number
    },
    highSchoolObtainedMarks:{
        type: Number
    },
    highSchoolDivision:{
        type: String,
        trim: true
    },
    migration:{
        type: Boolean
    },
    schoolAddress:{
        type: String,
        trim: true
    },
    schoolName:{
        type: String,
        trim: true
    },
    collegeName:{
        type: String,
        trim: true
    },
    collegeAddress:{
        type: String,
        trim: true
    }
});


module.exports = mongoose.model('SchoolInfo',schoolInfoSchema);