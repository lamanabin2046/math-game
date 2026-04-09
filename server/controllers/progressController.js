import Progress from '../models/Progress.js'
import Student  from '../models/Student.js'
import Level    from '../models/Level.js'
import { awardBadge } from '../utils/badges.js'

export const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ student: req.studentId }).populate('level')
    res.status(200).json({ success: true, data: progress })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const saveProgress = async (req, res) => {
  try {
    const studentId = req.studentId
    const { levelId, stars, score, timeLeft, mode } = req.body

    let progress = await Progress.findOne({ student: studentId, level: levelId })
    const prevStars = progress?.stars ?? 0

    if (progress) {
      progress.stars     = Math.max(progress.stars, stars)
      progress.score     = Math.max(progress.score, score)
      progress.completed = true
      await progress.save()
    } else {
      progress = await Progress.create({
        student: studentId, level: levelId,
        stars, score, completed: true,
      })
    }

    // ── Award points ──
    const pointsEarned =
      Math.round(score / 10) +
      (stars - prevStars > 0 ? (stars - prevStars) * 10 : 0)

    const student = await Student.findById(studentId)
    if (!student) return res.status(404).json({ message: 'Student not found' })

    if (pointsEarned > 0) {
      student.totalPoints = (student.totalPoints ?? 0) + pointsEarned
    }

    // ── Check and award badges ──
    const newBadges = []

    // First Steps
    const completedCount = await Progress.countDocuments({ student: studentId, completed: true })
    if (completedCount === 1 && awardBadge(student, 'FIRST_STEPS')) newBadges.push('FIRST_STEPS')

    // Perfect Score
    if (score === 100 && awardBadge(student, 'PERFECT_SCORE')) newBadges.push('PERFECT_SCORE')

    // Speed Demon — test mode with 10+ seconds left
    if (mode === 'test' && timeLeft >= 10 && awardBadge(student, 'SPEED_DEMON')) newBadges.push('SPEED_DEMON')

    // Grade Master
    const level = await Level.findById(levelId)
    if (level) {
      const gradeMap = { 6: 'GRADE6_MASTER', 7: 'GRADE7_MASTER', 8: 'GRADE8_MASTER', 9: 'GRADE9_MASTER', 10: 'GRADE10_MASTER' }
      const badgeId  = gradeMap[level.grade]
      if (badgeId) {
        const allGradeLevels   = await Level.find({ grade: level.grade })
        const completedInGrade = await Progress.countDocuments({
          student: studentId, completed: true,
          level: { $in: allGradeLevels.map(l => l._id) },
        })
        if (completedInGrade === allGradeLevels.length && awardBadge(student, badgeId)) {
          newBadges.push(badgeId)
        }
      }
    }

    // Math Champion
    const totalLevels    = await Level.countDocuments()
    const totalCompleted = await Progress.countDocuments({ student: studentId, completed: true })
    if (totalCompleted === totalLevels && awardBadge(student, 'MATH_CHAMPION')) {
      newBadges.push('MATH_CHAMPION')
    }

    await student.save()

    res.status(200).json({ success: true, data: progress, pointsEarned, newBadges })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
