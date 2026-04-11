import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateAvatar } from '../services/api';


const AVATARS = [
  '🐯','🦁','🐻','🐼','🦊','🐸','🐧','🦄',
  '🦋','🐬','🦅','🐉','🤖','👨‍🚀','🦸','🧙',
  '🎃','🦖','🦩','🐙','🦝','🐺','🦒','🐘',
  '🏆','⚡','🔥','🌟','💎','🚀','🎯','🎮',
]

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-black text-game-yellow">{value}</div>
      <div className="text-white/60 text-xs mt-1">{label}</div>
    </div>
  )
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const [profile,       setProfile]       = useState(null)
  const [loading,       setLoading]       = useState(true)
  const [error,         setError]         = useState('')
  const [showPicker,    setShowPicker]    = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState(null)
  const [saving,        setSaving]        = useState(false)
  const [success,       setSuccess]       = useState('')

  useEffect(() => {
    getProfile()
      .then(res => {
        setProfile(res.data.data)
        setSelectedAvatar(res.data.data.avatar ?? '🐯')
      })
      .catch(() => setError('Could not load profile.'))
      .finally(() => setLoading(false))
  }, [])

  const handleSaveAvatar = async (emoji) => {
    setSaving(true)
    try {
      await updateAvatar(emoji)
      setSelectedAvatar(emoji)
      setProfile(prev => ({ ...prev, avatar: emoji }))
      localStorage.setItem('avatar', emoji)  // ← ADD THIS
      setShowPicker(false)
      setSuccess('Avatar updated!')
      setTimeout(() => setSuccess(''), 2000)
    } catch {
      setError('Failed to update avatar.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-game-purple to-game-dark">
      <div className="text-white text-2xl animate-pulse">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark px-4 py-10">
      <div className="max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate('/map')} className="text-white/60 hover:text-white transition text-sm">
            ← Back
          </button>
          <h1 className="text-3xl font-black text-game-yellow">👤 My Profile</h1>
        </div>

        {error   && <div className="bg-red-500/20 border border-red-400/40 text-red-300 rounded-xl px-4 py-3 mb-4">{error}</div>}
        {success && <div className="bg-green-500/20 border border-green-400/40 text-green-300 rounded-xl px-4 py-3 mb-4">{success}</div>}

        {profile && (
          <>
            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-white/10 border-4 border-game-yellow flex items-center justify-center text-6xl mb-2">
                  {selectedAvatar}
                </div>
                <button
                  onClick={() => setShowPicker(v => !v)}
                  className="absolute bottom-2 right-0 bg-game-yellow text-game-purple text-xs font-black px-2 py-1 rounded-full border-2 border-white"
                >
                  ✏️ Edit
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mt-2">{profile.name}</h2>
              <p className="text-white/50 text-sm">@{profile.username}</p>
            </div>

            {/* Avatar Picker */}
            {showPicker && (
              <div className="bg-white rounded-2xl p-5 mb-6 shadow-2xl">
                <p className="text-game-purple font-black text-lg mb-3 text-center">Choose Your Avatar</p>
                <div className="grid grid-cols-8 gap-2">
                  {AVATARS.map((emoji, i) => (
                    <button
                      key={i}
                      onClick={() => handleSaveAvatar(emoji)}
                      disabled={saving}
                      className={`text-3xl p-2 rounded-xl transition hover:scale-125 ${
                        selectedAvatar === emoji
                          ? 'bg-game-purple/20 ring-2 ring-game-purple scale-110'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowPicker(false)}
                  className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-sm transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <StatCard icon="⭐" label="Total Points"    value={profile.totalPoints} />
              <StatCard icon="✅" label="Levels Done"     value={profile.levelsCompleted} />
              <StatCard icon="🌟" label="Total Stars"     value={profile.totalStars} />
              <StatCard icon="📊" label="Avg Score"       value={`${profile.avgScore}%`} />
              <StatCard icon="🔥" label="Streak"          value={`${profile.currentStreak ?? 0}d`} />
              <StatCard icon="💎" label="Best Streak"     value={`${profile.longestStreak ?? 0}d`} />
            </div>

            {/* Badges */}
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
              <h3 className="text-white font-bold mb-3">🏅 My Badges ({profile.badges?.length ?? 0})</h3>
              {profile.badges?.length === 0 ? (
                <p className="text-white/50 text-sm text-center">No badges yet — complete levels to earn them!</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {profile.badges?.map((b, i) => (
                    <div key={i} className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center min-w-[80px]">
                      <p className="text-3xl">{b.emoji}</p>
                      <p className="text-white text-xs font-bold mt-1">{b.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{b.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Grade progress */}
            {profile.gradeBreakdown?.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
                <h3 className="text-white font-bold mb-3">Progress by Grade</h3>
                {profile.gradeBreakdown.map(g => (
                  <div key={g.grade} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white/70">Grade {g.grade}</span>
                      <span className="text-white/70">{g.completed}/{g.total}</span>
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
            {profile.recentProgress?.length > 0 && (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-6">
                <h3 className="text-white font-bold mb-3">📈 Recent Activity</h3>
                {profile.recentProgress.map((p, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
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
          onClick={() => { localStorage.clear(); navigate('/'); }}
          className="w-full py-3 rounded-2xl font-bold text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-300/50 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
