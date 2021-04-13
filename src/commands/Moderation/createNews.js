const Guild = require("../../db/schemas/channelNews.js");

module.exports.run = async (p) => {
    const data = await Guild.findOne({ channel: p.msg.channel.id });
    if(data) {
        p.msg.channel.createMessage("Data has already exist");
    } else {
        const dataNews = new Guild({
            channel: p.msg.channel.id
        });
        dataNews.save();
        p.msg.channel.createMessage("Sucessfully saving channel");
    }
};

module.exports.config = {
    name: "createnews",
    aliases: [],
    description: "auto posting about anime news",
    usage: "y!createNews (current channel)",
    cooldown: 5,
    requirements: {
        permissions: {
            administrator: true
        }
    }
};