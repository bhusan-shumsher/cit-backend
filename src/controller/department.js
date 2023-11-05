const Subject = require('../models/subject');
const util = require('../utils/uploadSub');
const User = require('../models/user');
const SchoolInfo = require('../models/school-info');

exports.uploadSubjects = async (req,res,next)=>{
    const file = req.file;
    const data = util.ex2json(file.path, file.filename, 'result');
     const result = await Subject.insertMany(data);
     if(result){
         return res.status(201).send({message: result.length + ' subs created'});
     }
     return res.status(500).send({message:'cant create subs!!'});
};

exports.getSubjects = async(req,res,next)=>{
    const {semester, faculty} = req.query;
    const subjects = await Subject.find({
        semester,
        faculty
    });
    if(subjects){
        return res.status(200).send({subjects});
    }else{
        return res.status(500).send({message:'not found'});
    }
};

// get subjects per faculty
exports.getSubjectCount = async(req,res,next)=>{
    try{
        const {faculty} = req.params;
        console.log(faculty);
        const count = await Subject.count({faculty});
        console.log(count)
        return res.status(200).send({total_sub:count});
    }catch(err){
        return res.status(500).send({message:'cant fetch sub count'});
    }
}


// ADD NEW STUDENT 
exports.addNewStudent = async(req,res,next)=>{
    try{
        if(req.file){
             req.body.imageURL = req.file.path;
        }

        const student = new User(req.body);
        await student.save();
        return res.status(200).send({message:'student created'});

    }catch(err){
        console.log(err.message)
        return res.status(500).send({message:'cant create new student now'})
    }
};


// ADD ACADEMIC INFO OF STUDENT
exports.addAcademicInfo = async(req,res,next)=>{
    try{
        const {rollNumber} = req.body;
        const student = await User.find({rollNumber});
        console.log('***',student)
        if(!student || student.length == 0){
            
            return  res.status(500).send({message:'Cant find the student, please check the roll number'})
        }
        const info = new SchoolInfo(req.body);
        await info.save();
        return res.status(200).send({message:'info saved'});
    }catch(err){
        return res.status(500).send({message:err.message});
    }
}