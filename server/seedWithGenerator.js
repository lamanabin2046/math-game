import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Level from './models/Level.js';
import Question from './models/Question.js';
import { generateQuestion } from './generators/index.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to MongoDB');

// Define all 50 levels with their question types
const levelConfigs = [
  // GRADE 1 (Levels 1-10)
  { levelNumber: 1, questionType: "addition", min: 1, max: 5 },
  { levelNumber: 2, questionType: "addition", min: 1, max: 10 },
  { levelNumber: 3, questionType: "addition", min: 1, max: 20 },
  { levelNumber: 4, questionType: "subtraction", min: 1, max: 5 },
  { levelNumber: 5, questionType: "subtraction", min: 1, max: 10 },
  { levelNumber: 6, questionType: "subtraction", min: 1, max: 20 },
  { levelNumber: 7, questionType: "comparison", min: 1, max: 20 },
  { levelNumber: 8, questionType: "addition", min: 1, max: 10 },
  { levelNumber: 9, questionType: "subtraction", min: 5, max: 20 },
  { levelNumber: 10, questionType: "comparison", min: 1, max: 50 },

  // GRADE 2 (Levels 11-20)
  { levelNumber: 11, questionType: "addition", min: 10, max: 50 },
  { levelNumber: 12, questionType: "addition", min: 20, max: 100 },
  { levelNumber: 13, questionType: "subtraction", min: 10, max: 50 },
  { levelNumber: 14, questionType: "subtraction", min: 20, max: 100 },
  { levelNumber: 15, questionType: "multiplication", min: 1, max: 5 },
  { levelNumber: 16, questionType: "multiplication", min: 1, max: 10 },
  { levelNumber: 17, questionType: "addition", min: 50, max: 100 },
  { levelNumber: 18, questionType: "subtraction", min: 50, max: 100 },
  { levelNumber: 19, questionType: "multiplication", min: 2, max: 5 },
  { levelNumber: 20, questionType: "division", min: 1, max: 5 },

  // GRADE 3 (Levels 21-30)
  { levelNumber: 21, questionType: "addition", min: 100, max: 500 },
  { levelNumber: 22, questionType: "subtraction", min: 100, max: 500 },
  { levelNumber: 23, questionType: "multiplication", min: 5, max: 10 },
  { levelNumber: 24, questionType: "division", min: 5, max: 10 },
  { levelNumber: 25, questionType: "multiplication", min: 1, max: 12 },
  { levelNumber: 26, questionType: "division", min: 1, max: 12 },
  { levelNumber: 27, questionType: "fraction", min: 1, max: 10 },
  { levelNumber: 28, questionType: "fraction_ops", min: 1, max: 10 },
  { levelNumber: 29, questionType: "addition", min: 200, max: 800 },
  { levelNumber: 30, questionType: "subtraction", min: 200, max: 800 },

  // GRADE 4 (Levels 31-40)
  { levelNumber: 31, questionType: "addition", min: 500, max: 2000 },
  { levelNumber: 32, questionType: "subtraction", min: 500, max: 2000 },
  { levelNumber: 33, questionType: "multiplication", min: 10, max: 20 },
  { levelNumber: 34, questionType: "division", min: 10, max: 20 },
  { levelNumber: 35, questionType: "decimal", min: 1, max: 10 },
  { levelNumber: 36, questionType: "percentage", min: 10, max: 100 },
  { levelNumber: 37, questionType: "fraction", min: 1, max: 20 },
  { levelNumber: 38, questionType: "fraction_ops", min: 1, max: 20 },
  { levelNumber: 39, questionType: "ratio", min: 1, max: 10 },
  { levelNumber: 40, questionType: "decimal", min: 1, max: 20 },

  // GRADE 5 (Levels 41-50)
  { levelNumber: 41, questionType: "percentage", min: 10, max: 100 },
  { levelNumber: 42, questionType: "ratio", min: 1, max: 20 },
  { levelNumber: 43, questionType: "integer", min: -20, max: 20 },
  { levelNumber: 44, questionType: "linear_equation", min: 1, max: 10 },
  { levelNumber: 45, questionType: "simple_interest", min: 100, max: 1000 },
  { levelNumber: 46, questionType: "probability", min: 1, max: 10 },
  { levelNumber: 47, questionType: "factorization", min: 1, max: 10 },
  { levelNumber: 48, questionType: "pythagoras", min: 1, max: 10 },
  { levelNumber: 49, questionType: "quadratic", min: 1, max: 10 },
  { levelNumber: 50, questionType: "arithmeticProgression", min: 1, max: 10 },
];

// Seed questions for each level
async function seedAllLevels() {
  for (const config of levelConfigs) {
    const level = await Level.findOne({ levelNumber: config.levelNumber });

    if (!level) {
      console.log(`⚠️  Level ${config.levelNumber} not found in database`);
      continue;
    }

    const existingCount = await Question.countDocuments({ levelId: level._id });

    if (existingCount === 0) {
      console.log(`🔄 Generating 10 questions for Level ${config.levelNumber}...`);

      const questions = [];
      for (let i = 0; i < 10; i++) {
        try {
          const questionData = generateQuestion({
            questionType: config.questionType,
            questionConfig: { min: config.min, max: config.max }
          });

          questions.push({
            levelId: level._id,
            topic: level.topic,
            difficulty: level.grade,
            question: questionData.question,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
            explanation: `Answer: ${questionData.correctAnswer}`
          });
        } catch (error) {
          console.error(`Error generating question for level ${config.levelNumber}:`, error);
        }
      }

      if (questions.length > 0) {
        await Question.insertMany(questions);
        console.log(`✅ Level ${config.levelNumber}: ${questions.length} questions added`);
      }
    } else {
      console.log(`⏭️  Level ${config.levelNumber}: Already has ${existingCount} questions`);
    }
  }

  console.log('\n✅ All levels seeded successfully!');
  process.exit(0);
}

seedAllLevels().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});