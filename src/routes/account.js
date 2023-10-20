
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const isAccount = require ('../middlewares/is-account');
const adminController = require('../controller/admin');


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