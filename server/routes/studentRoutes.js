import express                                        from 'express'
import { getLeaderboard, getProfile, updateAvatar }  from '../controllers/studentController.js'
import { protect }                                   from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/leaderboard',  getLeaderboard)
router.get('/profile',      protect, getProfile)
router.put('/avatar',       protect, updateAvatar)

export default router
