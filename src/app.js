require("dotenv").config();

const ClientBot = require("./structures/Client.js");
const config = require("./config.js");
const client = new ClientBot(
  config,
  config.ClientOptions,
  config.CommandOptions
);

client.connect();
