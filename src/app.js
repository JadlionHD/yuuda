require("dotenv").config();

const ClientBot = require("./structures/Client.js");
const config = require("./config.js")
const client = new ClientBot(config, config.ClientOptions, config.CommandOptions);

client.connect();

// connecting to database
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true, 
	useUnifiedTopology: true
}).then(() => {
	client.logger.log("MongoDB Ready", "ready")
})


// monitor the ram
setTimeout(() => {
	//require("./structures/Express.js")(client);
	//console.log(client.commands["ping"])
	setInterval(() => {
		client.logger.log(`RAM USED: ${process.memoryUsage().rss / 1024 / 1024}`, "log");
	}, 1 * 1000)
}, 10 * 1000)