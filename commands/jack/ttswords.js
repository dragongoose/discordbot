const { Command } = require('discord.js-commando');
const async = require('async');
const fetch = require('node-fetch');
const gTTS = require('gtts');
const fs = require("fs")



module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ttswords',
            aliases: ['ttsword'],
            group: 'jack',
            memberName: 'ttswords',
            description: 'TTS 10 random words',
            guildOnly: true,
        })
    }
    async run(msg) {

        let asd = await fetch('https://random-word-api.herokuapp.com/word?number=10').then(response => response.text());
        const data = eval(asd)

        var gtts = new gTTS(data.join(" "), 'en');

        const randomnum = Math.floor(Math.random() * 100);

        gtts.save('./commands/jack/ttsutil/' + randomnum + 'tts.mp3', function (err, result) {
            if (err) { throw new Error(err); }
            console.log("Text to speech converted!");
        });

        if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            const dispatcher = connection.play(`./commands/jack/ttsutil/${randomnum}tts.mp3`);

            dispatcher.on('finish', () => {
                console.log('Finished playing!');
                msg.member.voice.channel.leave()

            });

        } else {
            msg.channel.send('You need to be in a voice channel')
        }


        fs.unlink(`./commands/jack/ttsutil/${randomnum}tts.mp3`, function(err) {
            if (err) {
              throw err
            } else {
              console.log("Successfully deleted the file.")
            }
          })

    }
};