const fs = require("fs-extra");

fs.readJson("package.json", (err, package) => {
  if (err) console.log(err);

  package.gitHooks = {
    "pre-commit": "lint-staged",
  };
  package["lint-staged"] = {
    "*.{js,vue,json,ts}": ["eslint --fix"],
  };

  console.log(package);

  fs.writeJson("package.json", package, (err) => {
    err && console.log(err);
  });
});
