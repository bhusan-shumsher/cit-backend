
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const isAccount = require ('../middlewares/is-account');
const adminController = require('../controller/admin');


// router.post('/api/staff/signup',[
//     body('email')
//         .isEmail()
//         .withMessage('Must be a valid email address'),
//     body('password')
//         .trim()
//         .isLength({min:4})
//         .withMessage('Password must be atleast 4 characters long')
// ],authController.staffSignup);


// FOR ACCOUNT PURPOSE
router.get('/api/account/students',isAccount,adminController.getAllStudents);

// update due status
router.post('/api/account/change-due',[
    body('rollNumber')
        .exists()
        .withMessage('Missing roll number'),
    body('status')
        .exists()
        .isBoolean()
        .withMessage('Status not defined')  
],isAccount, adminController.changeDueStatus);
module.exports = router;