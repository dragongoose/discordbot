const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
var async = require('async');
const config = require("../../config.json");
const { Database } = require("quickmongo");
const db = new Database(config.dburl);


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'levelping',
			group: 'misc',
			memberName: 'levelping',
			description: 'Change channel bot pings in on level updates.',
			guildOnly: true,
			args: [
				{
					type: "string",
					prompt: "Send channel id",
					key: "text",
				}
			]
		})
	}
	async run(msg, { text }) {	
        if (!msg.member.hasPermission('MANAGE_SERVER')) return msg.reply('No Perms!');

        var toedit = await msg.channel.send('Checking')

        if(msg.guild.channels.cache.get(text) === undefined)  { 
            return toedit.edit(`Channel ${text} doesnt exist!`)
        };
        
        toedit.edit('Check done! Sending to database....');

        db.set(`${msg.guild.id}.pingchannel`, text).then(() => {
            toedit.edit('Done!')
        })
        .catch(function (err){
            toedit.edit('Error.')
            console.log(err)
        })


	}
};