import Progress from '../models/Progress.js';
import Student from '../models/Student.js';

export const getProgress = async (req, res) => {
  try {
    const studentId = req.studentId;
    
    const progress = await Progress.find({ student: studentId }).populate('level');
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveProgress = async (req, res) => {
  try {
    const studentId = req.studentId;
    const { levelId, stars, score } = req.body;
    
    let progress = await Progress.findOne({ student: studentId, level: levelId });
    
    if (progress) {
      progress.stars = Math.max(progress.stars, stars);
      progress.score = Math.max(progress.score, score);
      progress.completed = true;
      await progress.save();
    } else {
      progress = await Progress.create({
        student: studentId,
        level: levelId,
        stars,
        score,
        completed: true
      });
    }
    
    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};