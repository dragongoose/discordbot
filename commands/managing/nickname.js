const { Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "nickname",
    description: "change users nickname",
    aliases: ['nick'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        if (args.length == 0) {
            return msg.reply('You must provide the nickname');
        }

        if(!msg.channel.guild.me.permissions.has('MANAGE_NICKNAMES')) return msg.reply("I have no perms");

        console.log(msg.member.guild.me.permissions.has('MANAGE_NICKNAMES'))

        try {
            msg.member.setNickname(args.join(' '))
            .then(() => {
                msg.react('✅')
            })
            .catch(e => {
                msg.reply('err')
                console.log(e)
            })
        } catch (e) {
            msg.reply('error')
        }

    }

};
