module.exports = async (bot, msg) => {
  if(msg.channel.type === 1 || msg.author.bot) return;
  if(msg.content.match(new RegExp(`^<@!?${bot.client.user.id}>( |)$`))) {
    msg.channel.createMessage(`Calling me Poi? you can Poi! by doing this Poi! \`${bot.config.CommandOptions.prefix.map(str => `${str[0] + str.slice(1)}help`).join(", ")}\``);
  }
  const prefixes = bot.config.CommandOptions.prefix.find(p => msg.content.match(p));
  if(!msg.content.startsWith(prefixes)) return;
  if(!msg.channel.permissionsOf(bot.client.user.id).has("sendMessages")) return;

  let args = msg.content.slice(prefixes.length).split(" ");
  let command = args.shift().toLowerCase();

  if(bot.aliases.has(command)) {
    command = bot.aliases.get(command);
  }
  if(!bot.commands.has(command)) return;

  // commands cooldown
  if(!bot.cooldown.get(`${command}-${msg.author.id}`)) {
    bot.cooldown.set(`${command}-${msg.author.id}`, {limit: 1, time: Date.now()});
  } else {
    let expireTime = bot.cooldown.get(`${command}-${msg.author.id}`).time + (bot.commands.get(command).config.cooldown * 1000);
    let timeLeft = expireTime - Date.now();
    if(bot.cooldown.get(`${command}-${msg.author.id}`).limit >= bot.commands.get(command).config.ratelimit) {
      return msg.channel.createMessage(`${msg.author.mention} you're being ratelimited, please wait **${timeLeft / 1000}s**`).then((message) => {
        setTimeout(() => {
          message.delete();
        }, 7000);
      });
    }
    bot.cooldown.get(`${command}-${msg.author.id}`).limit += 1;
    //bot.cooldown.set(`${command}-${msg.author.id}`, {limit: bot.cooldown.get(`${command}-${msg.author.id}`).limit + 1});
  }
  setTimeout(() => {
    bot.cooldown.delete(`${command}-${msg.author.id}`);
  }, bot.commands.get(command).config.cooldown * 1000);

  try {
    await bot.commands.get(command).run(bot, msg, args);
  } catch(err) {
    msg.channel.createMessage({embed: {
      color: 0xFFD100,
      title: `${command} failed to run`,
      description: `you can open some [issues](${bot.config.package.bugs.url}) if bugs appear.`
    }});
    console.log("Error", err.message, err.stack.split("\n"));
  }
};