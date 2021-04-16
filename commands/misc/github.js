const { Command } = require('discord.js-commando')
const Discord = require('discord.js')

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'github',
            group: 'misc',
            memberName: 'github',
            description: 'Show the github repo for the bot',
            guildOnly: true,
        })
    }
    run(msg) {

        const gitEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Here is my github repo!')
            .setDescription('https://github.com/Dragonshadow14/discordbot')
            .setFooter(`❤ from dragongoose's computer!`)

        msg.channel.send(gitEmbed);
    }
};