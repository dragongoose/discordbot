const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json");
const { main } = require('../../utils/pageinator.js');

module.exports = {
    name: "weather",
    description: "repeats what a player says",
    aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var embed1 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('1')
        .setTimestamp()

        var embed2 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('2')
        .setTimestamp()


        var embed3 = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Page test')
        .setDescription('3')
        .setTimestamp()

        var pages = [
            embed1,
            embed2,
            embed3
        ]

        main(pages, msg, 3.6e+6)
        .then((n) => console.log(n))
        .catch(e => console.error(e))


    },
};
