import { EmbedAuthorData } from "discord.js";
import genHelpMessage from "../src/generateHelpMessages";

module.exports = {
  name: "help",
  description: "This command will send you this message \n use **/help** for Slash Commands",
  async execute(message: any, client: any) {
    try {
      const author: EmbedAuthorData = { name: "The Squid Helper", iconURL: "https://imagessquigglyzerocool.z26.web.core.windows.net/squid.jpg" };
      const helpMessage = genHelpMessage(client.prefixCommandsArray, "sq!", author);
      await message.reply({ embeds: [helpMessage] });
    } catch (error) {
      console.log(error);
      await message.reply(`Error Occurred`);
    }
  },
};