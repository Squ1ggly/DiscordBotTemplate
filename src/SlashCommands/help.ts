import { CommandInteraction } from "discord.js";
import { globalAuthor } from "..";
import { IBotHelperClient } from "../../types/helperTypes";
import { createSlashCmd, genHelpMessage } from "../../utils/discordjsHelper";

module.exports = {
  data: createSlashCmd(
    "help",
    'This command will send you the help message for "/" commands \n use **sq!help** for Prefixed commands'
  ),
  async execute(interaction: CommandInteraction, client: IBotHelperClient) {
    try {
      const helpMessage = genHelpMessage(client.slashCommandsArray, globalAuthor, "/");
      await interaction.reply({ embeds: [helpMessage] });
    } catch (err) {
      console.log(err);
      await interaction.reply(`Error Occurred`);
    }
  },
};
