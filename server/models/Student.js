import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true, trim: true },
    username:    { type: String, required: true, unique: true, trim: true },
    password:    { type: String, required: true },
    totalPoints: { type: Number, default: 0 },

    // 'student' (default) or 'admin'
    role: {
      type:    String,
      enum:    ['student', 'admin'],
      default: 'student',
    },
  },
  { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)
export default Student
