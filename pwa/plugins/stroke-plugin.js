// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

const generateColors = (e, colors, prefix) =>
  Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] === "string") {
      return {
        ...acc,
        [`${prefix}-${e(key)}`]: {
          "-webkit-text-stroke-color": colors[key],
          "-webkit-text-fill-color": "transparent",
        },
      };
    }

    const innerColors = generateColors(e, colors[key], `${prefix}-${e(key)}`);

    return {
      ...acc,
      ...innerColors,
    };
  }, {});

const generateStrokeWidth = (e, borderWidths, prefix) =>
  Object.keys(borderWidths).reduce((acc, key) => {
    if (typeof borderWidths[key] === "string") {
      return {
        ...acc,
        [`${prefix}-${e(key)}`]: {
          "-webkit-text-stroke-width": borderWidths[key],
        },
      };
    }

    return acc;
  }, {});

module.exports = plugin(({ e, addUtilities, theme, variants }) => {
  const colors = theme("colors");
  const strokeColors = generateColors(e, colors, ".stroke-text");
  addUtilities(strokeColors, variants("strokeColor"));
  const borderWidths = theme("borderWidth");
  const strokeWidths = generateStrokeWidth(e, borderWidths, ".stroke-text");
  addUtilities(strokeWidths, variants("strokeWidth"));
});
