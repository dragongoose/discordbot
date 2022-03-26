const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "remove",
    description: 'remove song from queue',
    //aliases: ['p'],
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

        // Check if arg is within queue size
        if (args[0] - 1 > queue.songs.length) return msg.channel.send('Please enter a valid number.')

        console.log(queue.songs[args[0] - 1])


    },
};
