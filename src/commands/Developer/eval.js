module.exports.run = async (p) => {
    const owners = p.client.config.ownerID.forEach(async(owner) => {
        if (p.msg.author.id !== owner) return;

        try {
            const code = p.args.join(" ");
            if (!code) return;
            let evaled = eval(code);
            let type = typeof evaled;

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled, { depth: 0});
            let output = p.client.util.clean(evaled);
            output = output.replace(new RegExp(p.client.config.DISCORD_TOKEN, "gi"), "*");

            if (output.length > 1024) {
                console.log(output);
                p.msg.channel.createMessage({embed: {
                    color: p.client.config.colors.success,
                    description: p.client.util.codeBlock("Output more than 1024 length! i put this on console.log", "js"),
                    fields: [
                        {
                            name: "Type", value: p.client.util.codeBlock(type, "js")
                        }]
                }});
            } else {
                p.msg.channel.createMessage({embed: {
                    color: p.client.config.colors.success,
                    description: p.client.util.codeBlock(output, "js"),
                    fields: [
                        {
                            name: "Type", value: p.client.util.codeBlock(type, "js")
                        }]
                }});
            }
        } catch (e) {
            let error = p.client.util.clean(e);
            if (error.length > 1024) {
                const postCode = await p.client.util.haste(error);
                p.msg.channel.createMessage({embed: {
                    color: p.client.config.colors.error,
                    description: postCode,
                    fields: [
                        {
                            name: "Type", value: p.client.util.codeBlock(this.type, "js")
                        }]
                }});
            } else {
                p.msg.channel.createMessage({embed: {
                    color: p.client.config.colors.success,
                    description: p.client.util.codeBlock(error, "js"),
                    fields: [
                        {
                            name: "Type", value: p.client.util.codeBlock(this.type, "js")
                        }]
                }});
            }
        }
    });
    return true;
};

module.exports.config = {
    name: "eval",
    aliases: ["ev"],
    description: "a dev evaluate",
    usage: "y!eval (argument)",
    cooldown: 5,
    requirements: {
        permissions: {}
    }
};