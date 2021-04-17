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
            args: [
                {
                    type: "string",
                    prompt: "Volume?",
                    key: "text",
                }
            ]
        })
    }
    run(msg, { text }) {

        const vol = text / 100

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