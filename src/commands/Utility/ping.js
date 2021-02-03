module.exports.run = async (p) => {
	p.msg.channel.createMessage(`Ping ${p.client.shards.get(0).latency}ms`);
}

module.exports.config = {
	name: "ping",
	aliases: ["pong"],
	description: "a ping pong test",
	usage: "y!ping",
	cooldown: 5,
	requirements: {
		permissions: {}
	}
}