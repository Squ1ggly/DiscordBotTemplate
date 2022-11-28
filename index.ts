import { Client, GatewayIntentBits, Interaction } from "discord.js";
import { checkCommand } from "./src/checkCommand";
import { IClientWitCommands, setCommands } from "./src/setCommands";
import { updateDiscordCommands } from "./src/syncCommands";
import dotenv from "dotenv";
import { IClientWitPrefixCommands, setPrefixCommands } from "./src/setPrefixCommands";
import coolDown from "./src/coolDown";
import chalk from "chalk";
const codes = dotenv.config({
  path: "./.env"
}).parsed
try {
  if (codes.botId && codes.token) {
    //cmd prefix not used for this bot
    const commandPrefix = "sq!";

    const coolDowns = new Map();

    const client: IClientWitCommands & IClientWitPrefixCommands = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent],
    });

    setCommands(client);
    setPrefixCommands(client);
    client.on("ready", async () => {
      console.log(`Bot Started`);
      await updateDiscordCommands(client.commandsArray);
    });

    client.on("interactionCreate", async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (!checkCommand(client.commandsArray, interaction.commandName)) return;
      if (!coolDown(interaction, coolDowns, interaction.commandName)) {
        await client.commands.get(interaction.commandName).execute(interaction, client);
      }
    });

    client.on("messageCreate", async (message) => {
      if (message.author.bot) return;
      if (!message.content) return;
      const command = message.content.toLowerCase();
      if (!command.toLowerCase().startsWith(commandPrefix)) return;
      const commandText = command.toLocaleLowerCase().replace(commandPrefix, "").split(" ")[0];
      if (!checkCommand(client.prefixCommandsArray, commandText)) return;
      if (!coolDown(message, coolDowns, commandText)) {
        await client.prefixCommands.get(commandText).execute(message, client);
      }
    });

    client.login(codes.token);

  } else console.log(chalk.redBright("\n        WARNING : Please put credentials for bot in botCodes.json\n"));
} catch (err) {
  console.log(`${err}`)
}