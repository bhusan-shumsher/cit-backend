const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Staff = require('../models/staff');

const util = require('../utils/excel-to-json');
exports.signup = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({mesasge:"Invalid email or password"});
    }

    const {email,password,rollNumber} = req.body;
    
    const existingUser = await User.findOne({email});
    if(existingUser){
        console.log('email already in use');
        return res.status(400).send({message:'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password,12);

    const user = new User({email, password:hashedPassword,rollNumber});
    await user.save();
    res.status(201).send(user);
}

exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    const existingUser = await User.findOne({email});
    console.log(existingUser)
    if(!existingUser){
        return res.status(401).send({message: 'User not found'});
    }
    if(existingUser.isFirstTime){
        // if the password hasnt been hashed
        if(password === existingUser.password){
            const token = jwt.sign({
                email: existingUser.email,
                id: existingUser._id.toString(),
                role: existingUser.role,
                rollNumber: existingUser.rollNumber,
                currentSemester: existingUser.currentSemester,
                faculty: existingUser.faculty
            },'secret',
            {expiresIn: '1h'});
            return res.status(200).send({
                token:token,
                 isFirstTime: existingUser.isFirstTime,
                 role:existingUser.role});
        }else{
            return res.status(401).send({message:'Wrong password'}); 
        }
    }
    const valid = await bcrypt.compare(password,existingUser.password);
    if(!valid){
        return res.status(401).send({message:'Wrong password'});
    }
    const token = jwt.sign({
        email: existingUser.email,
        id: existingUser._id.toString(),
        role: existingUser.role,
        rollNumber: existingUser.rollNumber,
        currentSemester: existingUser.currentSemester,
        faculty: existingUser.faculty

    },'secret',
    {expiresIn: '1h'});
    return res.status(200).send({token:token, isFirstTime: existingUser.firstTime,firstName: existingUser.firstName});

}

exports.bulkUpload = async (req,res,next)=>{
    try{
        const file = req.file;
        const {currentSemester} = req.body;
        console.log(currentSemester);
        const data = util.ex2json(file.path, file.filename,'users',currentSemester);
         const users = await User.insertMany(data);
         if(users){
             return res.status(201).send({message: users.length + ' users created'});
         }
         return res.status(500).send({message:'cant create users!'});
    }catch(err){
        return res.status(500).send({message: err.message});
    }
    
}


exports.changePassword = async (req,res,next)=>{
    const {password, confirmPassword} = req.body;
    if(password === confirmPassword){
        const id = req.userId;
        console.log('id', id);
        const a = await User.findById(id);
        console.log(a);
        const hashedPassword = await bcrypt.hash(password,12);
        const updatedUser = await User.findByIdAndUpdate(id,{
            password: hashedPassword,
            isFirsTime: false
        }, {
            new : true,
            runValidators: true
        });
        
        if(updatedUser){
            return res.status(200).send({message: 'password changed!!'});
        }else{
            return res.status(500).send({message: 'cant change the password'});
        }
    }else{
        return res.status(500).send({message: 'please confirm the password'});
    }
};

// STAFF RELATED AUTH

exports.staffLogin = async (req,res,next)=>{
    const {email,password} = req.body;
    const existingUser = await Staff.findOne({email});
    if(!existingUser){
        return res.status(401).send({message: 'User not found'});
    }
    // if(existingUser.isFirstTime){
    //     // if the password hasnt been hashed
    //     if(password === existingUser.password){
    //         const token = jwt.sign({
    //             email: existingUser.email,
    //             role: existingUser.role
    //         },'secret',
    //         {expiresIn: '1h'});
    //         return res.status(200).send({
    //             token:token,
    //              isFirstTime: existingUser.isFirstTime,
    //              role:existingUser.role});
    //     }else{
    //         return res.status(401).send({message:'Wrong password'}); 
    //     }
    // }
    const valid = await bcrypt.compare(password,existingUser.password);
    if(!valid){
        return res.status(401).send({message:'Wrong password'});
    }
    const token = jwt.sign({
        email: existingUser.email,
        role: existingUser.role,
        firstName: existingUser.firstName,
        id: existingUser._id.toString()
    },'secret',
    {expiresIn: '1h'});
    return res.status(200).send({token:token, isFirstTime: existingUser.firstTime,firstName: existingUser.firstName});

};


exports.staffSignup = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send({mesasge:"Invalid email or password"});
    }

    const {email,password,firstName, lastName, middleName, gender,role} = req.body;
    
    const existingUser = await Staff.findOne({email});
    if(existingUser){
        return res.status(400).send({message:'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password,12);

    // ***** change the role later ***** /
    const staff = new Staff({email, password:hashedPassword, firstName, lastName, middleName, gender,role});
    await staff.save();
    res.status(201).send({message:'successfully created'});
}