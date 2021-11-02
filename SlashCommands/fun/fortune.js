const { Client, CommandInteraction } = require("discord.js");
const fortunes = require("./fortune.js")

module.exports = {
    name: "fortune",
    description: "Gives you your fortune",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        var i = Math.floor((Math.random() * fortunes.length) + 1);
        interaction.followUp({ content: fortunes[i], ephemeral: true });
    },
}