import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLevels, getProgress } from '../services/api';
import { useGame } from '../context/GameContext';

function Stars({ count }) {
  return (
    <div className="flex justify-center gap-0.5">
      {[1, 2, 3].map(i => (
        <span key={i} className={`text-lg ${i <= count ? 'opacity-100' : 'opacity-20'}`}>⭐</span>
      ))}
    </div>
  );
}

// ── Mode Selection Modal ──
function ModeModal({ level, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">

        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm font-medium mb-1">Level {level.levelNumber}</p>
          <h2 className="text-2xl font-black text-game-purple">{level.topic}</h2>
          <p className="text-gray-400 text-sm mt-1">Grade {level.grade}</p>
        </div>

        <p className="text-center text-gray-600 font-medium mb-5">Choose your mode:</p>

        <div className="flex flex-col gap-4">

          {/* Practice Mode */}
          <button
            onClick={() => onSelect('practice')}
            className="w-full rounded-2xl border-2 border-green-300 bg-green-50 hover:bg-green-100 p-5 text-left transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">📖</span>
              <span className="text-xl font-black text-green-700">Practice Mode</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1 ml-10">
              <li>✅ No timer — take your time</li>
              <li>✅ 2 hints available (50/50)</li>
              <li>✅ See explanation after each answer</li>
            </ul>
          </button>

          {/* Test Mode */}
          <button
            onClick={() => onSelect('test')}
            className="w-full rounded-2xl border-2 border-red-300 bg-red-50 hover:bg-red-100 p-5 text-left transition"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">⏱</span>
              <span className="text-xl font-black text-red-700">Test Mode</span>
            </div>
            <ul className="text-sm text-red-700 space-y-1 ml-10">
              <li>⏱ 30 seconds per question</li>
              <li>❌ No hints allowed</li>
              <li>📋 Review wrong answers at end</li>
            </ul>
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 text-gray-400 hover:text-gray-600 text-sm transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function MapPage() {
  const navigate    = useNavigate();
  const { isAdmin } = useGame();

  const [levels,        setLevels]        = useState([]);
  const [progress,      setProgress]      = useState({});
  const [loading,       setLoading]       = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [streak,        setStreak]        = useState(0);

  useEffect(() => {
    const s = localStorage.getItem('currentStreak');
    if (s) setStreak(Number(s));
  }, []);

  const load = async () => {
    try {
      const [levelsRes, progressRes] = await Promise.all([getAllLevels(), getProgress()]);
      setLevels(levelsRes.data);
      const progressMap = {};
      (progressRes.data.data ?? []).forEach(p => {
        if (!p.level) return; // skip broken progress records
        progressMap[p.level._id ?? p.level] = {
          stars: p.stars, score: p.score, completed: p.completed,
        };
      });
      setProgress(progressMap);
    } catch (err) {
      console.error('Error loading map:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load on mount
  useEffect(() => { load(); }, []);

  // Reload every time user comes back to this page
  useEffect(() => {
    const handleFocus = () => load();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200">
        <div className="text-4xl animate-bounce">🐢</div>
      </div>
    );
  }

  const isUnlocked = (index) => {
    if (isAdmin) return true;
    if (index === 0) return true;
    const prevLevel    = levels[index - 1];
    const prevProgress = progress[prevLevel?._id];
    return prevProgress?.completed === true;
  };

  const handleLevelClick = (level, index) => {
    if (!isUnlocked(index)) return;
    if (isAdmin) {
      // Admin skips mode selection — go straight to test mode
      navigate(`/game/${level._id}`, { state: { mode: 'test' } });
    } else {
      setSelectedLevel(level);
    }
  };

  const handleModeSelect = (mode) => {
    navigate(`/game/${selectedLevel._id}`, { state: { mode } });
    setSelectedLevel(null);
  };

  const totalStars     = Object.values(progress).reduce((s, p) => s + (p.stars ?? 0), 0);
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200 p-6">

      {/* Mode modal */}
      {selectedLevel && (
        <ModeModal
          level={selectedLevel}
          onSelect={handleModeSelect}
          onClose={() => setSelectedLevel(null)}
        />
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-green-700 drop-shadow-lg">🏔️ Math Mountain</h1>
        <p className="text-gray-700 text-lg mt-1">Climb by completing levels!</p>

        {isAdmin && (
          <div className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full
            bg-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30">
            🛡️ Admin Mode — All levels unlocked
          </div>
        )}

        {!isAdmin && (
          <div className="flex justify-center gap-4 mt-3 flex-wrap">
            <span className="bg-white/70 rounded-full px-4 py-1 font-bold text-gray-700 text-sm">
              ⭐ {totalStars} stars
            </span>
            <span className="bg-white/70 rounded-full px-4 py-1 font-bold text-gray-700 text-sm">
              ✅ {completedCount} / {levels.length} done
            </span>
            {streak > 0 && (
              <span className="bg-orange-400/80 rounded-full px-4 py-1 font-bold text-white text-sm">
                🔥 {streak} day streak
              </span>
            )}
          </div>
        )}

        {/* ── Nav buttons ── */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => navigate('/profile')}
            className="bg-white/80 hover:bg-white text-gray-700 px-5 py-2 rounded-full font-bold shadow text-sm transition"
          >
            👤 Profile
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            className="bg-white/80 hover:bg-white text-gray-700 px-5 py-2 rounded-full font-bold shadow text-sm transition"
          >
            🏆 Leaderboard
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
              text-white px-5 py-2 rounded-full font-bold shadow text-sm transition"
          >
            ← Home
          </button>
        </div>
      </div>

      {/* ── Daily Challenge card ── */}
      {!isAdmin && (
        <div className="max-w-2xl mx-auto mb-6">
          <button
            onClick={() => navigate('/daily-challenge')}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500
              hover:from-yellow-500 hover:to-orange-600
              rounded-2xl p-5 flex items-center justify-between shadow-xl
              transform hover:scale-105 transition-all"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎯</span>
              <div className="text-left">
                <p className="text-white font-black text-lg">Daily Challenge</p>
                <p className="text-white/80 text-sm">One new challenge every day!</p>
              </div>
            </div>
            <span className="text-white font-black text-2xl">→</span>
          </button>
        </div>
      )}

      {/* Map */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-7xl animate-bounce">{isAdmin ? '🛡️' : '🐢'}</div>
          <p className="text-gray-800 font-bold mt-1">{isAdmin ? 'Playing as Admin' : "Let's Climb!"}</p>
        </div>

        <div className="space-y-6">
          {levels.map((level, index) => {
            const unlocked  = isUnlocked(index);
            const prog      = progress[level._id];
            const completed = prog?.completed ?? false;
            const stars     = prog?.stars ?? 0;
            const score     = prog?.score ?? 0;
            const isCurrent = !isAdmin && unlocked && !completed;

            return (
              <div
                key={level._id}
                className={`transition-all duration-300 ${index % 2 === 0 ? 'ml-0' : 'ml-16'}`}
              >
                <div className="flex items-end gap-4">
                  <button
                    onClick={() => handleLevelClick(level, index)}
                    disabled={!unlocked}
                    className={`
                      flex-1 h-24 rounded-2xl shadow-xl border-4 font-bold
                      flex flex-col items-center justify-center gap-1
                      transition-all duration-200 relative overflow-hidden
                      ${isAdmin
                        ? 'bg-gradient-to-br from-purple-500 to-indigo-600 border-purple-300 hover:scale-105 cursor-pointer'
                        : completed
                          ? 'bg-gradient-to-br from-emerald-400 to-green-600 border-white hover:scale-105 cursor-pointer'
                          : isCurrent
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 border-white scale-105 hover:scale-110 animate-pulse cursor-pointer'
                            : 'bg-gray-300 border-gray-400 cursor-not-allowed opacity-60'
                      }
                    `}
                  >
                    {(completed || isAdmin) && (
                      <div className="absolute top-0 left-2 w-6 h-full bg-white/20 skew-x-12 pointer-events-none" />
                    )}
                    <span className="text-white text-lg font-black drop-shadow">
                      Level {level.levelNumber ?? index + 1}
                    </span>
                    <span className="text-white/90 text-xs text-center px-2 drop-shadow">
                      {level.title}
                    </span>
                    {completed && score > 0 && (
                      <span className="text-white/80 text-xs">{score}%</span>
                    )}
                  </button>

                  <div className="flex flex-col items-center gap-1 min-w-[48px]">
                    {!unlocked && !isAdmin
                      ? <span className="text-3xl">🔒</span>
                      : <Stars count={stars} />
                    }
                  </div>
                </div>

                {index < levels.length - 1 && (
                  <div className={`mt-1 ml-4 ${index % 2 === 0 ? 'flex justify-start' : 'flex justify-end mr-16'}`}>
                    <div className="w-1 h-10 bg-gradient-to-b from-yellow-300 to-orange-300 rounded-full opacity-60" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12 p-6 bg-white/80 backdrop-blur rounded-3xl shadow-xl">
          {completedCount === levels.length && !isAdmin
            ? <><p className="text-4xl mb-2">🏆</p><p className="text-green-700 font-bold text-lg">YOU ARE A MATH MASTER!</p></>
            : <><p className="text-3xl mb-2">🏔️</p><p className="text-gray-700 font-bold">Complete all {levels.length} levels to reach the top!</p></>
          }
        </div>
      </div>


    </div>
  );
}
