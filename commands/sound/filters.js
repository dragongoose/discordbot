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

        if(filters.includes(args[0])) {
            client.distube.setFilter(args[0])
        } else {
            return msg.channel.send("That filter doesn't exist! Avaliable filters: " + filters.join(", "))
        }
    },
};
