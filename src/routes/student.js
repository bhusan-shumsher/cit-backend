const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/is-auth');
const isAdmin = require('../middlewares/is-admin');
const studentController = require('../controller/student');
const examController = require('../controller/exam');

router.get('/api/users/get-personal-info',isAuth,studentController.getPersonalInfo);

router.get('/api/users/all', studentController.listAllStudents);

router.get('/api/users/get-school-info',isAuth,studentController.getSchoolInfo);
router.get('/api/users/get-current-subjects',isAuth,studentController.getCurrentSubjects);
// THIS SHOULD BE ONLY FOR ADMIN
// router.get('/api/users/search',studentController.searchByInfo);
router.post('/api/users/bulk-school-info',studentController.studentInfoBulkUpload);
router.get('/api/users/school-info/',studentController.getSchoolInfo);

router.post('/api/users/generate-form',isAuth,examController.generateForm);
router.get('/api/users/download-form',isAuth,examController.downloadForm);
router.get('/api/users/get-fee-status',isAuth,studentController.getFeeStatus);

module.exports = router;