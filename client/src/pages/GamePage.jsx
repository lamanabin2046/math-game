import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getQuestionsByLevel, checkAnswer, saveProgress } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { playCorrect, playWrong, playTick, playLevelComplete, playGameOver, playTimeUp, playClick } from '../utils/sounds';

const TIMER_SECONDS = 30;
const MAX_HINTS     = 2;
const MAX_LIVES     = 3;

export default function GamePage() {
  const { levelId }  = useParams();
  const navigate     = useNavigate();
  const location     = useLocation();
  const { t, toNepaliDigit } = useTranslation();

  const mode        = location.state?.mode ?? 'test';
  const isPractice  = mode === 'practice';

  const [questions,            setQuestions]            = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer,       setSelectedAnswer]       = useState(null);
  const [isAnswered,           setIsAnswered]           = useState(false);
  const [isCorrect,            setIsCorrect]            = useState(false);
  const [correctCount,         setCorrectCount]         = useState(0);
  const [loading,              setLoading]              = useState(true);
  const [submitting,           setSubmitting]           = useState(false);
  const [wrongAnswers,         setWrongAnswers]         = useState([]);
  const [timeLeft,             setTimeLeft]             = useState(TIMER_SECONDS);
  const [hintsLeft,            setHintsLeft]            = useState(MAX_HINTS);
  const [eliminatedOpts,       setEliminatedOpts]       = useState([]);
  const [lives,                setLives]                = useState(MAX_LIVES);
  const [gameOver,             setGameOver]             = useState(false);
  const livesRef = useRef(MAX_LIVES);

  const timerRef        = useRef(null);
  const isAnsweredRef   = useRef(false);
  const questionsRef    = useRef([]);
  const questionIdxRef  = useRef(0);
  const wrongAnswersRef = useRef([]);

  useEffect(() => { isAnsweredRef.current   = isAnswered;           }, [isAnswered]);
  useEffect(() => { questionsRef.current    = questions;            }, [questions]);
  useEffect(() => { questionIdxRef.current  = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { wrongAnswersRef.current = wrongAnswers;         }, [wrongAnswers]);

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  // ── Lose a life ──
  const loseLife = () => {
    if (isPractice) return;
    livesRef.current = livesRef.current - 1;
    setLives(livesRef.current);
    if (livesRef.current <= 0) {
      stopTimer();
      setGameOver(true);
      playGameOver();
    }
  };

  const startTimer = useCallback(() => {
    if (isPractice) return;
    stopTimer();
    setTimeLeft(TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer();
          if (!isAnsweredRef.current) {
            const q = questionsRef.current[questionIdxRef.current];
            if (q) {
              const entry = {
                question: q.question, options: q.options,
                yourAnswer: 'No answer (time up)',
                correctAnswer: q.correctAnswer, explanation: q.explanation,
              };
              wrongAnswersRef.current = [...wrongAnswersRef.current, entry];
              setWrongAnswers([...wrongAnswersRef.current]);
            }
            isAnsweredRef.current = true;
            setIsAnswered(true);
            setIsCorrect(false);
            playTimeUp();
            livesRef.current = livesRef.current - 1;
            setLives(livesRef.current);
            if (livesRef.current <= 0) {
              setGameOver(true);
              playGameOver();
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isPractice]);

  useEffect(() => () => stopTimer(), []);

  // ── Tick sound for last 10 seconds ──
  useEffect(() => {
    if (!isPractice && timeLeft <= 10 && timeLeft > 0 && !isAnswered) {
      playTick();
    }
  }, [timeLeft]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestionsByLevel(levelId);
        setQuestions(res.data.data);
        questionsRef.current = res.data.data;
        if (!isPractice) startTimer();
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [levelId]);

  // ── Hint handler ──
  const handleHint = () => {
    if (hintsLeft <= 0 || isAnswered || !isPractice) return;
    const q      = questions[currentQuestionIndex];
    const wrong  = q.options.filter(o => String(o) !== String(q.correctAnswer) && !eliminatedOpts.includes(o));
    const toElim = wrong.sort(() => Math.random() - 0.5).slice(0, 2);
    setEliminatedOpts(prev => [...prev, ...toElim]);
    setHintsLeft(prev => prev - 1);
    playClick();
  };

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
        <button onClick={() => navigate('/map')} className="btn-primary px-6 py-3">← Back to Map</button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center px-4">
        <div className="text-8xl mb-4 animate-bounce">💀</div>
        <h1 className="text-4xl font-black text-red-400 mb-2">Game Over!</h1>
        <p className="text-white/60 mb-2">You ran out of lives</p>
        <p className="text-white/60 mb-8">
          You answered <strong className="text-white">{correctCount}</strong> out of <strong className="text-white">{currentQuestionIndex + 1}</strong> correctly
        </p>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 transition"
          >
            🔄 Try Again
          </button>
          <button
            onClick={() => navigate('/map')}
            className="w-full py-3 rounded-2xl font-bold text-white/70 hover:text-white border border-white/20 transition text-center"
          >
            🗺️ Back to Map
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions  = questions.length;
  const progressPct     = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const timerPct        = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor      = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500';
  const timerTextColor  = timeLeft > 20 ? 'text-green-400' : timeLeft > 10 ? 'text-yellow-400' : 'text-red-400';

  const handleSelectAnswer = (option) => {
    if (!isAnswered && !eliminatedOpts.includes(option)) {
      setSelectedAnswer(option);
      playClick();
    }
  };

  const handleSubmitAnswer = async () => {
    if (selectedAnswer === null || isAnswered || submitting) return;
    stopTimer();
    setSubmitting(true);

    try {
      const res     = await checkAnswer(currentQuestion._id, selectedAnswer);
      const correct = res.data.isCorrect;
      setIsCorrect(correct);
      setIsAnswered(true);
      if (correct) {
        setCorrectCount(prev => prev + 1);
        playCorrect();
      } else {
        playWrong();
        const entry = {
          question: currentQuestion.question, options: currentQuestion.options,
          yourAnswer: selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer, explanation: currentQuestion.explanation,
        };
        wrongAnswersRef.current = [...wrongAnswersRef.current, entry];
        setWrongAnswers([...wrongAnswersRef.current]);
        loseLife();
      }
    } catch (err) {
      const correct = selectedAnswer === currentQuestion.correctAnswer;
      setIsCorrect(correct);
      setIsAnswered(true);
      if (correct) {
        setCorrectCount(prev => prev + 1);
        playCorrect();
      } else {
        playWrong();
        const entry = {
          question: currentQuestion.question, options: currentQuestion.options,
          yourAnswer: selectedAnswer,
          correctAnswer: currentQuestion.correctAnswer, explanation: currentQuestion.explanation,
        };
        wrongAnswersRef.current = [...wrongAnswersRef.current, entry];
        setWrongAnswers([...wrongAnswersRef.current]);
        loseLife();
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleFinishLevel = async () => {
    stopTimer();
    playLevelComplete();
    const score = Math.round((correctCount / totalQuestions) * 100);
    const stars = score === 100 ? 3 : score >= 80 ? 2 : score >= 60 ? 1 : 0;
    let newBadges = [];
    try {
      const res = await saveProgress({ levelId, stars, score, timeLeft, mode });
      newBadges = res.data.newBadges ?? [];
    } catch {}
    navigate('/result', {
      state: { levelId, score, stars, correctCount, totalQuestions, wrongAnswers: wrongAnswersRef.current, mode, newBadges },
    });
  };

  const handleNextQuestion = () => {
    stopTimer();
    playClick();
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIdx = currentQuestionIndex + 1;
      questionIdxRef.current = nextIdx;
      isAnsweredRef.current  = false;
      setCurrentQuestionIndex(nextIdx);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setEliminatedOpts([]);
      if (!isPractice) startTimer();
    } else {
      handleFinishLevel();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark p-6">

      {/* ── Top bar ── */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => { stopTimer(); navigate('/map'); }}
            className="text-white/60 hover:text-white text-sm transition"
          >
            ← Map
          </button>

          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            isPractice
              ? 'bg-green-500/30 text-green-300 border border-green-500/40'
              : 'bg-red-500/30 text-red-300 border border-red-500/40'
          }`}>
            {isPractice ? '📖 Practice Mode' : '⏱ Test Mode'}
          </span>

          <div className="flex items-center gap-2">
            {!isPractice && (
              <div className="flex gap-1">
                {[1,2,3].map(i => (
                  <span key={i} className={`text-xl ${i <= lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>
                    ❤️
                  </span>
                ))}
              </div>
            )}
            <span className="text-game-yellow font-bold text-lg">
              {toNepaliDigit(correctCount)} / {toNepaliDigit(currentQuestionIndex + (isAnswered ? 1 : 0))} ✓
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
          <div
            className="bg-game-green h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-white/60 text-sm text-right">
          {t('game.question')} {toNepaliDigit(currentQuestionIndex + 1)} {t('game.of')} {toNepaliDigit(totalQuestions)}
        </p>
      </div>

      {/* ── Timer (test mode only) ── */}
      {!isPractice && (
        <div className="max-w-2xl mx-auto mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-white/60 text-sm">⏱ Time</span>
            <span className={`font-bold text-lg ${timerTextColor}`}>{timeLeft}s</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${timerColor}`}
              style={{ width: `${timerPct}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Hints bar (practice mode only) ── */}
      {isPractice && !isAnswered && (
        <div className="max-w-2xl mx-auto mb-4 flex items-center justify-between">
          <span className="text-white/60 text-sm">💡 Hints remaining: <strong className="text-white">{hintsLeft}</strong></span>
          <button
            onClick={handleHint}
            disabled={hintsLeft <= 0 || isAnswered}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              hintsLeft > 0
                ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            💡 50/50 Hint
          </button>
        </div>
      )}

      {/* ── Question card ── */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-game-purple mb-8 text-center">
          {currentQuestion.question}
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQuestion.options.map((option, idx) => {
            const isEliminated = eliminatedOpts.includes(option);
            let cls = 'bg-gray-100 text-gray-800 hover:bg-gray-200';

            if (isEliminated) {
              cls = 'bg-gray-100 text-gray-300 line-through cursor-not-allowed opacity-40';
            } else if (isAnswered) {
              if (String(option) === String(currentQuestion.correctAnswer))
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
                disabled={isAnswered || isEliminated}
                className={`p-5 text-xl font-bold rounded-xl transition-all duration-200 ${cls} ${
                  isAnswered || isEliminated ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

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
            {isPractice && currentQuestion.explanation && (
              <p className="text-gray-600 mt-2 text-sm italic bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                💡 {currentQuestion.explanation}
              </p>
            )}
          </div>
        )}

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
              {currentQuestionIndex < totalQuestions - 1 ? t('game.next') : t('game.finish')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
