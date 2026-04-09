import bcrypt  from 'bcryptjs'
import jwt     from 'jsonwebtoken'
import Student from '../models/Student.js'

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
    const student = await Student.create({ name, username, password: hashed })

    res.status(201).json({
      _id:      student._id,
      name:     student.name,
      username: student.username,
      role:     student.role,
      token:    generateToken(student._id, student.role),
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

    res.json({
      _id:      student._id,
      name:     student.name,
      username: student.username,
      role:     student.role,
      token:    generateToken(student._id, student.role),
    })
  } catch (err) {
    console.error('Login error:', err)
    res.status(500).json({ message: 'Server error during login.' })
  }
}
