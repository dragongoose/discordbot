const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");
const paginator = require("../../utils/pageinator.js");

module.exports = {
    name: "queue",
    description: "Shows current queue",
    aliases: ['q'],
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

        var text = [];

        function truncate(str, n) {
            return (str.length > n) ? str.substr(0, n - 1) + '..' : str;
        };

        for (let i = 0; i < queue.songs.length; i++) {
            var songname = truncate(queue.songs[i].name, 35)
            text.push(`${i + 1}. ${songname} - ${queue.songs[i].formattedDuration}`) 
        }

        // Split array into chunks of 10
        const chunkSize = 10;
        var chunks = [];
        for (var i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }

        let pages = [];

        // Loop through chunks
        for (let i = 0; i < chunks.length; i++) {
            let embed = new MessageEmbed()
            .setTitle('**Queue:**')
                .setDescription(`\`\`\`sql\n${chunks[i].join("\n")}\`\`\``)
                .setColor(0xD53C55) // Green: 0x00AE86
                .setTimestamp();
            pages.push(embed)
        }

        paginator.main(pages, msg, 0)
    }
};
