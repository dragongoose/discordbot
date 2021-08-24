const { Command } = require('discord.js-commando')



module.exports = class SayCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'russianroulette',
			group: 'misc',
			memberName: 'russianroulette',
			description: 'russian roulette. play to find the consiquence',
			guildOnly: true,
		})
	}
	async run(msg) {
        try{
        if(msg.guild.id != '753237899951997049') return msg.channel.send('no')

        if(!msg.guild.member(msg.author).kickable) return msg.channel.send('you cant use this command')

        var member = msg.author
        var kicker = msg.guild.member(member) 
        var num = Math.floor(Math.random() * 10 + 1);

        if(num != 6) return msg.channel.send('blank');

        msg.channel.createInvite({
            maxAge: 604800,
            maxUses: 1
          })
          .then(invite => {

            member.send(`BANG! discord.gg/${invite.code}`)
            .then(m => {
                kicker.kick()
                .catch(() => {
                    m.delete();
                    return msg.channel.send('error.')
                })
            })
            .catch(e => {
                console.log(e)
                return msg.reply('turn on your dms. you cant use this command')
            })

            msg.channel.send(`BANG! ${msg.author.username} was kicked!`)
          })
          .catch(error => msg.channel.send('jk error'))
        } catch (e) {
            console.log(e)
            msg.channel.send('an error happened')
        }

	}
};