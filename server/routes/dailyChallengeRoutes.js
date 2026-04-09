import express from 'express'
import { getTodayChallenge, submitDailyChallenge } from '../controllers/dailyChallengeController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// GET  /api/daily-challenge        → get today's challenge
router.get('/',        protect, getTodayChallenge)

// POST /api/daily-challenge/submit → submit result
router.post('/submit', protect, submitDailyChallenge)

export default router
