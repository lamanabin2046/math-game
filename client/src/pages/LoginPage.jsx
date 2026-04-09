import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { registerStudent, loginStudent } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';

export default function LoginPage() {
  const navigate        = useNavigate();
  const { setStudent, language, setLanguage } = useGame();
  const { t }           = useTranslation();

  const [isLogin,  setIsLogin]  = useState(true);
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let res;
      if (isLogin) {
        res = await loginStudent({ username: formData.username, password: formData.password });
      } else {
        res = await registerStudent({ name: formData.name, username: formData.username, password: formData.password });
      }

      // Save token, role and studentId to localStorage
      localStorage.setItem('token',     res.data.token);
      localStorage.setItem('role',      res.data.role);
      localStorage.setItem('studentId', res.data._id);

      setStudent(res.data);

      // Redirect admin to admin panel, students to map
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/map');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-purple to-game-dark flex items-center justify-center p-4">

      {/* Language toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
          className="bg-white/20 hover:bg-white/30 text-white font-bold px-4 py-2 rounded-xl text-sm transition"
        >
          {language === 'en' ? 'नेपाली' : 'English'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">

        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🏔️</div>
          <h1 className="text-3xl font-bold text-game-purple">{t('app.title')}</h1>
          <p className="text-gray-400 text-sm mt-1">
            {isLogin ? t('login.welcomeBack') : t('login.createAccount')}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {!isLogin && (
            <div>
              <label className="block text-gray-600 font-semibold text-sm mb-1">
                {t('login.nameLabel')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('login.namePlaceholder')}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-game-purple"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-600 font-semibold text-sm mb-1">
              {t('login.usernameLabel')}
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('login.usernamePlaceholder')}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-game-purple"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-semibold text-sm mb-1">
              {t('login.passwordLabel')}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t('login.passwordPlaceholder')}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-game-purple"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-game-purple hover:bg-purple-700 text-white font-bold py-3 rounded-xl mt-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? t('login.loadingButton')
              : isLogin
                ? t('login.loginButton')
                : t('login.registerButton')
            }
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-5">
          {isLogin ? t('login.noAccount') : t('login.hasAccount')}{' '}
          <button
            type="button"
            onClick={() => { setIsLogin(l => !l); setError(''); }}
            className="text-game-purple font-bold underline hover:text-purple-700"
          >
            {isLogin ? t('login.registerLink') : t('login.loginLink')}
          </button>
        </p>

      </div>
    </div>
  );
}
