module.exports = (client, msg) => {
    if (msg.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
        msg.channel.createMessage(`Hey customers! You can call me by doing \`${client.config.CommandOptions.prefix.map(str => `${str[0] + str.slice(1)}help`).join(", ")}\``)
    }
}