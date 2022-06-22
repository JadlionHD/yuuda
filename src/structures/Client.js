const { Client, Collection } = require("eris");
const { readdirSync } = require("fs");
const OsuAPI = require("./OsuApiWrapper.js");

class MainBot {
  #token;
  constructor(token) {
    if (!token) throw new Error("Token Required");

    this.#token = token;
    this.config = require("../config.js");
    this.client = new Client(this.#token, this.config.ClientOptions);
    this.request = require("axios");
    this.util = require("./Util.js");
    this.logger = require("./Logger.js");
    this.osu = new OsuAPI(process.env.OSU_TOKEN);
    this.commands = new Collection();
    this.aliases = new Map();
    this.cooldown = new Map();
    this.#commandsLoad();
    this.#eventsLoad();
  }

  start() {
    this.client.connect();
    this.logger.log(`Loaded ${this.commands.size} commands!`, "ready");
    setTimeout(() => {
      require("./Express.js").WebService(this);
    }, 5 * 1000);
  }

  #commandsLoad = () => {
    readdirSync("./src/commands/").forEach((file) => {
      let nameFile = file.replace(".js", "");
      let cmd = require(`../commands/${nameFile}`);

      this.commands.set(nameFile, cmd);

      if (cmd.config.aliases) {
        for (let alias of cmd.config.aliases) {
          this.aliases.set(alias, nameFile);
        }
      }
    });
  };

  #eventsLoad = async () => {
    const file = readdirSync("./src/events");
    for (const event of file) {
      const name = require(`../events/${event}`);
      this.client.on(event.split(".")[0], (...args) => name(this, ...args));
    }
  };
}

module.exports = MainBot;
