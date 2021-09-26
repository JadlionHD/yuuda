module.exports.run = async (bot, msg, args) => {
  const owners = bot.config.ownerID.forEach(async(owner) => {
    if (msg.author.id !== owner) return;

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled = eval(code);
      let type = typeof evaled;

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, { depth: 0});
      let output = bot.util.clean(evaled);
      output = output.replace(new RegExp(process.env.DISCORD_TOKEN, "gi"), "*");

      if (output.length > 1024) {
        console.log(output);
        msg.channel.createMessage({embed: {
          color: bot.config.colors.success,
          description: bot.util.codeBlock("Output more than 1024 length! i put this on console.log", "js"),
          fields: [
            {
              name: "Type", value: bot.util.codeBlock(type, "js")
            }]
        }});
      } else {
        msg.channel.createMessage({embed: {
          color: bot.config.colors.success,
          description: bot.util.codeBlock(output, "js"),
          fields: [
            {
              name: "Type", value: bot.util.codeBlock(type, "js")
            }]
        }});
      }
    } catch (e) {
      let error = bot.util.clean(e);
      if (error.length > 1024) {
        //const postCode = await client.util.haste(error);
        msg.channel.createMessage({embed: {
          color: bot.config.colors.error,
          description: "Too many characters! please check console instead.",
          fields: [
            {
              name: "Type", value: bot.util.codeBlock(this.type, "js")
            }]
        }});
      } else {
        msg.channel.createMessage({embed: {
          color: bot.config.colors.success,
          description: bot.util.codeBlock(error, "js"),
          fields: [
            {
              name: "Type", value: bot.util.codeBlock(this.type, "js")
            }]
        }});
      }
    }
  });
};

module.exports.config = {
  name: "eval",
  aliases: ["ev"],
  description: "a dev evaluate",
  usage: "{prefix}eval (argument)",
  cooldown: 5,
  category: "Developer",
  ratelimit: 5,
  requirements: {
    permissions: {}
  }
};