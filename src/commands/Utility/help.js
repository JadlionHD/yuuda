const { readdirSync } = require("fs");

module.exports.run = async (bot, msg, args) => {
  let msgEmbed = {
    embed: {
      title: `${bot.client.user.username} help menu`,
      color: bot.config.colors.success,
      description: `
Did you find a bug? Hey feel free to open some [issues](${bot.config.package.bugs.url}).
Or you want to contribute to this bot? well you can by visit this [github](${bot.config.package.homepage}).

**List commands available:**
${bot.commands.map(f => {if(f.config.name !== "eval") return `\`${f.config.name}\``;}).join(", ").replace(/,/gi, "")}
`,
      footer: {
        text: `${bot.config.CommandOptions.prefix[0]}help <command> to get info about specific command`,
        icon_url: msg.author.dynamicAvatarURL("jpg", 1080)
      }
    }
  };
  // readdirSync("./src/commands/Fun").map(str => `\`${str[0] + str.slice(1)}\` `).join(" ").replace(/.js/g, "")
  if(args.length > 0) {
    let cur = bot.commands.get(bot.aliases.has(args[0]) ? bot.aliases.get(args[0]) : args[0]).config;//[bot.aliases[args[0]] || args[0]];
    if(cur) {
      let msgHelp = {
        embed: {
          title: `Command: ${args[0]}`,
          color: bot.config.colors.success,
          description: `
**Description:** \`${cur.description}\`
**Aliases:** \`${cur.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ") ? cur.aliases.map(str => `${str[0] + str.slice(1)}`).join(", ") : "None"}\`
**Cooldown:** \`${cur.cooldown} seconds\`
**Permissions:** \`${Object.entries(cur.requirements.permissions).map(([str, value]) => `${str[0] + str.slice(1)}`).join(", ") ? Object.entries(cur.requirements.permissions).map(([str, value]) => `${str[0] + str.slice(1)}`).join(", ") : "None"}\`
**Usage:** \`${cur.usage.replace(/{prefix}/, bot.config.CommandOptions.prefix[0])}\`
`,
          footer: {
            text: "Syntax: [required], <optional>, (comments)",
            icon_url: msg.author.dynamicAvatarURL("jpg", 1080)
          }
        }

      };
      return msg.channel.createMessage(msgHelp);
    }
    else {
      return;
    }
  }
  msg.channel.createMessage(msgEmbed);
};

module.exports.config = {
  name: "help",
  aliases: [],
  description: "Showing a list all of the commands",
  usage: "{prefix}help <commands>",
  cooldown: 5,
  category: "Utility",
  ratelimit: 5,
  requirements: {
    permissions: {}
  }
};