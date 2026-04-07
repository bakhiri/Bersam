/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./mentions-legales.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      display: ["Archivo", "sans-serif"],
      mono: ["Montserrat", "sans-serif"],
    },
    extend: {
      colors: {
        cream: "#f9f8f6",
        graphite: "#1a1a1a",
        lightgray: "#e8e8e8",
        bersam: {
          primary: "#c9d346",
          secondary: "#c9d346",
          accent: "#c9d346",
        },
        night: "#f9f8f6",
        anthracite: "#1a1a1a",
        textMain: "#1a1a1a",
        textDim: "#666666",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.1)",
        architectural: "0 4px 12px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        subtleHover: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.02)" },
        },
      },
      animation: {
        subtleHover: "subtleHover 0.3s ease-out",
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
      },
    },
  },
};
