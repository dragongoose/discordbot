const { Message, Client, MessageEmbed } = require("discord.js");
const Levels = require('discord-xp')

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 10); // We grab top 10 users with most xp in the current server.
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        const xpembed = new MessageEmbed()
            .setTitle(`${msg.guild.name}'s leaderboard`)
            .setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
            .setThumbnail(msg.author.displayAvatarURL)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();

        msg.channel.send({ embeds: [xpembed]})

    },
};
