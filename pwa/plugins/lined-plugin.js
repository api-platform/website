/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = plugin(({ matchUtilities, theme }) => {
  const flattenColors = Object.keys(
    flattenColorPalette.default(theme("colors"))
  ).reduce((acc, key) => {
    acc[key] = key;
    return acc;
  }, {});
  matchUtilities(
    {
      lined: (value) => {
        const val = `@apply after:!bg-${value}`;
        return {
          [val]: {},
        };
      },
    },
    { values: flattenColors }
  );
  matchUtilities(
    {
      lined: (value) => {
        let val;
        if (value === "center")
          val = val =
            "@apply relative pb-5 after:absolute after:w-16 after:bg-blue after:rounded-md after:h-1 after:left-1/2 after:bottom-1 after:-translate-x-1/2";
        else if (value === "left")
          val =
            "@apply relative pb-5 after:absolute after:left-0 after:w-16 after:bg-blue after:rounded-md after:h-1 after:bottom-1";
        else val = "@apply after:content-none pb-0";
        return {
          [val]: {},
        };
      },
    },
    { values: { left: "left", center: "center", none: "none" } }
  );
});
