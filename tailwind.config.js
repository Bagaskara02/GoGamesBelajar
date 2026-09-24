/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pixel: {
          dark: '#0f0f23',
          bg: '#1a1a2e',
          panel: '#16213e',
          card: '#1c2541',
          border: '#2a3a5c',
          cyan: '#00d4ff',
          green: '#39ff14',
          gold: '#ffd700',
          purple: '#b24bf3',
          pink: '#ff6b9d',
          red: '#ff4444',
          orange: '#ff8c00',
          blue: '#4a9eff',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px rgba(0, 0, 0, 0.5)',
        'pixel-sm': '2px 2px 0px rgba(0, 0, 0, 0.5)',
        'pixel-cyan': '0 0 10px rgba(0, 212, 255, 0.3), 0 0 20px rgba(0, 212, 255, 0.1)',
        'pixel-green': '0 0 10px rgba(57, 255, 20, 0.3), 0 0 20px rgba(57, 255, 20, 0.1)',
        'pixel-gold': '0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.1)',
        'pixel-purple': '0 0 10px rgba(178, 75, 243, 0.3), 0 0 20px rgba(178, 75, 243, 0.1)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
        'pixelBlink': 'pixelBlink 1s step-end infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pixelBlink: {
          '50%': { opacity: '0' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.2)' },
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [],
}
