const { Message, Client, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    name: "ping",
    description: "gets ping of bot",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        // It sends the user "Pinging"
        msg.channel.send({ content: "Pinging..." }).then(m => {
            // The math thingy to calculate the user's ping
            var ping = m.createdTimestamp - msg.createdTimestamp;

            var mongoping;

            var begin = Date.now()
            mongoose.connection.db.admin().ping((err, res) => {
                if (err) mongoping = '?';
                var end = Date.now()

                mongoping = end - begin

                // Basic embed
                var embed = new MessageEmbed()
                    .setColor('#808080')
                    .setTitle('🏓 Latency')
                    .addFields(
                        { name: 'Bot Latency', value: '```ini\n' + '[' + ping + 'ms' + ']' + '\n```', inline: true },
                        { name: 'API Latency', value: '```ini\n' + '[' + Math.round(client.ws.ping) + 'ms' + ']' + '\n```', inline: true },
                        { name: 'MongoDB Latency', value: `\`\`\`ini\n [${mongoping}ms] \n\`\`\``, inline: true },

                    )
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.avatarURL());
                // Then It Edits the message with the ping variable embed that you created
                m.edit({ embeds: [embed] })
            })

        });
    },
};
