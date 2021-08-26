const { Message, Client, MessageAttachment } = require("discord.js");
const config = require("../../config.json");
const Levels = require("discord-xp");
const canvacord = require('canvacord');


module.exports = {
    name: "rank",
    aliases: ['level'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

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

        const rank = new canvacord.Rank()
            .setAvatar(target.avatarURL({ format: 'png' }))
            .setCurrentXP(user.xp - lvl)
            .setRequiredXP(Levels.xpFor(apc + 1) - lvl)
            .setProgressBar('#' + color, "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator)
            .setLevel(user.level)
            .setRank(user.position);

        rank.build()
            .then(data => {
                const attachment = new MessageAttachment(data, "RankCard.png");
                msg.channel.send({ files: [attachment]});
            })
        //msg.channel.send("LMAO you thought i was going to send you your rank? Well you though wrong!!! I would like to let you know that i am head of :troll:")

    },
};
