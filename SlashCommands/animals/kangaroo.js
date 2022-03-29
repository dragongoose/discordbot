const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "kangaroo",
    description: "Sends picture of a kangaroo",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        try {
            const res = await fetch('https://some-random-api.ml/animal/kangaroo').then(response => response.json());

            const embed = new MessageEmbed()
                .setTitle('kangaroo')
                .setDescription(res.fact)
                .setImage(res.image)
                .setTimestamp()
                .setColor('#808080')
                .setFooter({ text:interaction.user.tag, iconURL:interaction.user.avatarURL()});

            interaction.followUp({ embeds: [embed]})
        } catch (e) {
            console.log(e)
            interaction.followUp({ content: "Error"})
        }

    },
};
