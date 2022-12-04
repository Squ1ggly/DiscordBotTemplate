import {
  checkCommand,
  clearBotLevelCommands,
  coolDown,
  setSlashCommands,
  setPrefixCommands,
  updateGuildCommands,
  genHelpMessage,
} from "../utils/discordjsHelper";
import chalk from "chalk";
import { Client, EmbedAuthorData, GatewayIntentBits } from "discord.js";
import { IBotHelperClient } from "../types/helperTypes";
import dotenv from "dotenv";
const env = dotenv.config({
  path: "./.env",
}).parsed;

// Global Command Prefix
export const commandPrefix = "sq!";

// This controls the global command cool down in seconds
export const globalCoolDown = 5;

// Global author
export const globalAuthor: EmbedAuthorData = {
  name: "TEST",
  iconURL: env?.botImage === "" ? null : env?.botImage,
};

const red = (m: string) => chalk.redBright(m);

/**
 * The starts the bot
 * @returns {IBotHelperClient}
 */
function startBot(): void {
  if (!env?.botId && !env?.token) throw new Error(red("\nWARNING : Please put credentials for bot in .env\n"));
  const client: IBotHelperClient = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  // Add extra client keys here!
  client.coolDowns = new Map();

  // Set the slashCommands and the prefix commands in the client to be used laster
  setSlashCommands(client);
  setPrefixCommands(client);

  // Generate help messages for commands
  client.prefixCommandHelpMessage = genHelpMessage(client.prefixCommandsInfo, globalAuthor);
  client.slashCommandHelpMessage = genHelpMessage(client.slashCommandsInfo, globalAuthor, "/");

  // When bot is status ready, Display in console that bot has started
  // And update slash commands on the discord bot application OR updated slash commands on specific server
  client.on("ready", async () => {
    console.log(`Bot Started`);
    //await updateDiscordCommands(client.slashCommandsArray);
    await clearBotLevelCommands();
    await updateGuildCommands(client.slashCommandsInfo);
  });

  // Slash command listener
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (!checkCommand(client.slashCommandsInfo, interaction.commandName)) return;
    if (!(await coolDown(interaction, client.coolDowns, interaction.commandName))) {
      console.log(`User ${interaction.member.user.username} executed command ${interaction.commandName}`);
      await client.slashCommands.get(interaction.commandName).execute(interaction, client);
    }
  });

  // Message listener -- This will run constantly in chats that have large amounts of messaging. Its better to scope this to a specific chat
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content) return;
    const command = message.content.toLowerCase();
    if (!command.toLowerCase().startsWith(commandPrefix)) return;
    const commandText = command.toLocaleLowerCase().replace(commandPrefix, "").split(" ")[0];
    if (!checkCommand(client.prefixCommandsInfo, commandText)) return;
    if (!(await coolDown(message, client.coolDowns, commandText))) {
      console.log(`User ${message.member.displayName} executed command ${commandText}`);
      await client.prefixCommands.get(commandText).execute(message, client);
    }
  });
  // Use bot token to log into bot
  client.login(env.token);
}

/**
 * Main area this will start the bot
 *
 */
startBot();
