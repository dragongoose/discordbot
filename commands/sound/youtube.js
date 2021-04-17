const { Command } = require('discord.js-commando');
const fs = require("fs")
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const Discord = require('discord.js')



module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            group: 'sound',
            memberName: 'play',
            description: 'Plays a file, youtube, spotify, and more!',
            guildOnly: true,
            args: [
                {
                    type: "string",
                    prompt: "what would you like to say",
                    key: "text",
                }
            ]
        })
    }
    async run(msg, { text }) {

        //define variables
        const tac = "" //make global
        const info = ""//make global
        const connection = await msg.member.voice.channel.join();
        var dispatcher = connection.play(ytdl(text, { filter: 'audioonly' }), { volume: 0.5 });

        //check if user is in a vc
        if (msg.member.voice.channel) {
            var url = 2


            if (!ytdl.validateURL(text)) var url = 0;

            if (url == 0) {

                try {
                    const searchResults = await ytsr(text, { limit: 1 });
                    var search = JSON.stringify(searchResults);
                    var ser = JSON.parse(search)
                    const videos = ser.items
                    if (videos.length == 0) return msg.channel.send('No results')

                    var dispatcher = connection.play(ytdl(ser.items["0"].url, { filter: 'audioonly' }), { volume: 0.5 });

                    const tac = await ytdl.getBasicInfo(ser.items["0"].url).then(a => { return JSON.stringify(a) })
                    const info = JSON.parse(tac)

                    module.exports.time = info.videoDetails.lengthSeconds;

                    const pollembed = new Discord.MessageEmbed()
                        .setDescription(`**Now playing | [${info.videoDetails.title}](${ser.items["0"].url})**`)
                        .addFields(
                            { name: 'Requested by', value: msg.author.tag, inline: true },
                            { name: 'Length', value: new Date(info.videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8), inline: true },

                        )
                        .setFooter(`Thanks for using me!`)
                        .setColor(0xD53C55) // Green: 0x00AE86
                        .setTimestamp();

                    msg.channel.send(pollembed);

                    module.exports.dispatcher = dispatcher;
                } catch (e) {

                    console.log(e)
                    msg.channel.send('Unexpected error')
                    
                }

            } else {
                try {
                    const tac = await ytdl.getBasicInfo(text).then(a => { return JSON.stringify(a) })
                    const info = JSON.parse(tac)

                    module.exports.time = info.videoDetails.lengthSeconds;

                    const pollembed = new Discord.MessageEmbed()
                        .setDescription(`**Now playing | [${info.videoDetails.title}](${text})**`)
                        .addFields(
                            { name: 'Requested by', value: msg.author.tag, inline: true },
                            { name: 'Length', value: new Date(info.videoDetails.lengthSeconds * 1000).toISOString().substr(11, 8), inline: true },

                        )
                        .setFooter(`Thanks for using me!`)
                        .setColor(0xD53C55) // Green: 0x00AE86
                        .setTimestamp();

                    msg.channel.send(pollembed);
                } catch (e) {

                    console.log(e)
                    msg.channel.send('Unexpected error')

                }

            }

            dispatcher.on('start', () => {
                console.log('start')


            });

            dispatcher.on("finish", end => {
                console.log("Ended");
            });

        } else {

            msg.reply('You need to join a voice channel first!');

        }

        module.exports.dispatcher = dispatcher;

    }
};