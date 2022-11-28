import { EmbedAuthorData, EmbedBuilder } from "discord.js";
import createEmbed, { IEmbedOptions } from "./embedCreator";
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

  const eObj: IEmbedOptions = {
    setColor: 0x0099ff,
    setTitle: "Help Message!",
    setURL: null,
    setAuthor: author,
    setDescription: "This is a list of commands that you can run",
    setThumbnail: "https://imagessquigglyzerocool.z26.web.core.windows.net/squid.jpg",
    addFields: fields,
    setImage: null,
    setTimestamp: null,
    setFooter: { text: null },
  };
  const embed = createEmbed(eObj);
  return embed;
}