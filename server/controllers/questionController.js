import Question from '../models/Question.js';

// ── GET /api/questions/level/:levelId ── (students)
export const getQuestionsByLevel = async (req, res) => {
  try {
    const questions = await Question.find({ levelId: req.params.levelId });
    if (!questions.length) {
      return res.status(404).json({ message: 'No questions found for this level' });
    }
    res.status(200).json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── POST /api/questions/check-answer ── (students)
export const checkAnswer = async (req, res) => {
  try {
    const { questionId, studentAnswer } = req.body;
    const question = await Question.findById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const isCorrect = String(question.correctAnswer) === String(studentAnswer);
    res.status(200).json({
      success: true,
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation:   question.explanation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── GET /api/questions/admin/all ── (admin)
export const getAllQuestions = async (req, res) => {
  try {
    const { levelId } = req.query;
    const filter = levelId ? { levelId } : {};
    const questions = await Question.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── POST /api/questions/admin ── (admin) create question
export const createQuestion = async (req, res) => {
  try {
    const { levelId, topic, difficulty, question, options, correctAnswer, explanation, questionType } = req.body;

    if (!levelId || !topic || !question || !options || !correctAnswer) {
      return res.status(400).json({ message: 'levelId, topic, question, options and correctAnswer are required.' });
    }
    if (!Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ message: 'options must be an array with at least 2 items.' });
    }

    const newQuestion = await Question.create({
      levelId, topic, difficulty: difficulty || 6,
      question, options, correctAnswer,
      explanation: explanation || '',
      questionType: questionType || 'mcq',
    });

    res.status(201).json({ success: true, data: newQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── PUT /api/questions/admin/:id ── (admin) update question
export const updateQuestion = async (req, res) => {
  try {
    const updated = await Question.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Question not found.' });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ── DELETE /api/questions/admin/:id ── (admin) delete question
export const deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Question not found.' });
    res.json({ success: true, message: 'Question deleted.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
