const { Command } = require('discord.js-commando');
const async = require('async');
const fetch = require('node-fetch');
const gTTS = require('gtts');
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

        var gtts = new gTTS(text, 'en');

        const randomnum = Math.floor(Math.random() * 100);

        gtts.save('./commands/misc/tts/' + randomnum + 'tts.mp3', function (err, result) {
            if (err) { throw new Error(err); }
            console.log("Text to speech converted!");
        });

        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            const dispatcher = connection.play(`./commands/misc/tts/${randomnum}tts.mp3`);

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                msg.member.voice.channel.leave()

                fs.unlink(`./commands/misc/tts/${randomnum}tts.mp3`, function (err) {
                    if (err) {
                        throw err
                    } else {
                        console.log("Successfully deleted the file.")
                    }
                })

            });

        } else {
            msg.channel.send('You need to be in a voice channel')
        }




    }
};