const { Message, Client } = require("discord.js");
const config = require("../../config.json");
const guildSettings = require("../../schema/guildsettings.js")

module.exports = {
    name: "wordboardAUTO",
    description: "Sets up a message that updates every 60 seconds for the top 10 most said words.",
    //aliases: ['repeat'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, msg, args) => {

        const allsettings = await totalWords.findOne({ guildID: message.guild.id });

        console.log(allsettings)
        if(allsettings === null){
            var emptysettings = new guildSettings({
                guildID: message.guild.id,
                settingsJson: {},
            })
            await emptysettings.save();
        }

    },
};
