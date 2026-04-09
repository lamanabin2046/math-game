import express                          from 'express'
import { getLeaderboard, getProfile }  from '../controllers/studentController.js'
import { protect }                     from '../middleware/authMiddleware.js'

const router = express.Router()

// GET /api/students/leaderboard  — public (no auth needed)
router.get('/leaderboard', getLeaderboard)

// GET /api/students/profile  — protected
router.get('/profile', protect, getProfile)

export default router
