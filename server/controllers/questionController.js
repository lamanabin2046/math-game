import Question from '../models/Question.js';

export const getQuestionsByLevel = async (req, res) => {
  try {
    const { levelId } = req.params;
    
    const questions = await Question.find({ levelId });
    
    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for this level' });
    }
    
    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkAnswer = async (req, res) => {
  try {
    const { questionId, studentAnswer } = req.body;
    
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    
    const isCorrect = question.correctAnswer === studentAnswer;
    
    res.status(200).json({
      success: true,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};