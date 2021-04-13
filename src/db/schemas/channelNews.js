const mongoose = require("mongoose");

let schema = new mongoose.Schema({
    channel: String
});

module.exports = mongoose.model("channelNews", schema);