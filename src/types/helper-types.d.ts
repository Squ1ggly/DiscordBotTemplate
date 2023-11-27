import {
  APIEmbedThumbnail,
  Client,
  Collection,
  EmbedAuthorData,
  EmbedBuilder,
  EmbedData,
  EmbedField,
  EmbedFooterData,
  EmbedImageData,
  Interaction,
  Message
} from "discord.js";

export interface IPrefixCommand {
  name?: string;
  description?: string;
}

export interface ISlashCommand {
  name?: string;
  description?: string;
  options?: object[];
}

export interface IEmbedOptions {
  setTitle: string;
  setDescription: string;
  setColor?: EmbedData["color"];
  setURL?: string;
  setAuthor?: EmbedAuthorData;
  setThumbnail?: APIEmbedThumbnail["url"];
  addFields?: EmbedField[];
  setImage?: EmbedImageData["url"];
  setTimestamp?: number | Date;
  setFooter?: EmbedFooterData;
}

interface execute {
  (message: Message | Interaction, client: IBotHelperClient);
}
export interface IBotHelperClient extends Client {
  helpMessage?: EmbedBuilder;
  slashCommandsInfo?: ISlashCommand[];
  slashCommands?: Collection<string, { execute: execute }>;
  coolDowns?: Map<string, Collection<string, number>>;
  prefixCommandsInfo?: IPrefixCommand[];
  prefixCommands?: Collection<string, { execute: execute }>;
}
