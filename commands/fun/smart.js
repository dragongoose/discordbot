const { Message, Client, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    name: "smart",
    description: "makes someone smart.",
    //aliases: [],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        try {
            var target = msg.mentions.users.first() || msg.author

            const res = await fetch(`https://api.no-api-key.com/api/v2/smrt?image=${target.avatarURL({ format: 'png' })}`).then(response => response.json());

            msg.reply({ files: [res]})
        } catch (e) {
            console.log(e)
            msg.channel.send('error try again later')
        }

    },
};
