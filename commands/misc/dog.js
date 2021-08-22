const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class DogCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'dog',
			aliases: ['ruff'],
			group: 'misc',
			memberName: 'dog',
			description: 'random picture of a dpg.',
			guildOnly: true,
		})
	}
	async run(msg) {
		
		const res = await fetch('https://www.no-api-key.com/api/v1/animals/dog').then(response => response.json());

		const dogEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('dog')
			.setDescription(res.fact)
			.setImage(res.image)
			.setFooter(`dog requested by ${msg.member.user.tag}`)

		msg.channel.send(dogEmbed)
	}
};