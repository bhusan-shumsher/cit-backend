const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personalInfoSchema = new Schema({
    _user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    _rollNumber:{
        type:String,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    batch:{
        type: String
    },
    citizenshipNumber:{
        type: String
    },
    nationalId:{
        type: String
    },
    mobileNum:{
        type: String
    }


})

// module.exports = personalInfoSchema;

module.exports = mongoose.model('PersonalInfo',personalInfoSchema);