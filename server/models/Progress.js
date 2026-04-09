import mongoose from 'mongoose'

// Progress schema — one record per student per level
const progressSchema = new mongoose.Schema(
  {
    // Which student
    student: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Student',
      required: true,
    },

    // Which level
    level: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Level',
      required: true,
    },

    stars:       { type: Number, default: 0, min: 0, max: 3 },
    score:       { type: Number, default: 0 },
    completed:   { type: Boolean, default: false },
    lastPlayedAt:{ type: Date,   default: Date.now },
  },
  { timestamps: true }
)

// Each student can have only one progress record per level
progressSchema.index({ student: 1, level: 1 }, { unique: true })

const Progress = mongoose.model('Progress', progressSchema)
export default Progress