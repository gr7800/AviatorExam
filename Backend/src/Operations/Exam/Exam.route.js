const express = require('express');
const router = express.Router();
const questionController = require('./Exam.controller');

// Create a question
router.post('/questions', questionController.createQuestion);

// Get a question by ID
router.get('/questions/:id', questionController.getQuestion);

// Update a question by ID
router.put('/questions/:id', questionController.updateQuestion);

// Delete a question by ID
router.delete('/questions/:id', questionController.deleteQuestion);

// Get questions by subject
router.get('/questions', questionController.getQuestionsBySubject);

module.exports = router;
