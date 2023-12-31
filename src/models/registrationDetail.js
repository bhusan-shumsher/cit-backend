const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registrationDetailSchema = new Schema({
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    program:{
        type: String,
        enum:['BEELX','BESE','BECE','BEIT','BECIVIL','BCA','BBA'],
        required: true
    },
    faculty:{
        type: String,
        required: true

    },
    level:{
        type: String,
        default: 'Bachelor',
        required: true

    },
    title: {
        type: String,
        enum: ['MR','MS','MRS'],
        required: true
    },

    fullName:{
        type:String,
        required: true,
        trim: true
    },
    fullNameDevanagari:{
        type: String,
        required: true,
        trim: true
    },
    dobNepali:{
        type: String,
        trim: true,
        required: true
    },
    dobEnglish:{
        type: String,
        trim: true,
        required: true
    },
    nationality:{
        type: String,
        required: true,
        trim: true
    },
    religion:{
        type: String,
        trim: true,
        required: true
    },
    ethinicity:{
        type: String,
        trim: true,
        required: true
    },
    fatherName: {
        type: String,
        trim: true,
        required: true
    },
    motherName: {
        type: String,
        trim: true,
        required: true
    },
    wardNum:{
        type: String,
        required: true
    },
    townVillage:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    zone:{
        type: String,
        required: true
    },
    schoolName: {
        type: String,
        trim: true
    },
    secondaryBoard: {
        type:String,
        trim: true,
        required: true
    },
    secondaryYear:{
        type: String,
        trim: true
    },
    secondaryTotalMarks:{
        type: String,
    },
    secondaryMarksObtained: {
        type: String,
        trim: true,
        required: true
    },
    secondaryDivision:{
        type: String,
        enum:['FIRST','SECOND','DISTINCTION','THIRD'],
        required: true
    },
    secondarySymbol:{
        type: String,
        trim: true,
        required: true
    },
    plusTwoName:{
        type: String,
        trim: true,
    },
    plusTwoBoard:{
        type: String,
        trim: true,
    },
    plusTwoYear:{
        type: String,
        trim: true,
        required: true
    },
    plusTwoTotalMarks:{
        type: String,
        required: true
    },
    plusTwoMarksObtained:{
        type: String,
        required: true
    },
    plusTwoDivision:{
        type: String,
        enum:['FIRST','SECOND','DISTINCTION','THIRD'],
        required: true
    },
    plusTwoSymbol:{
        type: String,
        trim: true,
        required: true
    },
    photoURL:{
        type: String,
        required: true
    },
    signature:{
        type: String,
        trim: true
    }
});


module.exports = mongoose.model('RegistrationDetail',registrationDetailSchema);