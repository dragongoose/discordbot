const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "bird",
    description: "Sends picture of a bird",
    aliases: ['birb'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        try {
            const res = await fetch('https://some-random-api.ml/animal/bird').then(response => response.json());

            const embed = new MessageEmbed()
                .setTitle('bird')
                .setDescription(res.fact)
                .setImage(res.image)
                .setTimestamp()
                .setColor('#808080')
                .setFooter(msg.author.tag, msg.author.avatarURL());

            msg.channel.send({ embeds: [embed]})
        } catch (e) {
            console.log(e)
            msg.channel.send('error try again later')
        }

    },
};
