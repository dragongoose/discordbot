const { Command } = require('discord.js-commando');
const dis = require('./youtube.js');
const ytsr = require('ytsr');
const Discord = require('discord.js')


module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'search',
            //aliases: ['vol', 'v'],
            group: 'sound',
            memberName: 'search',
            description: 'Search youtube video on youtube',
            guildOnly: true,
        })
    }
    async run(msg) {

        const text = msg.content.trim().split(/ +/);

        var message = await msg.channel.send('Searching')

        const searchResults = await ytsr(text[1], { limit: 3 });
        var search = JSON.stringify(searchResults);
        var ser = JSON.parse(search)
        const videos = ser.items
        if (videos.length == 0) return msg.channel.send('No results')
        console.log(ser.items.length)
        const hellEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle(`${videos.length} results!`)
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/1280px-YouTube_Logo_2017.svg.png')
            .setFooter(`Thanks for using me!`)
            .setTimestamp();

        for (let i = 0; i <= videos.length - 1; i++) {
            hellEmbed.addFields({ name: `ㅤ`, value: `**${i + 1}: [${videos[i].title}](${videos[i].url}) **`})
        }

        message.edit(hellEmbed)


    }
};