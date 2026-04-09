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

export default function MapPage() {
  const navigate       = useNavigate();
  const { isAdmin }    = useGame();           // ← admin flag from context

  const [levels,   setLevels]   = useState([]);
  const [progress, setProgress] = useState({});
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [levelsRes, progressRes] = await Promise.all([
          getAllLevels(),
          getProgress(),
        ]);

        setLevels(levelsRes.data);

        const progressMap = {};
        (progressRes.data.data ?? []).forEach(p => {
          progressMap[p.level._id ?? p.level] = {
            stars:     p.stars,
            score:     p.score,
            completed: p.completed,
          };
        });
        setProgress(progressMap);
      } catch (err) {
        console.error('Error loading map:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200">
        <div className="text-4xl animate-bounce">🐢</div>
      </div>
    );
  }

  // ── Unlock logic ──────────────────────────────────────────────
  // Admins: ALL levels unlocked.
  // Students: level N unlocked only if level N-1 is completed.
  const isUnlocked = (index) => {
    if (isAdmin) return true;                         // ← admin bypass
    if (index === 0) return true;
    const prevLevel    = levels[index - 1];
    const prevProgress = progress[prevLevel?._id];
    return prevProgress?.completed === true;
  };

  const totalStars     = Object.values(progress).reduce((s, p) => s + (p.stars ?? 0), 0);
  const completedCount = Object.values(progress).filter(p => p.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200 p-6">

      {/* ── Header ── */}
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-green-700 drop-shadow-lg">🏔️ Math Mountain</h1>
        <p className="text-gray-700 text-lg mt-1">Climb by completing levels!</p>

        {/* Admin banner */}
        {isAdmin && (
          <div className="inline-flex items-center gap-2 mt-3 px-5 py-2 rounded-full
            bg-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/30">
            🛡️ Admin Mode — All levels unlocked
          </div>
        )}

        {/* Stats */}
        {!isAdmin && (
          <div className="flex justify-center gap-6 mt-3">
            <span className="bg-white/70 rounded-full px-4 py-1 font-bold text-gray-700 text-sm">
              ⭐ {totalStars} stars
            </span>
            <span className="bg-white/70 rounded-full px-4 py-1 font-bold text-gray-700 text-sm">
              ✅ {completedCount} / {levels.length} done
            </span>
          </div>
        )}
      </div>

      {/* ── Map ── */}
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-7xl animate-bounce">{isAdmin ? '🛡️' : '🐢'}</div>
          <p className="text-gray-800 font-bold mt-1">
            {isAdmin ? 'Playing as Admin' : "Let's Climb!"}
          </p>
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
                    onClick={() => navigate(`/game/${level._id}`)}
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
                    {/* Shine */}
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

                  {/* Stars or lock */}
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

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/')}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
            text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg
            transform hover:scale-105 transition-transform"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
