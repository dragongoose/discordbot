const { Command } = require('discord.js-commando')
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js')

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cat',
			aliases: ['kitty'],
			group: 'misc',
			memberName: 'cat',
			description: 'random picture of a cat.',
            guildOnly: true,
		})
	}
   async run(msg) {
    const { file } =  await fetch('https://aws.random.cat/meow').then(response => response.json());    
	
	const catEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('cat')
		.setImage(file)
		.setFooter(`kitty cat requested by ${msg.member.user.tag}`)

	msg.channel.send(catEmbed)
    }
};