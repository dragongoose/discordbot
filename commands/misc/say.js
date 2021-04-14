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
                    type:"string",
                    prompt:"what would you like to say",
                    key:"text",
                }
            ]
		})
	}
    run(msg, { text }) {
        
        if (text.indexOf('stupid', 'idiot', 'retard') >= 0) { 
  			msg.say('yeah i know')
		} else { 
  			msg.say(text)
            msg.delete()
		}
        
    }
};