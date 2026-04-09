import express from 'express';
import { getQuestionsByLevel, checkAnswer } from '../controllers/questionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all questions for a level
router.get('/level/:levelId', protect, getQuestionsByLevel);

// Check if answer is correct
router.post('/check-answer', protect, checkAnswer);

export default router;