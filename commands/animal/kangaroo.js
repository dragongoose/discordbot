const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kangaroo',
			group: 'animal',
			memberName: 'kangaroo',
			description: 'random picture of a kangaroo.',
			guildOnly: true,
		})
	}
	async run(msg) {
		try {

			const res = await fetch('https://some-random-api.ml/animal/kangaroo').then(response => response.json());

			const catEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('kangaroo')
				.setDescription(res.fact)
				.setImage(res.image)
				.setFooter(`kangaroo requested by ${msg.member.user.tag}`)

			msg.channel.send(catEmbed)
		} catch (e) {
			console.log(e)
			msg.channel.send('error try again later')
		}

	}
};