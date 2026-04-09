import mongoose from 'mongoose'

// Level schema — defines each game level's content and rules
const levelSchema = new mongoose.Schema(
  {
    levelNumber: { type: Number, required: true, unique: true },
    title:       { type: String, required: true },
    grade:       { type: Number, required: true },
    sheet: { type: String, default: '' },  

    // The type of math in this level
    topic: { type: String, required: true },

    // Config passed to the question generator
    questionConfig: {
      totalQuestions: { type: Number, default: 10 },
      minNumber:      { type: Number, default: 1 },
      maxNumber:      { type: Number, default: 10 },
    },

    // How many correct answers needed to pass
    passingScore: { type: Number, default: 6 },
  },
  { timestamps: true }
)

const Level = mongoose.model('Level', levelSchema)
export default Level