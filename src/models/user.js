const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    currentSemester:{
        type: Number,
        min: 1,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password :{
        type: String,
        required: true,
        trim: true
    },
    role:{
        type:String,
        require: true,
        enum: ['admin','student'],
        default: 'student'
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
    rollNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    batch:{
        type:String,
        required: true
    },
    faculty:{
        type: String,
        enum:['BEELX','BESE','BECE','BEIT','BECIVIL','BCA','BBA'],
        // required: true
    },
    semester:{
        type: Number,
        min: 1
    },
    firstName:{
        type:String,
        required: true,
        trim: true
    },
    
    middleName:{
        type:String,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    dobNepali:{
        type: String,
        trim: true
    },
    dobEnglish:{
        type: String,
        trim: true
    },
    nationality:{
        type: String
    },
    gender:{
        type: String,
        enum: ['Male','Female']
    },
    religion:{
        type: String
    },
    address:{
        type: String,
        trim: true
    },
    town:{
        type:String,
        trim: true
    },
    district:{
        type: String,
        trim: true
    },
    zone:{
        type: String,
        trim: true
    },
    wardNumber:{
        type: Number
    },
    studentContactNumber:{
        type: String,
        trim: true
    },
    fatherContactNumber: {
        type: String,
        trim: true
    },
    motherContactNumber:{
        type: String,
        trim: true
    },
    localGuardianContactNumber:{
        type: String,
        trim: true
    },
    imageURL:{
        type: String,
        trim: true
    }
});


module.exports = mongoose.model('User',userSchema);