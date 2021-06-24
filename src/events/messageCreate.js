module.exports = async (client, msg) => {
  if(msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    msg.channel.createMessage(`Calling me Poi? you can Poi! by doing this Poi! \`${client.config.CommandOptions.prefix.map(str => `${str[0] + str.slice(1)}help`).join(", ")}\``);
  }
};