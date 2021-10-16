const { Message, Client, MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const userEconomy = require("../../schema/userEconomy.js")

module.exports = {
    name: "balance",
    description: "repeats what a player says",
    aliases: ['bal', 'money'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        let target = args[0] || msg.author.id || msg.mentions.users.first().id 

        const userbal = await userEconomy.findOne({ userID: target });

        if (userbal === null) {
            var newbal = new userEconomy({
                userID: target,
                balance: 0,
                items: [],
                userstorage: []
            })
            await newbal.save();
            msg.channel.send('Added you to the databse, run the command agian.')
        }

        var parsed = JSON.parse(JSON.stringify(userbal))

        msg.reply(`Your balance is $${parsed.balance}`)

    },
};
