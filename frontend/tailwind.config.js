/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: "#064E3B",
          light: "#F9FAFB",
          dark: "#1F5E3A"
        },
        accent: {
          gold: "#D4AF37"
        },
        slate: {
          gray: "#64748B"
        },
        offwhite: "#F9FAFB"
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      },
      borderRadius: {
        xl: "1rem",
        '3xl': '2rem'
      },
      boxShadow: {
        soft: "0 24px 80px rgba(6, 78, 59, 0.08)"
      }
    }
  },
  plugins: []
}
