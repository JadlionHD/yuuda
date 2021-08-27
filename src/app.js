require("dotenv").config();

const logger = require("./structures/Logger.js");
const ClientBot = require("./structures/Client.js");
const config = require("./config.js");

const client = new ClientBot(config, config.ClientOptions,config.CommandOptions);

setTimeout(() => {
  require("./structures/Express.js").WebService(client);
}, 10 * 1000);

client.connect();
