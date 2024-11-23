/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        'photo-dark': '#0a0a0a',
        'photo-light': '#f5f5f5',
      },
      transitionDuration: {
        '7000': '7000ms',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};