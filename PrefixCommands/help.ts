import { EmbedAuthorData } from "discord.js";
import genHelpMessage from "../src/generateHelpMessages";

module.exports = {
  name: "help",
  description: "This command will send you this message \n use **/help** for Slash Commands",
  async execute(message: any, client: any) {
    try {
      const author: EmbedAuthorData = { name: "TEST", iconURL: "https://sparkcdnwus2.azureedge.net/sparkimageassets/XPDC2RH70K22MN-08afd558-a61c-4a63-9171-d3f199738e9f" };
      const helpMessage = genHelpMessage(client.prefixCommandsArray, "sq!", author);
      await message.reply({ embeds: [helpMessage] });
    } catch (error) {
      console.log(error);
      await message.reply(`Error Occurred`);
    }
  },
};