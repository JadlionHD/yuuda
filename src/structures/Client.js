const { CommandClient, Collection} = require("eris");
const { readdirSync } = require("fs");

class ClientBot extends CommandClient {
	constructor(config, clientOptions, commandOptions) {
		super(config.DISCORD_TOKEN, clientOptions, commandOptions);

		this.request = require("axios");
		this.config = require("../config.js");
		this._commandsLoad(this);
		this._eventLoad(this);
	}

	_commandsLoad(client) {
        const commandFile = readdirSync(`./src/commands/`).forEach(dir => {
        	const commands = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));

        	for(let file of commands) {
        		let name = file.replace('.js', '').toLowerCase();
        		let cmd = require(`../commands/${dir}/${name}`);
        		client.registerCommand(cmd.config.name, async(msg, args) => cmd.run(client, msg, args), {
        			caseInsensitive: true,
        			aliases: cmd.config.aliases,
        			description: cmd.config.description,
        			cooldown: cmd.config.cooldown * 1000,
        			usage: cmd.config.usage,
        			requirements: {
        				permissions: cmd.config.requirements.permissions
        			},
                    cooldownMessage: (m => `${m.author.mention}, um customer-sama, that's too quick`),
                    permissionMessage: (m => {
                        let empty = "";
                        Object.entries(m.command.requirements.permissions).forEach(([key, val]) => {
                            empty += `\`${key}\` `
                        })
                        return `${m.author.mention}, you been missing permissions of ${empty}`;
                    })
        		})
        	}
        })

	}

	_eventLoad(client) {
		const file = readdirSync("./src/events");
		for(const event of file) {
			const name = require(`../events/${event}`);
			client.on(event.split(".")[0], (...args) => name(client, ...args));
		} 
	}
}

module.exports = ClientBot;