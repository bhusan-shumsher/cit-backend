const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const isAdmin = require ('../middlewares/is-admin');
const isAuth = require('../middlewares/is-auth');
const authController = require('../controller/auth');

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    body('password')
        .trim()
        .isLength({min:4})
        .withMessage('Password must be atleast 4 characters long')
],authController.signup);


router.post('/api/users/login',authController.login);



router.post('/api/users/create-bulk-users', authController.bulkUpload);

router.post('/api/users/change-password',isAuth,authController.changePassword);

module.exports = router;