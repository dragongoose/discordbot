const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');
const progressbar = require('../../utils/progressbar.js')
const Discord = require('discord.js')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'time',
            aliases: ['t'],
            group: 'sound',
            memberName: 'time',
            description: 'Shows time left on a audio stream.',
            guildOnly: true,
        })
    }
    run(msg) {
        try {
            //define variables
            const time = dis.dispatcher.streamTime;
            const timetosecond = time / 1000
            const timeleft = dis.song.length - timetosecond

            var timeone = Math.round(timeleft)// time elapsed
            var timetwo = dis.song.length// total time 

            //get percentage for progressbar.js
            let endTime = timetwo
            let startTime = 0
            let now = timeone
            let totalTime = endTime - startTime;
            let progress = now - startTime;
            let percentage = 100 - ((progress / totalTime) * 100);
            
            //set embed for the time
            const embed = new Discord.MessageEmbed()
                .setTitle('Current time')
                .setDescription(`**${new Date(timeone * 1000).toISOString().substr(11, 8)} ${progressbar.progress(Math.round(percentage), '◽')} ${new Date(timetwo * 1000).toISOString().substr(11, 8)}**`)
                .setFooter(`Thanks for using me!`)
                .setColor(0xD53C55) // Green: 0x00AE86
                .setTimestamp();

            if (JSON.stringify(dis.connection.speaking) == 0) {
                //change the emoji if the bot is paused
                embed.setDescription(`**${new Date(timeone * 1000).toISOString().substr(11, 8)} ${progressbar.progress(Math.round(percentage), '⏸️')} ${new Date(timetwo * 1000).toISOString().substr(11, 8)}**`)
            }
            //send the embed
            msg.channel.send(embed)


        } catch (e) {
            console.log(e)
            //error catching
            if (e == "TypeError: Cannot read property 'streamTime' of undefined") {
                msg.channel.send('Nothing is playing!')
            }
        }




    }
};