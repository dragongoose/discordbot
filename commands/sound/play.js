const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "play",
    description: "plays song",
    aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (!msg.member.voice.channel) return msg.channel.send('You must be in a voice channel.')
        client.distube.play(msg, args.join(' '))

    },
};
