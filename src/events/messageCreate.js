const animeNews = require("../db/schemas/channelNews.js");

module.exports = async (client, msg) => {
    if(msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        msg.channel.createMessage(`Calling me Poi? you can Poi! by doing this Poi! \`${client.config.CommandOptions.prefix.map(str => `${str[0] + str.slice(1)}help`).join(", ")}\``);
    }
    if(msg.channel.id === "801714029180616704") {
        const data = await animeNews.find({});
        data.forEach(e => {
            client.createMessage(e.channel, msg.content);
        });
    //client.createMessage("786973357144014878", msg.content);
    }
};