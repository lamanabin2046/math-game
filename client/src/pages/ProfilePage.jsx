import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-black text-game-yellow">{value}</div>
      <div className="text-white/60 text-xs mt-1">{label}</div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data.data);
      } catch (err) {
        setError('Could not load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

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
          <h1 className="text-3xl font-black text-game-yellow">👤 My Profile</h1>
        </div>

        {loading && (
          <p className="text-white/60 text-center animate-pulse">Loading…</p>
        )}

        {error && (
          <p className="text-red-400 text-center">{error}</p>
        )}

        {!loading && profile && (
          <>
            {/* Avatar + name */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 rounded-full bg-game-yellow flex items-center justify-center text-game-purple text-4xl font-black mb-3">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-white/50 text-sm">@{profile.username}</p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <StatCard icon="⭐" label="Total Points"      value={profile.totalPoints} />
              <StatCard icon="✅" label="Levels Completed"  value={profile.levelsCompleted} />
              <StatCard icon="🌟" label="Total Stars"       value={profile.totalStars} />
              <StatCard icon="📊" label="Average Score"     value={`${profile.avgScore}%`} />
            </div>

            {/* Grade breakdown */}
            {profile.gradeBreakdown && profile.gradeBreakdown.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
                <h3 className="text-white font-bold mb-3">Progress by Grade</h3>
                {profile.gradeBreakdown.map(g => (
                  <div key={g.grade} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Grade {g.grade}</span>
                      <span className="text-white/70">{g.completed} / {g.total} levels</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-game-green transition-all"
                        style={{ width: `${g.total > 0 ? (g.completed / g.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Recent activity */}
            {profile.recentProgress && profile.recentProgress.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
                <h3 className="text-white font-bold mb-3">Recent Activity</h3>
                {profile.recentProgress.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-white/10 last:border-0">
                    <div>
                      <p className="text-white text-sm font-medium">{p.levelTitle}</p>
                      <p className="text-white/40 text-xs">Grade {p.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-game-yellow font-bold">{p.score}%</p>
                      <p className="text-white/40 text-xs">{'⭐'.repeat(p.stars)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full py-3 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition mb-3"
        >
          🏆 View Leaderboard
        </button>

        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl font-bold text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300/50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
