import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },

  // ✅ Flexible topic (no enum)
  topic: {
    type: String,
    required: true
  },

 difficulty: {
  type: Number,
  enum: [1,2,3,4,5,6,7,8,9,10],
  required: true
},

  question: {
    type: String,
    required: true
  },

  // ✅ Allow numbers + strings
  options: [{
    type: mongoose.Schema.Types.Mixed,
    required: true
  }],

  // ✅ Allow number or string
  correctAnswer: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },

  // ✅ Explanation useful for learning
  explanation: {
    type: String,
    default: ''
  },

  // ✅ Optional: question type (very useful)
  questionType: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Question', questionSchema);