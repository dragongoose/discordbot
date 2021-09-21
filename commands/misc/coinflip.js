const { Message, Client } = require("discord.js");

module.exports = {
    name: "coinflip",
    description: "flips a coin",
    aliases: ['random'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var number = Math.round(Math.random());
		if (number == '1') {
			var head = 'Heads!'
		} else {
			if (number == '0')
				var head = 'Tails!'
		}

		msg.channel.send(head)
		
    },
};
