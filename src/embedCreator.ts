import {
  APIEmbedThumbnail,
  EmbedAuthorData,
  EmbedBuilder,
  EmbedData,
  EmbedField,
  EmbedFooterData,
  EmbedImageData,
} from "discord.js";
import {DateTime} from 'luxon'
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

/**
 * This function takes IEmbedOptions and returns a new embed
 * @param {IEmbedOptions} options : A json object of the options for your embed
 * @returns { Embed }
 */
export default function createEmbed(options: IEmbedOptions): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(options?.setColor ?? 0)
    .setTitle(options?.setTitle)
    .setAuthor(
      options?.setAuthor ?? {
        name: null,
      }
    )
    .setDescription(options?.setDescription)
    .setThumbnail(options?.setThumbnail ?? null)
    .addFields(options?.addFields ?? [])
    .setImage(options?.setImage ?? null)
    .setTimestamp(options?.setTimestamp ?? DateTime.now().toMillis())
    .setFooter(options?.setFooter ?? { text: null })
    .setURL(options.setURL ?? null);
}
