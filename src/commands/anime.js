const moment = require("moment");

module.exports.run = async (bot, msg, args) => {
  let argument = args.join(" ");
  if(!argument) return msg.channel.createMessage(`${msg.author.mention}, you're missing some argument poi.`);

  bot.config.anilist.searchAnime(argument).then(body => {
    if(body.data.Media.isAdult === false || msg.channel.nsfw === true) {
      let starred = `${"★".repeat(Math.floor((body.data.Media.averageScore || 20)/20))} ${body.data.Media.averageScore}%`;
      let desc = body.data.Media.description || "None";
      let msgEmbed = {
        embed: {
          title: `${body.data.Media.title.romaji}`,
          color: bot.config.colors.green,
          description: bot.util.trim(desc.replace(/<\/?[a-z]*\/?>/g, ""), 1024)[0],
          fields: [
            {
              name: "Episodes",
              value: `${body.data.Media.episodes || "??"} Episodes`,
              inline: true
            },
            {
              name: "Status",
              value: body.data.Media.status,
              inline: true
            },
            {
              name: "Rating",
              value: starred,
              inline: true
            },
            {
              name: "Genres",
              value: `${body.data.Media.genres.map(str => `\`${str[0] + str.slice(1)}\``).join(", ")}`
            },
            {
              name: "Start Date",
              value: `<t:${moment({ year: body.data.Media.startDate.year, month: body.data.Media.startDate.month, day: body.data.Media.startDate.day }).unix()}:R>`,
              inline: true
            },
            {
              name: "Nsfw?",
              value: body.data.Media.isAdult ? "Yes" : "No",
              inline: true
            }
          ],
          thumbnail: {
            url: body.data.Media.coverImage.large
          },
			        footer: {
			        	text: "Powered by AniList API",
			        	icon_url: "https://anilist.co/img/icons/android-chrome-512x512.png"
			        },
          image: {
            url: body.data.Media.bannerImage
          }
        }
      };
      msg.channel.createMessage(msgEmbed);
    } else {
      msg.channel.createMessage("Sorry, this anime related to nsfw poi, please use this on nsfw channel poi!");
    }
  }).catch(error => {
    msg.channel.createMessage("There's some error poi, try again poi");
    console.log(error);
  });
};
// ★☆
module.exports.config = {
  name: "anime",
  aliases: [],
  description: "search a anime",
  usage: "{prefix}anime [name anime]",
  cooldown: 10,
  category: "Information",
  ratelimit: 3,
  requirements: {
    permissions: {}
  }
};