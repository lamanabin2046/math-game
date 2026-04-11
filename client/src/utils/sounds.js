// ── Sound Effects Utility ──
// Uses MP3 files for main sounds + Web Audio API for simple beeps

// ── Play MP3 file ──
function playMP3(file, volume = 0.5) {
  try {
    const audio = new Audio(`/sounds/${file}`)
    audio.volume = volume
    audio.play().catch(() => {})
  } catch (e) {}
}

// ── Web Audio API for simple beeps ──
let audioCtx = null

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') audioCtx.resume()
  return audioCtx
}

function beep(freq, duration, type = 'sine', vol = 0.3, startDelay = 0) {
  try {
    const ctx  = getAudioContext()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = type
    osc.frequency.value = freq
    const start = ctx.currentTime + startDelay
    const end   = start + duration
    gain.gain.setValueAtTime(vol, start)
    gain.gain.exponentialRampToValueAtTime(0.001, end)
    osc.start(start)
    osc.stop(end)
  } catch (e) {}
}

// ── Correct Answer — use your MP3 ──
export function playCorrect() {
  playMP3('correct.mp3', 0.6)
}

// ── Wrong Answer — use your MP3 ──
export function playWrong() {
  playMP3('wrong.mp3', 0.6)
}

// ── Level Complete — use your MP3 ──
export function playLevelComplete() {
  playMP3('levelcomplete.mp3', 0.7)
}

// ── Tick — last 10 seconds (beep) ──
export function playTick() {
  beep(880, 0.04, 'square', 0.15, 0.00)
}

// ── Time Up — urgent alarm (beep) ──
export function playTimeUp() {
  beep(700, 0.12, 'square', 0.3, 0.00)
  beep(900, 0.12, 'square', 0.3, 0.13)
  beep(700, 0.12, 'square', 0.3, 0.26)
  beep(900, 0.12, 'square', 0.3, 0.39)
}

// ── Game Over — descending fail (beep) ──
export function playGameOver() {
  beep(400, 0.20, 'sawtooth', 0.3, 0.00)
  beep(350, 0.20, 'sawtooth', 0.3, 0.20)
  beep(300, 0.20, 'sawtooth', 0.3, 0.40)
  beep(200, 0.40, 'sawtooth', 0.3, 0.60)
}

// ── Button Click — soft tap (beep) ──
export function playClick() {
  beep(600, 0.04, 'sine', 0.12, 0.00)
}
