const { Command } = require('discord.js-commando')
const Discord = require('discord.js')
const Levels = require('discord-xp')
const { Database } = require("quickmongo");
const config = require('../../config.json')
const db = new Database(config.dburl);
const hex = require('./colors.json')

module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'color',
			aliases: ['colour'],
			group: 'ranking',
			memberName: 'color',
			description: 'Changes color in your rank card.',
            guildOnly: true,
            args: [
                {
                    type:"string",
                    prompt:"What is the color you want to choose?",
                    key:"text",
                }
            ]
		})
	}
    async run(msg, { text }) {
        //setup variables
        const args = msg.content.trim().split(/ +/);
        const stringcolorhex = JSON.stringify(hex)
        const colorhex = JSON.parse(stringcolorhex)
        var color = ""
        var valid = false
        console.log(args[1])
        var arr0 = []
		
        //check if coloror hex exists
       		if(args[1] == 'list'){
           		var valid = true
           		Object.keys(hex).forEach(function(key) {
					arr0.push(key)
				})
           
               	const pollembed = new Discord.MessageEmbed()
            		.setTitle('List of colors')
            		.setDescription(arr0)
            		.setColor(0x00AE86)
               		.setTimestamp()
                msg.reply('Sent you a DM!')
  				return msg.author.send(pollembed); 
        	}
        
        	//check if color is a hex.
        	if(!valid){
                if(text.includes('#')){
                    var valid = true
                    var color = text
                }
            }
            //check if color is a color name
			if(!valid){
                if(!hex.hasOwnProperty(text)){
            		return msg.channel.send('That is not a color. Do `$color list` to see a list of colors');
        		} else {
            		var valid = true
            		var color = colorhex[text]
        		}
            }

        	//check if color is hex, but formated wrong
			if(!valid){
            	if(!text.includes('#')) return msg.channel.send('Wrong format, $color `#FFFFFF`');
            }
        	//check if color is hex, but formated wrong.
        	if(!valid){
        		if(text.length != 7) return msg.channel.send('Wrong format, $color `#FFFFFF` or $color `"color in list"`');
            }
       

        //check if user is level 0

        const user = await Levels.fetch(msg.author.id, msg.guild.id);
        if(user.level == 0) return msg.channel.send("You need to rank before using this command.")
        
        var color = color.replace('#', '')
        //db.delete(msg.author.id).then(console.log)
        db.set(msg.author.id + ".color", color).then(a => {console.log(a)})
        
        const pollembed = new Discord.MessageEmbed()
            .setTitle('Color Set!')
            .setDescription('Next time you check your rank, you will have a new color')
            .setColor(0x00AE86) // Green: 0x00AE86
            .setTimestamp();
        
		msg.channel.send(pollembed)
        
    }
};