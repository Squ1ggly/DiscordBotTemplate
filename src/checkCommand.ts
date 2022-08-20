import { ICommand } from "./setCommands";

export function checkCommand(commands: ICommand[], commandMsg: string): boolean {
  for (const command of commands) {
    if (command.name === commandMsg) return true;
  }
  return false;
}