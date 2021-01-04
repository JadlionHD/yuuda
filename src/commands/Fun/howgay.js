module.exports.run = async (client, msg, args) => {
  	let howgay = Math.floor(Math.random() * 101);
	let say = args.join(" ");
    let user = msg.mentions[0] || client.users.get(say) || msg.author;
    if(user.id === "421307985827201024") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);
    if(user.id === "494219204610883594") return msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);

	msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **${howgay}%** Gay!`);
}

module.exports.config = {
	name: "howgay",
	aliases: [],
	description: "how he/she gay",
	usage: "y!howgay <mention>",
	cooldown: 5,
	requirements: {
		permissions: {}
	}
}
