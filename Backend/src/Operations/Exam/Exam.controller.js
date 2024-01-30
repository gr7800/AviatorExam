const Question = require('./Exam.model');

// Create a question
exports.createQuestion = async function (req, res) {
  try {
    const question = new Question(req.body);
    const createdQuestion = await question.save();
    res.status(201).json(createdQuestion);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create the question.' });
  }
};

// Get a question by ID
exports.getQuestion = async function (req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get the question.' });
  }
};

// Update a question by ID
exports.updateQuestion = async function (req, res) {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the question.' });
  }
};

// Delete a question by ID
exports.deleteQuestion = async function (req, res) {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found.' });
    }
    res.json({ message: 'Question deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the question.' });
  }
};

// Get questions by subject
exports.getQuestionsBySubject = async function (req, res) {
  try {
    const subject = req.query.subject; // Use req.query instead of req.params to access the query parameters
    let query = {}; // Define an empty query object

    // If subject is provided, add it to the query
    if (subject) {
      query.subject = subject;
    }

    const questions = await Question.find(query);

    // If no questions found and subject is provided, return an error
    if (questions.length === 0 && subject) {
      return res.status(404).json({ error: 'No questions found for the specified subject.' });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get questions by subject.' });
  }
};

