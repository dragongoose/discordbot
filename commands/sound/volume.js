const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "volume",
    description: 'changes the volume of the queue',
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

        // make sure number is valid
        if (isNaN(args[0])) return msg.channel.send('Please enter a valid number.')
        // Make sure number is 0 through 100
        if (args[0] < 0 || args[0] > 100) return msg.channel.send('Please enter a number between 0 and 100.')


        client.distube.setVolume(args[0])
        msg.channel.send(`Volume set to ${args[0]}%`)


    },
};
