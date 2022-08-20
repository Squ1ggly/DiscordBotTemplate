import { EmbedAuthorData, EmbedBuilder } from "discord.js";
import createEmbed from "./embedCreator";
import { ICommand } from "./setCommands";

export default function genHelpMessage(commandArray: ICommand[], prefix: string, author: EmbedAuthorData): EmbedBuilder {
  const fields = [];
  for (const helpObj of commandArray) {
    fields.push({
      name: prefix + helpObj.name,
      value: helpObj.description,
      inline: false,
    });
  }

  const embed = createEmbed(
    0x0099ff,
    "Help Message!",
    null,
    author,
    "This is a list of commands that you can run",
    "https://imagessquigglyzerocool.z26.web.core.windows.net/squid.jpg",
    fields,
    null,
    null,
    { text: null }
  );

  return embed;
}
