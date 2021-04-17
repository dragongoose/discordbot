const { Command } = require('discord.js-commando');
const fs = require("fs")



module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tts',
            aliases: ['texttospeach'],
            group: 'misc',
            memberName: 'tts',
            description: 'TTS',
            guildOnly: true,
            args: [
                {
                    type: "string",
                    prompt: "what would you like to say",
                    key: "text",
                }
            ]
        })
    }
    async run(msg, { text }) {

        const glitch = [".", ",", ";", ":", "[", "]"]// these characters alone return an error when trying to speak

        //protect agains errors when typing characters in glitch alone.
        if (text.length == 1) {
            if (glitch.includes(text)) {
                return msg.channel.send('no')
            }
        }


        //check if user is in a vc
        if (msg.member.voice.channel) {

            var gtts = require('node-gtts')('en');
            const randomnum = Math.floor(Math.random() * 100);
            const connection = await msg.member.voice.channel.join();

            gtts.save(`./commands/misc/tts/${randomnum}tts.mp3`, String(text), function () {
                const dispatcher = connection.play(`./commands/misc/tts/${randomnum}tts.mp3`);

                dispatcher.on('finish', () => {
                    console.log('Finished playing!');
                });
            })

        } else {

            msg.reply('You need to join a voice channel first!');

        }

    }
};