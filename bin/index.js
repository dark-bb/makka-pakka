const path = require("path");
const fs = require("fs");
const { COPYFILE_EXCL } = fs.constants;
const spawn = require("cross-spawn");

fs.copyFile(
  "assets/.eslintrc.js",
  "../../../.eslintrc.js",
  COPYFILE_EXCL,
  (err) => err && console.info(err)
);
fs.copyFile(
  "assets/.prettierrc.js",
  "../../../.prettierrc.js",
  COPYFILE_EXCL,
  (err) => err && console.info(err)
);

const package = JSON.parse(fs.readFileSync("../../../package.json"));

package["gitHooks"] = {
  "pre-commit": "lint-staged",
};

package["lint-staged"] = {
  "*.{js,vue,json,ts}": ["eslint --fix"],
};

fs.writeFileSync("../../../package.json", JSON.stringify(package));

const packageList = [
  "@types/node",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",
  "eslint",
  "eslint-config-prettier",
  "eslint-config-standard",
  "eslint-plugin-import",
  "eslint-plugin-node",
  "eslint-plugin-prettier",
  "eslint-plugin-promise",
  "eslint-plugin-vue",
  "lint-staged",
  "prettier",
  "typescript",
  "yorkie",
];

spawn.sync("npm", ["i", "-D"].concat(packageList), {
  cwd: "../../../",
  stdio: "inherit",
});
