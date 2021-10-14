const { Client, Collection, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const guildSettings = require("./schema/guildsettings.js")
const totalWords = require("./schema/totalwords.js")

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

client.login(client.config.token);

var guildwithwordtracker = [];

setTimeout(async () => {
    client.guilds.cache.forEach(async (guild) => {
        let guildset = await guildSettings.findOne({ guildID: guild.id})
        let parsed = JSON.parse(JSON.stringify(guildset))
        if(guildset != null){
            if(parsed.settingsJson.wordboard.channel){
                var json = {
                    guild: guild.id,
                    channel: parsed.settingsJson.wordboard.channel,
                    message: parsed.settingsJson.wordboard.message
                }
                guildwithwordtracker.push(json)
            }
        }
    })

    console.log(guildwithwordtracker)

    setInterval(async () => {
        var descrip;
        for (let i = 0; i < guildwithwordtracker.length; i++) {
            totalWords.find({ guildID: guildwithwordtracker[i].guild }, (err, res) => {
                if (err) return console.log(err)

                var parsed = JSON.parse(JSON.stringify(res))
                while (parsed.length >= 10) {
                    parsed.pop();
                    //console.log(parsed.length)
                }

                for (let i = 0; i < parsed.length; i++) {
                    descrip += '`' + parsed[i].word + '`' + ' : ' + parsed[i].count + '\n'
                }

                let channel = client.channels.cache.get(guildwithwordtracker[i].channel)
                
                var d = new Date();
                var hours;
                if(String(d.getHours()).length === 2){
                    hours = d.getHours() - 12
                }
                var time = `Last updated at ${hours}:${d.getMinutes()}`

                totalWords.countDocuments({guildID: guildwithwordtracker[i].guild}, (err, count) => {
                    const embed = new MessageEmbed()
                    .setColor('#0099ff')
                    .setTitle(`Top 10 most said words in ${client.guilds.cache.get(guildwithwordtracker[i].guild).name}`)
                    .setDescription(descrip.replace(/undefined/g, ""))
                    .setThumbnail(`${client.guilds.cache.get(guildwithwordtracker[i].guild).iconURL() || 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_331373.png&f=1&nofb=1'}`)
                    .setTimestamp()
                    .setFooter(`Total of ${count} words`);

                    channel.messages.fetch(guildwithwordtracker[i].message).then(msg => msg.edit({ embeds:[embed]}))
                })

            }).sort({ count: -1 })
        } 
    }, 60000)

}, 5000)



