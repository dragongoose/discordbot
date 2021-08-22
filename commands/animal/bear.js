const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bear',
			group: 'animal',
			memberName: 'bear',
			description: 'random picture of a bear.',
			guildOnly: true,
		})
	}
	async run(msg) {
		
		const res = await fetch('https://www.no-api-key.com/api/v1/animals/bear').then(response => response.json());

		const bearEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('bear')
			.setDescription(res.fact)
			.setImage(res.image)
			.setFooter(`bear requested by ${msg.member.user.tag}`)

		msg.channel.send(bearEmbed)
	}
};