require("dotenv").config();

const ClientBot = require("./structures/Client.js");
const config = require("./config.js")
const client = new ClientBot(config, config.ClientOptions, config.CommandOptions);

client.connect();

// monitor the ram
setTimeout(() => {
	//require("./structures/Express.js")(client);
	//console.log(client.commands["ping"])
	setInterval(() => {
		console.log(`RAM USED: ${process.memoryUsage().rss / 1024 / 1024}\n`);
	}, 1 * 1000)
}, 10 * 1000)