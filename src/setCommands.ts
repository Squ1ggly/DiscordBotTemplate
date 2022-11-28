import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
export interface ICommand {
  name?: string;
  description?: string;
  options?: object[];
}
export interface IClientWitCommands extends Client {
  commandsArray?: ICommand[];
  commands?: any;
}
export function setCommands(client: IClientWitCommands) {
  client.commands = new Collection();

  const commandFiles = readdirSync("./SlashCommands").filter((e) => e.endsWith(".ts") || e.endsWith(".js"));

  client.commandsArray = [];

  for (const file of commandFiles) {
    const command = require(`../SlashCommands/${file}`);
    const commandObj: ICommand = {
      name: command.data.name,
      description: command.data.description,
    };
    if (command.data.options.length > 0) commandObj.options = command.data.options;
    client.commandsArray.push(commandObj);
    client.commands.set(command.data.name, command);
  }
}
