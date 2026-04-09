import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuestionsByLevel, checkAnswer, saveProgress } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';

export default function GamePage() {
  const { levelId } = useParams();
  const navigate    = useNavigate();
  const { t, toNepaliDigit } = useTranslation();

  const [questions,            setQuestions]            = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer,       setSelectedAnswer]       = useState(null);
  const [isAnswered,           setIsAnswered]           = useState(false);
  const [isCorrect,            setIsCorrect]            = useState(false);
  const [correctCount,         setCorrectCount]         = useState(0);
  const [loading,              setLoading]              = useState(true);
  const [submitting,           setSubmitting]           = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionsByLevel(levelId);
        setQuestions(res.data.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [levelId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-game-purple to-game-dark">
        <div className="text-white text-2xl animate-pulse">Loading questions…</div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-white text-2xl">No questions found for this level.</p>
        <button
          onClick={() => navigate('/map')}
          className="btn-primary px-6 py-3"
        >
          ← Back to Map
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions  = questions.length;
  const progressPct     = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleSelectAnswer = (option) => {
    if (!isAnswered) setSelectedAnswer(option);
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isAnswered || submitting) return;
    setSubmitting(true);

    try {
      const res     = await checkAnswer(currentQuestion._id, selectedAnswer);
      const correct = res.data.isCorrect;
      setIsCorrect(correct);
      setIsAnswered(true);
      if (correct) setCorrectCount(prev => prev + 1);
    } catch (err) {
      console.error('Error checking answer:', err);
      const correct = selectedAnswer === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      if (correct) setCorrectCount(prev => prev + 1);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinishLevel = async () => {
    const score = Math.round((correctCount / totalQuestions) * 100);
    const stars =
      score === 100 ? 3 :
      score >= 80   ? 2 :
      score >= 60   ? 1 : 0;

    try {
      await saveProgress({ levelId, stars, score });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }

    navigate('/result', {
      state: {
        levelId,
        score,
        stars,
        correctCount,
        totalQuestions,
      },
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      handleFinishLevel();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark p-6">

      {/* ── Top bar ── */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => navigate('/map')}
            className="text-white/60 hover:text-white text-sm transition"
          >
            ← Map
          </button>

          {/* Score counter — uses Devanagari in Nepali mode */}
          <span className="text-game-yellow font-bold text-lg">
            {toNepaliDigit(correctCount)} / {toNepaliDigit(currentQuestionIndex + (isAnswered ? 1 : 0))} ✓
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-game-green h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question counter — uses Devanagari in Nepali mode */}
        <p className="text-white/60 text-sm mt-1 text-right">
          {t('game.question')} {toNepaliDigit(currentQuestionIndex + 1)} {t('game.of')} {toNepaliDigit(totalQuestions)}
        </p>
      </div>

      {/* ── Question card ── */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-game-purple mb-8 text-center">
          {currentQuestion.question}
        </h2>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, idx) => {
            let cls = 'bg-gray-100 text-gray-800 hover:bg-gray-200';
            if (isAnswered) {
              if (option === currentQuestion.correctAnswer)
                cls = 'bg-green-500 text-white ring-2 ring-green-300';
              else if (option === selectedAnswer && !isCorrect)
                cls = 'bg-red-400 text-white';
              else
                cls = 'bg-gray-100 text-gray-400';
            } else if (selectedAnswer === option) {
              cls = 'bg-game-blue text-white scale-105';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectAnswer(option)}
                disabled={isAnswered}
                className={`p-5 text-xl font-bold rounded-xl transition-all duration-200 ${cls} ${
                  isAnswered ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className={`p-4 rounded-xl text-center mb-4 ${
            isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'
          }`}>
            <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrect ? `✅ ${t('game.correct')}` : `❌ ${t('game.wrong')}`}
            </p>
            {!isCorrect && (
              <p className="text-gray-600 mt-1">
                {t('game.correctAnswer')} <strong>{currentQuestion.correctAnswer}</strong>
              </p>
            )}
            {currentQuestion.explanation && (
              <p className="text-gray-600 mt-1 text-sm">{currentQuestion.explanation}</p>
            )}
          </div>
        )}

        {/* Action button */}
        <div className="text-center">
          {!isAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || submitting}
              className="btn-primary px-10 py-3 text-lg disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? t('game.checking') : t('game.submit')}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-success px-10 py-3 text-lg animate-pulse"
            >
              {currentQuestionIndex < totalQuestions - 1
                ? t('game.next')
                : t('game.finish')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}