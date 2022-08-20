import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { ICommand } from "./setCommands";
export interface IClientWitPrefixCommands extends Client {
  prefixCommandsArray?: ICommand[];
  prefixCommands?: any;
}
export function setPrefixCommands(client: IClientWitPrefixCommands) {
  client.prefixCommands = new Collection();

  const commandFiles = readdirSync("./PrefixCommands").filter((e) => e.endsWith(".ts"));

  client.prefixCommandsArray = [];

  for (const file of commandFiles) {
    const command = require(`../PrefixCommands/${file}`);
    const commandObj: ICommand = {
      name: command.name,
      description: command.description,
    };
    client.prefixCommandsArray.push(commandObj);
    client.prefixCommands.set(command.name, command);
  }
}
