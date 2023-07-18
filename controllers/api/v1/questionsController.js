const Question  = require('../../../models/questionSchema');
const Option = require('../../../models/optionSchema');


// controller action for creating question


module.exports.create = async function (req, res) {
    try {
      // Create a new question
      
  
      const ques = await Question.create(req.body);
  
    
      res.status(200).json({
        success: true,
        message: 'Question created successfully',
        question: ques,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
  // controller action for views question
  module.exports.showDetails = async function (req, res) {
    try {
      
  
      const ques = await Question.findById(req.params.id).populate('options');
  
      if (ques) {
        res.status(200).json({
          success: true,
          question: ques,
        });
      } else {
        res.status(404).json({
          message: 'Question not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
  

  // controller action for delete question
  module.exports.deleteQues = async function (req, res) {
    try {
      // Delete the question with the given id
      const ques = await Question.findByIdAndDelete(req.params.id);
  
      if (ques) {
        // Delete all the options of the question from the options db having the question id as req.params.id
        await Option.deleteMany({ question: req.params.id });
  
        res.status(200).json({
          success: true,
          message: 'Question deleted successfully',
        });
      } else {
        res.status(404).json({
          message: 'Question not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };