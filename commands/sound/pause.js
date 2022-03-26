const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "pause",
    description: "pauses song",
    aliases: ['stop'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        // Check if user is in vc
        if (!msg.member.voice.channel) return msg.channel.send('You must be in a voice channel.')

        let queue = client.distube.getQueue(msg);
        if (queue === undefined) return msg.channel.send('The queue is empty!')

        client.distube.pause(msg)
        msg.react('👍')

    },
};
