import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { IBotHelperClient } from "../types/helper-types";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping".toLowerCase())
    .setDescription('This command will respond with "pong"'),
  async execute(interaction: CommandInteraction, client: IBotHelperClient) {
    try {
      await interaction.deferReply();
      await interaction.editReply("Pong!");
    } catch (err) {
      console.log(err);
      interaction.editReply("Error Occurred");
    }
  }
};
