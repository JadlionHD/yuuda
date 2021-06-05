require("dotenv").config();

const ClientBot = require("./structures/Client.js");
const config = require("./config.js");
const client = new ClientBot(config, config.ClientOptions, config.CommandOptions);

client.connect();

if(config.debug === true) {
    // monitor the ram
    client.logger.log("Debug mode is activated!", "warn");
    setTimeout(() => {
        //require("./structures/Express.js")(client);
        //console.log(client.commands["ping"])
        setInterval(() => {
            client.logger.log(`RAM USED: ${process.memoryUsage().rss / 1024 / 1024}`, "log");
        }, 1 * 1000);
    }, 10 * 1000);
}
