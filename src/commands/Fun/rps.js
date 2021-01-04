module.exports.run = async (client, msg, args) => {
  var rps = [
    'Rock',
    'Paper',
    'Scissor'
  ];

  var random = Math.floor(Math.random() * rps.length); 
  var results = rps[random];
  var user = message.mentions.users.first();
  msg.channel.createMessage(`${user} got **${results}**`);
}

module.exports.config = {
  name: "rps",
  aliases: [],
  description: "Rock Paper Scissor",
  usage: "j!rps",
  cooldown: 5,
  requirements: {
      permissions: {}
  }
}
