module.exports = (client) => {
    client.logger.log(`${client.user.username} ready!`, "ready");
    client.editStatus("online", {name: "Azur lane",type: 0});
};