/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enables dark mode via 'dark' class on html/body
  content: [
    // Streamlined content path for all src files
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cutive-mono': ['"Cutive Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        // Default fallback values if CSS variables are not set
        lg: 'var(--radius, 0.5rem)',
        md: 'calc(var(--radius, 0.5rem) - 2px)',
        sm: 'calc(var(--radius, 0.5rem) - 4px)',
      },
      colors: {
        // Light theme colors
        lightBackground: '#ffffff',
        lightText: '#333333',
        lightBorder: '#e2e8f0',
        lightAccent: '#4a5568',

        // Dark theme colors
        darkBackground: '#191919',
        darkText: '#e2e8f0',
        darkBorder: '#545454',
        darkAccent: '#e2e8f0',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};
