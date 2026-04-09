import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auth ──
export const registerStudent = (data) => API.post('/auth/register', data)
export const loginStudent    = (data) => API.post('/auth/login', data)

// ── Levels ──
export const getAllLevels = ()   => API.get('/levels')
export const getLevelById = (id) => API.get(`/levels/${id}`)

// ── Progress ──
export const getProgress  = ()     => API.get('/progress')
export const saveProgress = (data) => API.post('/progress', data)

// ── Questions ──
export const getQuestionsByLevel = (levelId)                    => API.get(`/questions/level/${levelId}`)
export const checkAnswer         = (questionId, studentAnswer)  => API.post('/questions/check-answer', { questionId, studentAnswer })

// ── Students ──
export const getLeaderboard = ()   => API.get('/students/leaderboard')
export const getProfile     = ()   => API.get('/students/profile')

export default API
