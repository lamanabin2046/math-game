import Progress from '../models/Progress.js'
import Student  from '../models/Student.js'

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
    const studentId          = req.studentId
    const { levelId, stars, score } = req.body

    let progress = await Progress.findOne({ student: studentId, level: levelId })

    const prevStars = progress?.stars ?? 0
    const prevScore = progress?.score ?? 0

    if (progress) {
      progress.stars     = Math.max(progress.stars, stars)
      progress.score     = Math.max(progress.score, score)
      progress.completed = true
      await progress.save()
    } else {
      progress = await Progress.create({
        student:   studentId,
        level:     levelId,
        stars,
        score,
        completed: true,
      })
    }

    // ── Award points to student ──
    // Points formula: score % + (stars × 10) bonus
    // Only award extra if they improved their score
    const newScore = Math.max(prevScore, score)
    const newStars = Math.max(prevStars, stars)
    const pointsEarned =
      Math.round(score / 10) +           // 0–10 pts for score
      (stars - prevStars > 0 ? (stars - prevStars) * 10 : 0)  // bonus for new stars

    if (pointsEarned > 0) {
      await Student.findByIdAndUpdate(studentId, {
        $inc: { totalPoints: pointsEarned },
      })
    }

    res.status(200).json({ success: true, data: progress, pointsEarned })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
