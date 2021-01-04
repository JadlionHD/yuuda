const { readdirSync } = require("fs");

module.exports.run = async (client, msg, args) => {
	let msgEmbed = {
		embed: {
			title: `List commands`,
			color: client.config.colors.success,
			fields: [
			{
				name: `Utility`,
				value: readdirSync(`./src/commands/Utility`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')
			},
			{
				name: `Fun`,
				value: readdirSync(`./src/commands/Fun`).map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, '')
			}
			]
		}
	}
	
	if(args.length > 0) {
		let cur = client.commands[client.commandAliases[args[0]] || args[0]];
		if(cur) {
			let msgHelp = {
				embed: {
					title: `Command: ${args[0]}`,
					color: client.config.colors.success,
					description: `
**Description:** \`${cur.description}\`
**Aliases:** \`${cur.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ") ? cur.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ") : "None"}\`
**Cooldown:** \`${cur.cooldown / 1000} seconds\`
**Permissions:** \`${Object.entries(cur.requirements.permissions).map(([str, value]) => `${str[0] + str.slice(1)}`).join(", ") ? Object.entries(cur.requirements.permissions).map(([str, value]) => `${str[0] + str.slice(1)}`).join(", ") : "None"}\`
**Usage:** \`${cur.usage}\`
`,
	                footer: {
	                    text: `Syntax: [required], <optional>, (comments)`
	                }
				}

			}
			return msg.channel.createMessage(msgHelp)
		}
		else {
			return "Command not found";
		}
	}
	msg.channel.createMessage(msgEmbed)
}

module.exports.config = {
	name: "help",
	aliases: [],
	description: "Showing a list all of the commands",
	usage: "y!help <commands>",
	cooldown: 5,
	requirements: {
		permissions: {}
	}
}