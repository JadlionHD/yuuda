module.exports = (client) => {
    client.logger.log(`${client.user.username} ready!`, "ready");
    client.editStatus("online", {name: "Experimental Testing",type: 0});
};