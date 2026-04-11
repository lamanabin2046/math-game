import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLeaderboard } from '../services/api';

const MEDAL = ['🥇', '🥈', '🥉'];

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState('');

  const myId = localStorage.getItem('studentId');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLeaderboard();
        setStudents(res.data.data);
      } catch (err) {
        setError('Could not load leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark px-4 py-10">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/map')}
            className="text-white/60 hover:text-white transition text-sm"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-black text-game-yellow">🏆 Leaderboard</h1>
        </div>

        {loading && (
          <p className="text-white/60 text-center animate-pulse">Loading…</p>
        )}

        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {!loading && students.length === 0 && (
          <p className="text-white/60 text-center">No players yet. Be the first!</p>
        )}

        {/* Table */}
        {!loading && students.length > 0 && (
          <div className="flex flex-col gap-3">
            {students.map((s, idx) => {
              const isMe = s._id === myId;
              return (
                <div
                  key={s._id}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 border transition ${
                    isMe
                      ? 'bg-game-yellow/20 border-game-yellow/50'
                      : 'bg-white/10 border-white/10'
                  }`}
                >
                  {/* Rank */}
                  <div className="text-2xl w-8 text-center">
                    {idx < 3 ? MEDAL[idx] : <span className="text-white/50 font-bold text-lg">{idx + 1}</span>}
                  </div>

                  {/* Avatar */}
                  <div style={{ fontSize: 28 }}>
                    {s._id === myId ? (localStorage.getItem('avatar') ?? s.avatar ?? '🐯') : (s.avatar ?? '🐯')}
                  </div>

                  {/* Name + levels */}
                  <div className="flex-1 min-w-0">
                    <p className={`font-bold truncate ${isMe ? 'text-game-yellow' : 'text-white'}`}>
                      {s.name} {isMe && <span className="text-xs">(You)</span>}
                    </p>
                    <p className="text-white/50 text-xs">
                      {s.levelsCompleted} levels completed
                    </p>
                  </div>

                  {/* Points */}
                  <div className="text-right">
                    <p className="text-game-yellow font-black text-lg">{s.totalPoints}</p>
                    <p className="text-white/40 text-xs">pts</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <button
          onClick={() => navigate('/profile')}
          className="mt-8 w-full py-3 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition"
        >
          👤 My Profile
        </button>
      </div>
    </div>
  );
}
