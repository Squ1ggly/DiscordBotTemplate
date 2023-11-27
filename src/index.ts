import assert from "node:assert";
import { config } from "dotenv";
import {
  EmbedAuthorData,
  Client,
  GatewayIntentBits,
  Message,
  Interaction,
  Collection,
  EmbedBuilder,
  REST,
  Routes
} from "discord.js";
import { DateTime } from "luxon";
import { readdirSync } from "node:fs";
import path from "node:path";
import {
  IBotHelperClient,
  ISlashCommand,
  IPrefixCommand,
  IEmbedOptions
} from "./types/helper-types";

config();

assert(process.env?.botImage);
assert(process.env.commandPrefix);
assert(process.env.botId);
assert(process.env.token);
assert(process.env.serverId);

class DiscordBotHelper {
  author: EmbedAuthorData;
  client: IBotHelperClient;
  token: string;
  globalCoolDown: number;
  commandPrefix: string;
  botId: string;
  serverId: string;
  constructor(
    botImg: string,
    authorName: string,
    commandCoolDown: number,
    commandPrefix: string,
    botId: string,
    botToken: string,
    serverId?: string
  ) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
      ]
    });
    this.botId = botId;
    this.token = botToken;
    this.globalCoolDown = commandCoolDown;
    this.commandPrefix = commandPrefix;
    this.serverId = serverId;
    this.author = {
      name: authorName,
      iconURL: botImg || null
    };
  }

  checkSlashCommand(commandMsg: string): boolean {
    const foundCommand = this.client.slashCommandsInfo.find(
      (e: ISlashCommand) => e.name === commandMsg
    );
    if (foundCommand) {
      return true;
    }
    return false;
  }

  checkPrefixCommand(commandMsg: string): boolean {
    const foundCommand = this.client.prefixCommandsInfo.find(
      (e: IPrefixCommand) => e.name === commandMsg
    );
    if (foundCommand) {
      return true;
    }
    return false;
  }

  coolDown(message: Message | Interaction, coolDownCMD: string): number {
    const id: string = !(message as Message)?.author?.id
      ? message.member.user.id
      : (message as Message).author.id;
    try {
      if (!this.client.coolDowns.has(coolDownCMD)) {
        this.client.coolDowns.set(coolDownCMD, new Collection());
      }
      const now = DateTime.now().toMillis();
      const timeStamps = this.client.coolDowns.get(coolDownCMD);
      if (timeStamps.has(id)) {
        const expirationTime = timeStamps.get(id);
        const timeLeft = (expirationTime - now) / 1000;
        if (now < expirationTime) {
          console.log(`User ${id} is too fast`);
          return timeLeft;
        }
      }
      timeStamps.set(id, now + this.globalCoolDown * 1000);
      setTimeout(() => timeStamps.delete(id), this.globalCoolDown * 1000);
      return 0;
    } catch (error) {
      message.channel.send(`${error}`);
    }
  }

  removeUnusedKeys(obj: object): Object {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => v !== null && v !== "")
    );
  }

  createEmbed(options: IEmbedOptions): EmbedBuilder {
    console.log(`Creating embed ${JSON.stringify(options, null, 2)}`);
    const cleanOptions = this.removeUnusedKeys(options) as IEmbedOptions;
    return new EmbedBuilder()
      .setColor(cleanOptions?.setColor ?? 0)
      .setTitle(cleanOptions?.setTitle)
      .setAuthor(
        cleanOptions?.setAuthor ?? {
          name: null
        }
      )
      .setDescription(cleanOptions?.setDescription)
      .setThumbnail(cleanOptions?.setThumbnail ?? null)
      .addFields(cleanOptions?.addFields ?? [])
      .setImage(cleanOptions?.setImage ?? null)
      .setTimestamp(cleanOptions?.setTimestamp ?? DateTime.now().toMillis())
      .setFooter(cleanOptions?.setFooter ?? { text: null })
      .setURL(cleanOptions?.setURL ?? null);
  }

  genHelpMessages(): void {
    const prefixFields = this.client.prefixCommandsInfo.map((helpObj) => ({
      name: this.commandPrefix + helpObj.name,
      value: helpObj.description,
      inline: false
    }));

    const slashCmdFields = this.client.slashCommandsInfo.map((helpObj) => ({
      name: "/" + helpObj.name,
      value: helpObj.description,
      inline: false
    }));

    const baseObj = {
      setColor: 0x0099ff,
      setTitle: "Help Message!",
      setURL: this.author.iconURL ?? "null",
      setAuthor: this.author,
      setDescription: "This is a list of commands that you can run",
      setThumbnail: this.author.iconURL,
      setImage: null,
      setTimestamp: DateTime.utc().toMillis(),
      setFooter: { text: null }
    };

    const embedOptions = {
      ...baseObj,
      addFields: [...prefixFields, ...slashCmdFields]
    };

    this.client.helpMessage = this.createEmbed(embedOptions);
  }

  setSlashCommands(): void {
    console.log(`Setting slash commands`);
    this.client.slashCommands = new Collection();
    const upDir = path.join(__dirname, "../");
    const commandFiles = readdirSync(upDir + "/SlashCommands").filter(
      (e) => e.endsWith(".ts") || e.endsWith(".js")
    );

    this.client.slashCommandsInfo = [];

    for (const file of commandFiles) {
      const command = require(`../SlashCommands/${file}`);
      const commandObj: ISlashCommand = {
        name: command.data.name,
        description: command.data.description
      };
      if (command.data.options.length > 0)
        commandObj.options = command.data.options;
      this.client.slashCommandsInfo.push(commandObj);
      this.client.slashCommands.set(command.data.name, command);
    }
    console.log(`Finished setting slash commands`);
  }

  setPrefixCommands(): void {
    console.log(`Setting prefix commands`);
    this.client.prefixCommands = new Collection();
    const upDir = path.join(__dirname, "../");
    const commandFiles = readdirSync(upDir + "/PrefixCommands").filter(
      (e) => e.endsWith(".ts") || e.endsWith(".js")
    );
    this.client.prefixCommandsInfo = [];
    for (const file of commandFiles) {
      const command = require(`../PrefixCommands/${file}`);
      const commandObj: IPrefixCommand = {
        name: command.name,
        description: command.description
      };
      this.client.prefixCommandsInfo.push(commandObj);
      this.client.prefixCommands.set(command.name, command);
    }
    console.log(`Finished setting prefix commands`);
  }

  async updateDiscordCommands(): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(this.token);
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes.applicationCommands(this.botId), { body: [] });
    await rest.put(Routes.applicationCommands(this.botId), {
      body: this.client.prefixCommandsInfo
    });
    console.log("Getting Current (/) Commands");
    console.log(await rest.get(`/applications/${this.botId}/commands`));
    console.log("Successfully reloaded application (/) commands.");
  }

  async clearBotLevelCommands(): Promise<void> {
    const rest = new REST({ version: "10" }).setToken(this.token);
    const curr = (await rest.get(
      `/applications/${this.botId}/commands`
    )) as any[];
    if (curr.length > 0) {
      console.log("Started clearing application (/) commands.");
      await rest.put(Routes.applicationCommands(this.botId), { body: [] });
      console.log("Successfully cleared application (/) commands.");
    }
  }

  async updateGuildCommands(): Promise<void> {
    if (!this.serverId) {
      throw new Error("Must have a server id to perform this function");
    }
    const rest = new REST({ version: "10" }).setToken(this.token);
    console.log("Started refreshing application guild (/) commands.");
    await rest.put(Routes.applicationGuildCommands(this.botId, this.serverId), {
      body: []
    });
    if (this.client.slashCommandsInfo.length > 0) {
      await rest.put(
        Routes.applicationGuildCommands(this.botId, this.serverId),
        {
          body: this.client.slashCommandsInfo
        }
      );
    }
    console.log("Successfully reloaded application guild (/) commands.");
  }

  startBot(): void {
    if (!this.botId && !this.token) {
      throw new Error("\nWARNING : Please put credentials for bot in .env\n");
    }
    this.client.coolDowns = new Map();
    this.setSlashCommands();
    this.setPrefixCommands();
    this.genHelpMessages();

    this.client.on("ready", async () => {
      console.log(`Bot Started`);
      //await updateDiscordCommands(); This is for non server scoped bots
      await this.clearBotLevelCommands();
      await this.updateGuildCommands();
    });

    this.client.on(
      "interactionCreate",
      async function (interaction: any) {
        if (!interaction.isChatInputCommand()) {
          return;
        }
        if (!this.checkSlashCommand(interaction.commandName)) {
          return;
        }
        const coolDown = await this.coolDown(
          interaction,
          interaction.commandName
        );
        if (coolDown === 0) {
          console.log(
            `User ${interaction.member.user.username} executed command ${interaction.commandName}`
          );
          await this.client.slashCommands
            .get(interaction.commandName)
            .execute(interaction, this.client);
        } else {
          await interaction.reply(
            `Please wait ${coolDown.toFixed(2)} more seconds before using ${
              interaction.commandName
            }`
          );
        }
      }.bind(this)
    );

    this.client.on(
      "messageCreate",
      async function (message: any) {
        if (message.author.bot || !message.content) {
          return;
        }
        const command = message.content.toLowerCase();
        if (!command.startsWith(this.commandPrefix.toLowerCase())) {
          return;
        }

        const commandText = command
          .replace(this.commandPrefix, "")
          .split(" ")[0];
        if (!this.checkPrefixCommand(commandText)) {
          message.reply(
            `Command not recognized, syntax is "${this.commandPrefix}COMMAND INPUT"\n The space is required between the command and the input`
          );
          return;
        }
        const coolDownMessage = await this.coolDown(message, commandText);
        if (coolDownMessage === 0) {
          console.warn(
            `User ${message.member.displayName} executed command ${commandText}`
          );
          await this.client.prefixCommands
            .get(commandText)
            .execute(message, this.client);
        } else {
          await message.reply(
            `Please wait ${coolDownMessage.toFixed(
              2
            )} more seconds before using ${commandText}`
          );
        }
      }.bind(this)
    );

    this.client.login(this.token);
  }
}

new DiscordBotHelper(
  process.env?.botImage,
  "Bot Template",
  3,
  process.env.commandPrefix,
  process.env.botId,
  process.env.token,
  process.env.serverId
).startBot();
