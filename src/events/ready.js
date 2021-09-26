module.exports = (bot) => {
  bot.logger.log(`${bot.client.user.username} ready!`, "ready");
  bot.client.editStatus("online", {name: `${bot.config.CommandOptions.prefix[0]}help`,type: 0});
};