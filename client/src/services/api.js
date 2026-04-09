import axios from 'axios'

// Base URL — Vite proxy forwards /api → http://localhost:5000
const API = axios.create({
  baseURL: '/api',
})

// ── Attach the student's auth token to every request ──
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ── Auth endpoints ──
export const registerStudent = (data) => API.post('/auth/register', data)
export const loginStudent    = (data) => API.post('/auth/login', data)

// ── Level endpoints ──
export const getAllLevels  = () => API.get('/levels')
export const getLevelById  = (id) => API.get(`/levels/${id}`)

// ── Progress endpoints ──
export const getProgress  = () => API.get('/progress')
export const saveProgress = (data) => API.post('/progress', data)

// ── Question endpoints ──
export const getQuestionsByLevel = (levelId) => API.get(`/questions/level/${levelId}`)
export const checkAnswer = (questionId, studentAnswer) => API.post('/questions/check-answer', { questionId, studentAnswer })

export default API