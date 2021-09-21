const { Message, Client, MessageEmbed} = require("discord.js");

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
        msg.channel.send({content: "Pinging..."}).then(m => {
            // The math thingy to calculate the user's ping
            var ping = m.createdTimestamp - msg.createdTimestamp;

            // Basic embed
            var embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('🏓 Latency')
                .addFields(
                    { name: 'Bot Latency', value: '```ini\n' + '[' + ping + 'ms' + ']' + '\n```' },
                    { name: 'API Latency', value: '```ini\n' + '[' + Math.round(client.ws.ping) + 'ms' + ']' + '\n```' },
                )
                .setTimestamp()
            // Then It Edits the message with the ping variable embed that you created
            m.edit({embeds: [embed]})
        });
    },
};
