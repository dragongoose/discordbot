const { Message, Client } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "reply",
    description: "replies to a message",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        if(!msg.reference) return msg.channel.send('You must reply to a message!')
        const message = await msg.channel.messages.fetch(msg.reference.messageId)
        if(!message) return msg.channel.send("I couldn't find the messsage")

        msg.delete()
        message.reply(args.join(" "))
    },
};
