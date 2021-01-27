const Guild = require("../../db/schemas/channelNews.js");

module.exports.run = async (client, msg, args) => {
	const data = await Guild.findOne({ channel: msg.channel.id });
	if(data) {
		msg.channel.createMessage("Data has already exist");
	} else {
		const dataNews = new Guild({
			channel: msg.channel.id
		})
		dataNews.save();
		msg.channel.createMessage("Sucessfully saving channel");
	}
}

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
}