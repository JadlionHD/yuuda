module.exports.run = async (p) => {
    let howgay = Math.floor(Math.random() * 101);
    let say = p.args.join(" ");
    let user = p.msg.mentions[0] || p.client.users.get(say) || p.msg.author;
    if(user.id === "421307985827201024") return p.msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);
    if(user.id === "494219204610883594") return p.msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **0%** Gay!`);

    p.msg.channel.createMessage(`🏳️‍🌈 | ${user.username} is **${howgay}%** Gay!`);
};

module.exports.config = {
    name: "howgay",
    aliases: [],
    description: "how he/she gay",
    usage: "y!howgay <mention>",
    cooldown: 5,
    requirements: {
        permissions: {}
    }
};
