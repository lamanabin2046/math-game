import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';

export default function HomePage() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handlePlayNow = () => {
    navigate('/map');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl font-bold text-game-yellow mb-4 text-center">
        Math Adventure
      </h1>
      <p className="text-2xl text-white mb-12 text-center">
        Learn math with fun levels!
      </p>

      <button
        onClick={handlePlayNow}
        className="btn-primary px-12 py-4 text-2xl font-bold mb-8"
      >
        Play Now
      </button>

      <button
        onClick={handleLogout}
        className="text-white hover:text-game-yellow underline"
      >
        Logout
      </button>
    </div>
  );
}