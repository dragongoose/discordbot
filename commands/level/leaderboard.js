const { Command } = require('discord.js-commando')
var async = require('async');
const Levels = require("discord-xp");
const Discord = require('discord.js');



module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leaderboard',
			aliases: ['ranking'],
			group: 'ranking',
			memberName: 'leaderboard',
			description: 'shows leaderboard of server.',
            guildOnly: true,
		})
	}
    async run(msg) {
        
        const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, 10); // We grab top 10 users with most xp in the current server.
        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
        const leaderboard = await Levels.computeLeaderboard(this.client, rawLeaderboard, true); // We process the leaderboard.
        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        const xpembed = new Discord.MessageEmbed()
            .setTitle(`${msg.guild.name}'s leaderboard`)
            .setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`)
            .setThumbnail(msg.author.displayAvatarURL)
            .setColor(0xD53C55) // Green: 0x00AE86
            .setTimestamp();

        msg.channel.send(xpembed)
    }
};