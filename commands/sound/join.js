const { Command } = require('discord.js-commando');
const fs = require("fs")
const ytdl = require('ytdl-core');


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'sound',
            memberName: 'join',
            description: 'Join the voice channel.',
            guildOnly: true,
        })
    }
    async run(msg) {
        //check if user is in a vc
        if (msg.member.voice.channel) {

            await msg.member.voice.channel.join();
            msg.react('👍');

        } else {

            msg.reply('You need to join a voice channel first!');

        }

    }
};