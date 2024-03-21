import "dotenv/config";

import { Client, GatewayIntentBits } from "discord.js";
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
});

client.login(process.env.TOKEN);
