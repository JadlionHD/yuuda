require("dotenv").config();

const logger = require("./structures/Logger.js");
const ClientBot = require("./structures/Client.js");
const config = require("./config.js");

const client = new ClientBot(config, config.ClientOptions,config.CommandOptions);

client.Ready();