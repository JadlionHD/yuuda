const { Client, Collection } = require("eris");
const { readdirSync } = require("fs");
const OsuAPI = require("./OsuApiWrapper.js");

class MainBot {
  #token
  constructor(token) {
    if(!token) throw new Error("Token Required");

    this.#token = token;
    this.config = require("../config.js");
    this.client = new Client(this.#token, this.config.ClientOptions);
    this.request = require("axios");
    this.util = require("./Util.js");
    this.logger = require("./Logger.js");
    this.osu = new OsuAPI(process.env.OSU_TOKEN);
    this.commands = new Map();
    this.aliases = new Map();
    this.cooldown = new Map();
    this.#commandsLoad();
    this.#eventsLoad();
  }

  Ready() {
    this.client.connect();
    setTimeout(() => {
      require("./Express.js").WebService(this);
      //console.log(this.cmds)
    }, 5 * 1000);
  }

  #commandsLoad = () => {
    readdirSync("./src/commands/").forEach(dir => {
      const cmds = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
      for(let file of cmds) {
        let nameFile = file.replace(".js", "");
        let cmd = require(`../commands/${dir}/${nameFile}`);

        this.commands.set(nameFile, cmd);
        if(cmd.config.aliases) {
          for(let alias of cmd.config.aliases) {
            this.aliases.set(alias, nameFile);
          }
        }
      }
    });
  }
  /*
  #commandsLoad = (client) => {
    const commandFile = readdirSync("./src/commands/").forEach(dir => {
    	const commands = readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith(".js"));
    	for(let file of commands) {
    		let name = file.replace(".js", "").toLowerCase();
    		let cmd = require(`../commands/${dir}/${name}`);

        // Put all the commands in this Collection
        this.cmds.set(name, cmd.config);

    		client.registerCommand(cmd.config.name, async(msg, args) => {
          cmd.run(client, msg, args);
        }, {
    			caseInsensitive: true,
    			aliases: cmd.config.aliases,
    			description: cmd.config.description,
    			cooldown: cmd.config.cooldown * 1000,
    			usage: cmd.config.usage.replace(/{prefix}/gi, this.config.CommandOptions.prefix[0]),
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
  */

  #eventsLoad = async () => {
    const file = readdirSync("./src/events");
    for(const event of file) {
      const name = require(`../events/${event}`);
      this.client.on(event.split(".")[0], (...args) => name(this, ...args));
    }
    
    // monitor ram
    if(this.config.debug === true) {
      this.logger.log("Debug mode is activated!", "warn");
      setTimeout(() => {
        //require("./structures/Express.js")(this.client);
        //console.log(client.commands["ping"])
        setInterval(() => {
          this.logger.log(`RAM USED: ${process.memoryUsage().rss / 1024 / 1024}`, "log");
        }, 1 * 1000);
      }, 10 * 1000);
    }
  }
}

module.exports = MainBot;
