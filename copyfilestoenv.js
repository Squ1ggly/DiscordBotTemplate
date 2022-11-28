const { writeFileSync, readFileSync } = require("fs");
const env = readFileSync("./.env");
const packageJson = JSON.parse(readFileSync("./package.json"));
delete packageJson.scripts.genenv;
packageJson.scripts.start = "npm i && node ./src/index.js";
writeFileSync("./dist/.env", env);
writeFileSync("./dist/package.json", JSON.stringify(packageJson,null,2));