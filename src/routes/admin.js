const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const isAdmin = require ('../middlewares/is-admin');
const isAuth = require('../middlewares/is-auth');
const isStaff = require('../middlewares/is-staff');
const authController = require('../controller/auth');
const adminController = require('../controller/admin');


router.post('/api/staff/signup',[
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage('Password must be atleast 4 characters long')
],authController.staffSignup);

router.post('/api/staff/login',authController.staffLogin);
router.get('/api/admin/get-counts',adminController.getCounts);

router.get('/api/admin/student',isStaff,adminController.searchStudent);
// GET STUDENT BY ID
router.get('/api/admin/student/:rollNumber',adminController.getStudentDetailsByID);
// GET INDIVIDUAL STUDENT'S RESULT BY ID
router.get('/api/admin/result/:rollNumber',adminController.getResultByID);
//GET RESULT OF INDV STUDENT BY SEMESTER
router.get('/api/admin/result-by-sem', adminController.getResultBySemester);
// GET BASIC INFO SUCH AS NAME/ROLE FOR ADMIN AND OTHER STAFF
router.get('/api/admin/basic-info', isAuth, adminController.getBasicInfo);

// FOR ACCOUNT PURPOSE
router.get('/api/account/get-all-students',adminController.getAllStudents);
// **** MIGRATE DATA TO FEE COLLECTION : **** not for frontend ***
router.post('/api/admin/migrate',isAdmin,adminController.migrateUser);



module.exports = router;