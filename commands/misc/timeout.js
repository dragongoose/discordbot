//https://api.no-api-key.com/api/v2/timeout?image=const 
const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const { MessageAttachment } = require('discord.js')

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'timeout',
			group: 'misc',
			memberName: 'timeout',
			description: 'puts user in timeout',
			guildOnly: true,
		})
	}
	async run(msg) {

        var mention = msg.mentions.members.first()

        var img;

        if(!mention){
            var img = msg.author.avatarURL({ 'format':'png' })
        } else {
            var img = msg.mentions.members.first().user.avatarURL({ 'format':'png' })
        }

		msg.channel.send({
            files: [
                `https://api.no-api-key.com/api/v2/timeout?image=${img}`
            ]
        })
	}
};