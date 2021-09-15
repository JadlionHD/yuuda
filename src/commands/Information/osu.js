module.exports.run = async (client, msg, args) => {
  client.osu.getUser(args[0], args[1]).then((res) => {
    msg.channel.createMessage({
      embed: {
        color: client.config.colors.success,
        title: `osu!${res.mode} ${res.username} profile stats`,
        description: `
**Bancho Rank:** #${client.util.numberComa(res.pp_rank)} (${res.country}: #${res.pp_country_rank})
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
  requirements: {
    permissions: {}
  }
};