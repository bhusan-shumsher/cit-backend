const Result = require('../models/result');
const util = require('../utils/excel-to-json');
const Subject = require('../models/subject');
const {getCourseCode} = require('../utils/getCouseCode');

exports.addBulkResult = async (req,res,next)=>{
    const {semester,year,semesterType,faculty} = req.body;
    const obj = {
        semester,
        year,
        semesterType,
        faculty
    };
    const file = req.file;
    const subjectInfoList = await Subject.find({semester, faculty});
    const data = util.ex2json(file.path, file.filename, 'result',null,obj,subjectInfoList);
    const results = await Result.insertMany(data);
    if(results){
        return res.status(201).send({message: results.length + ' users created'});
    }
    return res.status(500).send({message:'cant create users!!'});
};


exports.getResultById = async (req,res,next)=>{
    // const user = await Result.findOne({rollNumber: req.params.rollNumber,grades: {$elemMatch:{grade:'A'}}});
    const user = await Result.find().where('grades').elemMatch({subject:'Oracle'})
    res.send(user);
}


exports.getStudentResult = async (req,res,next)=>{
    const {rollNumber} = req;
    const result = await Result.aggregate([
        {$match:{rollNumber}},
        {$group:{_id:'$semester',grades:{
            $push:{sgpa:'$sgpa',result:'$grades'}
        }
    }},
    {$sort:{_id: 1}}
    ]);

    if(result){
        res.status(200).send(result);
    }else{
        res.status(501);
    }
};

exports.getBacklog = async (req,res,next)=>{
    const {rollNumber} = req;
    const backlog = await Result.aggregate([
        {$match: {rollNumber}},
        {$unwind: '$grades'},
        {$match: {'grades.grade' : 'F'}}
    ]);

    if(!backlog){
       return  res.status(500).send({message:'cant get backlog'});
    }
    return res.status(200).send(backlog);
};


// GET GRADE COUNTS 
exports.getGradeCounts = async (req,res,next)=>{
    try{
        const {rollNumber} = req;
        const grades = await Result.aggregate([
            {$match: {rollNumber}},
            {$unwind: '$grades'},
            {$group:{_id:'$grades.grade',count:{$sum:1}}}
        ]);
        if(!grades){
            throw new Error('cant fetch grades');
        }
        return res.status(200).send(grades);
    }catch(err){
        return res.status(500).send({message:err.message});
    }
}

