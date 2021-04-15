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
		
		const { link } = await fetch('https://some-random-api.ml/img/dog').then(response => response.json());

		const dogEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('dog')
			.setImage(link)
			.setFooter(`dog requested by ${msg.member.user.tag}`)

		msg.channel.send(dogEmbed)
	}
};