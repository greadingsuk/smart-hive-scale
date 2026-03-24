/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,html}',
  ],
  theme: {
    extend: {
      colors: {
        hive: {
          bg: 'var(--hive-bg)',
          surface: 'var(--hive-surface)',
          'surface-hover': 'var(--hive-surface-hover)',
          border: 'var(--hive-border)',
          gold: 'var(--hive-gold)',
          'gold-light': 'var(--hive-gold-light)',
          sage: 'var(--hive-sage)',
          text: 'var(--hive-text)',
          muted: 'var(--hive-muted)',
          green: 'var(--hive-sage)',
          blue: 'var(--hive-blue)',
          red: 'var(--hive-red)',
          amber: 'var(--hive-gold)',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Lora', 'Georgia', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
