// @ts-check
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/(common)/**/*.{js,jsx,ts,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
    "!./components/con/**/*.{js,ts,jsx,tsx,css}",
  ],
  safelist: [
    // useful for oss references component
    {
      pattern:
        /rotate-(15|30|45|60|75|90|105)|-rotate-(15|30|45|60|75|90|105)|translate-x-(12|24|36|48|60|72|8|16|32|40)|-translate-x-(12|24|36|48|60|72|84)/,
      variants: ["before", "sm", "md", "lg"],
    },
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        xl: "1rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      text: {
        primary: colors.gray[800],
        secondary: colors.gray[600],
        "primary-dark": colors.gray[400],
        "secondary-dark": colors.gray[500],
      },
      blue: {
        DEFAULT: "#0099a1",
        black: "#0d262b",
        light: "#4eb7bc",
        extralight: "#a3d2d4",
        dark: "#00555a",
        darkest: "#013137",
      },
      pink: {
        DEFAULT: "#c32186",
        light: "#d52189",
      },
      gray: colors.gray,
      white: "#ffffff",
    },
    extend: {
      screens: {
        "-lg": { max: "1023px" },
      },
      height: {
        0.75: "3px",
      },
      width: {
        0.75: "3px",
      },
      fontFamily: {
        title: ["var(--font-poppins)"],
      },
      maxWidth: {
        "8xl": "90rem",
      },
      borderWidth: {
        px: "1px",
      },
      fontSize: {
        "5xl": "2.85rem",
      },
      borderRadius: {
        full: "100%",
      },
      rotate: {
        15: "15deg",
        30: "30deg",
        45: "45deg",
        60: "60deg",
        75: "75deg",
        90: "90deg",
      },
      backgroundSize: {
        4: "1rem 1rem",
      },
      listStyleType: {
        circle: "circle",
      },
      backgroundImage: {
        "conf-gradient":
          "radial-gradient(ellipse farthest-corner at 52% 160%, rgba(213, 33, 137, 0.8), transparent 50%), radial-gradient(at right 60%, rgba(17, 229, 240, 0.3), transparent 50%), radial-gradient(circle at 75% 50%, rgba(17, 230, 240, 0.2), transparent 50%)",
        checkboard:
          "conic-gradient(#daddd6 90deg, transparent 90deg 180deg, #daddd6 180deg 270deg, transparent 270deg)",
        "checkboard-dark":
          "conic-gradient(#1d1e1b 90deg, transparent 90deg 180deg, #1d1e1b 180deg 270deg, transparent 270deg)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.text.primary"),
            "--tw-prose-headings": theme("colors.blue.black"),
            "--tw-prose-links": theme("colors.blue.DEFAULT"),
            "--tw-prose-bold": theme("colors.blue.DEFAULT"),
            "--tw-prose-invert-body": theme("colors.gray.400"),
            "--tw-prose-invert-headings": theme("colors.gray.300"),
          },
        },
      }),
    },
  },
  plugins: [
    require("./plugins/clip-path-plugin.js"),
    require("./plugins/stroke-dasharray-plugin.js"),
    require("@tailwindcss/typography"),
  ],
};
