const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "wordboard",
    description: "top 10 most used words in the server",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const totalWords = require("../../schema/totalwords.js")

        var descrip;

        try {

            totalWords.find({ guildID: interaction.guild.id }, (err, res) => {
                if (err) return console.log(err)

                var parsed = JSON.parse(JSON.stringify(res))
                while (parsed.length >= 10) {
                    parsed.pop();
                    //console.log(parsed.length)
                }

                for (let i = 0; i < parsed.length; i++) {
                    descrip += '`' + parsed[i].word + '`' + ' : ' + parsed[i].count + '\n'
                }

                const embed = new MessageEmbed()
                    .setTitle(`Top 10 most said words in ${interaction.guild.name}`)
                    .setDescription(descrip.replace(/undefined/g, ""))
                    .setThumbnail(`${interaction.guild.iconURL() || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_331373.png&f=1&nofb=1'}`)
                    .setTimestamp()
                    .setColor('#808080')
                    .setFooter({ text:interaction.user.tag, iconURL:interaction.user.avatarURL()});
                    
                interaction.followUp({ embeds: [embed] })

            }).sort({ count: -1 })
        } catch (e) {
            console.log(e)
            interaction.followUp('Lmao a error')
        }


    },
};
