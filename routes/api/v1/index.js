const express = require('express');

const router = express.Router();
// route for question 
router.use('/questions', require('./questions'));
// routes for option
router.use('/options',require('./options'));


module.exports=router;