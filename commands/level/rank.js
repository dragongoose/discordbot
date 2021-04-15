const { Command } = require('discord.js-commando')
var async = require('async');
const Levels = require("discord-xp");
const Discord = require('discord.js');
const canvacord = require('canvacord');
const fs = require('fs');
const { Database } = require("quickmongo");
const config = require('../../config.json')
const db = new Database(config.dburl);



module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'rank',
            aliases: ['level'],
            group: 'ranking',
            memberName: 'say',
            description: 'shows rank of user.',
            guildOnly: true,
        })
    }
    async run(msg) {
        var user = ""
        var target = ""
        try {
            var target = msg.mentions.users.first() || msg.author;
            var user = await Levels.fetch(target.id, msg.guild.id, true);
        } catch (err) {
            if (err == "errRangeError: Target level should be a positive number.") {
                return msg.channel.send("You need to rank before using this command.")
            }
        }

        if (!user) { return msg.channel.send("Seems like this user has not earned any xp so far.") }

        var apc = user.level
        var lvl = Levels.xpFor(apc)
        var color = "FFFFFF"
        var exists = false

        var acheck = db.exists(target.id).then(a => { return a })
        var ifexists = await acheck

        if (ifexists) {
            var aktb = db.get(target.id + '.color').then(a => { return a })
            var color = await aktb
        }


        const rank = new canvacord.Rank()
            .setAvatar(target.avatarURL({ format: 'png' }))
            .setCurrentXP(user.xp - lvl)
            .setRequiredXP(Levels.xpFor(apc + 1) - lvl)
            .setStatus(target.presence.status)
            .setProgressBar('#' + color, "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator)
            .setLevel(user.level)
            .setRank(user.position);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                msg.channel.send(attachment);
            })
        //msg.channel.send("LMAO you thought i was going to send you your rank? Well you though wrong!!! I would like to let you know that i am head of :troll:")

    }
};