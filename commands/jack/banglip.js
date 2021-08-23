const { Command } = require('discord.js-commando')



module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kickglip',
			group: 'misc',
			memberName: 'kickglip',
			description: 'repeats what a player says.',
			guildOnly: true,
		})
	}
	async run(msg) {
        if(msg.guild.id != '753237899951997049') return msg.channel.send('no')

        msg.channel.send('test')

	}
};