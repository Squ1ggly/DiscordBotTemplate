const { writeFileSync, readdirSync } = require("fs");
console.log("\nChecking if env exists");
const checkEnv = readdirSync(".").filter((e) => e === ".env");
if (checkEnv.length < 1) {
  console.log("\nNo env found, writing new one");
  writeFileSync("./.env", `token=YOUR_TOKEN_HERE\nbotId=BOT_APPLICATION_ID\nbotImage=BOT_IMAGE_URL\nserverId=DISCORD_SERVER_ID\ncommandPrefix=COMMAND_PREFIX`);
  console.log("env file generated");
  return;
}
console.log(".env already exists");
