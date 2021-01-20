const mongoose = require('mongoose');

let schema = new mongoose.Schema({
	Channel: {
		type: String
	}
})

module.exports = mongoose.model("channelNews", schema);