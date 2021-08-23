const { Command } = require('discord.js-commando')
const config = require('../../config.json')


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'pfp',
			group: 'misc',
			memberName: 'pfp',
			description: 'gets a user profile picture.',
			guildOnly: true,
		})
	}
	run(msg) {
        
        var target = msg.mentions.users.first() || msg.author

        msg.channel.send(target.avatarURL({ format: 'png' }))

		
	}
};