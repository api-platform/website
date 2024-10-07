/** @type {import('tailwindcss').Config} */

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/(con)/**/*.{js,ts,jsx,tsx,css}",
    "./components/con/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    colors: {
      transparent: "transparent",
      blue: {
        DEFAULT: "#2FC1C1",
        black: "#001226",
        light: "#67cece",
        dark: "#299a9b",
        darkest: "#2e5a5c",
      },
      pink: {
        DEFAULT: "#c32186",
        light: "#d52189",
      },
      grey: "#eff4f7",
      white: "#fff",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-raleway)"],
        title: ["var(--font-poppins)"],
      },
      listStyleType: {
        circle: "circle",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      borderWidth: {
        3: "3px",
      },
      keyframes: {
        web: {
          "0%, 100%": { "stroke-dashoffset": 12 },
          "100%": { "stroke-dashoffset": 0 },
        },
        draw: {
          "0%": { "stroke-dashoffset": 0 },
          "100%": { "stroke-dashoffset": 730 },
        },
        "draw-opacity": {
          "0%": { opacity: 0 },
          "40%": { opacity: 0 },
          "45%": { opacity: 1 },
          "55%": { opacity: 1 },
          "60%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
        "svg-shadow": {
          "0%": {
            opacity: 0.2,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        web: "web 1s linear infinite",
        "web-invert": "web 1s linear infinite reverse",
        draw: "draw 2.5s linear infinite, draw-opacity 3s linear infinite",
        fade: "svg-shadow 2s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "conf-gradient":
          "radial-gradient(ellipse farthest-corner at 52% 160%, rgba(213, 33, 137, 0.8), transparent 50%), radial-gradient(at right 60%, rgba(17, 229, 240, 0.3), transparent 50%), radial-gradient(circle at 75% 50%, rgba(17, 230, 240, 0.2), transparent 50%)",
        "blue-gradient":
          "radial-gradient(circle at 50% 50%,transparent 10%,rgba(0,0,0,.3) 120%)",
        dotted: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' height='100%' width='100%'><defs><pattern id='dots' width='6' height='6' patternTransform='rotate(45 0 0)' patternUnits='userSpaceOnUse'><circle cx='3' cy='3' r='1' style='stroke:none; fill:%232FC1C1'/></pattern></defs><rect width='100%' height='100%' fill='url(%23dots)'/></svg>")`,
        "btn-blue": "linear-gradient(30deg,#2FC1C1 50%,transparent 0)",
        "btn-pink": "linear-gradient(30deg,#c32186 50%,transparent 0)",
        "btn-white": "linear-gradient(30deg,#fff 50%,transparent 0)",
        "btn-blue-empty": "linear-gradient(30deg,transparent 50%,#2FC1C1 0)",
        "icon-white": "linear-gradient(-120deg,#fff 50%,transparent 0)",
        "icon-blue": "linear-gradient(-120deg,#2FC1C1 50%,transparent 0)",
        circle: `url("/images/con/circle.svg")`,
        "bg-circle": "url('/images/con/circle.svg')",
        wave: "url('/images/con/wave2.svg')",
        wave2: "url('/images/con/wave3.svg')",
      },
    },
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
    },
  },
  plugins: [
    require("./plugins/stroke-dasharray-plugin.js"),
    require("./plugins/lined-plugin.js"),
    require("./plugins/animation-delay-plugin.js"),
  ],
};
