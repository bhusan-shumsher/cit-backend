const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feeSchema = new Schema({
    duePaid: {
    type: Boolean,
    required: true,
    default: 'false'
   },
   rollNumber:{
    type: String,
    trim: true,
    required: true,
    unique: true
   },
   batch:{
    type: String,
    trim: true,
    required: true
   },
   verifiedBy:{
    type: String,
    required: true,
    trim: false,
    default:'admin'
   },
   currentSemester:{
    type: Number,
    min: 1,
    required: true
   },
   faculty:{
    type: String,
    required: true,
    trim: true
   },
   email:{
    type: String,
    trim: true,
    required: true
   },
   firstName:{
    type: String,
    required: true,
    trim: true
   },
   lastName:{
    type: String,
    required: true,
    trim: true
   },
   middleName:{
    type: String,
    trim: true
   }
},
{timestamps: true}
);


module.exports = mongoose.model('Fee',feeSchema);