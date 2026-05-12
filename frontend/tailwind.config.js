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
          green: "#2D8A56",
          light: "#F0F9F4",
          dark: "#1F5E3A"
        },
        slate: {
          gray: "#64748B"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif']
      },
      borderRadius: {
        xl: "1rem"
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
}
