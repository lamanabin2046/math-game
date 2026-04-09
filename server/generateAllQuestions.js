import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Level from './models/Level.js';
import Question from './models/Question.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

// Grade 1 Levels
const grade1Levels = [
  { levelNumber: 1, title: 'Counting 1-10', grade: 1, topic: 'counting' },
  { levelNumber: 2, title: 'Counting 11-50', grade: 1, topic: 'counting' },
  { levelNumber: 3, title: 'Counting 51-100', grade: 1, topic: 'counting' },
  { levelNumber: 4, title: 'Nepali Numbers Writing', grade: 1, topic: 'writing' },
  { levelNumber: 5, title: 'Number Names (Nepali)', grade: 1, topic: 'names' },
  { levelNumber: 6, title: 'Addition 1-5', grade: 1, topic: 'addition' },
  { levelNumber: 7, title: 'Addition 1-9', grade: 1, topic: 'addition' },
  { levelNumber: 8, title: 'Subtraction Basics', grade: 1, topic: 'subtraction' },
  { levelNumber: 9, title: 'Before, After, Between', grade: 1, topic: 'ordering' },
  { levelNumber: 10, title: 'Greater/Less Than', grade: 1, topic: 'comparison' },
];

// Grade 2 Levels
const grade2Levels = [
  { levelNumber: 11, title: 'Counting 1-1000', grade: 2, topic: 'counting' },
  { levelNumber: 12, title: 'Place Value (Ones, Tens, Hundreds)', grade: 2, topic: 'place_value' },
  { levelNumber: 13, title: '2-digit Addition (No Carrying)', grade: 2, topic: 'addition' },
  { levelNumber: 14, title: '2-digit Addition (With Carrying)', grade: 2, topic: 'addition' },
  { levelNumber: 15, title: '2-digit Subtraction (No Borrowing)', grade: 2, topic: 'subtraction' },
  { levelNumber: 16, title: '2-digit Subtraction (With Borrowing)', grade: 2, topic: 'subtraction' },
  { levelNumber: 17, title: 'Multiplication Tables 1-3', grade: 2, topic: 'multiplication' },
  { levelNumber: 18, title: 'Multiplication Tables 4-5', grade: 2, topic: 'multiplication' },
  { levelNumber: 19, title: 'Basic Measurement (cm, m)', grade: 2, topic: 'measurement' },
  { levelNumber: 20, title: 'Money - Nepali Rupees', grade: 2, topic: 'money' },
];

// Grade 3 Levels
const grade3Levels = [
  { levelNumber: 21, title: '3-digit Addition', grade: 3, topic: 'addition' },
  { levelNumber: 22, title: '3-digit Subtraction', grade: 3, topic: 'subtraction' },
  { levelNumber: 23, title: 'Multiplication Tables 6-8', grade: 3, topic: 'multiplication' },
  { levelNumber: 24, title: 'Multiplication Tables 9-10', grade: 3, topic: 'multiplication' },
  { levelNumber: 25, title: 'Basic Division 1-5', grade: 3, topic: 'division' },
  { levelNumber: 26, title: 'Basic Division 6-10', grade: 3, topic: 'division' },
  { levelNumber: 27, title: 'Place Value to Thousands', grade: 3, topic: 'place_value' },
  { levelNumber: 28, title: 'Fractions - Half and Quarter', grade: 3, topic: 'fractions' },
  { levelNumber: 29, title: 'Time - Hours and Minutes', grade: 3, topic: 'time' },
  { levelNumber: 30, title: 'Money Problems - Buying/Selling', grade: 3, topic: 'money' },
];

// Grade 4 Levels
const grade4Levels = [
  { levelNumber: 31, title: 'Large Numbers (4-5 digits)', grade: 4, topic: 'addition' },
  { levelNumber: 32, title: 'Multiplication Tables 1-20', grade: 4, topic: 'multiplication' },
  { levelNumber: 33, title: 'Long Multiplication (2×2)', grade: 4, topic: 'multiplication' },
  { levelNumber: 34, title: 'Long Multiplication (3×2)', grade: 4, topic: 'multiplication' },
  { levelNumber: 35, title: 'Long Division (No Remainder)', grade: 4, topic: 'division' },
  { levelNumber: 36, title: 'Long Division (With Remainder)', grade: 4, topic: 'division' },
  { levelNumber: 37, title: 'Fractions - Proper & Improper', grade: 4, topic: 'fractions' },
  { levelNumber: 38, title: 'Fraction Addition & Subtraction', grade: 4, topic: 'fractions' },
  { levelNumber: 39, title: 'Decimals - Reading & Writing', grade: 4, topic: 'decimals' },
  { levelNumber: 40, title: 'Area and Perimeter', grade: 4, topic: 'geometry' },
];

// Grade 5 Levels
const grade5Levels = [
  { levelNumber: 41, title: 'Numbers to Crore (करोड)', grade: 5, topic: 'numbers' },
  { levelNumber: 42, title: 'Fractions - All 4 Operations', grade: 5, topic: 'fractions' },
  { levelNumber: 43, title: 'Decimals - All 4 Operations', grade: 5, topic: 'decimals' },
  { levelNumber: 44, title: 'Fraction to Decimal Conversion', grade: 5, topic: 'fractions' },
  { levelNumber: 45, title: 'Percentage Basics', grade: 5, topic: 'percentage' },
  { levelNumber: 46, title: 'Ratio Introduction', grade: 5, topic: 'ratio' },
  { levelNumber: 47, title: 'Unitary Method', grade: 5, topic: 'unitary' },
  { levelNumber: 48, title: 'Average (औसत)', grade: 5, topic: 'average' },
  { levelNumber: 49, title: 'Area - Triangle & Rectangle', grade: 5, topic: 'geometry' },
  { levelNumber: 50, title: 'Data Reading - Bar Graphs', grade: 5, topic: 'data' },
];

// All levels combined
const allLevels = [...grade1Levels, ...grade2Levels, ...grade3Levels, ...grade4Levels, ...grade5Levels];

// Create all levels
let createdCount = 0;
for (const levelData of allLevels) {
  const exists = await Level.findOne({ levelNumber: levelData.levelNumber });
  if (!exists) {
    await Level.create({
      levelNumber: levelData.levelNumber,
      title: levelData.title,
      grade: levelData.grade,
      topic: levelData.topic,
      questionConfig: { count: 10, difficulty: levelData.grade },
      passingScore: 70
    });
    createdCount++;
  }
}

console.log(`✅ Created ${createdCount} new levels`);

// Sample questions for each level (10 questions per level)
const questionsByLevel = {
  1: [ // Counting 1-10
    { question: 'What comes after 5?', options: [4, 5, 6, 7], correctAnswer: 6 },
    { question: 'What comes before 8?', options: [6, 7, 8, 9], correctAnswer: 7 },
    { question: 'Count: 1, 2, 3, 4, ?', options: [3, 4, 5, 6], correctAnswer: 5 },
    { question: 'How many: ● ● ● ?', options: [2, 3, 4, 5], correctAnswer: 3 },
    { question: 'What comes after 9?', options: [8, 9, 10, 11], correctAnswer: 10 },
    { question: 'Write 7 in order: 5, 6, ?, 8', options: [5, 6, 7, 8], correctAnswer: 7 },
    { question: 'Count backwards: 10, 9, ?, 7', options: [6, 7, 8, 9], correctAnswer: 8 },
    { question: '2 + 2 = ?', options: [2, 3, 4, 5], correctAnswer: 4 },
    { question: '3 + 1 = ?', options: [2, 3, 4, 5], correctAnswer: 4 },
    { question: '4 + 2 = ?', options: [4, 5, 6, 7], correctAnswer: 6 },
  ],
  6: [ // Addition 1-5
    { question: '1 + 1 = ?', options: [1, 2, 3, 4], correctAnswer: 2 },
    { question: '2 + 1 = ?', options: [2, 3, 4, 5], correctAnswer: 3 },
    { question: '2 + 2 = ?', options: [2, 3, 4, 5], correctAnswer: 4 },
    { question: '3 + 1 = ?', options: [3, 4, 5, 6], correctAnswer: 4 },
    { question: '3 + 2 = ?', options: [4, 5, 6, 7], correctAnswer: 5 },
    { question: '1 + 4 = ?', options: [4, 5, 6, 7], correctAnswer: 5 },
    { question: '2 + 3 = ?', options: [4, 5, 6, 7], correctAnswer: 5 },
    { question: '4 + 1 = ?', options: [4, 5, 6, 7], correctAnswer: 5 },
    { question: '1 + 2 = ?', options: [2, 3, 4, 5], correctAnswer: 3 },
    { question: '5 + 0 = ?', options: [4, 5, 6, 7], correctAnswer: 5 },
  ],
  21: [ // 3-digit Addition
    { question: '123 + 45 = ?', options: [165, 168, 170, 175], correctAnswer: 168 },
    { question: '200 + 150 = ?', options: [340, 350, 360, 370], correctAnswer: 350 },
    { question: '456 + 123 = ?', options: [579, 580, 581, 582], correctAnswer: 579 },
    { question: '300 + 200 = ?', options: [400, 500, 600, 700], correctAnswer: 500 },
    { question: '111 + 222 = ?', options: [333, 334, 335, 336], correctAnswer: 333 },
    { question: '500 + 250 = ?', options: [700, 750, 800, 850], correctAnswer: 750 },
    { question: '234 + 156 = ?', options: [380, 385, 390, 395], correctAnswer: 390 },
    { question: '321 + 179 = ?', options: [490, 495, 500, 505], correctAnswer: 500 },
    { question: '145 + 355 = ?', options: [490, 495, 500, 505], correctAnswer: 500 },
    { question: '678 + 122 = ?', options: [795, 798, 800, 805], correctAnswer: 800 },
  ],
};

// Add questions for available levels
let questionCount = 0;
for (const levelNumber in questionsByLevel) {
  const level = await Level.findOne({ levelNumber: parseInt(levelNumber) });
  if (level) {
    const existingCount = await Question.countDocuments({ levelId: level._id });
    if (existingCount === 0) {
      const questionsData = questionsByLevel[levelNumber].map(q => ({
        levelId: level._id,
        topic: level.topic,
        difficulty: level.grade,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: `The answer is ${q.correctAnswer}`
      }));
      
      await Question.insertMany(questionsData);
      questionCount += questionsData.length;
      console.log(`✅ Added ${questionsData.length} questions to Level ${levelNumber}`);
    }
  }
}

console.log(`✅ Total questions added: ${questionCount}`);
console.log('Done!');
process.exit(0);