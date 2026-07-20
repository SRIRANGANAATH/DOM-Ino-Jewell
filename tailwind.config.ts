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
        'bg-primary': '#F9F6F0',
        'bg-secondary': '#0B2B26',
        'text-primary': '#0E332E',
        'text-secondary': '#4A5568',
        'text-light': '#F9F6F0',
        'accent-gold': '#C59E3F',
        'accent-bronze': '#8A7043',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'serif'],
        mono: ['var(--font-inter)', 'monospace'],
        heading: ['var(--font-playfair-display)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
