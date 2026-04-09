import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import HomePage           from './pages/HomePage.jsx'
import MapPage            from './pages/MapPage.jsx'
import GamePage           from './pages/GamePage.jsx'
import ResultPage         from './pages/ResultPage.jsx'
import LeaderboardPage    from './pages/LeaderboardPage.jsx'
import ProfilePage        from './pages/ProfilePage.jsx'
import AdminPage          from './pages/AdminPage.jsx'
import AdminQuestionsPage  from './pages/AdminQuestionsPage.jsx'
import DailyChallengePage  from './pages/DailyChallengePage.jsx'

import { GameProvider } from './context/GameContext.jsx'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/map"           element={<MapPage />} />
          <Route path="/game/:levelId" element={<GamePage />} />
          <Route path="/result"        element={<ResultPage />} />
          <Route path="/leaderboard"   element={<LeaderboardPage />} />
          <Route path="/profile"       element={<ProfilePage />} />
          <Route path="/admin"                    element={<AdminPage />} />
          <Route path="/admin/questions/:levelId" element={<AdminQuestionsPage />} />
          <Route path="/daily-challenge"          element={<DailyChallengePage />} />
          <Route path="*"              element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
