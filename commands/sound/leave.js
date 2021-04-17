const { Command } = require('discord.js-commando');
const fs = require("fs")
const ytdl = require('ytdl-core');


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            group: 'sound',
            memberName: 'leave',
            description: 'Leave the voice channel.',
            guildOnly: true,
        })
    }
    async run(msg) {
        //check if user is in a vc
        if (msg.member.voice.channel) {

            await msg.member.voice.channel.leave();
            msg.react('👍');

        } else {

            msg.reply('You need to join a voice channel first!');

        }

    }
};