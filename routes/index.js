// main index file of routes 
const express =  require('express')
const router = express.Router();



// api version 1.0 accing api filder index.js
router.use('/api', require('./api/index'));

module.exports= router;