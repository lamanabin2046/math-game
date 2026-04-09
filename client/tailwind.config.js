/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'game-purple': '#7C3AED',
        'game-yellow': '#F59E0B',
        'game-green':  '#10B981',
        'game-red':    '#EF4444',
        'game-blue':   '#3B82F6',
        'game-dark':   '#1E1B4B',
      },
      keyframes: {
        bounce_in: {
          '0%':   { transform: 'scale(0.5)', opacity: '0' },
          '70%':  { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)',   opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%':      { transform: 'rotate(5deg)' },
        }
      },
      animation: {
        'bounce-in': 'bounce_in 0.4s ease-out',
        'wiggle':    'wiggle 0.3s ease-in-out',
      }
    }
  },
  plugins: []
}