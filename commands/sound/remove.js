const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "remove",
    description: 'remove song from queue',
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        // Check if user is in vc
        if (!msg.member.voice.channel) return msg.channel.send('You must be in a voice channel.')

        let queue = client.distube.getQueue(msg);
        if (queue === undefined) return msg.channel.send('The queue is empty!')

        // Check if arg is within queue size
        if (args[0] - 1 > queue.songs.length) return msg.channel.send('Please enter a valid number.')

        if (args[0] - 1 === 0) {
            return msg.channel.send("Cannot remove a song that's playing!")
        }

        let removed = queue.songs[args[0] - 1]
        console.log(queue.songs.splice(args[0] - 1, 1))
        const embed = new MessageEmbed()
            .setDescription(`**Removed: ${removed.name}**`)
            .addFields(
                { name: 'Requested by:', value: `<@${removed.user.id}>`, inline: true },
                { name: 'Duration', value: removed.formattedDuration, inline: true },
                { name: 'Removed by:', value: `<@${msg.author.id}>`, inline: true }
            )
            .setColor(0xD53C55) // Green: 0x00AE86
            .setFooter({ text: 'hi :3' })
            .setTimestamp();
        return msg.channel.send({ embeds: [embed]})


    },
};
