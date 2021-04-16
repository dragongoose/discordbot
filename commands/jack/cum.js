const { Command } = require('discord.js-commando');
const async = require('async');
const fetch = require('node-fetch');


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'cum',
			aliases: ['cumshot'],
			group: 'jack',
			memberName: 'cum',
			description: 'Says 10 random words.',
			guildOnly: true,
		})
	}
	async run(msg) {
        
        let asd = await fetch('https://random-word-api.herokuapp.com/word?number=10').then(response => response.text());
        const data = eval(asd)
        msg.channel.send(`${data[0]} ${data[1]} ${data[2]} ${data[3]} ${data[4]} ${data[5]} ${data[6]} ${data[7]} ${data[8]} ${data[9]}`)


	}
};