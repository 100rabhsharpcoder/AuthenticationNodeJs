const express =  require('express');
const router = express.Router();

const questionController = require('../../../controllers/api/v1/questionsController');


// routes for creating new question which call the controller fucntion create
router.post('/create', questionController.create);



// routes for finfing the question which call the controller function getQestion
router.get('/view/:id',questionController.showDetails)

// routes for deleting the question which call the controller function delete
router.delete('/delete/:id',questionController.deleteQues );

router.use('/options',require('./options'))



module.exports= router;



