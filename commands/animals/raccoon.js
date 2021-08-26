const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');


module.exports = {
    name: "raccoon",
    //aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        try {
            const res = await fetch('https://some-random-api.ml/animal/raccoon').then(response => response.json());

            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('raccoon')
                .setDescription(res.fact)
                .setImage(res.image)
                .setFooter(`raccoon requested by ${msg.member.user.tag}`)

            msg.channel.send({ embeds: [embed]})
        } catch (e) {
            console.log(e)
            msg.channel.send('error try again later')
        }

    },
};
