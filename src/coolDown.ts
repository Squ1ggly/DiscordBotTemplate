import { Collection } from "discord.js";

export default function coolDown(message, coolDowns, coolDownCMD: string) {
  let id: string;
  if (message?.author?.id) id = message.author.id;
  else id = message.member.id;
  try {
    if (!coolDowns.has(coolDownCMD)) {
      coolDowns.set(coolDownCMD, new Collection());
    }
    const now = Date.now();
    const timeStamps = coolDowns.get(coolDownCMD);
    const coolDownAmount = 1 * 1000;
    if (timeStamps.has(id)) {
      const expirationTime = timeStamps.get(id) + coolDownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`FYI: Please wait ${timeLeft.toFixed(1)} more seconds before using ${coolDownCMD}`);
      }
    }
    timeStamps.set(id, now);
    setTimeout(() => timeStamps.delete(id), coolDownAmount);
  } catch (error) {
    message.channel.send(`${error}`);
  }
}
