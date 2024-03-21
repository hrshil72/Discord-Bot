import "dotenv/config";

import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let status = [
  {
    name: "Netflix",
    type: ActivityType.Watching,
    url: "https://www.netflix.com/browse",
  },
  {
    name: "Youtube",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=OqxHy8sCtvA&list=PLpmb-7WxPhe0ZVpH9pxT5MtC4heqej8Es&index=6",
  },
];

client.on("ready", (e) => {
  console.log(`${e.user.username} is online`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[random]);
  }, 10000);
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
      .setImage(
        "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png"
      )
      .setTimestamp()
      .setFooter({
        text: "Some footer text here",
        iconURL:
          "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/visual-studio-code-icon.png",
      });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
