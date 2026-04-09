import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDailyChallenge, submitDailyChallenge, checkAnswer } from '../services/api'

const TIMER_SECONDS = 30

function Countdown({ ms }) {
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return (
    <span className="font-mono text-game-yellow font-black text-2xl">
      {String(h).padStart(2,'0')}:{String(m).padStart(2,'0')}:{String(s).padStart(2,'0')}
    </span>
  )
}

export default function DailyChallengePage() {
  const navigate = useNavigate()

  const [status,     setStatus]     = useState('loading') // loading | ready | playing | finished | already_played
  const [challenge,  setChallenge]  = useState(null)
  const [msUntilNext, setMsUntilNext] = useState(0)

  // Game state
  const [questions,   setQuestions]   = useState([])
  const [qIdx,        setQIdx]        = useState(0)
  const [selected,    setSelected]    = useState(null)
  const [isAnswered,  setIsAnswered]  = useState(false)
  const [isCorrect,   setIsCorrect]   = useState(false)
  const [correctCount,setCorrectCount]= useState(0)
  const [wrongAnswers,setWrongAnswers] = useState([])
  const [timeLeft,    setTimeLeft]    = useState(TIMER_SECONDS)
  const [submitting,  setSubmitting]  = useState(false)
  const [newBadges,   setNewBadges]   = useState([])

  // Refs
  const timerRef       = useRef(null)
  const isAnsweredRef  = useRef(false)
  const qIdxRef        = useRef(0)
  const questionsRef   = useRef([])
  const wrongRef       = useRef([])
  const correctRef     = useRef(0)

  useEffect(() => { isAnsweredRef.current = isAnswered }, [isAnswered])
  useEffect(() => { qIdxRef.current = qIdx },             [qIdx])
  useEffect(() => { questionsRef.current = questions },   [questions])
  useEffect(() => { wrongRef.current = wrongAnswers },    [wrongAnswers])
  useEffect(() => { correctRef.current = correctCount },  [correctCount])

  // Countdown to next challenge
  useEffect(() => {
    if (status !== 'already_played') return
    const interval = setInterval(() => {
      setMsUntilNext(prev => Math.max(0, prev - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  useEffect(() => {
    getDailyChallenge()
      .then(res => {
        const data = res.data.data
        setMsUntilNext(data.msUntilNext)
        if (data.alreadyPlayed) {
          setChallenge(data)
          setStatus('already_played')
        } else {
          setQuestions(data.questions)
          questionsRef.current = data.questions
          setChallenge(data)
          setStatus('ready')
        }
      })
      .catch(() => setStatus('error'))
  }, [])

  const stopTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  const startTimer = useCallback(() => {
    stopTimer()
    setTimeLeft(TIMER_SECONDS)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          stopTimer()
          if (!isAnsweredRef.current) {
            const q = questionsRef.current[qIdxRef.current]
            if (q) {
              const entry = { question: q.question, options: q.options, yourAnswer: 'No answer (time up)', correctAnswer: q.correctAnswer, explanation: q.explanation }
              wrongRef.current = [...wrongRef.current, entry]
              setWrongAnswers([...wrongRef.current])
            }
            isAnsweredRef.current = true
            setIsAnswered(true)
            setIsCorrect(false)
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => stopTimer(), [])

  const handleStart = () => {
    setStatus('playing')
    startTimer()
  }

  const handleSelect = (opt) => {
    if (!isAnswered) setSelected(opt)
  }

  const handleSubmit = async () => {
    if (!selected || isAnswered || submitting) return
    stopTimer()
    setSubmitting(true)
    const q = questions[qIdx]
    try {
      const res     = await checkAnswer(q._id, selected)
      const correct = res.data.isCorrect
      setIsCorrect(correct)
      setIsAnswered(true)
      if (correct) {
        correctRef.current++
        setCorrectCount(correctRef.current)
      } else {
        const entry = { question: q.question, options: q.options, yourAnswer: selected, correctAnswer: q.correctAnswer, explanation: q.explanation }
        wrongRef.current = [...wrongRef.current, entry]
        setWrongAnswers([...wrongRef.current])
      }
    } catch {
      const correct = String(selected) === String(q.correctAnswer)
      setIsCorrect(correct)
      setIsAnswered(true)
      if (correct) { correctRef.current++; setCorrectCount(correctRef.current) }
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = () => {
    stopTimer()
    if (qIdx < questions.length - 1) {
      const next = qIdx + 1
      qIdxRef.current      = next
      isAnsweredRef.current = false
      setQIdx(next)
      setSelected(null)
      setIsAnswered(false)
      setIsCorrect(false)
      startTimer()
    } else {
      handleFinish()
    }
  }

  const handleFinish = async () => {
    stopTimer()
    const score = Math.round((correctRef.current / questions.length) * 100)
    const stars = score === 100 ? 3 : score >= 80 ? 2 : score >= 60 ? 1 : 0
    try {
      const res = await submitDailyChallenge({ score, stars, correctCount: correctRef.current })
      setNewBadges(res.data.newBadges ?? [])
    } catch {}
    setStatus('finished')
  }

  // ── Render: loading ──
  if (status === 'loading') return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-game-purple to-game-dark">
      <div className="text-white text-2xl animate-pulse">Loading daily challenge…</div>
    </div>
  )

  // ── Render: error ──
  if (status === 'error') return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <p className="text-white text-xl">Could not load today's challenge.</p>
      <button onClick={() => navigate('/map')} className="btn-primary px-6 py-3">← Back to Map</button>
    </div>
  )

  // ── Render: already played ──
  if (status === 'already_played') return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center px-4">
      <div className="text-8xl mb-4">✅</div>
      <h1 className="text-3xl font-black text-game-yellow mb-2">Already Completed!</h1>
      <p className="text-white/60 mb-2">You scored <strong className="text-white">{challenge?.myScore}%</strong> today</p>
      <p className="text-white/60 mb-8">{'⭐'.repeat(challenge?.myStars ?? 0)}</p>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center mb-8">
        <p className="text-white/60 text-sm mb-2">Next challenge in</p>
        <Countdown ms={msUntilNext} />
      </div>
      <button onClick={() => navigate('/map')} className="btn-primary px-8 py-3">← Back to Map</button>
    </div>
  )

  // ── Render: ready ──
  if (status === 'ready') return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center px-4">
      <div className="text-8xl mb-4 animate-bounce">🎯</div>
      <h1 className="text-4xl font-black text-game-yellow mb-2">Daily Challenge</h1>
      <p className="text-white/70 text-lg mb-2">Today's challenge is ready!</p>
      <div className="bg-white/10 border border-white/20 rounded-2xl p-5 mb-8 text-center w-full max-w-sm">
        <p className="text-white font-bold text-lg">{questions.length} Questions</p>
        <p className="text-white/50 text-sm mt-1">⏱ 30 seconds per question</p>
        <p className="text-white/50 text-sm">🏆 Only one attempt per day!</p>
        <p className="text-white/50 text-sm">⭐ Earn bonus points</p>
      </div>
      <div className="flex gap-3 w-full max-w-sm">
        <button onClick={handleStart} className="flex-1 py-4 rounded-2xl font-bold text-xl text-white bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition">
          Start Challenge 🚀
        </button>
        <button onClick={() => navigate('/map')} className="px-6 py-4 rounded-2xl font-bold text-white/60 hover:text-white border border-white/20 transition">
          ← Back
        </button>
      </div>
    </div>
  )

  // ── Render: finished ──
  if (status === 'finished') {
    const score = Math.round((correctCount / questions.length) * 100)
    const stars = score === 100 ? 3 : score >= 80 ? 2 : score >= 60 ? 1 : 0
    return (
      <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center px-4 py-12">
        <div className="text-8xl mb-2 animate-bounce">{score === 100 ? '🏆' : score >= 60 ? '🎉' : '💪'}</div>
        <h1 className="text-4xl font-black text-game-yellow mb-1">Challenge Complete!</h1>
        <div className="flex gap-1 my-3">
          {[1,2,3].map(i => <span key={i} className={`text-5xl ${i <= stars ? 'opacity-100' : 'opacity-20'}`}>⭐</span>)}
        </div>
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 w-full max-w-sm mb-4 text-center">
          <div className="text-6xl font-black text-game-yellow">{score}%</div>
          <p className="text-white/60 text-sm mt-1">{correctCount} / {questions.length} correct</p>
        </div>

        {newBadges.length > 0 && (
          <div className="w-full max-w-sm mb-4 bg-yellow-400/20 border border-yellow-400/40 rounded-2xl p-4 text-center">
            <p className="text-yellow-300 font-bold mb-2">🎉 New Badge Earned!</p>
            {newBadges.map((b, i) => (
              <div key={i} className="text-white text-sm">{b.emoji} {b.name}</div>
            ))}
          </div>
        )}

        {wrongAnswers.length > 0 && (
          <details className="w-full max-w-sm mb-4">
            <summary className="w-full py-3 rounded-2xl font-bold text-white bg-orange-500/30 border border-orange-400/40 px-4 cursor-pointer">
              📋 Review {wrongAnswers.length} Wrong Answer{wrongAnswers.length > 1 ? 's' : ''}
            </summary>
            <div className="mt-3 flex flex-col gap-3">
              {wrongAnswers.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 text-left">
                  <p className="font-bold text-gray-800 text-sm mb-2">Q{idx+1}: {item.question}</p>
                  <p className="text-red-500 text-xs">Your answer: {item.yourAnswer}</p>
                  <p className="text-green-600 text-xs font-bold">Correct: {item.correctAnswer}</p>
                  {item.explanation && <p className="text-gray-500 text-xs mt-1 italic">💡 {item.explanation}</p>}
                </div>
              ))}
            </div>
          </details>
        )}

        <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-full max-w-sm mb-4 text-center">
          <p className="text-white/60 text-sm mb-1">Next challenge in</p>
          <Countdown ms={msUntilNext} />
        </div>

        <button onClick={() => navigate('/map')} className="w-full max-w-sm py-3 rounded-2xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition">
          🗺️ Back to Map
        </button>
      </div>
    )
  }

  // ── Render: playing ──
  const currentQ   = questions[qIdx]
  const totalQ     = questions.length
  const progressPct = ((qIdx + 1) / totalQ) * 100
  const timerPct   = (timeLeft / TIMER_SECONDS) * 100
  const timerColor = timeLeft > 20 ? 'bg-green-400' : timeLeft > 10 ? 'bg-yellow-400' : 'bg-red-500'
  const timerText  = timeLeft > 20 ? 'text-green-400' : timeLeft > 10 ? 'text-yellow-400' : 'text-red-400'

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark p-6">
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-game-yellow font-bold text-sm">🎯 Daily Challenge</span>
          <span className="text-game-yellow font-bold">{correctCount} / {qIdx + (isAnswered ? 1 : 0)} ✓</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
          <div className="bg-game-green h-3 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
        </div>
        <p className="text-white/60 text-sm text-right">Question {qIdx + 1} of {totalQ}</p>
      </div>

      {/* Timer */}
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-white/60 text-sm">⏱ Time</span>
          <span className={`font-bold ${timerText}`}>{timeLeft}s</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-game-purple mb-8 text-center">{currentQ.question}</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {currentQ.options.map((opt, i) => {
            let cls = 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            if (isAnswered) {
              if (String(opt) === String(currentQ.correctAnswer)) cls = 'bg-green-500 text-white ring-2 ring-green-300'
              else if (opt === selected && !isCorrect) cls = 'bg-red-400 text-white'
              else cls = 'bg-gray-100 text-gray-400'
            } else if (selected === opt) cls = 'bg-game-blue text-white scale-105'

            return (
              <button key={i} onClick={() => handleSelect(opt)} disabled={isAnswered}
                className={`p-5 text-xl font-bold rounded-xl transition-all duration-200 ${cls} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}>
                {opt}
              </button>
            )
          })}
        </div>

        {isAnswered && (
          <div className={`p-4 rounded-xl text-center mb-4 ${isCorrect ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
            <p className={`font-bold text-lg ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
            </p>
            {!isCorrect && <p className="text-gray-600 mt-1">Correct answer: <strong>{currentQ.correctAnswer}</strong></p>}
          </div>
        )}

        <div className="text-center">
          {!isAnswered ? (
            <button onClick={handleSubmit} disabled={!selected || submitting}
              className="btn-primary px-10 py-3 text-lg disabled:opacity-40 disabled:cursor-not-allowed">
              {submitting ? 'Checking…' : 'Submit'}
            </button>
          ) : (
            <button onClick={handleNext} className="btn-success px-10 py-3 text-lg animate-pulse">
              {qIdx < totalQ - 1 ? 'Next →' : 'Finish 🏁'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
