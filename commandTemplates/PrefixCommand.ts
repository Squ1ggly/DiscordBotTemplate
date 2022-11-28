import { ChatInputCommandInteraction } from "discord.js";

module.exports = {
  name: "ping",
  description: 'This command will respond with "pong"',
  execute(message: ChatInputCommandInteraction, client: any) {
    try {
      message.channel.send("pong");
    } catch (err) {
      console.log(err);
      message.channel.send(`Error Occurred`);
    }
  },
};
