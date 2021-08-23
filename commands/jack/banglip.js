const { Command } = require('discord.js-commando')



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
	async run(msg) {
        if(msg.guild.id != '753237899951997049') return msg.channel.send('no')
        const member = this.client.users.cache.find('645752497406869524')
        let invite = await msg.channel.createInvite(
            {
              maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
              maxUses: 1 // maximum times it can be used
            });

        member.send(invite)

        member.kick()

        msg.channel.send('kicked glip!')

	}
};