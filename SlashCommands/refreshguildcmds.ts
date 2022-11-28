import { CommandInteraction, Interaction } from "discord.js";
import { createSlashCmd } from "../src/createSlashCmdWithOpt";
import { updateGuildCommands } from "../src/syncCommands";

module.exports = {
  data: createSlashCmd(
    "refreshguildcmds",
    "This command will refresh cmds. NOTE: must have BanMembers permission to use this command"
  ),
  async execute(interaction: CommandInteraction, client: any) {
    try {
      if (!interaction.memberPermissions.has("BanMembers")) return;
      await updateGuildCommands(interaction.guildId);
      await interaction.reply("Refreshed bot build commands!");
    } catch (err) {
      throw err;
    }
  },
};
