module.exports.run = (bot, msg, args) => {
  if(!args.join(" ")) return msg.channel.createMessage(`${msg.author.mention}, you're missing some argument poi.`);
  bot.config.anilist.searchCharacter(args.join(" ")).then(body => {
    let desc = body.data.Character.description || "No Description";
    desc = desc.replace(/<\/?[a-z]*\/?>/g, "");
    let msgEmbed = {
      embed: {
        title: body.data.Character.name.full,
        url: body.data.Character.siteUrl,
        color: bot.config.colors.green,
        description: "",
        thumbnail: {
          url: body.data.Character.image.large
        },
        footer: {
          icon_url: "https://anilist.co/img/icons/android-chrome-512x512.png",
          text: "Powered by AniList API"
        },
        fields: [
          {
            name: "Age",
            value: `${body.data.Character.age || "?"}`,
            inline: true
          },
          {
            name: "Favourites",
            value: `★${body.data.Character.favourites || "?"}`,
            inline: true
          },
          {
            name: "Series",
            value: `${body.data.Character.media.nodes[0].title.romaji}`
          }
        ]
      }
    };
    if(desc.length < 1023) {
      msgEmbed.embed.description = desc;
    } else {
      msgEmbed.embed.description = bot.util.trim(desc, 1024)[0] + `[...See More](${body.data.Character.siteUrl})`;
    }
    msg.channel.createMessage(msgEmbed);
  }).catch((error) => {
    msg.channel.createMessage("There's some error poi, please try again poi");
    console.log(error);
  });
};

module.exports.config = {
  name: "character",
  aliases: ["chara", "char"],
  description: "search a anime/manga character",
  usage: "{prefix}char Z23",
  cooldown: 10,
  category: "Information",
  ratelimit: 3,
  requirements: {
    permissions: {}
  }
};