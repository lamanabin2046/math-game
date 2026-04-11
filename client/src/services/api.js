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
export const getAllLevels = ()    => API.get('/levels')
export const getLevelById = (id) => API.get(`/levels/${id}`)

// ── Progress ──
export const getProgress  = ()     => API.get('/progress')
export const saveProgress = (data) => API.post('/progress', data)

// ── Questions (student) ──
export const getQuestionsByLevel = (levelId)                   => API.get(`/questions/level/${levelId}`)
export const checkAnswer         = (questionId, studentAnswer) => API.post('/questions/check-answer', { questionId, studentAnswer })

// ── Questions (admin) ──
export const getAdminQuestions = (levelId)   => API.get(`/questions/admin/all?levelId=${levelId}`)
export const createQuestion    = (data)      => API.post('/questions/admin', data)
export const updateQuestion    = (id, data)  => API.put(`/questions/admin/${id}`, data)
export const deleteQuestion    = (id)        => API.delete(`/questions/admin/${id}`)

// ── Students ──
export const getLeaderboard = () => API.get('/students/leaderboard')
export const getProfile     = () => API.get('/students/profile')
export const updateAvatar   = (avatar) => API.put('/students/avatar', { avatar })

// ── Daily Challenge ──
export const getDailyChallenge     = ()     => API.get('/daily-challenge')
export const submitDailyChallenge  = (data) => API.post('/daily-challenge/submit', data)

export default API
