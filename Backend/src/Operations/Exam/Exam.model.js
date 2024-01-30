const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
