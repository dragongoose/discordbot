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
        client.distube.play(msg, args.join(' '))

        if(!args[0]) {
            msg.channel.send(`All filters are: ${client.distube.filters.join(', ')}`)
        }

        if(args[0] === "off") {
            client.distube.setFilter(false)
        }

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

        if(client.distube.filters.includes(args[0])) {
            client.distube.setFilter(args[0])
        } else {
            return msg.channel.send("That filter doesn't exist! Avaliable filters: " + filters.join(", "))
        }
    },
};
