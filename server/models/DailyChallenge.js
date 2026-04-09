import mongoose from 'mongoose'

const dailyChallengeSchema = new mongoose.Schema({
  // Date string like "2026-04-10" — one per day
  dateKey: { type: String, required: true, unique: true },

  // 10 random questions for this day
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  'Question',
  }],

  // Students who completed today's challenge
  completions: [{
    student:     { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    score:       { type: Number },
    stars:       { type: Number },
    correctCount:{ type: Number },
    completedAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true })

export default mongoose.model('DailyChallenge', dailyChallengeSchema)
