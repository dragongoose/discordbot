const { Command } = require('discord.js-commando');
const async = require('async');
const fetch = require('node-fetch');
const gTTS = require('gtts');


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

        gtts.save('./commands/jack/ttsutil/tts.mp3', function (err, result) {
            if (err) { throw new Error(err); }
            console.log("Text to speech converted!");
        });



    }
};