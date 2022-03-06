const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "shuffle",
    description: "shuffles the queue",
    aliases: ['mix'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        let queue = client.distube.getQueue(msg);

        if(!queue) return msg.channel.send('Nothing is playing!')

        client.distube.shuffle(msg)
        msg.react('👍')
        
    },
};
