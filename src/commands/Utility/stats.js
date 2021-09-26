module.exports.run = async (bot, msg, args) => {
  msg.channel.createMessage({
    embed: {
      color: bot.config.colors.success,
      description: `
**Client Info**
\`\`\`yaml
Uptime: ${bot.util.secondParser(process.uptime())}
RAM Usage: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)+"MB"}
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