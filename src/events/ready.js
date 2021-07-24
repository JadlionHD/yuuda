module.exports = (client) => {
  client.logger.log(`${client.user.username} ready!`, "ready");
  client.editStatus("online", {name: "yes",type: 0});
};