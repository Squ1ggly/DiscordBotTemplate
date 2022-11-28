import { APIEmbedThumbnail, EmbedAuthorData, EmbedData, EmbedField, EmbedFooterData, EmbedImageData } from "discord.js";

export interface IEmbedOptions {
  setColor?: EmbedData["color"];
  setTitle?: string;
  setURL?: string;
  setAuthor?: EmbedAuthorData;
  setDescription?: string;
  setThumbnail?: APIEmbedThumbnail["url"];
  addFields?: EmbedField[];
  setImage?: EmbedImageData["url"];
  setTimestamp?: number | Date;
  setFooter?: EmbedFooterData;
}

export default function createEmbed(options: IEmbedOptions) {
  const cleanOjb = Object.fromEntries(Object.entries(options).filter(([_, v]) => v !== null || v !== ""));
  let funcString: string = ``;
  for (const [key, value] of Object.entries(cleanOjb)) {
    const valParse =
      typeof value === "string"
        ? `"${value}"`
        : typeof value === "object"
        ? JSON.stringify(value, null, 2)
        : typeof value === "function"
        ? `${value}`
        : value;
    funcString = funcString.concat(`.${key}(${valParse})`);
  }
  return eval(`const {EmbedBuilder}=require("discord.js");new EmbedBuilder()${funcString};`);
}
