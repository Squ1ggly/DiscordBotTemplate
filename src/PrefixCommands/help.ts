import { Message } from "discord.js";
import { IBotHelperClient } from "../../types/helperTypes";

module.exports = {
  name: "help",
  description: "This command will send you this message \n use **/help** for Slash Commands",
  async execute(message: Message, client: IBotHelperClient) {
    try {
      await message.reply({ embeds: [client.prefixCommandHelpMessage] });
    } catch (err) {
      console.log(err);
      await message.reply(`Error Occurred`);
    }
  },
};
