const { MessageEmbed, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "top10words",
    description: "Gets the top 10 most said words",
    aliases: ['wordboard'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        const totalWords = require("../../schema/totalwords.js")

        var descrip;

        try {

            totalWords.find({ guildID: msg.guild.id }, (err, res) => {
                if (err) return console.log(error)

                var parsed = JSON.parse(JSON.stringify(res))
                while (parsed.length >= 10) {
                    parsed.pop();
                    //console.log(parsed.length)
                }

                for (let i = 0; i < parsed.length; i++) {
                    descrip += '`' + parsed[i].word + '`' + ' : ' + parsed[i].count + '\n'
                }

                const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Top 10 most said words in ${msg.guild.name}`)
                    .setDescription(descrip.replace(/undefined/g, ""))
                    .setThumbnail(`${msg.guild.iconURL() || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_331373.png&f=1&nofb=1'}`)
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.avatarURL());

                msg.channel.send({ embeds: [embed] })

            }).sort({ count: -1 })
        } catch (e) {
            console.log(e)
            msg.channel.send('Lmao a error')
        }



    },
};
