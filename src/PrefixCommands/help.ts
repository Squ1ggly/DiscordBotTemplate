import { Message } from "discord.js";
import { IBotHelperClient } from "../types/helper-types";

module.exports = {
  name: "help",
  description: "This command will send you this message",
  async execute(message: Message, client: IBotHelperClient) {
    try {
      await message.reply({ embeds: [client.helpMessage] });
    } catch (err) {
      console.log(err);
      await message.reply(`Error Occurred`);
    }
  }
};
