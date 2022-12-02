import { Message } from "discord.js";
import { globalAuthor } from "..";
import { IBotHelperClient } from "../../types/helperTypes";
import { genHelpMessage } from "../../utils/discordjsHelper";

module.exports = {
  name: "help",
  description: "This command will send you this message \n use **/help** for Slash Commands",
  async execute(message: Message, client: IBotHelperClient) {
    try {

      const helpMessage = genHelpMessage(client.prefixCommandsInfo, globalAuthor);
      await message.reply({ embeds: [helpMessage] });
    } catch (err) {
      console.log(err);
      await message.reply(`Error Occurred`);
    }
  },
};
