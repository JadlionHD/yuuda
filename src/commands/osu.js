module.exports.run = async (bot, msg, args) => {
  if(!args.join(" ")) return msg.channel.createMessage(`${msg.author.mention}, you're missing some argument poi.`);
  bot.osu.getUser(args[0], args[1]).then((res) => {
    msg.channel.createMessage({
      embed: {
        color: bot.config.colors.success,
        title: `osu!${res.mode} ${res.username} profile stats`,
        description: `
**Bancho Rank:** #${bot.util.numberComa(res.pp_rank)} (${res.country}: #${res.pp_country_rank})
**Level:** ${res.level}
`,
        thumbnail: {
          url: `http://s.ppy.sh/a/${res.user_id}`
        }
      }
    });
  });
};


module.exports.config = {
  name: "osu",
  aliases: [],
  description: "testing some new feature",
  usage: "{prefix}osu [username] <mode?>",
  cooldown: 5,
  category: "Information",
  ratelimit: 5,
  requirements: {
    permissions: {}
  }
};