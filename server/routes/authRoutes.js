import express              from 'express'
import { register, login } from '../controllers/authController.js'

const router = express.Router()

// POST /api/auth/register  →  create new student
router.post('/register', register)

// POST /api/auth/login  →  log in existing student
router.post('/login', login)

export default router