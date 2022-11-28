import { Routes } from "discord.js";
import dotenv from "dotenv";
import { REST } from "@discordjs/rest";
import { ICommand } from "./setCommands";
const codes = dotenv.config({
  path: "./.env",
}).parsed;
export async function updateDiscordCommands(commands: ICommand[]) {
  try {
    const rest = new REST({ version: "10" }).setToken(codes.token);

    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(codes.botId), { body: [] });

    await rest.put(Routes.applicationCommands(codes.botId), { body: commands });

    console.log("Getting Current (/) Commands");

    console.log(await rest.get(`/applications/${codes.botId}/commands`));

    console.log("Successfully reloaded application (/) commands.");
  } catch (err) {
    console.error(err);
  }
}

export async function updateGuildCommands(serverId: string) {
  try {
    const rest = new REST({ version: "10" }).setToken(codes.token);

    console.log("Started refreshing application guild (/) commands.");

    await rest.put(Routes.applicationGuildCommands(codes.botId, serverId), { body: [] });

    console.log("Successfully reloaded application guild (/) commands.");
  } catch (err) {
    console.error(err);
    throw err;
  }
}
