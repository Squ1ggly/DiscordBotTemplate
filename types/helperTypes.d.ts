import {
  APIEmbedThumbnail,
  Client,
  EmbedAuthorData,
  EmbedData,
  EmbedField,
  EmbedFooterData,
  EmbedImageData,
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

export interface IBotHelperClient extends Client {
  slashCommandsArray?: ISlashCommand[];
  commands?: any;
  coolDowns?: any;
  prefixCommandsArray?: IPrefixCommand[];
  prefixCommands?: any;
}
