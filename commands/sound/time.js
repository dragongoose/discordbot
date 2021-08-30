const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "time",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        let queue = client.distube.getQueue(msg);
        if (queue === undefined) return msg.channel.send('The queue is empty!')

        console.log(queue)

        console.log(queue.songs[0].currentTime, queue.songs[0].duration)

    },
};
