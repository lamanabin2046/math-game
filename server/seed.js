import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Level from './models/Level.js';
import Question from './models/Question.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

// Get or create Level 1
let level1 = await Level.findOne({ levelNumber: 1 });
if (!level1) {
  level1 = await Level.create({
    levelNumber: 1,
    title: 'Easy Addition',
    grade: 3,
    topic: 'addition',
    questionConfig: { count: 10, difficulty: 1 },
    passingScore: 70
  });
  console.log('✅ Level 1 created!');
}

// Get or create Level 2
let level2 = await Level.findOne({ levelNumber: 2 });
if (!level2) {
  level2 = await Level.create({
    levelNumber: 2,
    title: 'Medium Addition',
    grade: 3,
    topic: 'addition',
    questionConfig: { count: 10, difficulty: 2 },
    passingScore: 70
  });
  console.log('✅ Level 2 created!');
}

// Get or create Level 3
let level3 = await Level.findOne({ levelNumber: 3 });
if (!level3) {
  level3 = await Level.create({
    levelNumber: 3,
    title: 'Easy Subtraction',
    grade: 4,
    topic: 'subtraction',
    questionConfig: { count: 10, difficulty: 1 },
    passingScore: 70
  });
  console.log('✅ Level 3 created!');
}

// Add questions to Level 2
const level2QuestionCount = await Question.countDocuments({ levelId: level2._id });
if (level2QuestionCount === 0) {
  console.log('Adding questions to Level 2...');
  
  const level2Questions = [
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '7 + 5 = ?',
      options: [11, 12, 13, 10],
      correctAnswer: 12,
      explanation: '7 + 5 equals 12'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '8 + 4 = ?',
      options: [10, 11, 12, 13],
      correctAnswer: 12,
      explanation: '8 + 4 equals 12'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '6 + 7 = ?',
      options: [12, 13, 14, 11],
      correctAnswer: 13,
      explanation: '6 + 7 equals 13'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '9 + 3 = ?',
      options: [11, 12, 13, 14],
      correctAnswer: 12,
      explanation: '9 + 3 equals 12'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '5 + 8 = ?',
      options: [12, 13, 14, 11],
      correctAnswer: 13,
      explanation: '5 + 8 equals 13'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '7 + 6 = ?',
      options: [12, 13, 14, 15],
      correctAnswer: 13,
      explanation: '7 + 6 equals 13'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '9 + 5 = ?',
      options: [13, 14, 15, 12],
      correctAnswer: 14,
      explanation: '9 + 5 equals 14'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '8 + 6 = ?',
      options: [13, 14, 15, 16],
      correctAnswer: 14,
      explanation: '8 + 6 equals 14'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '7 + 7 = ?',
      options: [13, 14, 15, 16],
      correctAnswer: 14,
      explanation: '7 + 7 equals 14'
    },
    {
      levelId: level2._id,
      topic: 'addition',
      difficulty: 2,
      question: '9 + 6 = ?',
      options: [14, 15, 16, 17],
      correctAnswer: 15,
      explanation: '9 + 6 equals 15'
    }
  ];
  
  await Question.insertMany(level2Questions);
  console.log('✅ Level 2 questions added!');
}

// Add questions to Level 3
const level3QuestionCount = await Question.countDocuments({ levelId: level3._id });
if (level3QuestionCount === 0) {
  console.log('Adding questions to Level 3...');
  
  const level3Questions = [
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '5 - 2 = ?',
      options: [2, 3, 4, 1],
      correctAnswer: 3,
      explanation: '5 - 2 equals 3'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '7 - 3 = ?',
      options: [3, 4, 5, 2],
      correctAnswer: 4,
      explanation: '7 - 3 equals 4'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '6 - 2 = ?',
      options: [3, 4, 5, 2],
      correctAnswer: 4,
      explanation: '6 - 2 equals 4'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '8 - 3 = ?',
      options: [4, 5, 6, 3],
      correctAnswer: 5,
      explanation: '8 - 3 equals 5'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '9 - 4 = ?',
      options: [4, 5, 6, 3],
      correctAnswer: 5,
      explanation: '9 - 4 equals 5'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '7 - 2 = ?',
      options: [4, 5, 6, 3],
      correctAnswer: 5,
      explanation: '7 - 2 equals 5'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '10 - 3 = ?',
      options: [6, 7, 8, 5],
      correctAnswer: 7,
      explanation: '10 - 3 equals 7'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '9 - 2 = ?',
      options: [6, 7, 8, 5],
      correctAnswer: 7,
      explanation: '9 - 2 equals 7'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '8 - 2 = ?',
      options: [5, 6, 7, 4],
      correctAnswer: 6,
      explanation: '8 - 2 equals 6'
    },
    {
      levelId: level3._id,
      topic: 'subtraction',
      difficulty: 1,
      question: '10 - 4 = ?',
      options: [5, 6, 7, 8],
      correctAnswer: 6,
      explanation: '10 - 4 equals 6'
    }
  ];
  
  await Question.insertMany(level3Questions);
  console.log('✅ Level 3 questions added!');
}

console.log('Done!');
process.exit(0);