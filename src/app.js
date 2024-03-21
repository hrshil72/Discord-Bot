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

client.login(process.env.TOKEN);
