const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "clear",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply('No Perms!');

        var ammount = args[0]

        if (ammount <= 0) {
            return msg.channel.send('Ammount to clear must be greater than 0');
        } else {
            if (ammount >= 101) {
                return msg.channel.send('I can only delete up to 100 messages at once. But using nuke can delete an entire channel')
                var ammount = 100;
            }



            if (msg.channel.type === 'GUILD_TEXT') {
                return msg.channel.messages.fetch({ limit: ammount })
                    .then(msgs => msg.channel.bulkDelete(msgs))
                    .then(msgs => msg.channel.send(`Purge deleted ${msgs.size} message(s)`))
                    .catch(e => { if (e == "DiscordAPIError: You can only bulk delete messages that are under 14 days old.") { msg.channel.send('I can only delete messages under 14 days old.') } })
            } else {
                msg.channel.send('Can only clear in text channels.')
            }
        }

    },
};
