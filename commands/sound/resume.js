const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'resume',
            aliases: ['go', 'run'],
            group: 'sound',
            memberName: 'resume',
            description: 'Stop all video streams.',
            guildOnly: true,
        })
    }
    run(msg) {
        try {
            dis.dispatcher.resume();
            //resume the stream
            msg.react('👍');
        } catch (e) {
            if (e == "TypeError: Cannot read property 'resume' of undefined"){
                msg.channel.send('Nothing to resume!')
            }
        }




    }
};