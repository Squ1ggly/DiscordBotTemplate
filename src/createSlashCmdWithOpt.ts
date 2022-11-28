import { SlashCommandBuilder } from "discord.js";
interface ISlashCommandBuilderOpts {
  setName(arg0: string);
  type: number;
  name: string;
  description: string;
  required: boolean;
}
interface ISlashCommandBuilder {
  setName(arg0: string);
  setDescription(arg0: string);
  options?: ISlashCommandBuilderOpts[];
  name: string;
  description: string;
}

/**
 * The function will return a SlashCommand built and ready.
 * Please no spaces in strings
 * @param cmdName : The name of the command
 * @param cmdDesc : Command description
 * @returns
 */
export function createSlashCmd(cmdName: string, cmdDesc: string) {
  return new SlashCommandBuilder().setName(cmdName.toLowerCase()).setDescription(cmdDesc.toLowerCase());
}

/**
 * The function will return a SlashCommand built and ready.
 * Please no spaces in strings
 * @param cmdName : The name of the command
 * @param cmdDesc : Command description
 * @param optName : The name of the option
 * @param optDesc : Option description
 * @param required : Is option required for command?
 * @returns
 */
export function createSlashCmdWithOpts(
  cmdName: string,
  cmdDesc: string,
  optName: string,
  optDesc: string,
  required: boolean = false
) {
  return new SlashCommandBuilder()
    .setName(cmdName.toLowerCase())
    .setDescription(cmdDesc.toLowerCase())
    .addStringOption((option: ISlashCommandBuilderOpts) =>
      option.setName(optName.toLowerCase()).setDescription(optDesc.toLowerCase()).setRequired(required)
    );
}

/**
 * This manipulate your slashCmd to have extra options
 * @param cmd : Your Slash object
 * @param optName : Option name
 * @param optDesc : Option Description
 * @param required : Is option required or not
 */
export function addStringOptionToSlashCmd(cmd, optName: string, optDesc: string, required: boolean = false) {
  cmd.addStringOption((option: ISlashCommandBuilderOpts) =>
    option.setName(optName.toLowerCase()).setDescription(optDesc.toLowerCase()).setRequired(required)
  );
}
