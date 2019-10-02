var express = require('express');
var router = express.Router();
var userController = require('../Controller/userController')

/* GET home page. */
// router.get('/user/all', userController.all)
router.post('/user/new', userController.new)

module.exports = router;
