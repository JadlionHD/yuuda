const Package = require("../package.json");
const Anilist = require("./structures/Anilist.js");
const constants = require("./structures/Constants.js");

module.exports = {
  package: Package,
  anilist: Anilist,
  debug: false,
  ClientOptions: {
    maxShards: "auto",
    messageLimit: 0,
    getAllUsers: false,
    allowedMentions: {
      everyone: false,
      roles: true,
      users: true
    },
    disableEvents: {
      TYPING_START: true,
      VOICE_STATE_UPDATE: true,
    }
  },
  CommandOptions: {
    prefix: ["yuda ", "poi ", "y?"],
    defaultHelpCommand: false,
    description: "Just a simple bot",
    owner: "JadlionHD"
  },
  ownerID: ["421307985827201024", "540560193277132800"],
  colors: {
    error: 0xFF0000,
    green: 0x00FF46,
    success: 0xC0C0C0,
    warning: 0xFFD100
  },
  Constants: constants
};