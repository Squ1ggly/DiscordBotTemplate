module.exports = {
  name: "ping",
  description: 'This command will respond with "pong"',
  execute(message: any, client: any) {
    try {
      message.channel.send("pong");
    } catch (error) {
      message.channel.send(`Error Occurred`);
    }
  },
};