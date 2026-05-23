import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050509',
        onyx: '#0b0b12',
        graphite: '#15151f',
        frost: '#f7f5ff',
        mist: '#d8d3ea',
        muted: '#9b94b7',
        violet: {
          400: '#a98bff',
          500: '#8d5cff',
          600: '#6f36f4',
          700: '#5020bd',
        },
        signal: '#4dd4c6',
        amber: '#e7b657',
      },
      boxShadow: {
        premium: '0 24px 80px rgba(5, 5, 9, 0.5)',
        glow: '0 0 54px rgba(141, 92, 255, 0.28)',
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-violet': 'radial-gradient(circle at 50% 0%, rgba(141, 92, 255, 0.22), transparent 38%)',
        'premium-line': 'linear-gradient(90deg, transparent, rgba(169, 139, 255, 0.5), transparent)',
      },
    },
  },
  plugins: [],
} satisfies Config;
