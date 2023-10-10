const Subject = require('../models/subject');

const PersonalInfo = require('../models/personal-info');
const User = require('../models/user');
const SchoolInfo = require('../models/school-info');
const Fee = require('../models/fee');
const util = require('../utils/excel-to-json');


exports.addPersonalInfo = async(req,res,next)=>{

    const values = Object.keys(req.body);
    const record = new Object;
    // const id = req.body.userId;
    // const record; 
    values.forEach(value =>{
        console.log(req.body[value]);
        record[value] = req.body[value];
    });
    record._user = req.userId;
    console.log(req.rollNumber)
    record._rollNumber = req.rollNumber

    const personalInfo = new PersonalInfo(record);
    await personalInfo.save();
    if(personalInfo){
        return res.status(201).send({message:'personal info updated'});
    }else{
        return res.status(501).send({message: 'cant add personal details'});
    }
    
};

exports.getPersonalInfo = async(req,res,next)=>{
    const id = req.userId;
    const rollNumber = req.rollNumber;
    const user = await User.findById({_id:id},{password:0});
    if(user){
        return res.status(200).send({data: user});
    }
    return res.status(500).send({message: 'cant fetch the data'});
};

exports.listAllStudents = async(req,res,next)=>{
    const users = await User.find(req.query);
    if(users){
        console.log(users);
        return res.status(200).send({users})
    }
    return res.status(501).send({'message': 'cant fetch'})
}




// SEARCH BY PERSONAL INFO
 exports.searchByInfo = async (req,res,next)=>{
     const users = await PersonalInfo.find(req.query);
     if(users){
         return res.status(200).send({users});
     }
     return res.status(400).send({message: 'cant fetch the results'});
 };


exports.studentInfoBulkUpload = async (req,res,next)=>{
    try{
        const file = req.file;
        const data = util.ex2json(file.path, file.filename,'school');
         const users = await SchoolInfo.insertMany(data);
         if(users){
             return res.status(201).send({message: users.length + ' users created'});
         }
         return res.status(500).send({message:'cant create users!!'});
    }catch(err){
        return res.status(500).send({message: err.message});

    }
   
}

// GET SCHOOL INFO OF PARTICULAR STUDENT
exports.getSchoolInfo = async (req,res,next)=>{
    const rollNumber = req.rollNumber;
    const users = await SchoolInfo.find({rollNumber});
    if(users){
        return res.status(200).send({users});
    }
    return res.status(400).send({message: 'cant fetch the results'});
};



// GET SUBJECTS OF CURRENT STUDENT
exports.getCurrentSubjects = async (req,res,next)=>{
    const {currentSemester,faculty} = req;
    const subjects = await Subject.find({
        faculty, semester: currentSemester
    });
    if(subjects){
        return res.status(200).send(subjects);
    }else{
        return res.status(500).send({message:'cant fetch'});
    }
};

// GET THE STATUS OF FEE PAYMENT
exports.getFeeStatus = async(req,res,next)=>{
    try{
        const {rollNumber} = req;
        const student = await Fee.find({rollNumber});
        if(!student){
            throw new Error('cant fetch fee status');
        }
        if(student && Array.isArray(student) && student.length > 0){
            const {verifiedBy, duePaid, updatedAt} = student[0];
            return res.status(200).send({duePaid, verifiedBy, updatedAt});
        }
        return res.status(200).send([]);
    }catch(err){
        return res.status(500).send(err.message);
    }
}
