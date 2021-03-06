const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");
const config = require("../../config.json");

module.exports = {
    name: "kick",
    description: "kicks a user",
    //aliases: ['kick'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.channel.send('No perms!')
        if (!msg.mentions.users.first()) return msg.channel.send('You must mention who you want to ban!')
        let member = msg.guild.members.cache.get(msg.mentions.users.first().id)
        if (!member) return msg.reply('Please specify a member for me to kick them')
        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No Reason Given';
        if (!member.kickable) return msg.reply('This member is not kickable')

        
        
        member.kick(reason)
        .then(msg.channel.send(`Kicked ${member.user.tag}`))
        .catch(err => console.log(err));


    },
};
