/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      colors: {
        sovereign: {
          green: '#00C49F',
          dark:  '#0F172A',
          gray:  '#94A3B8',
          border:'#E2E8F0',
          bg:    '#F8FAFC',
        },
      },
    },
  },
  plugins: [],
}
