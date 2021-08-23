const { Command } = require('discord.js-commando')
const config = require('../../config.json')
const Discord = require('discord.js')


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'avatar',
			alias: ['pfp'],
			group: 'misc',
			memberName: 'avatar',
			description: 'gets a user data and sends it',
			guildOnly: true,
		})
	}
	run(msg) {

		var args = []

		var args = msg.content.split(' ');
        
        var target = msg.mentions.users.first().user || msg.guild.members.cache.get(args[1]) || msg.author

		if(target.bot) return msg.channel.send('Command can only be used with user profiles');

		//${Date.now() - member.user.createdAt() / 1000 / 60 / 60 / 24}

		const avatarEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle(`${target.user.username}'s profile!`)
		.setThumbnail(target.user.avatarURL({ format: 'png' }))
		.setFooter('my penis')
		.addFields(
			{ name: 'User ID', value: ` ${target.id}`} ,
			{ name: 'Joined Server', value: `${Date(target.joinedAt*1000)}`},
			{ name: 'Joined Discord', value: `${Date(target.user.createdAt*1000)}` },
			{ name: 'Online status', value: `${target.presence.status}`},
		)

		msg.channel.send(avatarEmbed);
		
	}
};