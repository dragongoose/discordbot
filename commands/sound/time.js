const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');

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
            const time = dis.dispatcher.streamTime;
            const timetosecond = time / 1000
            //const realtime = new Date(timetosecond * 1000).toISOString().substr(11, 8)
            const timeleft = dis.time - timetosecond 

            msg.channel.send(new Date(timeleft * 1000).toISOString().substr(11, 8))

        } catch (e) {
            console.log(e)
            if (e == "TypeError: Cannot read property 'streamTime' of undefined"){
                msg.channel.send('Nothing is playing!')
            }
        }




    }
};