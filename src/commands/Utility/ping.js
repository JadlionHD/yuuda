module.exports.run = async (client, msg, args) => {
  msg.channel.createMessage({
    content: `Ping ${client.shards.get(0).latency}ms`,
    messageReference: {
      messageID: msg.id
    }
  });
};


module.exports.config = {
  name: "ping",
  aliases: ["pong"],
  description: "a ping pong test",
  usage: undefined,
  cooldown: 5,
  requirements: {
    permissions: {}
  }
};