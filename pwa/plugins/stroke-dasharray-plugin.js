// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      "stroke-dasharray": (value) => ({
        "stroke-dasharray": value,
      }),
    },
    { values: theme("dashArray") }
  );
});
