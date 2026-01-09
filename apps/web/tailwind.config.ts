import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  // Ensure 'content' covers all your source files
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // You can customize the table styles here
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100ch', // Makes the reading area wider for tables
            table: {
              fontSize: '0.875rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;