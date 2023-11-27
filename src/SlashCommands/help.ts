import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { IBotHelperClient } from "../types/helper-types";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help".toLowerCase())
    .setDescription(
      'This command will send you the help message for "/" commands'
    ),
  async execute(interaction: CommandInteraction, client: IBotHelperClient) {
    try {
      await interaction.deferReply();
      await interaction.editReply({ embeds: [client.helpMessage] });
    } catch (err) {
      console.log(err);
      await interaction.editReply(`Error Occurred`);
    }
  }
};
