module.exports = {
	DISCORD_TOKEN: process.env.DISCORD_TOKEN,
	ClientOptions: {
		maxShards: 'auto',
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
		prefix: ["y!", "yuda ", "poi ", "@mention"],
		defaultHelpCommand: false,
		description: "A JadMaid Bot",
		owner: "JadlionHD"
	},
     ownerID: ["421307985827201024", "540560193277132800", "494219204610883594"],
     colors: {
        error: 0xFF0000,
        green: 0x00FF46,
        success: 0xC0C0C0,
        warning: 0xFFD100
    }
}