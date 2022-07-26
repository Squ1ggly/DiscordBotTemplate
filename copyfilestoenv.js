const { writeFileSync, readFileSync } = require("fs");
const env = readFileSync("./.env");
console.log("\nReading env File");
const packageJson = JSON.parse(readFileSync("./package.json"));
console.log("\nReading package.json");
delete packageJson.scripts.genenv;
console.log("\nRemoving package json scripts");
console.log("\nUpdating package.json scripts");
packageJson.scripts['start:npm'] = "npm i && node ./src/index.js";
packageJson.scripts['start:yarn'] = "yarn && node ./src/index.js";
console.log("\nWriting env to outDir");
writeFileSync("./dist/.env", env);
console.log("\nWriting package.json to outDir\n");
writeFileSync("./dist/package.json", JSON.stringify(packageJson, null, 2));