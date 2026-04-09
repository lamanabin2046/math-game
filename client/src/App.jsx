import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import HomePage   from './pages/HomePage.jsx'
import MapPage    from './pages/MapPage.jsx'
import GamePage   from './pages/GamePage.jsx'
import ResultPage from './pages/ResultPage.jsx'

// Global game state provider
import { GameProvider } from './context/GameContext.jsx'

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          {/* Home / Login screen */}
          <Route path="/"              element={<HomePage />} />

          {/* The level map */}
          <Route path="/map"           element={<MapPage />} />

          {/* Active gameplay */}
          <Route path="/game/:levelId" element={<GamePage />} />

          {/* Shown after finishing a level */}
          <Route path="/result"        element={<ResultPage />} />

          {/* Any unknown URL goes back to home */}
          <Route path="*"              element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App