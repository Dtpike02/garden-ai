/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: { extend: {} },
  plugins: [
    typography,
  ],
};

export default config;
