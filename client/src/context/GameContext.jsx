import React, { createContext, useContext, useState } from 'react'

import en from '../locales/en'   // ← ADD this line
import ne from '../locales/ne'   // ← ADD this line

const GameContext = createContext()

export function GameProvider({ children }) {

  const [student, setStudent] = useState(null)
  const [lastResult, setLastResult] = useState(null)

  // ← ADD these 3 lines
  const [language, setLanguage] = useState(
    localStorage.getItem('language') ?? 'en'
  )

  // ← ADD this function
  function changeLanguage(lang) {
    localStorage.setItem('language', lang)
    setLanguage(lang)
  }

  const isAdmin = student?.role === 'admin'

  const value = {
    student,    setStudent,
    lastResult, setLastResult,
    isAdmin,
    language,              // ← ADD to value
    setLanguage: changeLanguage,  // ← ADD to value
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) throw new Error('useGame must be used inside a <GameProvider>')
  return context
}