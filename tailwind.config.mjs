/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'mm-bg': '#050510',
        'mm-bg2': '#0a0a1a',
        'mm-card': '#12121e',
        'mm-elevated': '#1a1a2e',
        'mm-cyan': '#00e5ff',
        'mm-cyan-glow': '#00f0ff',
        'mm-green': '#4ade80',
        'mm-gold': '#fbbf24',
        'mm-red': '#ff1744',
        'mm-text': '#e0e0e8',
        'mm-text2': '#8888a0',
        'mm-muted': '#555570',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
