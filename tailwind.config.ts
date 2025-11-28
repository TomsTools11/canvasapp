import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette from style guide
        primary: {
          DEFAULT: '#0D91FD', // Electric Blue
          dark: '#014379',    // Deep Navy
          light: '#5DB5FE',   // Sky Blue
        },
        // Surface colors
        surface: {
          low: '#021A2E',     // Midnight Navy - Primary Background
          mid: '#014379',     // Deep Navy - Toolbar/Panels
          canvas: '#121212',  // True Black - Canvas Background
        },
        // Text colors
        text: {
          primary: '#C2E3FE',   // Ice Blue
          secondary: '#5DB5FE', // Sky Blue
        },
        // Semantic colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        // Border color
        border: {
          DEFAULT: 'rgba(13, 145, 253, 0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['32px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'island': '0 1px 5px rgba(0, 0, 0, 0.4)',
        'dropdown': '0 4px 12px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
    },
  },
  plugins: [],
};

export default config;
