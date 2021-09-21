const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "nuke",
    description: "clones a channel and deletes the old one",
    //aliases: ['p'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if (!msg.member.permissions.has('ADMINISTRATOR')) return msg.reply('No Perms!');
		const newChannel = await msg.channel.clone()
		newChannel.send('https://giphy.com/gifs/explosion-oe33xf3B50fsc')
		msg.channel.delete()

    },
};
