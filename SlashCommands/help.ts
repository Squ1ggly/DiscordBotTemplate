import { EmbedAuthorData } from "discord.js";
import { createSlashCmd } from "../src/createSlashCmdWithOpt";
import genHelpMessage from "../src/generateHelpMessages";

module.exports = {
  data: createSlashCmd(
    "help",
    'This command will send you the help message for "/" commands \n use **sq!help** for Prefixed commands'
  ),
  async execute(interaction: any, client: any) {
    try {
      const author: EmbedAuthorData = {
        name: "TESTBOT",
        iconURL:
          "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f",
      };
      const helpMessage = genHelpMessage(client.commandsArray, "/", author);
      await interaction.reply({ embeds: [helpMessage] });
    } catch (error) {
      console.log(error);
      await interaction.reply(`Error Occurred`);
    }
  },
};
