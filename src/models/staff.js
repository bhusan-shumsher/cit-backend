const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const staffSchema = new Schema({
    
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
        enum: ['admin','account'],
        default: 'admin'
    },
    isFirstTime: {
        type: Boolean,
        default: true
    },
   
    department:{
        type:String,
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
    gender:{
        type: String,
        enum: ['Male','Female']
    } 
});


module.exports = mongoose.model('Staff',staffSchema);