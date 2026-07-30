import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2C5C',
          50: '#EEF1F8',
          100: '#D4DBEB',
          600: '#243A78',
          700: '#1B2C5C',
          900: '#0F1B3D'
        },
        forest: {
          DEFAULT: '#3A7A3E',
          50: '#EEF6EF',
          100: '#D3E8D5',
          600: '#3A7A3E',
          700: '#2E6231',
          900: '#1F4321'
        },
        cream: '#FAFAF7',
        ink: '#141414'
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif']
      },
      maxWidth: {
        content: '1200px'
      }
    }
  },
  plugins: []
};

export default config;
