import { CommandInteraction } from "discord.js";
import { IBotHelperClient } from "../../types/helperTypes";
import { createSlashCmd } from "../../utils/discordjsHelper";

module.exports = {
  data: createSlashCmd(
    "help",
    'This command will send you the help message for "/" commands \n use **sq!help** for Prefixed commands'
  ),
  async execute(interaction: CommandInteraction, client: IBotHelperClient) {
    try {
      await interaction.deferReply();
      await interaction.editReply({ embeds: [client.slashCommandHelpMessage] });
    } catch (err) {
      console.log(err);
      await interaction.editReply(`Error Occurred`);
    }
  },
};
