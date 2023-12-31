
const express = require('express');
const router = express.Router();
const registrationController = require('../controller/registration');
const isNewStudent = require('../middlewares/is-new-student');
// CREATING NEW STUDENT FOR REGISTRATION
router.post('/api/registration/signup',registrationController.signup);

// NEW STUDENT LOGIN 
router.post('/api/registration/login',registrationController.login);

// SAVE DETAILS FOR REGISTRATION
router.post('/api/registration/savedata',isNewStudent,registrationController.saveDetails);
// GENERATE FORM 
router.post('/api/registration/form',isNewStudent,registrationController.generateRegistrationForm);
//upload signature
router.post('/api/registration/upload-signature',isNewStudent,registrationController.uploadSignature);
// for other uploads
router.post('/api/registration/extra-upload',isNewStudent,registrationController.uploadExtra);
// download form 
router.get('/api/registration/download',isNewStudent,registrationController.downloadForm);
module.exports = router;