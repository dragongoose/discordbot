const { Message, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "timeout",
    //aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        var mention = msg.mentions.members.first()
        var img;

        if(!mention){
            var img = msg.author.avatarURL({ 'format':'png' })
        } else {
            var img = msg.mentions.members.first().user.avatarURL({ 'format':'png' })
        }

		msg.channel.send({
            files: [
                `https://api.no-api-key.com/api/v2/timeout?image=${img}`
            ]
        })

    },
};
