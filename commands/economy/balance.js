const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "balance",
    description: "repeats what a player says",
    aliases: ['bal', 'money'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        msg.reply(`Your balance is $${Math.random() * 1000000}`)
    },
};
