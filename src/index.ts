import DiscordBotHelper from "./util/bot-helper";
import { config } from "dotenv";
config();

export const dBotHelper = new DiscordBotHelper(process.env?.botImage, "Bot Template", 3, process.env.commandPrefix, process.env.botId, process.env.token, process.env.serverId);

dBotHelper.startBot();
