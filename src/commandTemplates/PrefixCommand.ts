import { Message } from "discord.js";
import { IBotHelperClient } from "../../types/helperTypes";

module.exports = {
  name: "ping",
  description: 'This command will respond with "pong"',
  execute(message: Message, client: IBotHelperClient) {
    try {
      message.channel.send("pong");
    } catch (err) {
      console.log(err);
      message.channel.send(`Error Occurred`);
    }
  },
};
