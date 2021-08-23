const { Message } = require('discord.js');
const { Command } = require('discord.js-commando')
const config = require('../../config.json')


module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kickglip',
			group: 'misc',
			memberName: 'kickglip',
			description: 'repeats what a player says.',
			guildOnly: true,
		})
	}
	run(msg, { text }) {
        if(msg.guild.id != '753237899951997049') return msg.channel.send('no')
        const member = bot.users.cache.find('645752497406869524')
        let invite = await message.channel.createInvite(
            {
              maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
              maxUses: 1 // maximum times it can be used
            })
        member.send(invite)

        member.kick()

        msg.channel.send('kicked glip!')

	}
};