import { APIEmbedThumbnail, EmbedAuthorData, EmbedBuilder, EmbedData, EmbedField, EmbedFooterData, EmbedImageData } from "discord.js";

export default function createEmbed(
  setColour?: EmbedData["color"],
  setTitle?: string,
  setUrl?: string,
  setAuthor?: EmbedAuthorData,
  setDescription?: string,
  setThumbnail?: APIEmbedThumbnail["url"],
  addFields?: EmbedField[],
  setImage?: EmbedImageData["url"],
  setTimestamp?: number | Date,
  setFooter?: EmbedFooterData
): EmbedBuilder {
  const returnObj = new EmbedBuilder()
    .setColor(setColour)
    .setTitle(setTitle)
    .setURL(setUrl)
    .setAuthor(setAuthor)
    .setDescription(setDescription)
    .setThumbnail(setThumbnail)
    .addFields(...addFields)
    .setImage(setImage)
    .setTimestamp(setTimestamp)
    .setFooter(setFooter);
  return returnObj
}
