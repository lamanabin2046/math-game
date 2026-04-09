import express  from 'express'
import cors     from 'cors'
import dotenv   from 'dotenv'
import connectDB from './config/db.js'

import authRoutes            from './routes/authRoutes.js'
import levelRoutes           from './routes/levelRoutes.js'
import progressRoutes        from './routes/progressRoutes.js'
import questionRoutes        from './routes/questionRoutes.js'
import studentRoutes         from './routes/studentRoutes.js'
import dailyChallengeRoutes  from './routes/dailyChallengeRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    status:  'ok',
    message: '🎮 Math Adventure API is running!',
    time:    new Date().toISOString(),
  })
})

app.use('/api/auth',            authRoutes)
app.use('/api/levels',         levelRoutes)
app.use('/api/progress',       progressRoutes)
app.use('/api/questions',      questionRoutes)
app.use('/api/students',       studentRoutes)
app.use('/api/daily-challenge', dailyChallengeRoutes)

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` })
})

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ message: 'Something went wrong on the server.' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 API health: http://localhost:${PORT}/api/health`)
})
