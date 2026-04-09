import bcrypt  from 'bcryptjs'
import jwt     from 'jsonwebtoken'
import Student from '../models/Student.js'
import { awardBadge } from '../utils/badges.js'

function generateToken(id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// ── POST /api/auth/register ──
export async function register(req, res) {
  try {
    const { name, username, password } = req.body

    if (!name || !username || !password) {
      return res.status(400).json({ message: 'Name, username and password are required.' })
    }

    const exists = await Student.findOne({ username })
    if (exists) {
      return res.status(400).json({ message: 'Username already taken.' })
    }

    const hashed  = await bcrypt.hash(password, 10)
    const student = await Student.create({
      name, username, password: hashed,
      currentStreak: 1,
      longestStreak: 1,
      lastLoginDate: new Date(),
    })

    res.status(201).json({
      _id:           student._id,
      name:          student.name,
      username:      student.username,
      role:          student.role,
      currentStreak: student.currentStreak,
      badges:        student.badges,
      token:         generateToken(student._id, student.role),
    })
  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'Server error during registration.' })
  }
}

// ── POST /api/auth/login ──
export async function login(req, res) {
  try {
    const { username, password } = req.body

    const student = await Student.findOne({ username })
    if (!student) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    const isMatch = await bcrypt.compare(password, student.password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    // ── Update streak ──
    const today     = new Date()
    today.setHours(0, 0, 0, 0)

    const lastLogin = student.lastLoginDate ? new Date(student.lastLoginDate) : null
    if (lastLogin) lastLogin.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    let newStreak = student.currentStreak ?? 0

    if (!lastLogin) {
      // First login
      newStreak = 1
    } else if (lastLogin.getTime() === today.getTime()) {
      // Already logged in today — no change
      newStreak = student.currentStreak
    } else if (lastLogin.getTime() === yesterday.getTime()) {
      // Logged in yesterday — streak continues
      newStreak = (student.currentStreak ?? 0) + 1
    } else {
      // Missed a day — reset
      newStreak = 1
    }

    const newLongest = Math.max(student.longestStreak ?? 0, newStreak)

    student.currentStreak = newStreak
    student.longestStreak = newLongest
    student.lastLoginDate = new Date()

    // ── Award streak badges ──
    let newBadges = []
    if (newStreak >= 3  && awardBadge(student, 'ON_FIRE'))    newBadges.push('ON_FIRE')
    if (newStreak >= 7  && awardBadge(student, 'DEDICATED'))  newBadges.push('DEDICATED')

    await student.save()

    res.json({
      _id:           student._id,
      name:          student.name,
      username:      student.username,
      role:          student.role,
      currentStreak: student.currentStreak,
      longestStreak: student.longestStreak,
      badges:        student.badges,
      newBadges,
      token:         generateToken(student._id, student.role),
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error during login.' })
  }
}
