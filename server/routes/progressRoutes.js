import express                        from 'express'
import { getProgress, saveProgress } from '../controllers/progressController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

// All progress routes require a logged in student

// GET  /api/progress  →  fetch this student's full progress
router.get('/',  protect, getProgress)

// POST /api/progress  →  save result after completing a level
router.post('/', protect, saveProgress)

export default router