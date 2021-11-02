const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "bear",
    description: "Sends picture of a bear",
    //aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        try {
            const res = await fetch('https://www.no-api-key.com/api/v2/animals/bear').then(response => response.json());

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('bear')
                .setDescription(res.fact)
                .setImage(res.image)
                .setFooter(`bear requested by ${msg.member.user.tag}`)

            msg.channel.send({ embeds: [embed]})
        } catch (e) {
            console.log(e)
            msg.channel.send('error try again later')
        }

    },
};
