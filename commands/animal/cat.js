const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['kitty'],
			group: 'animal',
			memberName: 'cat',
			description: 'random picture of a cat.',
			guildOnly: true,
		})
	}
	async run(msg) {

		try {


			const res = await fetch('https://www.no-api-key.com/api/v1/animals/cat').then(response => response.json());

			const catEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle('cat')
				.setDescription(res.fact)
				.setImage(res.image)
				.setFooter(`kitty cat requested by ${msg.member.user.tag}`)

			msg.channel.send(catEmbed)

		} catch (e) {
			console.log(e)
			msg.channel.send('error try again later')
		}

	}
};