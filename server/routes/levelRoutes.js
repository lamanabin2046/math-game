import express                        from 'express'
import { getAllLevels, getLevelById } from '../controllers/levelController.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

// GET /api/levels      →  all levels
router.get('/',    protect, getAllLevels)

// GET /api/levels/:id  →  single level
router.get('/:id', protect, getLevelById)

export default router