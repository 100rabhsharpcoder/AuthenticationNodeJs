const Question = require('../../../models/questionSchema');
const Option = require('../../../models/optionSchema');


// contorller for create option 

module.exports.create = async function (req, res) {
  try {
    // Create the option for the given question
    const option = await Option.create({
      option: req.body.content,
      question: req.params.id,
    });

    // Add the vote URL to the option using string interpolation
    const voteURL = `http://localhost:8000/api/v1/options/${option._id}/addvote`;
    option.add_vote = voteURL;

    // Save the updated option
    await option.save();

    // Find the question to which the option is added and append the option to its 'options' array
    const question = await Question.findById(req.params.id);

    if (question) {
      question.options.push(option);
      await question.save();
      console.log(question);
      res.status(200).json({
        success: true,
        message: 'Option created successfully',
        option: option,
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
  
  // Delete an option
  module.exports.delete = async function (req, res) {
    try {
      // Delete the option with the given id
    
      const option = await Option.findById(req.params.id);
  
      if (option) {
        const questionId = option.question;
  
        // Remove the option from the question's 'options' array
        const question = await Question.findByIdAndUpdate(questionId, { $pull: { options: req.params.id } });
  
        // Delete the option
        await Option.findByIdAndDelete(req.params.id);
  
        res.status(200).json({
          success: true,
          message: 'Option deleted',
        });
      } else {
        res.status(404).json({
          message: 'Option not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
  
  // Add a vote to an option
  module.exports.addVote =async function (req, res) {
    try {
  
      // Increment the vote by one using an update query
      const option = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
  
      if (option) {
        await option.save();
        res.status(200).json({
          success: true,
          message: 'Vote added successfully',
          option: option,
        });
      } else {
        res.status(404).json({
          message: 'Option not found',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Internal server error',
      });
    }
  };
  