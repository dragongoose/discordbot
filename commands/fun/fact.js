const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const fetch = require('node-fetch')

module.exports = {
    name: "fact",
    description: "random fact.",
    aliases: ['funfact', 'random fact'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const res = await fetch('https://www.no-api-key.com/api/v2/facts').then(response => response.json());

		const embed = new MessageEmbed()
			.setTitle('true fact.')
			.setDescription(res.fact)
            .setTimestamp()
            .setColor('#808080')
            .setFooter(msg.author.tag, msg.author.avatarURL());

		msg.channel.send({ embeds: [embed] })

    },
};
