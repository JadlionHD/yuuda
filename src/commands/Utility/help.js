const { readdirSync } = require("fs");

module.exports.run = async (client, msg, args) => {
	if(args[0].length > 0) {
		let cur = client.commands[client.commandAliases[args[0]] || args[0]];
		if(!cur) return "Command not found";

	}
	msg.channel.createMessage("No not listed yet")
}

module.exports.config = {
	name: "help",
	aliases: [],
	description: "Showing a list all of the commands",
	usage: "j!help <commands>",
	cooldown: 5,
	requirements: {
		permissions: {
			"administrator": false
		}
	}
}