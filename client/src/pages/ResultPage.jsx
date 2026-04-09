import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllLevels } from '../services/api';

function StarDisplay({ stars }) {
  return (
    <div className="flex justify-center gap-3 my-4">
      {[1, 2, 3].map(i => (
        <span
          key={i}
          className={`text-6xl transition-all duration-500 ${
            i <= stars ? 'opacity-100' : 'opacity-20 grayscale'
          }`}
          style={{
            filter:    i <= stars ? 'drop-shadow(0 0 8px #FFD700)' : undefined,
            transform: i <= stars ? 'scale(1.1)' : 'scale(0.9)',
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  );
}

function getMessage(stars) {
  if (stars === 3) return { emoji: '🏆', text: 'PERFECT! You are a Math Master!' };
  if (stars === 2) return { emoji: '🎉', text: 'Great job! Almost perfect!' };
  if (stars === 1) return { emoji: '👍', text: 'Good effort! Keep practicing!' };
  return { emoji: '💪', text: "Don't give up! Try again!" };
}

export default function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state    = location.state;

  const [nextLevelId,   setNextLevelId]   = useState(null);
  const [loadingNext,   setLoadingNext]   = useState(true);
  const [showReview,    setShowReview]    = useState(false);

  const levelId        = state?.levelId        ?? null;
  const score          = state?.score          ?? 0;
  const stars          = state?.stars          ?? 0;
  const correctCount   = state?.correctCount   ?? 0;
  const totalQuestions = state?.totalQuestions ?? 0;
  const wrongAnswers   = state?.wrongAnswers   ?? [];
  const newBadges      = state?.newBadges      ?? [];
  const passed         = stars >= 1;

  const { emoji, text } = getMessage(stars);

  useEffect(() => {
    const findNext = async () => {
      if (!levelId) { setLoadingNext(false); return; }
      try {
        const res    = await getAllLevels();
        const levels = res.data;
        const idx    = levels.findIndex(l => l._id === levelId);
        if (idx !== -1 && idx + 1 < levels.length) {
          setNextLevelId(levels[idx + 1]._id);
        }
      } catch (err) {
        console.error('Could not load levels:', err);
      } finally {
        setLoadingNext(false);
      }
    };
    findNext();
  }, [levelId]);

  if (!state) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-white text-xl">No result data found.</p>
        <button onClick={() => navigate('/map')} className="btn-primary px-6 py-3">
          ← Go to Map
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center px-4 py-12">

      {/* ── Emoji + Title ── */}
      <div className="text-8xl mb-2 animate-bounce">{emoji}</div>
      <h1 className="text-4xl font-bold text-game-yellow text-center mb-1">Level Complete!</h1>
      <p className="text-white/70 text-lg text-center mb-4">{text}</p>

      {/* ── Stars ── */}
      <StarDisplay stars={stars} />

      {/* ── New Badges Earned ── */}
      {newBadges.length > 0 && (
        <div className="w-full max-w-sm mb-4 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl p-4 text-center">
          <p className="text-yellow-300 font-bold mb-3">🎉 New Badge{newBadges.length > 1 ? 's' : ''} Earned!</p>
          <div className="flex flex-wrap justify-center gap-3">
            {newBadges.map((b, i) => (
              <div key={i} className="bg-white/10 rounded-xl px-4 py-2 text-center">
                <p className="text-2xl">{b.emoji}</p>
                <p className="text-white text-xs font-bold mt-1">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Score card ── */}
      <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 w-full max-w-sm mb-4 text-center">
        <div className="text-6xl font-black text-game-yellow mb-1">{score}%</div>
        <p className="text-white/60 text-sm mb-4">{correctCount} out of {totalQuestions} correct</p>

        <div className="w-full bg-white/20 rounded-full h-3 mb-3">
          <div
            className={`h-3 rounded-full transition-all duration-700 ${
              score >= 80 ? 'bg-green-400' : score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>

        <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
          passed
            ? 'bg-green-500/30 text-green-300 border border-green-500/50'
            : 'bg-red-500/30 text-red-300 border border-red-500/50'
        }`}>
          {passed ? '✅ Passed' : '❌ Not passed yet (need 60%)'}
        </span>
      </div>

      {/* ── Wrong Answer Review ── */}
      {wrongAnswers.length > 0 && (
        <div className="w-full max-w-sm mb-4">
          <button
            onClick={() => setShowReview(v => !v)}
            className="w-full py-3 rounded-2xl font-bold text-white bg-orange-500/30 hover:bg-orange-500/50 border border-orange-400/40 transition text-center"
          >
            {showReview ? '▲ Hide' : '▼ Review'} {wrongAnswers.length} Wrong Answer{wrongAnswers.length > 1 ? 's' : ''}
          </button>

          {showReview && (
            <div className="mt-3 flex flex-col gap-3">
              {wrongAnswers.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 text-left shadow-lg">
                  <p className="font-bold text-gray-800 mb-2 text-sm">
                    Q{idx + 1}: {item.question}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {item.options.map((opt, i) => {
                      const isCorrect = opt === item.correctAnswer;
                      const isYours   = opt === item.yourAnswer && opt !== item.correctAnswer;
                      return (
                        <div
                          key={i}
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            isCorrect ? 'bg-green-100 text-green-800 border border-green-300' :
                            isYours   ? 'bg-red-100 text-red-700 border border-red-300' :
                                        'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {isCorrect ? '✅ ' : isYours ? '❌ ' : ''}{opt}
                        </div>
                      );
                    })}
                  </div>

                  <p className="text-xs text-gray-500 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                    <strong>Your answer:</strong> {item.yourAnswer}<br />
                    {item.explanation && <span><strong>Explanation:</strong> {item.explanation}</span>}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {passed && !loadingNext && nextLevelId && (
          <button
            onClick={() => navigate(`/game/${nextLevelId}`)}
            className="w-full py-4 rounded-2xl font-bold text-xl text-white
              bg-gradient-to-r from-green-500 to-emerald-500
              hover:from-green-600 hover:to-emerald-600
              transform hover:scale-105 transition-all shadow-lg shadow-green-500/30"
          >
            Next Level ▶
          </button>
        )}

        {levelId && (
          <button
            onClick={() => navigate(`/game/${levelId}`)}
            className="w-full py-3 rounded-2xl font-bold text-lg text-white
              bg-white/10 hover:bg-white/20 border border-white/20 transition"
          >
            🔄 Play Again
          </button>
        )}

        <button
          onClick={() => navigate('/map')}
          className="w-full py-3 rounded-2xl font-bold text-lg text-white/70 hover:text-white transition text-center"
        >
          🗺️ Back to Map
        </button>

        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full py-3 rounded-2xl font-bold text-lg text-white/70 hover:text-white transition text-center"
        >
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );
}
