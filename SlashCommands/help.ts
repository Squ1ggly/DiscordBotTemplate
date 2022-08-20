import { EmbedAuthorData } from "discord.js";
import { createSlashCmd } from "../src/createSlashCmdWithOpt";
import genHelpMessage from "../src/generateHelpMessages";

module.exports = {
  data: createSlashCmd("help", 'This command will send you the help message for "/" commands \n use **sq!help** for Prefixed commands'),
  async execute(interaction: any, client: any) {
    try {
      const author: EmbedAuthorData = { name: "The Squid Helper", iconURL: "https://imagessquigglyzerocool.z26.web.core.windows.net/squid.jpg" };
      const helpMessage = genHelpMessage(client.commandsArray, "/", author);
      await interaction.reply({ embeds: [helpMessage] });
    } catch (error) {
      console.log(error);
      await interaction.reply(`Error Occurred`);
    }
  },
};
