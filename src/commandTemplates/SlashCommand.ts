import { CommandInteraction } from "discord.js";
import { IBotHelperClient } from "../../types/helperTypes";
import { createSlashCmd } from "../../utils/discordjsHelper";

module.exports = {
  data: createSlashCmd("ping", 'This command will respond with "pong"'),
  async execute(interaction: CommandInteraction, client: IBotHelperClient) {
    try {
      await interaction.reply("Pong!");
    } catch (err) {
      console.log(err);
      interaction.reply("Error Occurred");
    }
  },
};
