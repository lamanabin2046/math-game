import DailyChallenge from '../models/DailyChallenge.js'
import Question       from '../models/Question.js'
import Student        from '../models/Student.js'
import { awardBadge } from '../utils/badges.js'

// Get today's date key e.g. "2026-04-10"
function getTodayKey() {
  const now = new Date()
  return now.toISOString().split('T')[0]
}

// ── GET /api/daily-challenge ──
// Returns today's challenge. Creates it if it doesn't exist yet.
export async function getTodayChallenge(req, res) {
  try {
    const studentId = req.studentId
    const dateKey   = getTodayKey()

    // Find or create today's challenge
    let challenge = await DailyChallenge.findOne({ dateKey })
      .populate('questions')

    if (!challenge) {
      // Pick 10 random questions from the database
      const allQuestions = await Question.find({})
      if (allQuestions.length < 5) {
        return res.status(404).json({ message: 'Not enough questions to create a daily challenge.' })
      }

      const shuffled = allQuestions.sort(() => Math.random() - 0.5)
      const picked   = shuffled.slice(0, Math.min(10, shuffled.length))

      challenge = await DailyChallenge.create({
        dateKey,
        questions:   picked.map(q => q._id),
        completions: [],
      })

      challenge = await DailyChallenge.findOne({ dateKey }).populate('questions')
    }

    // Check if this student already completed today's challenge
    const myCompletion = challenge.completions.find(
      c => c.student.toString() === studentId.toString()
    )

    // Calculate time until next challenge (midnight tonight)
    const now       = new Date()
    const tomorrow  = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const msUntilNext = tomorrow - now

    res.json({
      success: true,
      data: {
        dateKey,
        questions:    myCompletion ? [] : challenge.questions, // hide questions if already played
        alreadyPlayed: !!myCompletion,
        myScore:       myCompletion?.score       ?? null,
        myStars:       myCompletion?.stars       ?? null,
        myCorrect:     myCompletion?.correctCount ?? null,
        totalQuestions: challenge.questions.length,
        msUntilNext,
        completionCount: challenge.completions.length,
      },
    })
  } catch (err) {
    console.error('Daily challenge error:', err)
    res.status(500).json({ message: err.message })
  }
}

// ── POST /api/daily-challenge/submit ──
export async function submitDailyChallenge(req, res) {
  try {
    const studentId              = req.studentId
    const { score, stars, correctCount } = req.body
    const dateKey                = getTodayKey()

    const challenge = await DailyChallenge.findOne({ dateKey })
    if (!challenge) return res.status(404).json({ message: 'No challenge found for today.' })

    // Check if already submitted
    const already = challenge.completions.find(
      c => c.student.toString() === studentId.toString()
    )
    if (already) return res.status(400).json({ message: 'Already completed today\'s challenge.' })

    // Save completion
    challenge.completions.push({ student: studentId, score, stars, correctCount })
    await challenge.save()

    // Award points (half of normal)
    const pointsEarned = Math.round(score / 20) + (stars * 5)
    const student = await Student.findById(studentId)
    if (student) {
      student.totalPoints = (student.totalPoints ?? 0) + pointsEarned

      // Award badge for first perfect daily challenge
      const newBadges = []
      if (score === 100 && awardBadge(student, 'PERFECT_SCORE')) newBadges.push('PERFECT_SCORE')
      await student.save()

      return res.json({ success: true, pointsEarned, newBadges })
    }

    res.json({ success: true, pointsEarned, newBadges: [] })
  } catch (err) {
    console.error('Submit daily challenge error:', err)
    res.status(500).json({ message: err.message })
  }
}
