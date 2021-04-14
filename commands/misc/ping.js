const { Command } = require('discord.js-commando')
const Discord = require('discord.js')


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			aliases: ['latency'],
			group: 'misc',
			memberName: 'ping',
			description: 'Show the ping of the discord bot.'
		})
	}
    run(msg, { text }) {
        
          // It sends the user "Pinging"
        msg.channel.send("Pinging...").then(m =>{
          // The math thingy to calculate the user's ping
            var ping = m.createdTimestamp - msg.createdTimestamp;

          // Basic embed
            var embed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle('🏓 Latency')
        	.addFields(
            	{ name: 'Bot Latency', value: '```ini\n' + '[' + ping + 'ms' + ']' + '\n```'},
                { name: 'API Latency', value: '```ini\n' + '[' + Math.round(this.client.ws.ping) + 'ms' + ']' + '\n```'},
            )
			.setTimestamp()
            // Then It Edits the message with the ping variable embed that you created
            m.edit(embed)
        });
    }
};