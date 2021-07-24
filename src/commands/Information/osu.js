module.exports.run = async (client, msg, args) => {
  client.osu.getUser(args[1], args[0]).then((res) => {
    console.log(res);
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
  usage: "<mode?> [username]",
  cooldown: 5,
  requirements: {
    permissions: {}
  }
};