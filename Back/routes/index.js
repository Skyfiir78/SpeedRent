const express = require('express');
const router = express.Router();

router.use('/api/auth', require('./api/auth'));
router.use('/api/cars', require('./api/cars'));

module.exports = router;
