import { Routes } from "discord.js";
import codes from "../botCodes.json";
import { REST } from "@discordjs/rest";

const rest = new REST({ version: "10" }).setToken(codes.token);

export async function updateDiscordCommands(commands) {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(codes.botId, codes.serverId), { body: commands });

    console.log("Successfully reloaded application (/) commands.");
  } catch (err) {
    console.error(err);
  }
}
