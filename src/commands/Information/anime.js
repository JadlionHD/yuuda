const anilist = require("../../structures/Anilist.js");

module.exports.run = async (p) => {
    let argument = p.args.join(" ");
    if(!argument) return p.msg.channel.createMessage(`${p.msg.author.mention}, you're missing some argument poi.`);

    anilist.searchAnime(argument).then(body => {
        if(body.data.Media.isAdult === false || p.msg.channel.nsfw === true) {
            let starred = Math.floor((body.data.Media.averageScore || 20) / 20);
            let desc = body.data.Media.description || "None";
            console.log(body);
            let msgEmbed = {
                embed: {
                    title: `${body.data.Media.title.romaji}`,
                    color: p.client.config.colors.success,
                    description: p.client.util.trim(desc.replace(/<br>/g, ""), 1024)[0],
                    fields: [
                        {
                            name: "Episodes",
                            value: `${body.data.Media.episodes || "Unknown"} Episodes`,
                            inline: true
                        },
                        {
                            name: "Status",
                            value: body.data.Media.status,
                            inline: true
                        },
                        {
                            name: "Rating",
                            value: "★".repeat(starred),
                            inline: true
                        },
                        {
                            name: "Genres",
                            value: `${body.data.Media.genres.map(str => `\`${str[0] + str.slice(1)}\``).join(", ")}`
                        },
                        {
                            name: "Start Date",
                            value: `${body.data.Media.startDate.month}/${body.data.Media.startDate.day}/${body.data.Media.startDate.year}`,
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
			        	text: "Powered by AniList",
			        	icon_url: "https://anilist.co/img/icons/android-chrome-512x512.png"
			        },
                    image: {
                        url: body.data.Media.bannerImage
                    }
                }
            };
            p.msg.channel.createMessage(msgEmbed);
        } else {
            p.msg.channel.createMessage("Sorry, this anime related to nsfw poi, please use this on nsfw channel poi!");
        }
    }).catch(error => {
        p.msg.channel.createMessage("There's some error poi, try again poi");
        console.log(error);
    });
};
// ★☆
module.exports.config = {
    name: "anime",
    aliases: [],
    description: "search a anime",
    usage: "y!anime [name anime]",
    cooldown: 5,
    requirements: {
        permissions: {}
    }
};