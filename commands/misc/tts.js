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
        const randomnum = Math.floor(Math.random() * 100); //Make a random number

        gtts.save('./commands/misc/tts/' + randomnum + 'tts.mp3', function (err, result) { // Create a .mp3 for what the input was
            if (err) { throw new Error(err); }
            console.log("Text to speech converted!");
        });

        if (msg.member.voice.channel) { // check is user is in a VC, if not, give a error

            //set variables
            const connection = await msg.member.voice.channel.join();
            const dispatcher = connection.play(`./commands/misc/tts/${randomnum}tts.mp3`);

            //When done playing, Delete the old file and wait 5 mins before leaving.
            dispatcher.on('finish', () => {


                //log that the tts finished.
                console.log('Finished playing!');



                //Delete file
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