const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const isAdmin = require ('../middlewares/is-admin');
const isAuth = require('../middlewares/is-auth');
// const User = require('../models/user');
const resultController = require('../controller/result');


router.post('/api/result/bulk-upload',[
    body('semester')
    .isNumeric()
    .withMessage('Semeter missing')
    .isIn([1,2,3,4,5,6,7,8])
    .withMessage('invalid semester value')
], resultController.addBulkResult);



// get backlogs 
router.get('/api/result/backlog',isAuth,resultController.getBacklog);
// get grade counts of student 
router.get('/api/result/grade-count',isAuth,resultController.getGradeCounts);
router.get('/api/result/:rollNumber',resultController.getResultById);


// get results of current user
router.get('/api/result',isAuth,resultController.getStudentResult);

// add result of individual students
router.post('/api/result/add-result',resultController.addResult);
// edit result of individual students
router.post('/api/result/edit-result',resultController.editResult);


module.exports = router;