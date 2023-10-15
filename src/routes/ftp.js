
const express = require('express');
const router = express.Router();
const serveIndex = require('serve-index');
const isAdmin = require('../middlewares/is-admin')
router.use('/api/show-forms',isAdmin,
        express.static('src/submitted-form'),
        serveIndex('src/submitted-form',{icons: true})
)


module.exports = router;

