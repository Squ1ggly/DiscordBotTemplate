const { writeFileSync, readdirSync } = require("fs");
const checkEnv = readdirSync(".").filter((e) => e === ".env" || e === "REMOVE_THIS_TEXT.env");
if (checkEnv.length < 1)
  return writeFileSync(
    "./REMOVE_THIS_TEXT.env",
    `token=YOUR_TOKEN_HERE\nbotId=BOT_APPLICATION_ID\nbotImage=BOT_IMAGE_URL\nserverId=DISCORD_SERVER_ID`
  );
console.log(".env already exists");