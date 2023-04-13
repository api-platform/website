// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ matchUtilities }) {
  matchUtilities({
    "clip-path": (value) => ({
      "clip-path": value,
    }),
  });
});
