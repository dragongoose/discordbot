const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'bird',
			aliases: ['birb'],
			group: 'animal',
			memberName: 'bird',
			description: 'random picture of a bird.',
			guildOnly: true,
		})
	}
	async run(msg) {
		try {

			const res = await fetch('https://some-random-api.ml/animal/birb').then(response => response.json());

			const catEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('birb')
				.setDescription(res.fact)
				.setImage(res.image)
				.setFooter(`birb requested by ${msg.member.user.tag}`)

			msg.channel.send(catEmbed)

		} catch (e) {
			console.log(e)
			msg.channel.send('error try again later')
		}

	}
};