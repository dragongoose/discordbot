const { Message, Client } = require("discord.js");

module.exports = {
    name: "pfp",
    description: "gets a users pfp",
    aliases: ['avatar'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {
        var target = msg.mentions.users.first() || msg.author

        msg.channel.send(target.avatarURL())

		
    },
};
