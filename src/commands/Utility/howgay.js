module.exports.run = async (client, msg, args) => {
  const howgay = Math.floor(Math.random() * 101);
	msg.channel.createMessage(`You are {howgay} gay!`)
}

module.exports.config = {
	name: "howgay",
	aliases: [],
	description: "how he/she gay",
	usage: "j!howgay <mention>",
	cooldown: 5,
	requirements: {
		permissions: {
			"administrator": false
		}
	}
}
