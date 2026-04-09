import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLevels } from '../services/api';

export default function AdminPage() {
  const navigate = useNavigate();
  const [levels,  setLevels]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  // Redirect if not admin
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') navigate('/');
  }, []);

  useEffect(() => {
    getAllLevels()
      .then(res => setLevels(res.data))
      .catch(() => setError('Could not load levels.'))
      .finally(() => setLoading(false));
  }, []);

  // Group levels by grade
  const byGrade = levels.reduce((acc, lvl) => {
    if (!acc[lvl.grade]) acc[lvl.grade] = [];
    acc[lvl.grade].push(lvl);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-game-yellow">🛠 Admin Panel</h1>
            <p className="text-white/50 text-sm mt-1">Manage questions for each level</p>
          </div>
          <button
            onClick={() => navigate('/map')}
            className="text-white/60 hover:text-white text-sm transition"
          >
            ← Back to Map
          </button>
        </div>

        {loading && <p className="text-white/60 animate-pulse">Loading levels…</p>}
        {error   && <p className="text-red-400">{error}</p>}

        {/* Levels grouped by grade */}
        {Object.entries(byGrade).sort(([a],[b]) => a-b).map(([grade, lvls]) => (
          <div key={grade} className="mb-8">
            <h2 className="text-white font-bold text-lg mb-3 border-b border-white/20 pb-2">
              📚 Grade {grade}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {lvls.map(lvl => (
                <button
                  key={lvl._id}
                  onClick={() => navigate(`/admin/questions/${lvl._id}`, { state: { level: lvl } })}
                  className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-left transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">Level {lvl.levelNumber}</p>
                      <p className="text-white/60 text-sm mt-1">{lvl.topic}</p>
                    </div>
                    <span className="text-2xl">✏️</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
