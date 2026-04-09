import Student  from '../models/Student.js'
import Progress from '../models/Progress.js'
import Level    from '../models/Level.js'

// ── GET /api/students/leaderboard ──
export async function getLeaderboard(req, res) {
  try {
    // Get top 20 students by totalPoints
    const students = await Student.find({ role: 'student' })
      .select('name username totalPoints')
      .sort({ totalPoints: -1 })
      .limit(20)

    // Add levelsCompleted count for each student
    const data = await Promise.all(
      students.map(async (s) => {
        const levelsCompleted = await Progress.countDocuments({
          student:   s._id,
          completed: true,
        })
        return {
          _id:             s._id,
          name:            s.name,
          username:        s.username,
          totalPoints:     s.totalPoints,
          levelsCompleted,
        }
      })
    )

    res.json({ success: true, data })
  } catch (err) {
    console.error('Leaderboard error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// ── GET /api/students/profile ──
export async function getProfile(req, res) {
  try {
    const studentId = req.studentId

    const student = await Student.findById(studentId).select('-password')
    if (!student) return res.status(404).json({ message: 'Student not found' })

    // All progress records with level info
    const progressRecords = await Progress.find({ student: studentId })
      .populate('level', 'title grade')
      .sort({ updatedAt: -1 })

    const levelsCompleted = progressRecords.filter(p => p.completed).length
    const totalStars      = progressRecords.reduce((sum, p) => sum + (p.stars || 0), 0)
    const scores          = progressRecords.filter(p => p.score > 0).map(p => p.score)
    const avgScore        = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0

    // Grade breakdown — get all levels grouped by grade
    const allLevels = await Level.find({}).select('grade _id')
    const gradeMap  = {}
    allLevels.forEach(l => {
      if (!gradeMap[l.grade]) gradeMap[l.grade] = { total: 0, completed: 0 }
      gradeMap[l.grade].total++
    })
    progressRecords.forEach(p => {
      if (p.level && p.completed) {
        const g = p.level.grade
        if (gradeMap[g]) gradeMap[g].completed++
      }
    })
    const gradeBreakdown = Object.entries(gradeMap)
      .map(([grade, val]) => ({ grade: Number(grade), ...val }))
      .sort((a, b) => a.grade - b.grade)

    // Recent 5 completed levels
    const recentProgress = progressRecords
      .filter(p => p.completed && p.level)
      .slice(0, 5)
      .map(p => ({
        levelTitle: p.level.title,
        grade:      p.level.grade,
        score:      p.score,
        stars:      p.stars,
      }))

    res.json({
      success: true,
      data: {
        name:            student.name,
        username:        student.username,
        totalPoints:     student.totalPoints,
        levelsCompleted,
        totalStars,
        avgScore,
        gradeBreakdown,
        recentProgress,
      },
    })
  } catch (err) {
    console.error('Profile error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
