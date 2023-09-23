const express = require('express');
const router = express.Router();

const isAdmin = require ('../middlewares/is-admin');
const isAuth = require('../middlewares/is-auth');
// const User = require('../models/user');
const departmentController = require('../controller/department');



router.post('/api/department/upload-subject-bulk',departmentController.uploadSubjects);

router.get('/api/subjects',departmentController.getSubjects);
module.exports = router;