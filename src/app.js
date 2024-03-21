import "dotenv/config";

import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", (e) => {
  console.log(`${e.user.username} is online`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "Hello") {
    message.reply("Hello");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    await interaction.reply("Hey ");
  }

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong");
  }

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    await interaction.reply(`The sum is ${num1 + num2}`);
  }

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Coding")
      .setURL("https://discord.js.org/")
      .setAuthor({
        name: "Harshil",
        iconURL:
          "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png",
        url: "https://discord.js.org",
      })
      .setDescription("Coding kro")
      .setThumbnail(
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png"
      )
      .addFields(
        { name: "Regular field title", value: "Some value here" },
        { name: "\u200B", value: "\u200B" },
        { name: "Inline field title", value: "Some value here", inline: true },
        { name: "Inline field title", value: "Some value here", inline: true }
      )
      .addFields({
        name: "Inline field title",
        value: "Some value here",
        inline: true,
      })
      .setImage("https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png")
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png",
      });

    interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
