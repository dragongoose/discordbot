const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'volume',
            aliases: ['vol', 'v'],
            group: 'sound',
            memberName: 'volume',
            description: 'Change volume.',
            guildOnly: true,
        })
    }
    run(msg) {

        const text = msg.content.trim().split(/ +/);

        console.log(`TEXT ${text[1]}`)

        if (text[1] === undefined) {
            return msg.channel.send(`The current volume is ${dis.dispatcher.volume * 100}% `);
        }

        const vol = text[1] / 100

        try {
            dis.dispatcher.setVolume(vol);
            //pause the stream
            msg.react('👍');
        } catch (e) {
            if (e == "TypeError: Cannot read property 'setVolume' of undefined")
                msg.channel.send('Nothing is playing!')
        }




    }
};