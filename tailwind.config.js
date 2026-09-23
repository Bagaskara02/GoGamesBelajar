/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#080c14',
          panel: '#0d1322',
          card: '#131b2e',
          border: '#1f2d4a',
          cyan: '#00f5ff',
          neon: '#00ff88',
          yellow: '#facc15',
          pink: '#f43f5e',
          purple: '#a855f7',
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Consolas', 'monospace'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
