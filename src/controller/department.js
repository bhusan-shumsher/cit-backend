const Subject = require('../models/subject');
const util = require('../utils/uploadSub');


exports.uploadSubjects = async (req,res,next)=>{
    const file = req.file;
    const data = util.ex2json(file.path, file.filename, 'result');
    console.log('**',data);
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
}