const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "filter",
    description: "set the filter for the queue",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (!msg.member.voice.channel) return msg.channel.send('You must be in a voice channel.')
        let queue = client.distube.getQueue(msg);

        let filters = [
            "3d", 
            "bassboost",
            "echo",
            "karaoke",
            "nightcore",
            "vaporwave",
            "flanger",
            "gate",
            "haas",
            "reverse",
            "surround",
            "mcompand",
            "phaser",
            "tremolo",
            "earwax"
        ];

        if(!args[0]) {
            return msg.channel.send(`All filters are: ${filters.join(', ')}`)
        }

        if(args[0] === "off") {
            queue.setFilter(false)
            return msg.channel.send("Disabled filters")
        }



        if(filters.includes(args[0])) {
            queue.setFilter(false)
            queue.setFilter(args[0])
            return msg.channel.send("Set filter to " + args[0])
        } else {
            return msg.channel.send("That filter doesn't exist! Avaliable filters: " + filters.join(", "))
        }
    },
};
