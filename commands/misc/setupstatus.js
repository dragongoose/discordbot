const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const config = require("../../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.dburl);


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setupstatus',
			group: 'misc',
			memberName: 'setupstatus',
			description: 'check if got if fully setup',
			guildOnly: true,
		})
	}
	async run(msg) {
        const message = await msg.channel.send('Checking..')

        var pingchannel = db.get(`${msg.guild.id}.pingchannel`)
        .catch(e => {
            console.log(e)
            message.edit('Database Error. Try again later.')
        })

        const embed = new Discord.MessageEmbed()
        .setTitle('Setup status')
        .setColor(0xD53C55) // Green: 0x00AE86
        .setTimestamp();


        if(pingchannel != undefined){
            embed.addField('pingchannel', 'Fully Setup')
        } else {
            embed.addField('pingchannel', 'Not Setup')
        }

       message.edit(embed)

	}
};