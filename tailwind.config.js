/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'dark-blue': '#0A0E27',
        'dark-blue-light': '#151B3D',
        'cyan-accent': '#00D9FF',
        'purple-accent': '#8B5CF6',
        'blue-accent': '#3B82F6',
      },
      boxShadow: {
        glass: '0 0 0 1px rgba(255,255,255,0.10) inset, 0 18px 60px rgba(0,0,0,0.65)',
      },
      backgroundImage: {
        'grid-pattern': `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        'grid-size': '50px 50px',
      },
    },
  },
  plugins: [],
}
