const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'panda',
			group: 'animal',
			memberName: 'panda',
			description: 'random picture of a panda.',
			guildOnly: true,
		})
	}
	async run(msg) {
		
		const res = await fetch('https://www.no-api-key.com/api/v1/animals/panda').then(response => response.json());

		const pandaEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('panda')
			.setDescription(res.fact)
			.setImage(res.image)
			.setFooter(`panda requested by ${msg.member.user.tag}`)

		msg.channel.send(pandaEmbed)
	}
};