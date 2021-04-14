const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'clear',
			aliases: ['purge'],
			group: 'misc',
			memberName: 'clear',
			description: 'Deletes messages.',
            guildOnly: true,
            args: [
                {
                    type: 'string',
                    prompt: 'How many messages should I delete?',
                    key: 'ammount'
                }
            ]
		})
	}
   async run(msg, { ammount }) {
	if(ammount <= 0) {
        return msg.channel.send('Ammount to clear must be greater than 0');
    } else {
        if(ammount >= 101) {
            return msg.channel.send('I can only delete up to 100 messages at once. But using nuke can delete an entire channel')
            var ammount = 100;
        }

        
        
        if(msg.channel.type === 'text') {
            return msg.channel.messages.fetch({limit: ammount})
                .then(msgs => msg.channel.bulkDelete(msgs))
                .then(msgs => msg.reply(`Purge deleted ${msgs.size} message(s)`))
                .catch(console.error);
        } else {
            msg.reply('Can only clear in text channels.')
        }
    }
    }
};