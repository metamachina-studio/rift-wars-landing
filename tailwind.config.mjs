/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'mm-bg': '#000000',
        'mm-bg2': '#0a0a0a',
        'mm-card': '#111111',
        'mm-elevated': '#1a1a1a',
        'mm-gold-primary': '#F2AD23',
        'mm-gold': '#fbbf24',
        'mm-cyan': '#F2AD23',
        'mm-cyan-glow': '#F2AD23',
        'mm-neon': '#39ff14',
        'mm-green': '#39ff14',
        'mm-red': '#ff1744',
        'mm-purple': '#a855f7',
        'mm-text': '#e0e0e0',
        'mm-text2': '#888888',
        'mm-muted': '#555555',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        exo: ['"Exo 2"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
