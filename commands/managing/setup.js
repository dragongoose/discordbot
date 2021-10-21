const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const guildSettings = require("../../schema/guildsettings.js") 
const mongoose = require('mongoose');

module.exports = {
    name: "setup",
    description: "Shows setup status of server",
    aliases: ['issetup'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const guildstorage = await guildSettings.find({ guildID: msg.guild.id })
        const parsed = JSON.parse(JSON.stringify(guildstorage))

        console.log(parsed[0].settingsJson)

        var descrip;

        var wordboard = parsed[0].settingsJson.wordboard ? 'wordboard: 🟢 Fully setup \n' : 'wordboard: 🔴 Not setup \n'
        var joinprotection = parsed[0].settingsJson.joinprotection ? 'join protection: 🟢 Fully setup \n' : "join protection: 🔴 Not setup \n"

        descrip += wordboard
        descrip += joinprotection

        const embed = new MessageEmbed()
        .setColor('#808080')
        .setTitle(`Setup status`)
        .setDescription(descrip.replace(/undefined/g, ""))
        .setTimestamp()
        .setFooter(msg.author.tag, msg.author.avatarURL());

        msg.channel.send({ embeds: [embed] })

    },
};
