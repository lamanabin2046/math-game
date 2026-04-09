import express from 'express';
import {
  getQuestionsByLevel,
  checkAnswer,
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// ── Student routes ──
router.get('/level/:levelId',  protect, getQuestionsByLevel);
router.post('/check-answer',   protect, checkAnswer);

// ── Admin routes ──
router.get('/admin/all',       protect, adminOnly, getAllQuestions);
router.post('/admin',          protect, adminOnly, createQuestion);
router.put('/admin/:id',       protect, adminOnly, updateQuestion);
router.delete('/admin/:id',    protect, adminOnly, deleteQuestion);

export default router;
