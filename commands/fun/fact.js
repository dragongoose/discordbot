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

        const res = await fetch('https://www.no-api-key.com/api/v1/facts').then(response => response.json());

		const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('true fact.')
			.setDescription(res.fact)
			.setFooter(`fact requested by ${msg.member.user.tag}`)

		msg.channel.send({ embeds: [embed] })

    },
};
