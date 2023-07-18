const express = require('express');
const router =  express.Router();


const optionsController =  require('../../../controllers/api/v1/optionsController');
// routes for adding option
router.post('/:id/create',optionsController.create);
// routes for add vote 
router.get('/:id/addvote',optionsController.addVote);
// routes for delete 
router.delete('/delete/:id',optionsController.delete);

module.exports= router;