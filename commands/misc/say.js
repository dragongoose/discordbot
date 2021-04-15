const { Command } = require('discord.js-commando')


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'say',
			aliases: ['speak'],
			group: 'misc',
			memberName: 'say',
			description: 'repeats what a player says.',
			guildOnly: true,
			args: [
				{
					type: "string",
					prompt: "what would you like to say",
					key: "text",
				}
			]
		})
	}
	run(msg, { text }) {
		
		if (text.includes('<@')) return msg.reply('no');

		if (text == '@everyone') {
			msg.reply('no')
		} else {
			msg.say(text)
			msg.delete()
		}

	}
};