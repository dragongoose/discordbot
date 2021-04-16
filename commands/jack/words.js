const { Command } = require('discord.js-commando');
const async = require('async');
const fetch = require('node-fetch');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'words',
			aliases: ['cum'],
			group: 'jack',
			memberName: 'words',
			description: 'Says 10 random words.',
			guildOnly: true,
		})
	}
	async run(msg) {

		let asd = await fetch('https://random-word-api.herokuapp.com/word?number=10').then(response => response.text());
		const data = eval(asd)

		msg.channel.send(data.join(" "))


	}
};