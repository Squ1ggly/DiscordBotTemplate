import { createSlashCmd } from "../src/createSlashCmdWithOpt";

module.exports = {
  data: createSlashCmd("ping", 'This command will respond with "pong"'),
  async execute(interaction: any, client: any) {
    await interaction.reply("Pong!");
  },
};
