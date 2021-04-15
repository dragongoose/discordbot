const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'nuke',
			aliases: ['nuke'],
			group: 'misc',
			memberName: 'nuke',
			description: 'deletes all messages inside of a channel',
            guildOnly: true,
		})
	}
   async run(msg) {
       
	if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('No Perms!');
	const newChannel = await msg.channel.clone()
	msg.channel.delete()
    }
};