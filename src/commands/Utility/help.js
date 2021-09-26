const { readdirSync } = require("fs");

module.exports.run = async (bot, msg, args) => {
  let msgEmbed = {
    embed: {
      title: "List commands",
      color: bot.config.colors.success,
      fields: [
        {
          name: "Utility",
          value: "help, ping, stats"
        },
        {
          name: "Fun",
          value: "howgay"
        },
        {
          name: "Information",
          value: "anime, osu"
        }
      ]
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
              text: "Syntax: [required], <optional>, (comments)"
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