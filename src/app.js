require("dotenv").config();

const MainBot = require("./structures/Client.js");
const config = require("./config.js");

const client = new MainBot(process.env.DISCORD_TOKEN);

client.Ready();