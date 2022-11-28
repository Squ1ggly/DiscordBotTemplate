import { ChatInputCommandInteraction } from "discord.js";
import { createSlashCmd } from "../src/createSlashCmdWithOpt";

module.exports = {
  data: createSlashCmd("ping", 'This command will respond with "pong"'),
  async execute(interaction: ChatInputCommandInteraction, client: any) {
    try {
      await interaction.reply("Pong!");
    } catch (err) {
      console.log(err);
      interaction.reply("Error Occurred");
    }
  },
};
