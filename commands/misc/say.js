const { Message, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "say",
    description: "repeats what a player says",
    aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

		if (msg.author.id == config.ownerid) {
			msg.channel.send(args.join(' '));
            return msg.delete();
		} else {

			if (args.join(' ').includes('<@')) return msg.reply('no');

			if (args.join(' ') == '@everyone') {
				msg.reply('no')
			} else {
				msg.channel.send(args.join(' '))
				msg.delete()
			}
		}

    },
};
