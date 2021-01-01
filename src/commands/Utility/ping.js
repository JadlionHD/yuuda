module.exports.run = async (client, msg, args) => {
	msg.channel.createMessage(`Ping ${client.shards.get(0).latency}ms`);
}

module.exports.config = {
	name: "ping",
	aliases: ["pong"],
	description: "a ping pong test",
	usage: "j!ping",
	cooldown: 5,
	requirements: {
		permissions: {
			"administrator": false
		}
	}
}