const { CommandClient } = require("eris");
const { readdirSync } = require("fs");

class ClientBot extends CommandClient {
    constructor(config, clientOptions, commandOptions) {
        super(config.DISCORD_TOKEN, clientOptions, commandOptions);

        this.request = require("axios");
        this.config = require("../config.js");
        this.util = require("./Util.js");
        this.logger = require("./Logger.js");
        this._commandsLoad(this);
        this._eventLoad(this);
    }

    _commandsLoad(client) {
        const commandFile = readdirSync("./src/commands/").forEach(dir => {
        	const commands = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));

        	for(let file of commands) {
        		let name = file.replace(".js", "").toLowerCase();
        		let cmd = require(`../commands/${dir}/${name}`);

        		client.registerCommand(cmd.config.name, async(msg, args) => {
                    let p = {
                        msg: msg,
                        client: client,
                        args: args
                    }; // package for commands with only 1 paramenters

                    cmd.run(p);
                }, {
        			caseInsensitive: true,
        			aliases: cmd.config.aliases,
        			description: cmd.config.description,
        			cooldown: cmd.config.cooldown * 1000,
        			usage: cmd.config.usage,
        			requirements: {
        				permissions: cmd.config.requirements.permissions || {} // empty if there's nothing
        			},
                    cooldownMessage: (m => `${m.author.mention}, that's too quick poi!!`),
                    permissionMessage: (m => {
                        return `${m.author.mention}, you been missing some permissions poi!, including: \`${Object.entries(m.command.requirements.permissions).map(([str, value]) => `${str[0] + str.slice(1)}`).join(", ")}\``;
                    })
        		});
        	}
        });

    }

    _eventLoad(client) {
        const file = readdirSync("./src/events");
        for(const event of file) {
            const name = require(`../events/${event}`);
            client.on(event.split(".")[0], (...args) => name(client, ...args));
        }

        // web service
        require("./ModuleHandlers.js").WebService(); 
    }
}

module.exports = ClientBot;
