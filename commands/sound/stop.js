const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'stop',
            aliases: ['end', 'pause'],
            group: 'sound',
            memberName: 'stop',
            description: 'Stop all video streams.',
            guildOnly: true,
        })
    }
    run(msg) {
        try {
            dis.dispatcher.pause();
            //pause the stream
            msg.react('🛑');
        } catch (e) {
            if (e == "TypeError: Cannot read property 'pause' of undefined"){
                msg.channel.send('Nothing to pause!')
            }
                
        }




    }
};