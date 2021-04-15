const { Command } = require('discord.js-commando');
const fetch = require('node-fetch');
var async = require('async');
const Discord = require('discord.js');

module.exports = class CatCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'coinflip',
			aliases: ['flip'],
			group: 'misc',
			memberName: 'coinflip',
			description: 'flips a coin.',
		})
	}
	
	async run(msg) {

		var number = Math.round(Math.random());
		if (number == '1') {
			var head = 'Heads!'
		} else {
			if (number == '0')
				var head = 'Tails!'
		}

		msg.channel.send(head)
	}
};