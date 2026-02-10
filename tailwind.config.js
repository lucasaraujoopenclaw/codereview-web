/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#1e1e2e",
          foreground: "#cdd6f4",
          accent: "#45475a",
          hover: "#313244",
        },
        brand: {
          DEFAULT: "#89b4fa",
          dark: "#74c7ec",
        },
      },
    },
  },
  plugins: [],
};
