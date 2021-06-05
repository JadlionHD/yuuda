module.exports = (client) => {
    client.logger.log(`${client.user.username} ready!`, "ready");
    client.editStatus("online", {name: "Azur Lane",type: 0});
};