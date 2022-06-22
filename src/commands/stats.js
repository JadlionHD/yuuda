module.exports.run = async (bot, msg, args) => {
  msg.channel.createMessage({
    embed: {
      title: bot.client.user.username,
      color: bot.config.colors.success,
      thumbnail: {
        url: bot.client.user.dynamicAvatarURL("jpg", 1080)
      },
      description: `
\`\`\`yaml
Bot Version  : v${bot.config.package.version}
Library      : Eris v${bot.config.package.dependencies.eris.replace("^", "")}
Guilds       : ${bot.client.guilds.size}
Uptime       : ${bot.util.secondParser(process.uptime())}
RAM Usage    : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)+"MB"}
\`\`\`
`
    }
  });
};


module.exports.config = {
  name: "stats",
  aliases: [],
  description: "Stats info of the bot",
  usage: "{prefix}ping",
  cooldown: 5,
  category: "Utility",
  ratelimit: 5,
  requirements: {
    permissions: {}
  }
};