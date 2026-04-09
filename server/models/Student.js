import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    username:    { type: String, required: true, unique: true, trim: true },
    password:    { type: String, required: true },
    totalPoints: { type: Number, default: 0 },

    role: {
      type:    String,
      enum:    ['student', 'admin'],
      default: 'student',
    },

    // ── Streak ──
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastLoginDate: { type: Date,   default: null },

    // ── Badges ──
    badges: [{
      id:          { type: String },
      name:        { type: String },
      emoji:       { type: String },
      description: { type: String },
      earnedAt:    { type: Date, default: Date.now },
    }],
  },
  { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)
export default Student
