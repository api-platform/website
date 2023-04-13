// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

module.exports = plugin(({ addUtilities }) => {
  const hyphens = {
    ".hyphens-auto": {
      hyphens: "auto",
    },
    ".hyphens-unset": {
      hyphens: "unset",
    },
    ".hyphens-none": {
      hyphens: "none",
    },
    ".hyphens-inherit": {
      hyphens: "inherit",
    },
    ".hyphens-manual": {
      hyphens: "manual",
    },
  };
  addUtilities(hyphens, {
    respectPrefix: false,
    respectImportant: false,
  });
});
