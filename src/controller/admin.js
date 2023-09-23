const Subject = require('../models/subject');
const User = require('../models/user');
const Staff = require('../models/staff');
const SchoolInfo = require('../models/school-info');
const Result = require('../models/result');

exports.getCounts = async (req,res,next)=>{
    try{
        const totalStudents = await User.where({}).countDocuments();
        const femaleStudents = await User.where({gender:'Female'}).countDocuments();
        const totalTeachers = await Staff.where({}).countDocuments();
        const totalSubjects = await Subject.where({}).countDocuments();
        // Department wise count
        const countPerDepartment = await User.aggregate([
            {$group:{_id: '$faculty', count:{$sum: 1}}}
        ]);
        return res.status(200).send({
            total: totalStudents, 
            female: femaleStudents, 
            teachers: totalTeachers,
            subjects: totalSubjects,
            countPerDepartment
        });

    }catch(err){
        return res.status(500);
    }
};


exports.searchStudent = async (req,res,next)=>{
    console.log('search .....')
    try{
        const {rollNumber,name,collegeName,semester,faculty} = req.query;
        var students;
        if(rollNumber){
            students = await User.find({rollNumber});
            return res.status(200).send(students)
        }
         
     if(collegeName){
        console.log('cole',collegeName);
        students = await SchoolInfo.aggregate([
            {$match:{$expr:{$regexMatch:{ input:'$collegeName', regex:collegeName,options:'i'}}}},
            {$lookup:{from:'users',localField:'rollNumber', foreignField:'rollNumber', as:'info'}},
            {$project:{'info.password':0}}
        ]);
        return res.status(200).send(students)

     }
     if(name && semester && faculty){
        console.log('name - faculty -semster')
        students = await User.aggregate([
            { $match: 
                { $and: [{ $or: [{ firstName: { $regex: name, $options: 'i' } }, { lastName: { $regex: name, $options: 'i' } }] }, 
                { faculty: faculty },{currentSemester: semester}] } }, 
                { $project: { password: 0 } }
        ]);
        return res.status(200).send(students)

     }
     else if(name && semester){
        console.log('name  -semster')
        students = await User.aggregate([
            { $match: 
                { $and: [{ $or: [{ firstName: { $regex: name, $options: 'i' } }, { lastName: { $regex: name, $options: 'i' } }] }, 
               {currentSemester: semester}] } }, 
                { $project: { password: 0 } }
        ]);
        return res.status(200).send(students)

     }
     else if(name && faculty){
        console.log('name - faculty')

        students = await User.aggregate([
            { $match: 
                { $and: [{ $or: [{ firstName: { $regex: name, $options: 'i' } }, { lastName: { $regex: name, $options: 'i' } }] }, 
               {faculty}] } }, 
                { $project: { password: 0 } }
        ]);
        return res.status(200).send(students)

     }else if(faculty && semester){
        console.log(' faculty -semster')

        students = await User.find({$and:[{currentSemester: semester},{faculty:faculty}]});
        return res.status(200).send(students)

     }else if(faculty){
        console.log('faculty only');
        students = await User.find({faculty});
        return res.status(200).send(students)
     }else if(semester){
        console.log('seme only');
        students = await User.find({currentSemester:semester});
        return res.status(200).send(students)
     }
     else{
        students = await User.find({
            $or:[{firstName: {$regex: `${name}`,$options:'i'}
        },{lastName: {$regex: `${name}`,$options:'i'}
    }]});
    return res.status(200).send(students)

     }
        // if(!students){
        //     throw new Error('cant search!!')
        // }
        // return res.status(200).send(students);
    }catch(err){
        return res.status(500).send({message:'cant search'})
    }
}

// GET INFO OF PARTICULAR STUDENT BY ID 

exports.getStudentDetailsByID = async (req,res,next)=>{
    try{
            const student = await User.aggregate([
                {$match: req.params},
                {$lookup:{from:'schoolinfos',localField:'rollNumber',foreignField:'rollNumber',as:'schoolInfo'}},
                {$unwind:'$schoolInfo'},
                {$project:{password: 0, isFirstTime: 0}}
            ]);
            if(!student){
                throw new Error('cant get the student');
            }
            return res.status(200).send(student);
    }catch(err){
        return res.status(500).send({message: err.message})
    }
};

//GET RESULTS OF INDIVIDUAL STUDENT BY ROLNUMBER
exports.getResultByID= async (req,res,next)=>{
    try{
        const {rollNumber} = req.params;
        const result = await Result.aggregate([
            {$match:{rollNumber}},
            {$group:{_id:'$semester',grades:{
                $push:{sgpa:'$sgpa',result:'$grades'}
            }
        }},
        {$sort:{_id:1}}
        ]);
    
        if(result){
            res.status(200).send(result);
        }else{
            res.status(501);
        }
    }catch(err){
        res.status(500).send({message:'cant fetch result'})
    }
}
