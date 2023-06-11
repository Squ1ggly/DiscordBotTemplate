import { Message } from "discord.js";
import { IBotHelperClient } from "../types/helper-types";

module.exports = {
  name: "ping",
  description: 'This command will respond with "pong"',
  async execute(message: Message, client: IBotHelperClient) {
    try {
      await message.channel.send("pong");
    } catch (err) {
      console.log(err);
      await message.channel.send(`Error Occurred`);
    }
  }
};
