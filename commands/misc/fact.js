const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'fact',
			group: 'misc',
			memberName: 'fact',
			description: 'random fact.',
			guildOnly: true,
		})
	}
	async run(msg) {
		
		const res = await fetch('https://www.no-api-key.com/api/v1/facts').then(response => response.json());

		const pandaEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('true fact.')
			.setDescription(res.fact)
			.setFooter(`fact requested by ${msg.member.user.tag}`)

		msg.channel.send(pandaEmbed)
	}
};