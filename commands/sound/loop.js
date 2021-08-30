const { Client, MessageEmbed } = require("discord.js");
const DisTube = require("distube");

module.exports = {
    name: "loop",
    aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        let queue = client.distube.getQueue(msg);
        if (queue === undefined) return msg.channel.send('The queue is empty!')

        const mode = client.distube.setRepeatMode(msg)
		msg.channel.send(`Set repeat mode to \`${mode ? mode === 2 ? 'All Queue' : 'This Song' : 'Off'}\``)
        
    },
};
