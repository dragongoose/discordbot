const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "bear",
    description: "Sends a image of a bear",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  
    run: async (client, interaction, args) => {
        try {
            const res = await fetch('https://www.no-api-key.com/api/v2/animals/bear').then(response => response.json());

            const embed = new MessageEmbed()
                .setTitle('bear')
                .setDescription(res.fact)
                .setImage(res.image)
                .setTimestamp()
                .setColor('#808080')
                .setFooter({ text:interaction.user.tag, iconURL:interaction.user.avatarURL()});

            interaction.followUp({ embeds: [embed]})
        } catch (e) {
            console.log(e)
            interaction.followUp({ content:'error try again later'})
        }
    },
  };
  