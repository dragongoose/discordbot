const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const { Database } = require("quickmongo");
const db = new Database(config.dburl);


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'myuploads',
			group: 'misc',
			memberName: 'myuploads',
			description: 'Lists your total uploads.',
			guildOnly: true,
		})
	}
	async run(msg) {
        //reads user upload from db, then displays
		try{
            var toedit = await msg.channel.send('Reading Database.')

            db.get(`${msg.author.id}.uploads`).then(data =>{
                console.log(data)
            })
        } catch (e) {
            toedit.edit('Error')
            console.log(e)
        }
	}
};