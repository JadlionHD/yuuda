module.exports.run = async (bot, msg, args) => {
  msg.channel.createMessage({
    content: `Ping ${bot.client.shards.get(0).latency}ms`,
    messageReference: {
      messageID: msg.id
    }
  });
};


module.exports.config = {
  name: "ping",
  aliases: ["pong"],
  description: "a ping pong test",
  usage: "{prefix}ping",
  cooldown: 5,
  category: "Utility",
  ratelimit: 5,
  requirements: {
    permissions: {}
  }
};